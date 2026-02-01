// Post & comment routes for VulnLab-2026
// Vulnerability: Stored XSS (CWE-79)

const express = require('express');
const db = require('../config/db');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// ===============================
// GET ALL POSTS
// ===============================
router.get('/posts', authMiddleware, (req, res, next) => {
  const query = `SELECT * FROM posts`;

  db.query(query, (err, results) => {
    if (err) return next(err);

    // ❌ Returning raw content (XSS)
    res.json(results);
  });
});

// ===============================
// CREATE A POST
// ===============================
router.post('/posts', authMiddleware, (req, res, next) => {
  const { content } = req.body;
  const userId = req.user.id;

  // ❌ No sanitization
  const query = `
    INSERT INTO posts (user_id, title, content)
    VALUES ('${userId}', '${title}', '${content}')
  `;

  db.query(query, (err, result) => {
    if (err) return next(err);

    res.json({
      message: 'Post created successfully',
      postId: result.insertId
    });
  });
});

module.exports = router;