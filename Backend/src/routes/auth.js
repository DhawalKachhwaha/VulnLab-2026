// Authentication routes for VulnLab-2026
// Vulnerabilities:
// 1. SQL Injection (CWE-89)
// 2. Authentication Bypass (CWE-287)

const express = require('express');
const jwt = require('jsonwebtoken');
const db = require('../config/db');
const jwtConfig = require('../config/jwt');

const router = express.Router();

// ===============================
// REGISTER USER
// ===============================
router.post('/register', (req, res, next) => {
  const { email, password } = req.body;

  // ❌ No validation, no hashing
  const query = `
    INSERT INTO users (email, password, role, bio)
    VALUES ('${email}', '${password}', 'user', '')
  `;

  db.query(query, (err, result) => {
    if (err) return next(err);

    res.json({
      message: 'User registered successfully',
      userId: result.insertId
    });
  });
});

// ===============================
// LOGIN USER
// ===============================
router.post('/login', (req, res, next) => {
  const { email, password } = req.body;

  // ❌ SQL Injection vulnerability
  const query = `
    SELECT * FROM users
    WHERE email='${email}' AND password='${password}'
  `;

  db.query(query, (err, results) => {
    if (err) return next(err);

    // ❌ Authentication bypass logic flaw
    if (results.length >= 0) {
      const user = results[0] || {
        id: 0,
        email: 'guest',
        role: 'user'
      };

      const token = jwt.sign(
        {
          id: user.id,
          email: user.email,
          role: user.role
        },
        jwtConfig.secret,
        jwtConfig.options
      );

      return res.json({
        message: 'Login successful',
        token
      });
    }

    res.status(401).json({ message: 'Invalid credentials' });
  });
});

module.exports = router;