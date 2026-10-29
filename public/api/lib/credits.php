<?php
/**
 * Purchased store-credit tokens, stored in ONE JSON ledger file (no database).
 *
 * Why one file: every balance change (issue, hold, commit, release) is a single
 * read-modify-write of ledger.json while holding an exclusive flock() on ledger.lock,
 * so two requests can never spend the same balance and the ledger can't end up
 * half-updated across several files.
 *
 * Safe writes: new JSON is written to a temp file, flushed, then rename()d over
 * ledger.json (atomic on Linux). The previous version is kept as ledger.json.bak and a
 * daily copy goes to backups/. A missing or unreadable ledger is NEVER replaced with an
 * empty one — credit requests fail until an admin restores it.
 *
 * Ledger layout:
 *   tokens[hash]    one purchased token (keyed by HMAC of the code; the plain code is not stored)
 *   purchases[oid]  credit-purchase order -> token (makes issuance idempotent)
 *   holds[oid]      credits reserved for a checkout: held -> committed | released | shortfall
 *   requests[key]   idempotency keys for credits-only checkouts
 *   promo_uses[h]   first-order promo codes already used (keyed by HMAC of code + mobile)
 *
 * A "held" hold only blocks balance until expires_ts (UPI QR expiry + grace). After that
 * it no longer counts, and the sweeper (or a late payment notice) settles it.
 */
if (!defined('FD_API')) {
    http_response_code(404);
    exit;
}

require_once __DIR__ . '/catalog.php';

const FD_CODE_ALPHABET = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ'; // 32 symbols, no 0/O/1/I
const FD_CODE_GROUPS = 3;                                     // FASH-XXXX-XXXX-XXXX = 60 random bits

class FdCreditError extends Exception
{
    public $httpCode;
    public $extra;

    public function __construct($httpCode, $message, $extra = array())
    {
        parent::__construct($message);
        $this->httpCode = $httpCode;
        $this->extra = $extra;
    }
}

function fdCreditSettings()
{
    $c = fdCatalog()['credits'];
    return array(
        'prefix' => strtoupper(preg_replace('/[^A-Za-z]/', '', (string) $c['prefix'])),
        'min' => (int) $c['min'],
        'max' => (int) $c['max'],
        'step' => max(1, (int) (isset($c['step']) ? $c['step'] : 1)),
        'validity_days' => (int) envVal('CREDIT_VALIDITY_DAYS', (string) $c['validityDays']),
    );
}

/**
 * Top-up bonus for buying $amount of credits: the best matching tier from
 * catalog credits.topupBonus [{min, percent}], capped at credits.topupBonusCap.
 * The bonus is promotional value — it is never refunded.
 */
function fdTopupBonus($amount)
{
    $c = fdCatalog()['credits'];
    $tiers = isset($c['topupBonus']) && is_array($c['topupBonus']) ? $c['topupBonus'] : array();
    $percent = 0;
    foreach ($tiers as $t) {
        if (is_array($t) && (int) $amount >= (int) $t['min'] && (int) $t['percent'] > $percent) {
            $percent = (int) $t['percent'];
        }
    }
    $bonus = (int) floor((int) $amount * $percent / 100);
    $cap = isset($c['topupBonusCap']) ? (int) $c['topupBonusCap'] : 0;
    return $cap > 0 ? min($bonus, $cap) : $bonus;
}

function fdCreditSecret()
{
    $secret = envVal('CREDIT_SECRET');
    if (strlen($secret) < 32) {
        throw new FdCreditError(503, 'Store credits are not configured yet (CREDIT_SECRET is missing in api/.env).');
    }
    return $secret;
}

/**
 * Where the ledger lives. Order of preference:
 *   1. CREDIT_DATA_DIR from .env
 *   2. <home>/marketplace-credits-data  (one level above public_html — not web reachable)
 *   3. public_html/api/data/credits (only if 2 can't be created; blocked by .htaccess)
 * Once a folder exists it is always used, so requests never split across two ledgers.
 */
function fdCreditDir()
{
    static $dir = null;
    if ($dir !== null) {
        return $dir;
    }
    $apiDir = dirname(__DIR__);
    $configured = trim(envVal('CREDIT_DATA_DIR'));
    $private = dirname(dirname($apiDir)) . DIRECTORY_SEPARATOR . 'marketplace-credits-data';
    $fallback = $apiDir . DIRECTORY_SEPARATOR . 'data' . DIRECTORY_SEPARATOR . 'credits';

    if ($configured !== '') {
        $candidates = array($configured);
    } elseif (is_dir($private)) {
        $candidates = array($private);
    } elseif (is_dir($fallback)) {
        $candidates = array($fallback);
    } else {
        $candidates = array($private, $fallback);
    }
    foreach ($candidates as $candidate) {
        if (!is_dir($candidate)) {
            @mkdir($candidate, 0700, true);
        }
        if (is_dir($candidate) && is_writable($candidate)) {
            if (!is_dir($candidate . DIRECTORY_SEPARATOR . 'backups')) {
                @mkdir($candidate . DIRECTORY_SEPARATOR . 'backups', 0700);
            }
            $deny = $candidate . DIRECTORY_SEPARATOR . '.htaccess';
            if (!is_file($deny)) {
                @file_put_contents($deny, "Require all denied\nDeny from all\n");
            }
            return $dir = $candidate;
        }
        error_log('[credits] folder not writable: ' . $candidate);
    }
    throw new FdCreditError(503, 'Store credits are temporarily unavailable. Please try again later.');
}

function fdEmptyLedger()
{
    return array(
        'schema' => 1,
        'created_at' => date('c'),
        'updated_at' => date('c'),
        'tokens' => array(),
        'purchases' => array(),
        'holds' => array(),
        'requests' => array(),
        'promo_uses' => array(),
    );
}

function fdLedgerRead($dir)
{
    $path = $dir . DIRECTORY_SEPARATOR . 'ledger.json';
    $marker = $dir . DIRECTORY_SEPARATOR . '.initialized';
    if (!is_file($path)) {
        if (is_file($marker)) {
            error_log('[credits] ledger.json is missing but the ledger was initialised before — refusing to start empty');
            throw new FdCreditError(503, 'Store credits are temporarily unavailable. Please contact us.');
        }
        return fdEmptyLedger();
    }
    $raw = @file_get_contents($path);
    $data = is_string($raw) ? json_decode($raw, true) : null;
    if (!is_array($data) || !isset($data['schema'], $data['tokens'], $data['holds'], $data['purchases'])) {
        error_log('[credits] ledger.json is unreadable or malformed — refusing to overwrite it');
        throw new FdCreditError(503, 'Store credits are temporarily unavailable. Please contact us.');
    }
    foreach (array('requests', 'promo_uses') as $key) {
        if (!isset($data[$key]) || !is_array($data[$key])) {
            $data[$key] = array();
        }
    }
    return $data;
}

function fdLedgerWrite($dir, $ledger)
{
    $path = $dir . DIRECTORY_SEPARATOR . 'ledger.json';
    $ledger['updated_at'] = date('c');
    $json = json_encode($ledger, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
    if (!is_string($json)) {
        throw new FdCreditError(500, 'Could not save store credits.');
    }
    $tmp = $path . '.tmp-' . bin2hex(random_bytes(4));
    $fh = @fopen($tmp, 'xb');
    if (!$fh) {
        throw new FdCreditError(503, 'Could not save store credits.');
    }
    $written = fwrite($fh, $json);
    fflush($fh);
    if (function_exists('fsync')) {
        @fsync($fh);
    }
    fclose($fh);
    if ($written !== strlen($json)) {
        @unlink($tmp);
        throw new FdCreditError(503, 'Could not save store credits.');
    }
    @chmod($tmp, 0600);

    if (is_file($path)) {
        @copy($path, $path . '.bak');
        @chmod($path . '.bak', 0600);
        $daily = $dir . DIRECTORY_SEPARATOR . 'backups' . DIRECTORY_SEPARATOR . 'ledger-' . date('Ymd') . '.json';
        if (!is_file($daily)) {
            @copy($path, $daily);
            @chmod($daily, 0600);
            fdPruneBackups($dir);
        }
    }
    if (!@rename($tmp, $path)) {
        @unlink($tmp);
        throw new FdCreditError(503, 'Could not save store credits.');
    }
    $marker = $dir . DIRECTORY_SEPARATOR . '.initialized';
    if (!is_file($marker)) {
        @file_put_contents($marker, date('c'));
    }
}

function fdPruneBackups($dir)
{
    $files = glob($dir . DIRECTORY_SEPARATOR . 'backups' . DIRECTORY_SEPARATOR . 'ledger-*.json');
    if (!is_array($files) || count($files) <= 60) {
        return;
    }
    sort($files);
    foreach (array_slice($files, 0, count($files) - 60) as $old) {
        @unlink($old);
    }
}

/**
 * Runs $fn(&$ledger) while holding the ledger lock and saves the ledger if $fn
 * returns with $changed = true. No network calls happen inside $fn.
 */
function fdLedger(callable $fn, $write = true)
{
    $dir = fdCreditDir();
    $lock = @fopen($dir . DIRECTORY_SEPARATOR . 'ledger.lock', 'c');
    if (!$lock) {
        throw new FdCreditError(503, 'Store credits are temporarily unavailable. Please try again later.');
    }
    $deadline = microtime(true) + 10;
    while (!flock($lock, ($write ? LOCK_EX : LOCK_SH) | LOCK_NB)) {
        if (microtime(true) > $deadline) {
            fclose($lock);
            throw new FdCreditError(503, 'Store credits are busy. Please try again in a moment.');
        }
        usleep(50000);
    }
    try {
        $ledger = fdLedgerRead($dir);
        $changed = false;
        $result = $fn($ledger, $changed);
        if ($write && $changed) {
            fdLedgerWrite($dir, $ledger);
        }
        return $result;
    } finally {
        flock($lock, LOCK_UN);
        fclose($lock);
    }
}

/* ───────────── Token codes ───────────── */

/** Canonical form "FASH" + 12 symbols, or '' if the input can't be a token. */
function fdCanonicalCode($input)
{
    $prefix = fdCreditSettings()['prefix'];
    $s = strtoupper(preg_replace('/[\s\-]+/', '', (string) $input));
    $len = 4 * FD_CODE_GROUPS;
    if (strlen($s) !== strlen($prefix) + $len || strpos($s, $prefix) !== 0) {
        return '';
    }
    $body = substr($s, strlen($prefix));
    return strspn($body, FD_CODE_ALPHABET) === $len ? $prefix . $body : '';
}

function fdFormatCode($canonical)
{
    $prefix = fdCreditSettings()['prefix'];
    return $prefix . '-' . implode('-', str_split(substr($canonical, strlen($prefix)), 4));
}

function fdCodeHash($canonical)
{
    return hash_hmac('sha256', 'token|' . $canonical, fdCreditSecret());
}

function fdNewCanonicalCode()
{
    $body = '';
    for ($i = 0; $i < 4 * FD_CODE_GROUPS; $i++) {
        $body .= FD_CODE_ALPHABET[random_int(0, 31)];
    }
    return fdCreditSettings()['prefix'] . $body;
}

/** The plain code is kept only encrypted (for re-showing the confirmation page). */
function fdEncryptCode($canonical)
{
    $key = hash('sha256', 'enc|' . fdCreditSecret(), true);
    $iv = random_bytes(12);
    $tag = '';
    $cipher = openssl_encrypt($canonical, 'aes-256-gcm', $key, OPENSSL_RAW_DATA, $iv, $tag);
    if ($cipher === false) {
        throw new FdCreditError(500, 'Could not secure the credit token.');
    }
    return base64_encode($iv . $tag . $cipher);
}

function fdDecryptCode($blob)
{
    $raw = base64_decode((string) $blob, true);
    if ($raw === false || strlen($raw) < 29) {
        return '';
    }
    $key = hash('sha256', 'enc|' . fdCreditSecret(), true);
    $plain = openssl_decrypt(substr($raw, 28), 'aes-256-gcm', $key, OPENSSL_RAW_DATA, substr($raw, 0, 12), substr($raw, 12, 16));
    return is_string($plain) ? $plain : '';
}

/* ───────────── Balances ───────────── */

function fdTokenStatus($token, $now)
{
    if ((int) $token['balance'] <= 0) {
        return 'exhausted';
    }
    if ($now >= (int) $token['expires_ts']) {
        return 'expired';
    }
    return 'active';
}

/** Sum of live holds on a token (expired holds no longer block the balance). */
function fdHeldAmount($ledger, $hash, $now, $exceptOrder = '')
{
    $sum = 0;
    foreach ($ledger['holds'] as $oid => $h) {
        if ($h['token'] === $hash && $h['state'] === 'held' && (int) $h['expires_ts'] > $now && (string) $oid !== $exceptOrder) {
            $sum += (int) $h['amount'];
        }
    }
    return $sum;
}

function fdPublicToken($ledger, $hash, $now)
{
    $t = $ledger['tokens'][$hash];
    $status = fdTokenStatus($t, $now);
    $available = $status === 'active' ? max(0, (int) $t['balance'] - fdHeldAmount($ledger, $hash, $now)) : 0;
    return array(
        'hint' => $t['hint'],
        'original' => (int) $t['original'],
        'paid' => isset($t['paid']) ? (int) $t['paid'] : (int) $t['original'],
        'bonus' => isset($t['bonus']) ? (int) $t['bonus'] : 0,
        'balance' => (int) $t['balance'],
        'available' => $available,
        'on_hold' => $status === 'active' ? (int) $t['balance'] - $available : 0,
        'status' => $status,
        'created_at' => $t['created_at'],
        'expires_at' => $t['expires_at'],
    );
}

/**
 * Checks a code the customer typed. Returns array(hash|null, info|null, error message).
 * Never reveals anything about other tokens.
 */
function fdCheckToken($input)
{
    $canonical = fdCanonicalCode($input);
    if ($canonical === '') {
        return array(null, null, 'That doesn\'t look like a credit token. It should look like ' . fdCreditSettings()['prefix'] . '-XXXX-XXXX-XXXX.');
    }
    $hash = fdCodeHash($canonical);
    $now = time();
    return fdLedger(function (&$ledger) use ($hash, $now) {
        if (!isset($ledger['tokens'][$hash])) {
            return array(null, null, 'We couldn\'t find this credit token. Check the code and try again.');
        }
        $info = fdPublicToken($ledger, $hash, $now);
        if ($info['status'] === 'expired') {
            return array($hash, $info, 'This credit token expired on ' . date('j M Y', strtotime($info['expires_at'])) . '.');
        }
        if ($info['status'] === 'exhausted') {
            return array($hash, $info, 'This credit token has no balance left.');
        }
        if ($info['available'] <= 0) {
            return array($hash, $info, 'This token\'s balance is on hold for a payment in progress. Try again in a few minutes.');
        }
        return array($hash, $info, '');
    }, false);
}

/* ───────────── Issue (after a verified credit purchase) ───────────── */

/**
 * Issues exactly one token for a verified credit-purchase order. Safe to call any
 * number of times (status polls, webhook retries): the second call returns the same token.
 */
function fdIssueToken($orderId, $amount, $paymentRef, $bonus = 0)
{
    $settings = fdCreditSettings();
    $now = time();
    return fdLedger(function (&$ledger, &$changed) use ($orderId, $amount, $paymentRef, $bonus, $settings, $now) {
        $bonus = max(0, (int) $bonus);
        $value = (int) $amount + $bonus;
        if (isset($ledger['purchases'][$orderId])) {
            $p = $ledger['purchases'][$orderId];
            return array('code' => fdFormatCode(fdDecryptCode($p['code_enc'])), 'token' => fdPublicToken($ledger, $p['token'], $now), 'new' => false);
        }
        do {
            $canonical = fdNewCanonicalCode();
            $hash = fdCodeHash($canonical);
        } while (isset($ledger['tokens'][$hash]));
        $expires = $now + $settings['validity_days'] * 86400;
        $ledger['tokens'][$hash] = array(
            'hint' => $settings['prefix'] . '-••••-••••-' . substr($canonical, -4),
            'original' => $value,
            'balance' => $value,
            'paid' => (int) $amount,
            'bonus' => $bonus,
            'status' => 'active',
            'created_at' => date('c', $now),
            'expires_at' => date('c', $expires),
            'expires_ts' => $expires,
            'purchase_order' => $orderId,
            'payment_ref' => $paymentRef,
            'history' => array(array('type' => 'issued', 'order_id' => $orderId, 'amount' => $value, 'paid' => (int) $amount, 'bonus' => $bonus, 'balance_after' => $value, 'at' => date('c', $now))),
        );
        $ledger['purchases'][$orderId] = array('token' => $hash, 'code_enc' => fdEncryptCode($canonical), 'amount' => (int) $amount, 'bonus' => $bonus, 'issued_at' => date('c', $now));
        $changed = true;
        return array('code' => fdFormatCode($canonical), 'token' => fdPublicToken($ledger, $hash, $now), 'new' => true);
    });
}

/** Token details for a purchase order that was already issued (or null). */
function fdIssuedForOrder($orderId)
{
    $now = time();
    return fdLedger(function (&$ledger) use ($orderId, $now) {
        if (!isset($ledger['purchases'][$orderId])) {
            return null;
        }
        $p = $ledger['purchases'][$orderId];
        return array('code' => fdFormatCode(fdDecryptCode($p['code_enc'])), 'token' => fdPublicToken($ledger, $p['token'], $now), 'new' => false);
    }, false);
}

/* ───────────── Redeem: reserve -> commit / release ───────────── */

/**
 * Reserves $amount on a token for $orderId until $ttlSeconds from now.
 * Throws 409 if the available balance changed since the quote.
 */
function fdReserve($orderId, $hash, $amount, $bonus, $ttlSeconds)
{
    $now = time();
    return fdLedger(function (&$ledger, &$changed) use ($orderId, $hash, $amount, $bonus, $ttlSeconds, $now) {
        if (isset($ledger['holds'][$orderId])) {
            throw new FdCreditError(409, 'This order already has credits reserved.');
        }
        if (!isset($ledger['tokens'][$hash])) {
            throw new FdCreditError(422, 'We couldn\'t find this credit token.');
        }
        $info = fdPublicToken($ledger, $hash, $now);
        if ($info['status'] !== 'active' || $info['available'] < $amount) {
            throw new FdCreditError(409, 'Your credit balance changed. Please review your order and try again.', array('available' => $info['available']));
        }
        $ledger['holds'][$orderId] = array(
            'token' => $hash,
            'amount' => (int) $amount,
            'bonus' => (int) $bonus,
            'state' => 'held',
            'created_at' => date('c', $now),
            'expires_ts' => $now + $ttlSeconds,
            'updated_at' => date('c', $now),
        );
        $changed = true;
        return $info;
    });
}

/** Moves a hold to a new order id (used when the UPI request is retried with a fresh id). */
function fdRekeyHold($oldId, $newId)
{
    return fdLedger(function (&$ledger, &$changed) use ($oldId, $newId) {
        if (!isset($ledger['holds'][$oldId]) || isset($ledger['holds'][$newId])) {
            return false;
        }
        $ledger['holds'][$newId] = $ledger['holds'][$oldId];
        unset($ledger['holds'][$oldId]);
        $changed = true;
        return true;
    });
}

function fdDeduct(&$ledger, $orderId, $hash, $amount, $now, $note)
{
    $t = &$ledger['tokens'][$hash];
    $t['balance'] = (int) $t['balance'] - (int) $amount;
    $t['status'] = fdTokenStatus($t, $now);
    $t['history'][] = array('type' => 'redeemed', 'order_id' => $orderId, 'amount' => (int) $amount, 'balance_after' => (int) $t['balance'], 'at' => date('c', $now), 'note' => $note);
}

/**
 * Called once the remaining UPI payment is verified. Idempotent.
 * Returns 'none' | 'committed' | 'already' | 'shortfall'.
 * 'shortfall' = the hold had expired and the balance was spent elsewhere before this
 * (late) payment arrived — the order needs manual review.
 */
function fdCommitHold($orderId)
{
    $now = time();
    return fdLedger(function (&$ledger, &$changed) use ($orderId, $now) {
        if (!isset($ledger['holds'][$orderId])) {
            return 'none';
        }
        $h = &$ledger['holds'][$orderId];
        if ($h['state'] === 'committed') {
            return 'already';
        }
        if ($h['state'] === 'shortfall') {
            return 'shortfall';
        }
        $live = $h['state'] === 'held' && (int) $h['expires_ts'] > $now;
        $t = $ledger['tokens'][$h['token']];
        $free = (int) $t['balance'] - fdHeldAmount($ledger, $h['token'], $now, (string) $orderId);
        if (!$live && $free < (int) $h['amount']) {
            $h['state'] = 'shortfall';
            $h['updated_at'] = date('c', $now);
            $changed = true;
            return 'shortfall';
        }
        fdDeduct($ledger, $orderId, $h['token'], $h['amount'], $now, $live ? 'paid' : 'late payment');
        $h['state'] = 'committed';
        $h['updated_at'] = date('c', $now);
        $changed = true;
        return 'committed';
    });
}

/** Releases a hold after a failed / expired payment. Committed holds are never touched. */
function fdReleaseHold($orderId, $reason)
{
    $now = time();
    return fdLedger(function (&$ledger, &$changed) use ($orderId, $reason, $now) {
        if (!isset($ledger['holds'][$orderId]) || $ledger['holds'][$orderId]['state'] !== 'held') {
            return false;
        }
        $ledger['holds'][$orderId]['state'] = 'released';
        $ledger['holds'][$orderId]['reason'] = $reason;
        $ledger['holds'][$orderId]['updated_at'] = date('c', $now);
        $changed = true;
        return true;
    });
}

/**
 * Credits-only checkout: checks and deducts in one locked step (no UPI payment).
 * $idemKey makes a double-click / retry return the first order instead of spending twice.
 * Returns array(orderId, tokenInfoAfter, isRepeat).
 */
function fdRedeemNow($orderId, $hash, $amount, $bonus, $idemKey)
{
    $now = time();
    return fdLedger(function (&$ledger, &$changed) use ($orderId, $hash, $amount, $bonus, $idemKey, $now) {
        foreach ($ledger['requests'] as $k => $r) { // keep idempotency keys for 2 days
            if ((int) $r['ts'] < $now - 172800) {
                unset($ledger['requests'][$k]);
                $changed = true;
            }
        }
        if ($idemKey !== '' && isset($ledger['requests'][$idemKey])) {
            return array($ledger['requests'][$idemKey]['order_id'], fdPublicToken($ledger, $hash, $now), true);
        }
        if (!isset($ledger['tokens'][$hash])) {
            throw new FdCreditError(422, 'We couldn\'t find this credit token.');
        }
        $info = fdPublicToken($ledger, $hash, $now);
        if ($info['status'] !== 'active' || $info['available'] < $amount) {
            throw new FdCreditError(409, 'Your credit balance changed. Please review your order and try again.', array('available' => $info['available']));
        }
        fdDeduct($ledger, $orderId, $hash, $amount, $now, 'credits only');
        $ledger['holds'][$orderId] = array(
            'token' => $hash, 'amount' => (int) $amount, 'bonus' => (int) $bonus, 'state' => 'committed',
            'created_at' => date('c', $now), 'expires_ts' => $now, 'updated_at' => date('c', $now),
        );
        if ($idemKey !== '') {
            $ledger['requests'][$idemKey] = array('order_id' => $orderId, 'ts' => $now);
        }
        $changed = true;
        return array($orderId, fdPublicToken($ledger, $hash, $now), false);
    });
}

/** Order ids of holds that expired while still "held" (oldest first). */
function fdExpiredHolds($limit)
{
    $now = time();
    return fdLedger(function (&$ledger) use ($limit, $now) {
        $ids = array();
        foreach ($ledger['holds'] as $oid => $h) {
            if ($h['state'] === 'held' && (int) $h['expires_ts'] <= $now) {
                $ids[] = (string) $oid;
                if (count($ids) >= $limit) {
                    break;
                }
            }
        }
        return $ids;
    }, false);
}

/* ───────────── First-order promo codes ───────────── */

function fdPromoKey($code, $mobile)
{
    return hash_hmac('sha256', 'promo|' . $code . '|' . $mobile, fdCreditSecret());
}

/** True if this first-order code was already used on a paid order with this mobile number. */
function fdPromoUsed($code, $mobile)
{
    $key = fdPromoKey($code, $mobile);
    return fdLedger(function (&$ledger) use ($key) {
        return isset($ledger['promo_uses'][$key]);
    }, false);
}

/** Records the use once the order is paid. Returns false if it was already used by another order. */
function fdRecordPromoUse($code, $mobile, $orderId)
{
    $key = fdPromoKey($code, $mobile);
    return fdLedger(function (&$ledger, &$changed) use ($key, $code, $orderId) {
        if (isset($ledger['promo_uses'][$key])) {
            return $ledger['promo_uses'][$key]['order_id'] === $orderId;
        }
        $ledger['promo_uses'][$key] = array('code' => $code, 'order_id' => $orderId, 'at' => date('c'));
        $changed = true;
        return true;
    });
}
