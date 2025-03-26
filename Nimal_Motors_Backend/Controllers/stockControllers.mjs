export const getStockItems = async (req, res) => {
    try {
        res.status(200).json({ message: "Fetching stock items..." });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const addStockItem = async (req, res) => {
    try {
        res.status(201).json({ message: "Stock item added." });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const updateStockItem = async (req, res) => {
    try {
        res.status(200).json({ message: "Stock item updated." });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteStockItem = async (req, res) => {
    try {
        res.status(200).json({ message: "Stock item deleted." });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
