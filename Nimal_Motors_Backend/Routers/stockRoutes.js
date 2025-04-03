import express from "express";
import { getStockItems, addStockItem, updateStockItem, deleteStockItem } from "../Controllers/stockControllers.js";

const router = express.Router();

// Test Route
router.get("/", (req, res) => {
    console.log("Stock route working!");
    res.json({ message: "Stock API is working!" });
});

// Stock CRUD Routes


router.get("/items",getStockItems);
router.post("/add", addStockItem);
router.put("/update/:id", updateStockItem);
router.delete("/delete/:itemId", deleteStockItem);

export default router;
