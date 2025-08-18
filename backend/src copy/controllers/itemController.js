const itemService = require('../services/itemService');

// GET /api/items
exports.getAllItems = async (req, res) => {
  try {
    const items = await itemService.fetchAll();
    res.json(items);
  } catch (err) {
    console.error('Error fetching items:', err);
    res.status(500).json({ error: 'Failed to fetch items' });
  }
};

// POST /api/items
exports.createItem = async (req, res) => {
  try {
    const newItem = await itemService.create(req.body);
    res.status(201).json(newItem);
  } catch (err) {
    console.error('Error creating item:', err);
    res.status(500).json({ error: 'Failed to create item' });
  }
};