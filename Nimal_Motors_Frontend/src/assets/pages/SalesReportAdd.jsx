import React, { useState } from "react";
import axios from "axios";

const SalesReportAdd = ({ onAdd }) => {
  const [formData, setFormData] = useState({
    itemId: "",
    itemName: "",
    price: "",
    net_price_for_item: "",
    Sales_Quntity: "",
    profite: "",
  });
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.itemId ||
      !formData.itemName ||
      !formData.price ||
      !formData.net_price_for_item ||
      !formData.Sales_Quntity ||
      !formData.profite
    ) {
      setError("Please fill in all fields.");
      return;
    }

    if (
      isNaN(formData.price) ||
      isNaN(formData.net_price_for_item) ||
      isNaN(formData.Sales_Quntity) ||
      isNaN(formData.profite)
    ) {
      setError("Price, Net Price, Sales Quantity, and Profit must be numbers.");
      return;
    }

    setError("");
    setSuccessMessage("");

    try {
      const response = await axios.post(
        "http://localhost:5000/api/SalesReports",
        formData
      );

      console.log("Success:", response.data);
      onAdd(formData);
      setSuccessMessage("Sales report added successfully!");
      setFormData({
        itemId: "",
        itemName: "",
        price: "",
        net_price_for_item: "",
        Sales_Quntity: "",
        profite: "",
      });
    } catch (error) {
      console.error("Error adding sales report:", error);
      setError("Error adding sales report. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 bg-white shadow-lg rounded-xl w-full max-w-md">
        <h2 className="text-3xl font-semibold text-gray-700 mb-6 text-center">
          Add Sales Report
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && <p className="text-red-500 text-center">{error}</p>}
          {successMessage && (
            <p className="text-green-500 text-center">{successMessage}</p>
          )}
          <input
            type="text"
            name="itemId"
            value={formData.itemId}
            onChange={handleChange}
            placeholder="Item ID"
            className="border border-gray-300 p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-400"
            required
          />
          <input
            type="text"
            name="itemName"
            value={formData.itemName}
            onChange={handleChange}
            placeholder="Item Name"
            className="border border-gray-300 p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-400"
            required
          />
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="Cost Per Item"
            className="border border-gray-300 p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-400"
            required
          />
          <input
            type="number"
            name="net_price_for_item"
            value={formData.net_price_for_item}
            onChange={handleChange}
            placeholder="Net Price"
            className="border border-gray-300 p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-400"
            required
          />
          <input
            type="number"
            name="Sales_Quntity"
            value={formData.Sales_Quntity}
            onChange={handleChange}
            placeholder="Sales Quantity"
            className="border border-gray-300 p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-400"
            required
          />
          <input
            type="number"
            name="profite"
            value={formData.profite}
            onChange={handleChange}
            placeholder="Profit"
            className="border border-gray-300 p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-400"
            required
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg w-full transition-all duration-300"
          >
            Add Sales
          </button>
        </form>
      </div>
    </div>
  );
};

export default SalesReportAdd;
