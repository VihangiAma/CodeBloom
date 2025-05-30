import express from "express";
import { getStockItems, addStockItem, updateStockItem, deleteStockItem,checkLowStock,getStockItemByBarcode,updateStockByBarcode,getItemsBySupplier } from "../Controllers/stockControllers.js";

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
router.get("/low-stock", checkLowStock);
router.get("/barcode/:barcode", getStockItemByBarcode);
router.put("/barcode/:barcode/add-stock", updateStockByBarcode);
router.get("/by-supplier/:companyName", getItemsBySupplier);

export default router;
