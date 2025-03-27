import express from "express";
import { getSuppliers, addSupplier, updateSupplier, deleteSupplier } from "../Controllers/supplierControllers.js";

const router = express.Router();

// ✅ Test Route
router.get("/", (req, res) => {
    console.log("Supplier route working!");
    res.json({ message: "Supplier API is working!" });
});

// ✅ Supplier CRUD Routes
router.get("/list", getSuppliers);  // Get all suppliers
router.post("/add", addSupplier);    // Add a new supplier
router.put("/update/:id", updateSupplier);  // Update supplier by ID
router.delete("/delete/:id", deleteSupplier);  // Delete supplier by ID

export default router;
