CREATE DATABASE museum_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE museum_db;

CREATE TABLE categories (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(150) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  category_id INT NULL,
  story TEXT,
  date_acquired DATE NULL,
  location VARCHAR(255) NULL,
  image_path VARCHAR(255) NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL
);

CREATE TABLE stories (
  id INT AUTO_INCREMENT PRIMARY KEY,
  item_id INT NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (item_id) REFERENCES items(id) ON DELETE CASCADE
);

--test kategori
INSERT INTO categories (name) VALUES ('Hadiah'), ('Nostalgia'), ('Pertama'), ('Koleksi Keluarga');
