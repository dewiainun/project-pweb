<?php
require 'config.php';
$q = isset($_GET['q']) ? '%'.$_GET['q'].'%' : null;
$category_id = isset($_GET['category_id']) ? intval($_GET['category_id']) : null;

$sql = "SELECT i.*, c.name as category_name FROM items i LEFT JOIN categories c ON i.category_id = c.id";
$conds = [];
$params = [];

if ($q) {
    $conds[] = "(i.title LIKE :q OR i.story LIKE :q)";
    $params[':q'] = $q;
}
if ($category_id) {
    $conds[] = "i.category_id = :cat";
    $params[':cat'] = $category_id;
}
if ($conds) $sql .= " WHERE " . implode(' AND ', $conds);
$sql .= " ORDER BY i.created_at DESC";

$stmt = $pdo->prepare($sql);
$stmt->execute($params);
$items = $stmt->fetchAll();
respond(['data' => $items]);
