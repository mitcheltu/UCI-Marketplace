const tradeController = require("../controllers/tradeController.js");
const authenticate = require("../middleware/auth.js").authenticate;

const express = require('express');
const router = express.Router();

// POST /api/items/request-trade/:id - Request item trade
router.post('/request-trade/:id', authenticate, tradeController.requestItemTrade);

// GET trades by requester id (for each trade - recieverId, requesterTradeItems, reciveiverTradeItems)
router.post('/fetch-trades/:id', authenticate, tradeController.fetchTradesByUserId);

module.exports = router;