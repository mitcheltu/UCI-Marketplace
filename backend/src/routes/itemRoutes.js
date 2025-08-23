const upload = require("../middleware/upload.js");
const itemController = require("../controllers/itemController.js");

const express = require('express');
const router = express.Router();


// POST /api/items - Create a new item
router.post("/", upload.single("image"), itemController.createItem);


// GET /api/items - Fetch all items
router.get('/', itemController.fetchAllItems);

// GET /api/items/:id - Fetch item by ID
router.get('/:id', itemController.fetchItemById);

// GET /api/items/user/:userId - Fetch items by user ID
router.get('/user/:userId', itemController.fetchItemsByUserId);


// POST /api/items/request-trade/:id - Request item trade
router.post('/request-trade/:id', itemController.requestItemTrade);

module.exports = router;