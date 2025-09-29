const upload = require("../middleware/upload.js");
const itemController = require("../controllers/itemController.js");

const express = require('express');
const router = express.Router();
const { authenticate } = require("../middleware/auth.js");


// POST /api/items - Create a new item
router.post("/", authenticate, upload.single("image"), itemController.createItem);


// GET /api/items - Fetch all items
router.get('/', authenticate, itemController.fetchAllItems);

// GET /api/items/:id - Fetch item by ID
router.get('/:id', authenticate, itemController.fetchItemById);

// GET /api/items/user/:userId - Fetch items by user ID
router.get('/user/:userId', authenticate, itemController.fetchItemsByUserId);




module.exports = router;