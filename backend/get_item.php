<?php
require 'config.php';
$id = isset($_GET['id']) ? intval($_GET['id']) : 0;
if (!$id) { http_response_code(400); respond(['error' => 'id diperlukan']); }
$stmt = $pdo->prepare("SELECT i.*, c.name as category_name FROM items i LEFT JOIN categories c ON i.category_id = c.id WHERE i.id = :id");
$stmt->execute([':id' => $id]);
$item = $stmt->fetch();
if (!$item) { http_response_code(404); respond(['error' => 'Item tidak ditemukan']); }
respond(['data' => $item]);
