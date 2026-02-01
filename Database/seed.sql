-- Seed data for insecure_app

USE insecure_app;

-- USERS
INSERT INTO users (id, username, email, password, bio) VALUES
(1, 'admin', 'admin@insecure.local', 'admin123', 'System administrator'),
(2, 'jason', 'jason@example.com', 'jason123', 'Hi, I am jason'),
(3, 'rahul', 'rahul@example.com', 'rahul123', 'rahul here'),
(4, 'charlie', 'charlie@example.com', 'charlie123', 'Cybersecurity student'),
(5, 'david', 'david@example.com', 'david123', 'Backend developer'),
(6, 'emma', 'emma@example.com', 'emma123', 'Frontend enthusiast'),
(7, 'frank', 'frank@example.com', 'frank123', 'DevOps learner'),
(8, 'grace', 'grace@example.com', 'grace123', 'Bug bounty beginner'),
(9, 'harry', 'harry@example.com', 'harry123', 'Tech blogger'),
(10, 'livy', 'livy@example.com', 'livy123', 'Computer science student');

-- POSTS
INSERT INTO posts (id, user_id, title, content) VALUES
(1, 2, 'Hello World', 'This is jason first post'),
(2, 3, 'My First Blog', 'Rahul writes his first blog post'),
(3, 2, 'Second Post', 'Another update from jason'),
(4, 4, 'Security Thoughts', 'Never store plaintext passwords in production'),
(5, 5, 'Backend Life', 'Working with APIs and databases every day'),
(6, 6, 'Frontend Tips', 'CSS grids and flexbox make layouts easier'),
(7, 7, 'DevOps Notes', 'Containers simplify deployments'),
(8, 8, 'Bug Hunting', 'Always test input validation'),
(9, 9, 'Tech Writing', 'Consistency matters more than perfection'),
(10, 10, 'Student Journey', 'Learning full stack development'),
(11, 3, 'Another Blog', 'rahul shares more development thoughts'),
(12, 5, 'Database Basics', 'Understanding schema design is important');

-- UPLOADS
INSERT INTO uploads (id, user_id, filename, filepath) VALUES
(1, 2, 'profile.png', 'uploads/profile_2.png'),
(2, 3, 'resume.pdf', 'uploads/resume_rahul.pdf'),
(3, 4, 'notes.txt', 'uploads/security_notes.txt'),
(4, 5, 'api_docs.pdf', 'uploads/api_docs.pdf'),
(5, 6, 'ui_mockup.png', 'uploads/ui_mockup.png'),
(6, 7, 'docker-compose.yml', 'uploads/docker-compose.yml'),
(7, 8, 'report.docx', 'uploads/bug_report.docx'),
(8, 9, 'article_draft.txt', 'uploads/article_draft.txt'),
(9, 10, 'assignment.zip', 'uploads/assignment.zip'),
(10, 1, 'admin_backup.sql', 'uploads/admin_backup.sql');
