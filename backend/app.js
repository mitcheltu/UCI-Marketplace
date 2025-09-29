const express = require('express');
const cors = require('cors');
const app = express();

// Import route modules
const userRoutes = require('./src/routes/userRoutes.js');
const itemRoutes = require('./src/routes/itemRoutes.js');
const tradeRoutes = require('./src/routes/tradeRoutes.js');

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/items', itemRoutes);
app.use('/api/trades', tradeRoutes);

// Health check or root route
app.get('/', (req, res) => {
  res.send('API is running');
});

module.exports = app;