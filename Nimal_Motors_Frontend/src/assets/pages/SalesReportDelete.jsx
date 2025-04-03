import React, { useState } from "react";
import axios from "axios";

const SalesReportDelete = ({ onDelete }) => {
  const [itemId, setItemId] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    setItemId(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!itemId) {
      setError("Please enter an Item ID.");
      return;
    }

    setError("");
    setSuccessMessage("");

    try {
      // Send DELETE request to the backend
      const response = await axios.delete(`http://localhost:5000/api/SalesReports/${itemId}`);

      console.log("✅ Success:", response.data);
      setSuccessMessage("Sales report deleted successfully!");

      // Call parent function if needed
      if (onDelete) {
        onDelete(itemId);
      }

      // Reset form
      setItemId("");
    } catch (error) {
      console.error("❌ Error deleting sales report:", error);
      setError("Error deleting sales report. Please try again.");
    }
  };

  return (
    <div className="p-6 bg-white shadow-lg rounded-xl max-w-lg mx-auto">
      <h2 className="text-2xl font-semibold text-gray-700 mb-6 text-center">Delete Sales Report</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && <p className="text-red-500 text-center">{error}</p>}
        {successMessage && <p className="text-green-500 text-center">{successMessage}</p>}

        <div className="grid grid-cols-1 gap-4">
          <input
            type="text"
            name="id"
            value={itemId}
            onChange={handleChange}
            placeholder="Enter Item ID to Delete"
            className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-red-400 w-full"
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
