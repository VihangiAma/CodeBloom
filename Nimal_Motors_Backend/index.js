import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./Models/db.js";
import stockRoutes from "./Routers/stockRoutes.mjs";
import middleware from "./Middleware/middleware.js";

dotenv.config();

connectDB(); // Connect to MongoDB


const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());
app.use(middleware);

app.use("/api/stock", stockRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

