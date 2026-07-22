const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth.middleware');
const { createLinkToken, exchangeToken, getRecurringSubscriptions } = require('../controllers/plaid.controller');

router.post('/create-link-token', authMiddleware, createLinkToken);
router.post('/exchange-token', authMiddleware, exchangeToken);
router.get('/recurring-subscriptions', authMiddleware, getRecurringSubscriptions);

module.exports = router;
