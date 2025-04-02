import React, { useState, useEffect } from "react";
import { FaBoxes, FaChartPie, FaCog, FaUser } from "react-icons/fa";
import axios from "axios";

const InventoryDashboard = () => {
  const [inventory, setInventory] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/stock")
      .then((response) => setInventory(response.data))
      .catch((error) => console.error("Error fetching inventory:", error));
  }, []);

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-blue-700 text-white p-5 space-y-4">
        <h2 className="text-2xl font-bold">Nimal Motors</h2>
        <nav>
          <ul className="space-y-2">
            <li className="flex items-center gap-3 p-2 hover:bg-blue-600 rounded">
              <FaChartPie /> Dashboard
            </li>
            <li className="flex items-center gap-3 p-2 bg-white text-blue-700 rounded">
              <FaBoxes /> Inventory
            </li>
            <li className="flex items-center gap-3 p-2 hover:bg-blue-600 rounded">
              <FaCog /> Settings
            </li>
          </ul>
        </nav>
      </aside>
      
      {/* Main Content */}
      <main className="flex-1 bg-gray-100 p-6">
        <header className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-semibold">Inventory Management</h1>
          <div className="flex items-center gap-4">
            <input type="text" placeholder="Search..." className="p-2 border rounded" />
            <FaUser className="text-2xl" />
          </div>
        </header>
        
        {/* Inventory Table */}
        <div className="bg-white p-4 rounded shadow-md">
          <table className="w-full border-collapse border">
            <thead>
              <tr className="bg-blue-600 text-white">
                <th className="p-3">ID</th>
                <th className="p-3">Part Name</th>
                <th className="p-3">Category</th>
                <th className="p-3">Stock</th>
                <th className="p-3">Price</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {inventory.map((item, index) => (
                <tr key={index} className="text-center border-t">
                  <td className="p-3">{item.id}</td>
                  <td className="p-3">{item.name}</td>
                  <td className="p-3">{item.category}</td>
                  <td className="p-3">{item.stock}</td>
                  <td className="p-3">${item.price}</td>
                  <td className={`p-3 font-bold ${item.stock < 5 ? "text-red-600" : "text-green-600"}`}>
                    {item.stock < 5 ? "Low Stock" : "In Stock"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default InventoryDashboard;
