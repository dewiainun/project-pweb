<?php
require 'db.php';
require 'helpers.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') respond(['error'=>'method not allowed'], 405);

$title = $_POST['title'] ?? null;
$category_id = $_POST['category_id'] ?? null;
$story = $_POST['story'] ?? null;
$date_acquired = $_POST['date_acquired'] ?? null;
$location = $_POST['location'] ?? null;

if (!$title) respond(['error'=>'title required'], 400);

$image_path = handle_image_upload('image'); // null jika tidak ada

$stmt = $pdo->prepare("INSERT INTO items (title, category_id, story, date_acquired, location, image_path) VALUES (:title, :cat, :story, :date_acquired, :location, :image)");
$stmt->execute([
    ':title' => $title,
    ':cat' => $category_id ?: null,
    ':story' => $story,
    ':date_acquired' => $date_acquired ?: null,
    ':location' => $location ?: null,
    ':image' => $image_path
]);

respond(['success'=>true, 'id'=>$pdo->lastInsertId()]);
