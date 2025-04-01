import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Link } from "react-router-dom";

const SalesReport = () => {
  const [sales, setSales] = useState([
    { id: "001", name: "Product A", cost: 10, netPrice: 15, quantity: 100, profit: 500 },
    { id: "002", name: "Product B", cost: 20, netPrice: 30, quantity: 50, profit: 500 },
    { id: "003", name: "Product C", cost: 30, netPrice: 40, quantity: 80, profit: 500 }
  ]);
  const [startDate, setStartDate] = useState(new Date()); // Store start date
  const [endDate, setEndDate] = useState(new Date()); // Store end date

  const handleAdd = () => {
    const newItem = { id: "", name: "", cost: 0, netPrice: 0, quantity: 0, profit: 0 };
    setSales([...sales, newItem]);
  };

  const handleDelete = (index) => {
    setSales(sales.filter((_, i) => i !== index));
  };

  const handleUpdate = (index, field, value) => {
    const updatedSales = sales.map((sale, i) =>
      i === index ? { ...sale, [field]: value } : sale
    );
    setSales(updatedSales);
  };

  const handleView = (sale) => {
    alert(`Viewing details for ${sale.name}`);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800">Sales Report</h2>
        <div className="flex space-x-6 items-center">
          <div className="relative">
            <label className="text-sm font-semibold text-gray-600">Start Date</label>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              dateFormat="yyyy-MM-dd"
              className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-md"
            />
          </div>
          <div className="relative">
            <label className="text-sm font-semibold text-gray-600">End Date</label>
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              dateFormat="yyyy-MM-dd"
              className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-md"
              minDate={startDate} // Ensure end date is after start date
            />
          </div>
        </div>
      </div>

      <h3 className="text-lg font-semibold text-gray-700 mb-4">Sales Data for Selected Period</h3>

      <table className="w-full bg-white shadow-lg rounded-lg overflow-hidden">
        <thead className="bg-blue-600 text-white">
          <tr>
            <th className="py-3 px-6 text-left">Item ID</th>
            <th className="py-3 px-6 text-left">Item Name</th>
            <th className="py-3 px-6 text-left">Cost Per Item</th>
            <th className="py-3 px-6 text-left">Net Price</th>
            <th className="py-3 px-6 text-left">Sales Quantity</th>
            <th className="py-3 px-6 text-left">Profit</th>
          </tr>
        </thead>
        <tbody className="text-gray-800">
          {sales.map((sale, index) => (
            <tr key={index} className="border-b hover:bg-gray-50 transition-all duration-200 ease-in-out">
              <td className="py-4 px-6">
                <input
                  type="text"
                  value={sale.id}
                  onChange={(e) => handleUpdate(index, "id", e.target.value)}
                  className="border p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </td>
              <td className="py-4 px-6">
                <input
                  type="text"
                  value={sale.name}
                  onChange={(e) => handleUpdate(index, "name", e.target.value)}
                  className="border p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </td>
              <td className="py-4 px-6">
                <input
                  type="number"
                  value={sale.cost}
                  onChange={(e) => handleUpdate(index, "cost", e.target.value)}
                  className="border p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </td>
              <td className="py-4 px-6">
                <input
                  type="number"
                  value={sale.netPrice}
                  onChange={(e) => handleUpdate(index, "netPrice", e.target.value)}
                  className="border p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </td>
              <td className="py-4 px-6">
                <input
                  type="number"
                  value={sale.quantity}
                  onChange={(e) => handleUpdate(index, "quantity", e.target.value)}
                  className="border p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </td>
              <td className="py-4 px-6">Rs {sale.profit}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-6 flex space-x-4">
      <Link to="/add-sales-report">
            <button className="bg-blue-500 text-white px-5 py-2 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400">
              Add Item
            </button>
          </Link>
        <button onClick={() => handleView(sales[0])} className="bg-green-500 text-white px-5 py-2 rounded-lg shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400">
          View Item
        </button>
        <Link to="/update-sales-report">
        <button className="bg-yellow-500 text-white px-5 py-2 rounded-lg shadow-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-400">
          Update Item
        </button>
        </Link>

        <Link to ='/delete-sales-report'>
        <button  className="bg-red-500 text-white px-5 py-2 rounded-lg shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400">
          Delete Item
        </button>

        </Link>
        
        
      </div>

      <div className="mt-6 text-sm text-gray-600">
        <p>
          <span className="font-semibold">Selected Date Range:</span> {startDate.toLocaleDateString()} to {endDate.toLocaleDateString()}
        </p>
      </div>
    </div>
  );
};

export default SalesReport;
