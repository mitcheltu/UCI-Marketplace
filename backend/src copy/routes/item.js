const express = require('express');
const router = express.Router();
const itemService = require('../services/itemService');

// POST /api/items - Create a new item
router.post('/', async (req, res) => {
  try {
    const newItem = await itemService.createItem(req.body);
    res.status(201).json(newItem);
  } catch (err) {
    console.error('Error creating item:', err);
    res.status(500).json({ error: 'Failed to create item' });
  }
});

// GET /api/items - Fetch all items
router.get('/', async (req, res) => {
  try {
    const items = await itemService.fetchAllItems();
    res.status(200).json(items);
  } catch (err) {
    console.error('Error fetching items:', err);
    res.status(500).json({ error: 'Failed to fetch items' });
  }
});

module.exports = router;