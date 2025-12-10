<?php
require 'db.php';
require 'helpers.php';

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    $stmt = $pdo->query("SELECT * FROM categories ORDER BY name");
    $rows = $stmt->fetchAll();
    respond(['data' => $rows]);
}

if ($method === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    if (empty($data['name'])) respond(['error'=>'name required'], 400);
    $stmt = $pdo->prepare("INSERT INTO categories (name) VALUES (:name)");
    $stmt->execute([':name'=>$data['name']]);
    respond(['success'=>true, 'id'=>$pdo->lastInsertId()]);
}

respond(['error'=>'method not allowed'], 405);

