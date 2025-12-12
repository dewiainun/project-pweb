<?php
require 'db.php';
require 'helpers.php';

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    if (isset($_GET['id'])) {
        $id = intval($_GET['id']);
        $stmt = $pdo->prepare("SELECT i.*, c.name as category_name FROM items i LEFT JOIN categories c ON i.category_id=c.id WHERE i.id=:id");
        $stmt->execute([':id'=>$id]);
        $row = $stmt->fetch();
        if (!$row) respond(['error'=>'not found'], 404);
        respond(['data'=>$row]);
    } else {
        $q = isset($_GET['q']) ? '%'.$_GET['q'].'%' : null;
        $cat = isset($_GET['category_id']) ? intval($_GET['category_id']) : null;
        $sql = "SELECT i.*, c.name AS category_name FROM items i LEFT JOIN categories c ON i.category_id = c.id";
        $conds = [];
        $params = [];
        if ($q) { $conds[] = "(i.title LIKE :q OR i.story LIKE :q)"; $params[':q'] = $q; }
        if ($cat) { $conds[] = "i.category_id = :cat"; $params[':cat'] = $cat; }
        if ($conds) $sql .= " WHERE " . implode(' AND ', $conds);
        $sql .= " ORDER BY i.created_at DESC";
        $stmt = $pdo->prepare($sql);
        $stmt->execute($params);
        $rows = $stmt->fetchAll();
        respond(['data'=>$rows]);
    }
}

respond(['error'=>'method not allowed'], 405);