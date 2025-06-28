CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) NOT NULL UNIQUE,
  email VARCHAR(100) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  avatar_url VARCHAR(255),
  status ENUM('online', 'offline', 'away') DEFAULT 'offline',
  last_seen DATETIME,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);


CREATE TABLE messages (
  id INT AUTO_INCREMENT PRIMARY KEY,
  sender_id INT NOT NULL,
  receiver_id INT NOT NULL,
  content TEXT NOT NULL,
  timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (sender_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (receiver_id) REFERENCES users(id) ON DELETE CASCADE
);


INSERT INTO users (username, email, password_hash, avatar_url, status, last_seen)
VALUES
  ('Virat', 'virat@example.com', '$2b$10$hashedpassword1', NULL, 'offline', NOW()),
  ('Rohit', 'rohit@example.com', '$2b$10$hashedpassword2', NULL, 'offline', NOW()),
  ('Sachin', 'sachin@example.com', '$2b$10$hashedpassword3', NULL, 'offline', NOW()),
  ('Jaspreet', 'jaspreet@example.com', '$2b$10$hashedpassword4', NULL, 'offline', NOW());
