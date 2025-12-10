<?php
require 'db.php';
require 'helpers.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') respond(['error'=>'method not allowed'], 405);

$id = $_POST['id'] ?? null;
if (!$id) respond(['error'=>'id required'], 400);

$title = $_POST['title'] ?? null;
$category_id = $_POST['category_id'] ?? null;
$story = $_POST['story'] ?? null;
$date_acquired = $_POST['date_acquired'] ?? null;
$location = $_POST['location'] ?? null;

$image_path = handle_image_upload('image'); // null jika tidak upload

// build update
$fields = [];
$params = [':id'=>$id];
if ($title !== null) { $fields[] = "title = :title"; $params[':title']=$title; }
$fields[] = "category_id = :cat"; $params[':cat'] = $category_id ?: null;
$fields[] = "story = :story"; $params[':story'] = $story;
$fields[] = "date_acquired = :date_acquired"; $params[':date_acquired'] = $date_acquired ?: null;
$fields[] = "location = :location"; $params[':location'] = $location;
if ($image_path !== null) { $fields[] = "image_path = :image"; $params[':image'] = $image_path; }

$sql = "UPDATE items SET " . implode(', ', $fields) . " WHERE id = :id";
$stmt = $pdo->prepare($sql);
$stmt->execute($params);

respond(['success'=>true]);
