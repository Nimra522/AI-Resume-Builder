const express = require('express');
const router = express.Router();

// Import user-related controllers
const { updatePreferences } = require('../controllers/authController');

// Middleware to protect routes
const authenticateToken = require('../middleware/auth');

// Update user preferences
router.put('/preferences', authenticateToken, updatePreferences);

module.exports = router;