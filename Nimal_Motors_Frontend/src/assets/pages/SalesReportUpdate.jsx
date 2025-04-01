import React, { useState, useEffect } from "react";

const SalesReportUpdate = ({ onUpdate, initialData }) => {
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    cost: "",
    netPrice: "",
    quantity: "",
    profit: "",
  });

  const [error, setError] = useState("");

  // Prepopulate the form with the initial data
  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation: Check if all fields are filled out
    if (
      !formData.id ||
      !formData.name ||
      !formData.cost ||
      !formData.netPrice ||
      !formData.quantity ||
      !formData.profit
    ) {
      setError("Please fill in all fields.");
      return; // Stop the form submission if validation fails
    }

    // Clear error if validation passes
    setError("");

    // Pass the updated form data to the parent component
    onUpdate(formData);

    // Reset form
    setFormData({
      id: "",
      name: "",
      cost: "",
      netPrice: "",
      quantity: "",
      profit: "",
    });
  };

  return (
    <div className="p-6 bg-white shadow-lg rounded-xl max-w-lg mx-auto">
      <h2 className="text-2xl font-semibold text-gray-700 mb-6 text-center">Update Sales Report</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && <p className="text-red-500 text-center">{error}</p>} {/* Display error message */}

        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            name="id"
            value={formData.id}
            onChange={handleChange}
            placeholder="Item ID"
            className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-400 w-full"
            required
          />
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Item Name"
            className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-400 w-full"
            required
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <input
            type="number"
            name="cost"
            value={formData.cost}
            onChange={handleChange}
            placeholder="Cost Per Item"
            className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-400 w-full"
            required
          />
          <input
            type="number"
            name="netPrice"
            value={formData.netPrice}
            onChange={handleChange}
            placeholder="Net Price"
            className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-400 w-full"
            required
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            placeholder="Sales Quantity"
            className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-400 w-full"
            required
          />
          <input
            type="number"
            name="profit"
            value={formData.profit}
            onChange={handleChange}
            placeholder="Profit"
            className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-400 w-full"
            required
          />
        </div>
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
