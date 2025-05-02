import React, { useState, useEffect } from "react";
import axios from "axios";

const InventoryReport = () => {
  const [stocks, setStocks] = useState([]);

  useEffect(() => {
    fetchStocks();
  }, []);

  const fetchStocks = async () => {
    try {
      const response = await axios.get("/api/stock");
      setStocks(response.data);
    } catch (err) {
      console.error("Error fetching stocks:", err);
    }
  };

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Inventory Report</h2>

      <div className="overflow-x-auto shadow-md rounded-lg">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-200 text-gray-700 uppercase text-sm leading-normal">
            <tr>
              <th className="py-3 px-6 text-left">Item ID</th>
              <th className="py-3 px-6 text-left">Item Name</th>
              <th className="py-3 px-6 text-left">Company Name</th>
              <th className="py-3 px-6 text-left">Stock Quantity</th>
              <th className="py-3 px-6 text-left">Price Per Unit</th>
              <th className="py-3 px-6 text-left">Last Updated</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {stocks.map((stock) => (
              <tr
                key={stock.itemId}
                className="border-b border-gray-200 hover:bg-gray-100"
              >
                <td className="py-3 px-6">{stock.itemId}</td>
                <td className="py-3 px-6">{stock.itemName}</td>
                <td className="py-3 px-6">{stock.companyName}</td>
                <td className="py-3 px-6">{stock.stockQuantity}</td>
                <td className="py-3 px-6">{stock.pricePerUnit}</td>
                <td className="py-3 px-6">
                  {new Date(stock.lastUpdated).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InventoryReport;
