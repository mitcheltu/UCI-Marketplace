const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authenticate = require("../middleware/auth.js").authenticate;

// Route: Create a new user
router.post('/', userController.createUser);



// Route: Get all users
router.get('/', authenticate, userController.fetchAllUsers);

// Route: Get a user by ID
router.get('/:id', authenticate, userController.fetchUserById);



module.exports = router;