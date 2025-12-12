<?php
function respond($data, $code = 200) {
    http_response_code($code);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($data);
    exit;
}

function handle_image_upload($file_field = 'image') {
    if (!isset($_FILES[$file_field]) || $_FILES[$file_field]['error'] !== UPLOAD_ERR_OK) {
        return null;
    }
    $uploadsDir = __DIR__ . '/uploads';
    if (!is_dir($uploadsDir)) mkdir($uploadsDir, 0755, true);

    $tmp = $_FILES[$file_field]['tmp_name'];
    $name = basename($_FILES[$file_field]['name']);
    $ext = pathinfo($name, PATHINFO_EXTENSION);
    $safeName = uniqid('img_') . '.' . ($ext ?: 'jpg');
    $dest = $uploadsDir . '/' . $safeName;
    if (move_uploaded_file($tmp, $dest)) {
        return 'uploads/' . $safeName;
    }
    return null;
}