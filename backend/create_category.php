<?php
require 'config.php';
$data = json_decode(file_get_contents('php://input'), true);
if (empty($data['name'])) {
    http_response_code(400);
    respond(['error' => 'Nama kategori diperlukan']);
}
$stmt = $pdo->prepare("INSERT INTO categories (name) VALUES (:name)");
$stmt->execute(['name' => $data['name']]);
respond(['success' => true, 'id' => $pdo->lastInsertId()]);
