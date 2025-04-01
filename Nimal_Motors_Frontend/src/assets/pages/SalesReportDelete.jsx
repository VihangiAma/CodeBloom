import React, { useState } from "react";

const SalesReportDelete = ({ onDelete }) => {
  const [itemId, setItemId] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setItemId(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation: Check if the ID is provided
    if (!itemId) {
      setError("Please enter an Item ID.");
      return; // Stop the form submission if validation fails
    }

    // Clear error if validation passes
    setError("");

    // Pass the Item ID to the parent component for deletion
    onDelete(itemId);

    // Reset form after submission
    setItemId("");
  };

  return (
    <div className="p-6 bg-white shadow-lg rounded-xl max-w-lg mx-auto">
      <h2 className="text-2xl font-semibold text-gray-700 mb-6 text-center">Delete Sales Report</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && <p className="text-red-500 text-center">{error}</p>} {/* Display error message */}

        <div className="grid grid-cols-1 gap-4">
          <input
            type="text"
            name="id"
            value={itemId}
            onChange={handleChange}
            placeholder="Enter Item ID to Delete"
            className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-400 w-full"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-6 rounded-lg w-full transition-all duration-300"
        >
          Delete Sale
        </button>
      </form>
    </div>
  );
};

export default SalesReportDelete;
