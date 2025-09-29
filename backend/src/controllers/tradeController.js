const tradeService = require('../services/tradeService.js');



// POST /api/items/request-trade/:id
exports.requestItemTrade = async (req, res) => {
  console.log("req.params:", req.params);
  console.log("req.body:", req.body);
  console.log("req.user:", req.user);

  const requesterID = req.params.id;
  const receiverID = req.body.receiverID;
  const requesterItemsIds = req.body.requesterItemsIds;
  const receiverItemsIds = req.body.receiverItemsIds;
  if (requesterID == receiverID) {
    console.log("Error: cannot trade to oneself");
    res.status(500).json({ error: 'Failed to request item trade, cannot trade to oneself' });
    }
  else {
    try {
        console.log("In tradeController with:", requesterID, receiverID, requesterItemsIds, receiverItemsIds);
        const tradeRequest = await tradeService.requestItemTrade(requesterID, receiverID, requesterItemsIds, receiverItemsIds);
        res.status(200).json(tradeRequest);
    } catch (err) {
        console.error('Error requesting item trade:', err);
        res.status(500).json({ error: 'Failed to request item trade' });
    }
  }
};

// GET /api/trades/user/:userId
exports.fetchTradesByUserId = async (req, res) => {
    const userId = req.params.userId;
    try {
        const trades = await tradeService.fetchTradesByUserId(userId);
        res.status(200).json(trades);
    } catch (err) {
        console.error('Error fetching trades by user ID:', err);
        res.status(500).json({ error: 'Failed to fetch trades' });
    }
};