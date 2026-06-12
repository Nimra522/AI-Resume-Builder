const express = require('express');
const { stripeWebhook } = require('../controllers/webhookController');

const router = express.Router();

// Use express.raw middleware for webhook requests to handle raw JSON payload
router.post('/', express.raw({ type: 'application/json' }), stripeWebhook);

module.exports = router;