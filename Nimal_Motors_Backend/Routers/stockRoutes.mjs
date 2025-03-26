// Routers/stockRoutes.mjs

import express from "express"; // Import express
import { getStockItems, addStockItem, updateStockItem, deleteStockItem } from "../Controllers/stockControllers.mjs"; // Import controller functions

const router = express.Router(); // Create a new router instance

// Define routes for stock operations

// Fetch all stock items
router.get("/", getStockItems);

// Add a new stock item
router.post("/", addStockItem);

// Update an existing stock item by ID
router.put("/:id", updateStockItem);

// Delete a stock item by ID
router.delete("/:id", deleteStockItem);

export default router; // Export the router for use in other files
