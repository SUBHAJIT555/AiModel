<?php
/**
 * Aimodel mailer — contact, newsletter, quote, partnership forms.
 * GET  = health check JSON
 * POST = send email (SMTP from .env when set, else PHP mail())
 */
declare(strict_types=1);

error_reporting(E_ALL);
ini_set('display_errors', '0');
ini_set('log_errors', '1');
header('Content-Type: application/json; charset=utf-8');

function json_exit(int $code, array $payload): void
{
    http_response_code($code);
    echo json_encode($payload);
    exit;
}

register_shutdown_function(function () {
    $error = error_get_last();
    if (!$error) {
        return;
    }
    $fatal = array(E_ERROR, E_PARSE, E_CORE_ERROR, E_COMPILE_ERROR, E_USER_ERROR);
    if (!in_array($error['type'], $fatal, true)) {
        return;
    }
    if (!headers_sent()) {
        header('Content-Type: application/json; charset=utf-8');
        http_response_code(500);
    }
    echo json_encode(array(
        'success' => false,
        'error' => 'Server error.',
        'message' => $error['message'],
    ));
});

$origin = isset($_SERVER['HTTP_ORIGIN']) ? $_SERVER['HTTP_ORIGIN'] : '';
$allowed = array(
    'http://localhost:3000',
    'http://127.0.0.1:3000',
);
if ($origin && in_array($origin, $allowed, true)) {
    header('Access-Control-Allow-Origin: ' . $origin);
    header('Vary: Origin');
}
header('Access-Control-Allow-Methods: POST, OPTIONS, GET');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');

if (isset($_SERVER['REQUEST_METHOD']) && $_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

if (!isset($_SERVER['REQUEST_METHOD']) || $_SERVER['REQUEST_METHOD'] !== 'POST') {
    json_exit(200, array(
        'ok' => true,
        'service' => 'aimodel-mailer',
        'php' => PHP_VERSION,
        'mail' => function_exists('mail'),
    ));
}

date_default_timezone_set('Asia/Kolkata');
ne_submit_load_env();
require_once __DIR__ . '/mailer.php';

$inputData = $_POST;
$contentType = isset($_SERVER['CONTENT_TYPE']) ? $_SERVER['CONTENT_TYPE'] : '';
if (stripos($contentType, 'application/json') !== false) {
    $decoded = json_decode((string) file_get_contents('php://input'), true);
    if (is_array($decoded)) {
        $inputData = $decoded;
    }
}

function ne_submit_load_env(): void
{
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

function v(string $key, string $default = ''): string
{
    global $inputData;
    if (!isset($inputData[$key]) || is_array($inputData[$key])) {
        return $default;
    }
    $val = trim((string) $inputData[$key]);
    return $val !== '' ? $val : $default;
}

function firstFilled(array $keys): string
{
    foreach ($keys as $key) {
        $val = v($key);
        if ($val !== '') {
            return $val;
        }
    }
    return '';
}

function clean(string $s): string
{
    return htmlspecialchars($s, ENT_QUOTES, 'UTF-8');
}

function requiredFields(array $arr): ?string
{
    global $inputData;
    foreach ($arr as $k => $label) {
        if (!isset($inputData[$k])) {
            return $label . ' is required';
        }
        $val = $inputData[$k];
        if (is_array($val)) {
            if (count($val) === 0) {
                return $label . ' is required';
            }
            continue;
        }
        if (trim((string) $val) === '') {
            return $label . ' is required';
        }
    }
    return null;
}

function kvRow(string $label, string $value, bool $multiline = false): string
{
    if ($value === '') {
        $value = '-';
    }
    $body = $multiline ? nl2br(clean($value)) : clean($value);
    return '<p style="margin:0 0 8px;"><strong>' . clean($label) . ':</strong> ' . ($multiline ? '<br>' : '') . $body . '</p>';
}

function cartItems(): array
{
    global $inputData;
    $raw = $inputData['cart_items'] ?? '';
    if (is_array($raw)) {
        return $raw;
    }
    $decoded = json_decode((string) $raw, true);
    return is_array($decoded) ? $decoded : array();
}

function ne_email_shell(string $subject, string $mainContent, string $toEmail): string
{
    $brandName = ne_env('MAIL_FROM_NAME', 'Aimodel');
    $tagline = 'Modern AI platform for intelligent automation and sustainable technology.';
    $brandColor = '#111318';
    $accent = '#6c5cff';
    $border = '#dbe4eb';

    return '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>' . clean($subject) . '</title></head>
<body style="margin:0;padding:0;background:#eff4f8;">
  <table width="100%" cellpadding="0" cellspacing="0"><tr><td align="center" style="padding:30px 10px;">
    <table width="600" cellpadding="0" cellspacing="0" style="max-width:100%;background:#ffffff;border:1px solid ' . $border . ';border-radius:8px;overflow:hidden;">
      <tr><td align="center" style="padding:24px 16px;background:linear-gradient(135deg,' . $accent . ',#5546e0);">
        <h1 style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:22px;color:#ffffff;">' . clean($brandName) . '</h1>
        <p style="margin:8px 0 0;font-family:Arial,Helvetica,sans-serif;font-size:13px;color:#e8e4ff;">' . clean($tagline) . '</p>
      </td></tr>
      <tr><td align="center" style="padding:16px 20px 8px;font-family:Arial,Helvetica,sans-serif;font-weight:600;color:' . $brandColor . ';">' . clean($subject) . '</td></tr>
      <tr><td align="center" style="padding:0 20px 16px;font-family:Arial,Helvetica,sans-serif;font-size:12px;color:#65717b;">Received at ' . date('Y-m-d H:i:s') . ' IST</td></tr>
      ' . $mainContent . '
      <tr><td align="center" style="padding:14px 20px;background:#f3f4f6;font-family:Arial,Helvetica,sans-serif;font-size:12px;color:#65717b;">
        Sent from the <strong>' . clean($brandName) . '</strong> website to ' . clean($toEmail) . '.
      </td></tr>
    </table>
  </td></tr></table>
</body></html>';
}

$formType = v('formType');
$allowedTypes = array('contact', 'newsletter', 'quote', 'partnership');
if (!in_array($formType, $allowedTypes, true)) {
    json_exit(400, array('success' => false, 'error' => 'Invalid formType.'));
}

if ($formType === 'contact') {
    $msg = requiredFields(array('name' => 'Name', 'email' => 'Email'));
} elseif ($formType === 'newsletter') {
    $msg = requiredFields(array('email' => 'Email'));
} elseif ($formType === 'partnership') {
    $msg = requiredFields(array(
        'fullName' => 'Your name',
        'email' => 'Email',
        'companyName' => 'Company name',
        'website' => 'Website',
    ));
} else {
    $msg = requiredFields(array(
        'billing_first_name' => 'Billing First Name',
        'billing_last_name' => 'Billing Last Name',
        'billing_email' => 'Billing Email',
        'billing_phone' => 'Billing Phone',
        'billing_address' => 'Billing Address',
        'billing_town' => 'Billing Town',
        'cart_items' => 'Cart Items',
        'cart_total' => 'Cart Total',
        'order_total' => 'Order Total',
    ));
}
if ($msg) {
    json_exit(422, array('success' => false, 'error' => $msg));
}

$email = firstFilled(array('email', 'billing_email', 'shipping_email'));
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    json_exit(422, array('success' => false, 'error' => 'Invalid email.'));
}

$name = firstFilled(array('name', 'fullName', 'billing_first_name', 'firstName'));
if ($formType === 'quote') {
    $name = trim(v('billing_first_name') . ' ' . v('billing_last_name'));
}
if ($formType === 'partnership') {
    $name = v('fullName');
}

$toEmail = ne_env('MAIL_TO', ne_env('ORDER_NOTIFY_EMAIL', 'hello@aimodel.example'));

if ($formType === 'contact') {
    $subject = 'New contact inquiry — Aimodel — ' . $name;
} elseif ($formType === 'newsletter') {
    $subject = 'Newsletter signup — Aimodel — ' . $email;
} elseif ($formType === 'partnership') {
    $subject = 'Partner application — Aimodel — ' . $name;
} else {
    $subject = 'Quote request — Aimodel — ' . $name;
}

$mainContent = '';
$alt = $subject . "\n\n";

if ($formType === 'contact') {
    $fullName = v('name', trim(v('firstName') . ' ' . v('lastName')));
    $mainContent =
        '<tr><td style="padding:0 24px 24px;"><div style="padding:12px;font-family:Arial,Helvetica,sans-serif;font-size:14px;color:#111318;">'
        . kvRow('Name', $fullName)
        . kvRow('Email', v('email'))
        . kvRow('Phone', v('phone'))
        . kvRow('Subject', v('subject'))
        . kvRow('Message', v('message'), true)
        . '</div></td></tr>';
    $alt .= "Name: $fullName\nEmail: " . v('email') . "\n";
} elseif ($formType === 'newsletter') {
    $mainContent =
        '<tr><td style="padding:0 24px 24px;"><div style="padding:12px;font-family:Arial,Helvetica,sans-serif;font-size:14px;">'
        . kvRow('Email', $email)
        . '</div></td></tr>';
} elseif ($formType === 'partnership') {
    $mainContent =
        '<tr><td style="padding:0 24px 24px;"><div style="padding:12px;font-family:Arial,Helvetica,sans-serif;font-size:14px;color:#111318;">'
        . kvRow('Name', v('fullName'))
        . kvRow('Email', v('email'))
        . kvRow('Company', v('companyName'))
        . kvRow('Website', v('website'))
        . kvRow('Partnership type', v('partnershipType'))
        . kvRow('Message', v('message'), true)
        . '</div></td></tr>';
    $alt .= 'Partner: ' . v('fullName') . ' — ' . v('companyName') . "\n";
} else {
    $cartHtml = '';
    $cart = cartItems();
    if (count($cart)) {
        $cartHtml .= '<table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;margin-top:8px;">';
        foreach ($cart as $item) {
            $itemName = isset($item['name']) ? (string) $item['name'] : '';
            $itemQty = isset($item['quantity']) ? (string) $item['quantity'] : '';
            $itemPrice = isset($item['price']) ? (string) $item['price'] : '';
            $cartHtml .= '<tr><td style="padding:6px 0;">' . clean($itemName) . ' × ' . clean($itemQty) . ' — ' . clean($itemPrice) . '</td></tr>';
        }
        $cartHtml .= '</table>';
    }
    $mainContent =
        '<tr><td style="padding:0 24px 24px;"><div style="padding:12px;font-family:Arial,Helvetica,sans-serif;font-size:14px;">'
        . kvRow('Customer', v('billing_first_name') . ' ' . v('billing_last_name'))
        . kvRow('Email', v('billing_email'))
        . kvRow('Phone', v('billing_phone'))
        . $cartHtml
        . kvRow('Order total', v('order_total'))
        . '</div></td></tr>';
}

$html = ne_email_shell($subject, $mainContent, $toEmail);
$sent = ne_deliver_mail($toEmail, 'Aimodel', $subject, $html, $alt, $email, $name);

if ($sent && in_array($formType, array('contact', 'partnership'), true)) {
    $ackSubject = 'We received your message — Aimodel';
    $ackHtml = '<p style="font-family:Arial,sans-serif;font-size:14px;color:#111318;">Hi ' . clean($name) . ',</p>'
        . '<p style="font-family:Arial,sans-serif;font-size:14px;color:#111318;">Thank you for contacting <strong>Aimodel</strong>. We have received your '
        . ($formType === 'partnership' ? 'partner application' : 'message')
        . ' and will get back to you shortly.</p>'
        . '<p style="font-family:Arial,sans-serif;font-size:14px;color:#111318;">Regards,<br><strong>Aimodel Team</strong></p>';
    ne_deliver_mail($email, $name, $ackSubject, $ackHtml, strip_tags($ackHtml), '', '');
}

if (!$sent) {
    json_exit(500, array(
        'success' => false,
        'error' => 'Failed to send email.',
        'message' => function_exists('ne_mail_last_error') && ne_mail_last_error() !== ''
            ? ne_mail_last_error()
            : 'Could not send email to ' . $toEmail . '.',
    ));
}

json_exit(200, array('success' => true, 'message' => 'Message sent successfully.'));
