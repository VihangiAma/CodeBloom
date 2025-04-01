import { createContext, useState, useEffect } from "react";
import { getStockItems } from "../api/stockApi";

export const StockContext = createContext();

export const StockProvider = ({ children }) => {
    const [stock, setStock] = useState([]);

    useEffect(() => {
        fetchStock();
    }, []);

    const fetchStock = async () => {
        const data = await getStockItems();
        setStock(data);
    };

    return (
        <StockContext.Provider value={{ stock, setStock }}>
            {children}
        </StockContext.Provider>
    );
};
