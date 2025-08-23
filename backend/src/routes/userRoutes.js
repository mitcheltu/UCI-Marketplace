const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Route: Create a new user
router.post('/', userController.createUser);



// Route: Get all users
router.get('/', userController.fetchAllUsers);

// Route: Get a user by ID
router.get('/:id', userController.fetchUserById);



module.exports = router;