<?php
require 'config.php';
$stmt = $pdo->query("SELECT id, name FROM categories ORDER BY name");
$cats = $stmt->fetchAll();
respond(['data' => $cats]);
