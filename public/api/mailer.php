<?php
declare(strict_types=1);

function ne_load_env(): void
{
    static $loaded = false;
    if ($loaded) {
        return;
    }
    $loaded = true;
    $candidates = array(
        __DIR__ . DIRECTORY_SEPARATOR . '.env',
        dirname(__DIR__) . DIRECTORY_SEPARATOR . '.env',
        dirname(dirname(__DIR__)) . DIRECTORY_SEPARATOR . '.env',
    );
    foreach ($candidates as $path) {
        if (!is_file($path) || !is_readable($path)) {
            continue;
        }
        $lines = file($path, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
        if (!is_array($lines)) {
            return;
        }
        foreach ($lines as $line) {
            $line = trim($line);
            if ($line === '' || strpos($line, '#') === 0 || strpos($line, '=') === false) {
                continue;
            }
            list($key, $value) = explode('=', $line, 2);
            $key = trim($key);
            $value = trim(trim($value), "\"'");
            if ($key === '') {
                continue;
            }
            if (!isset($_ENV[$key]) || $_ENV[$key] === '') {
                $_ENV[$key] = $value;
            }
            if (getenv($key) === false || getenv($key) === '') {
                putenv($key . '=' . $value);
            }
        }
        return;
    }
}

function ne_env(string $key, string $default = ''): string
{
    ne_load_env();
    if (isset($_ENV[$key]) && $_ENV[$key] !== '') {
        return (string) $_ENV[$key];
    }
    $fromEnv = getenv($key);
    if ($fromEnv !== false && $fromEnv !== '') {
        return (string) $fromEnv;
    }
    return $default;
}

function ne_find_autoload(): ?string
{
    $candidates = array(
        __DIR__ . '/vendor/autoload.php',
        __DIR__ . '/../vendor/autoload.php',
        dirname(__DIR__) . '/vendor/autoload.php',
        dirname(dirname(__DIR__)) . '/vendor/autoload.php',
    );
    foreach ($candidates as $path) {
        if (is_file($path)) {
            return $path;
        }
    }
    return null;
}

function ne_mail_last_error(): string
{
    return isset($GLOBALS['ne_last_mail_error']) ? (string) $GLOBALS['ne_last_mail_error'] : '';
}

/**
 * Send HTML mail via SMTP when configured, otherwise PHP mail().
 */
function ne_deliver_mail(
    string $toEmail,
    string $toName,
    string $subject,
    string $html,
    string $alt,
    string $replyEmail = '',
    string $replyName = ''
): bool {
    $GLOBALS['ne_last_mail_error'] = '';
    $smtpHost = ne_env('SMTP_HOST');
    $smtpUser = ne_env('SMTP_USER');
    $smtpPass = ne_env('SMTP_PASS');
    $smtpPort = (int) ne_env('SMTP_PORT', '465');
    $smtpSecure = ne_env('SMTP_SECURE', 'smtps');
    $fromEmail = ne_env('MAIL_FROM', ne_env('ORDER_NOTIFY_EMAIL', 'info@easy-bay.com'));
    if ($smtpUser !== '') {
        $fromEmail = $smtpUser;
    }
    $fromName = ne_env('MAIL_FROM_NAME', 'Modexa');

    if ($smtpHost !== '' && $smtpUser !== '' && $smtpPass !== '') {
        $autoload = ne_find_autoload();
        if (!$autoload) {
            $GLOBALS['ne_last_mail_error'] = 'PHPMailer is missing from public/api/vendor.';
            return false;
        }
        try {
            require_once $autoload;
            if (!class_exists('PHPMailer\\PHPMailer\\PHPMailer')) {
                $GLOBALS['ne_last_mail_error'] = 'PHPMailer failed to load.';
                return false;
            }
            $mail = new PHPMailer\PHPMailer\PHPMailer(true);
            $mail->Timeout = 20;
            $mail->isSMTP();
            $mail->Host = $smtpHost;
            $mail->SMTPAuth = true;
            $mail->Username = $smtpUser;
            $mail->Password = $smtpPass;
            $mail->Port = $smtpPort > 0 ? $smtpPort : 465;
            $mail->SMTPOptions = array(
                'ssl' => array(
                    'verify_peer' => true,
                    'verify_peer_name' => true,
                    'allow_self_signed' => false,
                ),
            );
            if ($smtpSecure === 'smtps' || $smtpPort === 465) {
                $mail->SMTPSecure = PHPMailer\PHPMailer\PHPMailer::ENCRYPTION_SMTPS;
            } else {
                $mail->SMTPSecure = PHPMailer\PHPMailer\PHPMailer::ENCRYPTION_STARTTLS;
            }
            $mail->CharSet = 'UTF-8';
            $mail->setFrom($fromEmail, $fromName);
            $mail->addAddress($toEmail, $toName);
            if ($replyEmail !== '') {
                $mail->addReplyTo($replyEmail, $replyName !== '' ? $replyName : $replyEmail);
            }
            $mail->isHTML(true);
            $mail->Subject = $subject;
            $mail->Body = $html;
            $mail->AltBody = $alt !== '' ? $alt : strip_tags($subject);
            $mail->send();
            return true;
        } catch (Throwable $e) {
            $detail = trim($e->getMessage());
            $GLOBALS['ne_last_mail_error'] = $detail !== '' ? $detail : 'SMTP send failed.';
            return false;
        }
    }

    $headers = array(
        'MIME-Version: 1.0',
        'Content-type: text/html; charset=UTF-8',
        'From: ' . $fromName . ' <' . $fromEmail . '>',
    );
    if ($replyEmail !== '') {
        $headers[] = 'Reply-To: ' . ($replyName !== '' ? $replyName : $replyEmail) . ' <' . $replyEmail . '>';
    }
    $headers[] = 'X-Mailer: PHP/' . phpversion();

    if (!function_exists('mail')) {
        $GLOBALS['ne_last_mail_error'] = 'SMTP is not set in public/api/.env and PHP mail() is disabled.';
        return false;
    }

    $extra = PHP_OS_FAMILY === 'Windows' ? '' : '-f' . $fromEmail;
    $sent = $extra !== ''
        ? @mail($toEmail, '=?UTF-8?B?' . base64_encode($subject) . '?=', $html, implode("\r\n", $headers), $extra)
        : @mail($toEmail, '=?UTF-8?B?' . base64_encode($subject) . '?=', $html, implode("\r\n", $headers));

    if ($sent) {
        return true;
    }

    $last = error_get_last();
    $hint = ($last && !empty($last['message'])) ? ' ' . $last['message'] : '';
    $GLOBALS['ne_last_mail_error'] = 'SMTP_HOST, SMTP_USER, and SMTP_PASS are empty in public/api/.env, and PHP mail() cannot send from this computer.' . $hint;
    return false;
}

if (!function_exists('deliverMail')) {
    function deliverMail(
        $toEmail,
        $toName,
        $subject,
        $html,
        $alt,
        $replyEmail = '',
        $replyName = ''
    ) {
        return ne_deliver_mail(
            (string) $toEmail,
            (string) $toName,
            (string) $subject,
            (string) $html,
            (string) $alt,
            (string) $replyEmail,
            (string) $replyName
        );
    }
}

if (!function_exists('findAutoload')) {
    function findAutoload()
    {
        return ne_find_autoload();
    }
}
