const express = require('express');
const { 
  getCurrentUser, 
  setup2FA, 
  verify2FA, 
  disable2FA, 
  resendOTP, 
  updateProfile, 
  updatePassword,
  updatePreferences,
  deleteAccount,
  login,
  signup,
  googleLoginStart,
  googleCallback,
  forgotPassword,
  resetPassword
} = require('../controllers/authController');

const router = express.Router();

// Middleware to protect routes
const authenticateToken = require('../middleware/auth'); // We'll create this

// 1. Get current user
router.get('/me', authenticateToken, getCurrentUser);

// 2. Two-factor authentication routes
router.post('/2fa/setup', authenticateToken, setup2FA);
router.post('/2fa/verify', authenticateToken, verify2FA);
router.post('/2fa/disable', authenticateToken, disable2FA);
router.post('/2fa/resend', authenticateToken, resendOTP);

// 3. Profile routes
router.put('/profile', authenticateToken, updateProfile);

// 4. Password routes
router.put('/password', authenticateToken, updatePassword);

// 5. Preferences routes
router.put('/preferences', authenticateToken, updatePreferences);

// 6. Account routes
router.delete('/account', authenticateToken, deleteAccount);

// 7. Authentication routes (no token required)
router.post('/login', login);
router.post('/signup', signup);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);
router.get('/google', googleLoginStart);
router.get('/google/callback', googleCallback);

module.exports = router;