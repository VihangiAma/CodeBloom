import React, { useState, useEffect } from "react";
import axios from "axios";

const SalesReportUpdate = ({ onUpdate, initialData }) => {
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

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

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
      const response = await axios.put(
        `http://localhost:5001/api/SalesReports/${formData.itemId}`,
        formData
      );

      console.log("Update Success:", response.data);
      onUpdate(formData);
      setSuccessMessage("Sales report updated successfully!");
    } catch (error) {
      console.error("Error updating sales report:", error);
      setError("Error updating sales report. Please try again.");
    }
  };

  return (
    <div className="p-6 bg-white shadow-lg rounded-xl max-w-lg mx-auto">
      <h2 className="text-2xl font-semibold text-gray-700 mb-6 text-center">
        Update Sales Report
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
          className="border border-gray-300 p-3 rounded-lg w-full"
          disabled
        />
        <input
          type="text"
          name="itemName"
          value={formData.itemName}
          onChange={handleChange}
          placeholder="Item Name"
          className="border border-gray-300 p-3 rounded-lg w-full"
          required
        />
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          placeholder="Cost Per Item"
          className="border border-gray-300 p-3 rounded-lg w-full"
          required
        />
        <input
          type="number"
          name="net_price_for_item"
          value={formData.net_price_for_item}
          onChange={handleChange}
          placeholder="Net Price"
          className="border border-gray-300 p-3 rounded-lg w-full"
          required
        />
        <input
          type="number"
          name="Sales_Quntity"
          value={formData.Sales_Quntity}
          onChange={handleChange}
          placeholder="Sales Quantity"
          className="border border-gray-300 p-3 rounded-lg w-full"
          required
        />
        <input
          type="number"
          name="profite"
          value={formData.profite}
          onChange={handleChange}
          placeholder="Profit"
          className="border border-gray-300 p-3 rounded-lg w-full"
          required
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg w-full transition-all duration-300"
        >
          Update Sale
        </button>
      </form>
    </div>
  );
};

export default SalesReportUpdate;
