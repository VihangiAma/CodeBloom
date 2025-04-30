// Models/db.js

import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("✅ MongoDB connected successfully...");
  } catch (err) {
    console.error("❌ Error connecting to MongoDB:", err.message);
    process.exit(1); // Exit the app if DB connection fails
  }
};

export default connectDB;
