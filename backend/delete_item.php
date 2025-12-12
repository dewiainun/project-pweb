<?php
require 'db.php';
require 'helpers.php';

if ($_SERVER['REQUEST_METHOD'] !== 'DELETE' && $_SERVER['REQUEST_METHOD'] !== 'POST') {
    respond(['error'=>'method not allowed'], 405);
}

$input = json_decode(file_get_contents('php://input'), true);
$id = $input['id'] ?? ($_GET['id'] ?? ($_POST['id'] ?? null));
if (!$id) respond(['error'=>'id required'], 400);

$stmt = $pdo->prepare("SELECT image_path FROM items WHERE id = :id");
$stmt->execute([':id'=>$id]);
$r = $stmt->fetch();
if ($r && $r['image_path']) {
    $fp = __DIR__ . '/' . $r['image_path'];
    if (file_exists($fp)) @unlink($fp);
}

$stmt = $pdo->prepare("DELETE FROM items WHERE id = :id");
$stmt->execute([':id'=>$id]);

respond(['success'=>true]);