import axios from "axios";

const API_URL = "http://localhost:5000/api/stock"; // Adjust if needed

export const getStockItems = async () => {
    try {
        const response = await axios.get(`${API_URL}/items`);
        return response.data;
    } catch (error) {
        console.error("Error fetching stock items:", error);
        return [];
    }
};

export const addStockItem = async (itemData) => {
    try {
        const response = await axios.post(`${API_URL}/add`, itemData);
        return response.data;
    } catch (error) {
        console.error("Error adding stock item:", error);
    }
};
