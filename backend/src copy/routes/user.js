const express = require('express');
const router = express.Router();
const userService = require('../services/userService');

// Route: Create a new user
router.post('/', async (req, res) => {
  try {
    const newUser = await userService.createUser(req.body);
    res.status(201).json(newUser);
  } catch (err) {
    console.error('Error creating user:', err);
    res.status(500).json({ error: 'Failed to create user' });
  }
});

// Route: Get all users
router.get('/', async (req, res) => {
  try {
    const users = await userService.fetchAllUsers();
    res.status(200).json(users);
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

module.exports = router;