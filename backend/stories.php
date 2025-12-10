<?php
require 'db.php';
require 'helpers.php';

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    // ?item_id=...
    $item_id = $_GET['item_id'] ?? null;
    if ($item_id) {
        $stmt = $pdo->prepare("SELECT * FROM stories WHERE item_id = :id ORDER BY created_at DESC");
        $stmt->execute([':id'=>$item_id]);
    } else {
        $stmt = $pdo->query("SELECT * FROM stories ORDER BY created_at DESC");
    }
    respond(['data'=>$stmt->fetchAll()]);
}

if ($method === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    if (empty($data['item_id']) || empty($data['content'])) respond(['error'=>'item_id & content required'], 400);
    $stmt = $pdo->prepare("INSERT INTO stories (item_id, content) VALUES (:item_id, :content)");
    $stmt->execute([':item_id'=>$data['item_id'], ':content'=>$data['content']]);
    respond(['success'=>true, 'id'=>$pdo->lastInsertId()]);
}

if ($method === 'DELETE') {
    $input = json_decode(file_get_contents('php://input'), true);
    $id = $input['id'] ?? null;
    if (!$id) respond(['error'=>'id required'], 400);
    $stmt = $pdo->prepare("DELETE FROM stories WHERE id = :id");
    $stmt->execute([':id'=>$id]);
    respond(['success'=>true]);
}

respond(['error'=>'method not allowed'], 405);
