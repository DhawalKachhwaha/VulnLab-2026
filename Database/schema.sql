-- Create database
CREATE DATABASE IF NOT EXISTS vulnlab;
USE vulnlab;

-- USERS TABLE
-- Plaintext passwords
-- Integer IDs
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255),
  password VARCHAR(255),
  role VARCHAR(50),
  bio TEXT
);

-- POSTS TABLE
-- Used for blog/comments section
CREATE TABLE posts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    title VARCHAR(200),
    content TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- UPLOADS TABLE
-- No validation, just metadata
CREATE TABLE uploads (
  id INT AUTO_INCREMENT PRIMARY KEY,
  filename VARCHAR(255),
  original_name VARCHAR(255),
  uploaded_by INT
);