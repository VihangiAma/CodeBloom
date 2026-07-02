import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
  const mongoUrl = process.env.MONGO_URL || process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/nimal-motors';

  try {
    await mongoose.connect(mongoUrl, {
      serverSelectionTimeoutMS: 5000,
      family: 4,
    });
    console.log('MongoDB connected');
    return true;
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    console.warn('Continuing without database connection. The API will start, but DB-backed routes may fail until MongoDB is available.');
    return false;
  }
};

export default connectDB;
