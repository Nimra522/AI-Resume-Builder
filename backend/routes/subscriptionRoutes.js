const express = require('express');
const { 
  createCheckoutSession,
  getSubscriptionStatus,
  cancelSubscription,
  reactivateSubscription
} = require('../controllers/subscriptionController');
const authenticateToken = require('../middleware/auth');

const router = express.Router();

// All routes require authentication
router.use(authenticateToken);

// Create checkout session for subscription
router.post('/checkout', createCheckoutSession);

// Get user's subscription status
router.get('/status', getSubscriptionStatus);

// Cancel subscription
router.post('/cancel', cancelSubscription);

// Reactivate subscription
router.post('/reactivate', reactivateSubscription);

module.exports = router;