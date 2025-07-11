import express from "express";
import { getStockItems, addNewStockItem, updateStockItem, deleteStockItem,checkLowStock,getItemsBySupplier,getNextItemId,getItemByBarcode,addStockByBarcode } from "../Controllers/stockControllers.js";

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
router.get("/by-supplier/:companyName", getItemsBySupplier);
router.get('/next-id', getNextItemId);
router.get("/barcode/:barcode", getItemByBarcode);
router.put("/barcode/:barcode/add-stock", addStockByBarcode);


export default router;
