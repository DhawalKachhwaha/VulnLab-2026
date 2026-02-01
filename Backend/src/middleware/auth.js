// Authentication middleware for VulnLab-2026
// Intentional vulnerability: Improper JWT verification (CWE-347)

const jwt = require('jsonwebtoken');
const jwtConfig = require('../config/jwt');

module.exports = (req, res, next) => {
  const authHeader = req.headers['authorization'];

  if (!authHeader) {
    return res.status(401).json({ message: 'No token provided' });
  }

  // Expecting: Authorization: Bearer <token>
  const parts = authHeader.split(' ');
  const token = parts.length === 2 ? parts[1] : null;

  if (!token) {
    return res.status(401).json({ message: 'Malformed token' });
  }

  try {
    // ❌ Weak verification (no algorithm enforcement)
    const decoded = jwt.verify(token, jwtConfig.secret);

    // ❌ Blindly trust token payload
    req.user = decoded;

    next();
  } catch (err) {
    // ❌ Leak error details
    return res.status(401).json({
      message: 'Invalid token',
      error: err.message
    });
  }
};