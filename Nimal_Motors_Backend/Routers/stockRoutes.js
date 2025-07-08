import express from "express";
import { getStockItems, addNewStockItem, updateStockItem, deleteStockItem,checkLowStock,getItemsBySupplier } from "../Controllers/stockControllers.js";

const router = express.Router();

// Test Route
router.get("/", (req, res) => {
    console.log("Stock route working!");
    res.json({ message: "Stock API is working!" });
});

// Stock CRUD Routes


router.get("/items",getStockItems);
router.post("/add", addNewStockItem);
router.put("/update/:id", updateStockItem);
router.delete("/delete/:itemId", deleteStockItem);
router.get("/low-stock", checkLowStock);
// router.get("/barcode/:barcode", getStockItemByBarcode);
// router.put("/barcode/:barcode/add-stock", updateStockByBarcode);
router.get("/by-supplier/:companyName", getItemsBySupplier);

export default router;
