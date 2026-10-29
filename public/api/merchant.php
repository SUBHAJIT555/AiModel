<?php
/**
 * Public merchant details for the website, read from api/.env:
 * MERCHANT_NAME, MERCHANT_EMAIL, MERCHANT_PHONE, MERCHANT_ADDRESS,
 * CREDIT_VALIDITY_DAYS.
 * Keys and secrets are never returned.
 */
declare(strict_types=1);
ini_set('display_errors', '0');
header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');

$origin = isset($_SERVER['HTTP_ORIGIN']) ? $_SERVER['HTTP_ORIGIN'] : '';
$allowed = array(
    'http://localhost:3000',
    'http://127.0.0.1:3000',
    'https://easy-bay.com',
    'https://www.easy-bay.com',
);
if ($origin && in_array($origin, $allowed, true)) {
    header('Access-Control-Allow-Origin: ' . $origin);
    header('Vary: Origin');
}
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
if (isset($_SERVER['REQUEST_METHOD']) && $_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

$values = array();
foreach (array(__DIR__ . '/.env', dirname(__DIR__) . '/.env') as $path) {
    if (!is_file($path) || !is_readable($path)) {
        continue;
    }
    foreach ((array) file($path, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES) as $line) {
        $line = trim((string) $line);
        if ($line === '' || $line[0] === '#' || strpos($line, '=') === false) {
            continue;
        }
        list($key, $value) = explode('=', $line, 2);
        $key = trim($key);
        if (!isset($values[$key])) {
            $values[$key] = trim(trim($value), "\"'");
        }
    }
}

$get = function ($key) use ($values) {
    $v = isset($values[$key]) ? $values[$key] : (string) getenv($key);
    return substr(strip_tags($v), 0, 300);
};

$validityDays = (int) $get('CREDIT_VALIDITY_DAYS');
if ($validityDays < 1 || $validityDays > 3650) {
    $validityDays = 90;
}

echo json_encode(array(
    'name' => $get('MERCHANT_NAME') !== '' ? $get('MERCHANT_NAME') : 'TANIKSHA ENTERPRISES',
    'email' => $get('MERCHANT_EMAIL') !== '' ? $get('MERCHANT_EMAIL') : 'info@easy-bay.com',
    'phone' => $get('MERCHANT_PHONE') !== '' ? $get('MERCHANT_PHONE') : '+91 98190 17637',
    'address' => $get('MERCHANT_ADDRESS'),
    'creditValidityDays' => $validityDays,
));
