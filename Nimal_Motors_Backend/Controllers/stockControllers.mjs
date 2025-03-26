// Controllers/stockController.mjs

import Stock from "../Models/Stock.js"; // Import the Stock model

// Fetch all stock items
export const getStockItems = async (req, res) => {
    try {
        const stockItems = await Stock.find(); // Fetch all stock items from the database
        res.status(200).json(stockItems); // Return the stock items in JSON format
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Add a new stock item
export const addStockItem = async (req, res) => {
    const { partName, category, quantity, reorderLevel, supplier, price } = req.body;

    if (!partName || !category || !quantity || !reorderLevel || !supplier || !price) {
        return res.status(400).json({ message: "All fields are required." });
    }

    try {
        const newStockItem = new Stock({
            partName,
            category,
            quantity,
            reorderLevel,
            supplier,
            price,
            lastUpdated: Date.now(),
        });

        await newStockItem.save();
        res.status(201).json({ message: "Stock item added successfully.", newStockItem });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a stock item by ID
export const updateStockItem = async (req, res) => {
    const { id } = req.params;
    const { partName, category, quantity, reorderLevel, supplier, price } = req.body;

    try {
        const updatedStockItem = await Stock.findByIdAndUpdate(
            id,
            { partName, category, quantity, reorderLevel, supplier, price, lastUpdated: Date.now() },
            { new: true }
        );

        if (!updatedStockItem) {
            return res.status(404).json({ message: "Stock item not found." });
        }

        res.status(200).json({ message: "Stock item updated successfully.", updatedStockItem });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a stock item by ID
export const deleteStockItem = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedStockItem = await Stock.findByIdAndDelete(id);

        if (!deletedStockItem) {
            return res.status(404).json({ message: "Stock item not found." });
        }

        res.status(200).json({ message: "Stock item deleted successfully." });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
