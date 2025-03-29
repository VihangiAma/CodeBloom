import React, { useState, useEffect } from "react";
import StockList from "./stockList";
import SearchBar from "./searchBar";
import AddStockItem from "./addStockItem";
import { getStockItems } from "../Services/stockService";

function InventoryDashboard() {
  const [stock, setStock] = useState([]);
  const [filteredStock, setFilteredStock] = useState([]);

  useEffect(() => {
    async function fetchStock() {
      const data = await getStockItems();
      setStock(data);
      setFilteredStock(data);
    }
    fetchStock();
  }, []);

  return (
    <div>
      <SearchBar stock={stock} setFilteredStock={setFilteredStock} />
      <AddStockItem setStock={setStock} />
      <StockList stock={filteredStock} setStock={setStock} />
    </div>
  );
}