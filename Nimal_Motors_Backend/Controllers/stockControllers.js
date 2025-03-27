import Stock from "../Models/Stock.js"; // Import the Stock model

// Get all stock items
export const getStockItems = async (req, res) => {
    try {
        const stockItems = await Stock.find().populate("supplierId"); // Populate supplier details
        res.status(200).json(stockItems);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a stock item by ID
export const getStockItemById = async (req, res) => {
    const { id } = req.params;
    try {
        const stockItem = await Stock.findById(id).populate("supplierId");

        if (!stockItem) {
            return res.status(404).json({ message: "Stock item not found." });
        }

        res.status(200).json(stockItem);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Add a new stock item
export const addStockItem = async (req, res) => {
    const { category, stockQuantity, supplierId, itemId, pricePerUnit, itemName } = req.body;

    if (!category || !stockQuantity || !supplierId || !itemId || !pricePerUnit || !itemName) {
        return res.status(400).json({ message: "All fields are required." });
    }

    try {
        const newStockItem = new Stock({
            category,
            stockQuantity,
            supplierId,
            itemId,
            pricePerUnit,
            itemName
        });

        await newStockItem.save();
        res.status(201).json({ message: "Stock item added successfully.", newStockItem });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a stock item
export const updateStockItem = async (req, res) => {
    const { id } = req.params;
    const { category, stockQuantity, supplierId, itemId, pricePerUnit, itemName } = req.body;

    try {
        const updatedStockItem = await Stock.findByIdAndUpdate(
            id,
            { category, stockQuantity, supplierId, itemId, pricePerUnit, itemName },
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

// Delete a stock item
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
