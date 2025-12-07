<?php
// test-post.php
error_reporting(E_ALL);
ini_set('display_errors', 1);

header('Content-Type: application/json');

$input = file_get_contents("php://input");
echo json_encode([
    'received' => $input,
    'decoded' => json_decode($input),
    'json_error' => json_last_error_msg(),
    'server' => $_SERVER['REQUEST_METHOD']
]);
?>