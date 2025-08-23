const itemService = require('../services/itemService');

// GET /api/items
exports.fetchAllItems = async (req, res) => {
  try {
    const items = await itemService.fetchAllItems();
    res.json(items);
  } catch (err) {
    console.error('Error fetching items:', err);
    res.status(500).json({ error: 'Failed to fetch items' });
  }
};
  
// POST /api/items
exports.createItem = async (req, res) => {
  try {
    console.log("req.body:", req.body);
    console.log("req.file:", req.file);

    const item = await itemService.createItemService(req.file, req.body);
    res.status(201).json(item);
  } catch (err) {
    console.error("Error creating item:", err);
    res.status(500).json({ error: err.message || "Server error" });
  }
};

// GET /api/items/:id
exports.fetchItemById = async (req, res) => {
  const itemId = req.params.id;
  try {
    const item = await itemService.fetchItemById(itemId);
    if (!item) {
      return res.status(404).json({ error: 'Item not found' });
    }
    res.json(item);
  } catch (err) {
    console.error('Error fetching item:', err);
    res.status(500).json({ error: 'Failed to fetch item' });
  }
};

// GET /api/items/user/:userId
exports.fetchItemsByUserId = async (req, res) => {
  const userId = req.params.userId;
  try {
    const items = await itemService.fetchItemsByUserId(userId);
    res.json(items);
  } catch (err) {
    console.error('Error fetching items by user ID:', err);
    res.status(500).json({ error: 'Failed to fetch items by user ID' });
  }
}

// POST /api/items/request-trade/:id
exports.requestItemTrade = async (req, res) => {
  const requesterID = req.params.requesterID;
  const receiverID = req.params.receiverId;
  const requesterItems = req.params.requesterItems;
  const receiverItems = req.params.receiverItems;
  try {
    const tradeRequest = await itemService.requestItemTrade(requesterID, receiverID, requesterItems, receiverItems);
    res.status(200).json(tradeRequest);
  } catch (err) {
    console.error('Error requesting item trade:', err);
    res.status(500).json({ error: 'Failed to request item trade' });
  }
};