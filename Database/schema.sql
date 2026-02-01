-- Create database
CREATE DATABASE IF NOT EXISTS insecure_app;
USE insecure_app;

-- USERS TABLE
-- Plaintext passwords
-- Integer IDs
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100),
    email VARCHAR(150),
    password VARCHAR(255),
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
    user_id INT,
    filename VARCHAR(255),
    filepath VARCHAR(500),
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
