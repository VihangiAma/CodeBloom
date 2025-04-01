import express from "express";
import { getStockItems, addStockItem, updateStockItem, deleteStockItem } from "../Controllers/stockControllers.js";

const router = express.Router();

// Test Route
router.get("/", (req, res) => {
    console.log("Stock route working!");
    res.json({ message: "Stock API is working!" });
});

// Stock CRUD Routes
router.get("/items", async (req, res) => {
    try {
        const { itemName } = req.query;

        if (!itemName) {
            return res.status(400).json({ error: "Item name is required" });
        }

        const results = await Stock.find({ itemName: { $regex: itemName, $options: "i" } });

        res.json(results);
    } catch (error) {
        console.error("Search Error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

router.post("/add", addStockItem);
router.put("/update/:id", updateStockItem);
router.delete("/delete/:id", deleteStockItem);

export default router;
