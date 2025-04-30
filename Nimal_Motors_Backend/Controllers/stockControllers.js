import Stock from "../Models/Stock.js"; // Import the Stock model

// Get all stock items
export const getStockItems = async (req, res) => {
    try {
        const { itemName, category } = req.query;
        let filter = {};

        if (itemName) {
            filter.itemName = { $regex: itemName, $options: "i" }; // Case-insensitive search
        }
        if (category) {
            filter.category = category;
        }

        const stockItems = await Stock.find(filter); // Fetch stock items with filtering
        res.status(200).json(stockItems);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
// Get a stock item by ID
export const getStockItemById = async (req, res) => {
    const { id } = req.params;
    try {
        const stockItem = await Stock.findById(id).populate("companyName");

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
    const { category, stockQuantity, companyName, itemId, pricePerUnit, itemName,barcode } = req.body;

    if (!category || !stockQuantity || !companyName || !itemId || !pricePerUnit || !itemName || !barcode) {
        return res.status(400).json({ message: "All fields are required." });
    }

    try {
        const newStockItem = new Stock({
            category,
            stockQuantity,
            companyName,
            itemId,
            pricePerUnit,
            itemName,
            barcode
        });

        await newStockItem.save();
        res.status(201).json({ message: "Stock item added successfully.", newStockItem });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// Update a stock item using itemId (custom identifier)
// Update a stock item by ID
export const updateStockItem = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedData = req.body;

        console.log("Updating stock ID:", id);
        console.log("New Data:", updatedData);

        // Check if the item exists
        const existingItem = await Stock.findOne({ itemId: id });
        if (!existingItem) {
            return res.status(404).json({ error: "Stock item not found" });
        }
        console.log("Existing Item Before Update:", existingItem);

        // Only update the provided fields
        Object.keys(updatedData).forEach(key => {
            if (updatedData[key] !== undefined) {
                existingItem[key] = updatedData[key];
            }
        });
        console.log("Updated Item Data:", existingItem);

        // Save the updated document
        await existingItem.save();

        res.json({ message: "Stock item updated successfully!", updatedItem: existingItem });
    } catch (error) {
        console.error("Update error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}



// Delete a stock item
export const deleteStockItem = async (req, res) => {
    const { itemId } = req.params;

    try {
        const deletedStockItem = await Stock.findOneAndDelete({ itemId });


        if (!deletedStockItem) {
            return res.status(404).json({ message: "Stock item not found." });
        }

        res.status(200).json({ message: "Stock item deleted successfully." });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
export const checkLowStock = async (req, res) => {
    try {
      const lowStockItems = await Stock.find({ stockQuantity: { $lt: '$threshold' } });
  
      if (lowStockItems.length === 0) {
        return res.status(200).json({ message: "No low stock items." });
      }
  
      res.status(200).json(lowStockItems);  // Return low stock items
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  // Controller function
  export const getStockItemByBarcode = async (req, res) => {
    try {
      const { barcodeInput } = req.params;
      const item = await Stock.findOne({ barcodeInput });
  
      if (!item) return res.status(404).json({ message: "Item not found" });
  
      res.status(200).json(item);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  
  // Add quantity to existing stock item
  export const updateStockByBarcode = async (req, res) => {
    const { barcodeInput } = req.params;
    const { quantityToAdd } = req.body;
  
    if (!quantityToAdd || quantityToAdd <= 0) {
      return res.status(400).json({ message: "Invalid quantity provided." });
    }
  
    try {
      const item = await Stock.findOne({ barcodeInput });
  
      if (!item) {
        return res.status(404).json({ message: "Item with this barcode not found." });
      }
  
      item.stockQuantity += Number(quantityToAdd);
      item.lastUpdated = new Date();
  
      const updatedItem = await item.save();
  
      res.status(200).json({
        message: "Stock successfully updated via barcode.",
        updatedItem,
      });
    } catch (err) {
      console.error("Barcode update error:", err);
      res.status(500).json({ message: "Internal server error." });
    }
  };
  
  
