import bodyParser from "body-parser";
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import userRoutes from "./Routers/userRoutes.js";  // ✅ Correct import

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// CORS configuration

const corsOptions = {
  origin: 'http://localhost:5173', // 👈 Make sure this matches EXACTLY
  credentials: true,               // 👈 If you're using cookies or tokens
};

app.use(cors(corsOptions));


// Middleware
app.use(bodyParser.json());

// Database Connection
mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log("Database connected successfully"))
    .catch(err => console.error("Database connection failed:", err));

// Routes
app.use("/api/user", userRoutes);  // ✅ Fixed: use userRoutes

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: "Something went wrong!" });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
