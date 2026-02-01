USE vulnlab;

-- ===============================
-- CLEAN EXISTING DATA
-- ===============================
DELETE FROM uploads;
DELETE FROM posts;
DELETE FROM users;

-- ===============================
-- USERS TABLE
-- Plaintext passwords
-- Roles included
-- Normal bios (no XSS pre-seeded)
-- ===============================
INSERT INTO users (email, password, role, bio) VALUES
(
  'admin@vulnlab.com',
  'admin123',
  'admin',
  'Administrator account'
),
(
  'user1@vulnlab.com',
  'user123',
  'user',
  'Normal user bio'
),
(
  'user2@vulnlab.com',
  'user123',
  'user',
  'Another normal user bio'
);

-- ===============================
-- POSTS TABLE
-- title + content only
-- created_at handled automatically
-- ===============================
INSERT INTO posts (user_id, title, content) VALUES
(
  1,
  'Welcome to VulnLab',
  'This is the first post on the platform'
),
(
  2,
  'Hello World',
  'This is a post by user1'
),
(
  3,
  'Testing',
  'This is a post by user2'
);

-- ===============================
-- UPLOADS TABLE
-- Optional seed (can be empty too)
-- ===============================
INSERT INTO uploads (filename, original_name, uploaded_by) VALUES
(
  'sample.txt',
  'sample.txt',
  1
);
