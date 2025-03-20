// backend/server.js

const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();  // To use .env variables for sensitive info

// Initialize Express app
const app = express();
const port = process.env.PORT || 5000;  // Use PORT from .env or default to 5000

// Middleware to parse JSON
app.use(express.json());

// Connect to MongoDB (db.js)
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.log('MongoDB connection error:', err));

// Basic route (You can add more routes as needed)
app.get('/', (req, res) => {
  res.send('Motor Garage Management System API is running!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
