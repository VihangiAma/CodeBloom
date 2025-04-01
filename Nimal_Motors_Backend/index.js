import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./Models/db.js";
import stockRoutes from "./Routers/stockRoutes.js";
import supplierRoutes from "./Routers/supplierRoutes.js";

dotenv.config();
connectDB(); // Connect to MongoDB

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json()); // Middleware to parse JSON body
app.use(cors()); // Enable CORS

// Test API Route
/*app.get("/", (req, res) => {
    console.log("Hello world");
    res.json({ message: "hi" });
});*/

// Stock Routes
app.use("/api/stock", stockRoutes);
//supplier routes
app.use("/api/supplier",supplierRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
