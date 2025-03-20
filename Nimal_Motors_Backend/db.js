// backend/db.js

const mongoose = require('mongoose');
require('dotenv').config();  // To load environment variables from .env

// MongoDB connection URI (stored in .env)
const mongoURI = process.env.MONGO_URI;

const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('MongoDB connected...');
  } catch (error) {
    console.error('Database connection error:', error);
    process.exit(1);  // Exit process with failure
  }
};

module.exports = connectDB;
