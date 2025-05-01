import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ExpensesPage = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [formData, setFormData] = useState({
    category: "",
    amount: "",
    date: new Date().toISOString().slice(0, 10),
    supplier: "",
    description: "",
  });
  const navigate = useNavigate();

  const fetchExpenses = () => {
    axios
      .get("http://localhost:5001/api/expenses")
      .then((res) => setExpenses(res.data))
      .catch((err) => console.error("Error loading expenses:", err));
  };

  useEffect(() => {
    fetchExpenses();
    axios
      .get("http://localhost:5001/api/supplier/list")
      .then((res) => setSuppliers(res.data))
      .catch((err) => console.error("Error loading suppliers", err));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddExpense = async (e) => {
    e.preventDefault();
    const { category, amount, date, supplier } = formData;

    if (!category || !amount || !date) {
      toast.error("Category, amount, and date are required.");
      return;
    }

    if (category === "Spare Parts" && !supplier) {
      toast.error("Supplier is required for Spare Parts expenses.");
      return;
    }

    if (isNaN(amount) || Number(amount) <= 0) {
      toast.error("Amount must be a valid positive number.");
      return;
    }

    try {
      await axios.post("http://localhost:5001/api/expenses/add", formData);
      toast.success("Expense added successfully!");
      setFormData({
        category: "",
        amount: "",
        date: new Date().toISOString().split("T")[0],
        supplier: "",
        description: "",
      });
      fetchExpenses();
    } catch (err) {
      console.error("Failed to add expense:", err);
      toast.error("Failed to add expense.");
    }
  };

  const isSpareParts = formData.category === "Spare Parts";

  return (
    <div className="p-6 bg-gray-100 min-h-screen w-350">
      <h1 className="text-3xl font-bold text-red-500 mb-6">Manage Expenses / Purchases</h1>
      <button
        onClick={() => navigate("/accountant-dashboard")}
        className="bg-red-500 text-black px-4 py-2 rounded hover:bg-red-700"
      >
        ← Back to Dashboard
      </button>

      {/* Add Expense Form */}
      <form onSubmit={handleAddExpense} className="bg-gray-300 p-6 rounded shadow-md mb-8 w-200">
        <h2 className="text-xl font-semibold mb-4">Add New Expense</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-medium">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            >
              <option value="">Select</option>
              <option value="Spare Parts">Spare Parts</option>
              <option value="Electricity">Electricity</option>
              <option value="Maintenance">Maintenance</option>
              <option value="Others">Others</option>
            </select>
          </div>

          <div>
            <label className="block mb-1 font-medium">Amount (Rs.)</label>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Date</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              max={new Date().toISOString().slice(0, 10)}
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Supplier</label>
            <select
              name="supplier"
              value={formData.supplier}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              disabled={!isSpareParts}
              required={isSpareParts}
            >
              <option value="">Select Supplier</option>
              {suppliers.map((s) => (
                <option key={s._id} value={s.companyName}>
                  {s.companyName}
                </option>
              ))}
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="block mb-1 font-medium">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              rows={3}
              placeholder="Optional note"
            ></textarea>
          </div>
        </div>

        <button
          type="submit"
          className="mt-4 bg-blue-800 hover:bg-blue-900 text-black px-4 py-2 rounded"
        >
          <FaPlus className="inline mr-1" /> Add Expense
        </button>
      </form>

      {/* Expenses Table */}
      <div className="bg-white p-6 rounded shadow-md">
        <h2 className="text-xl font-semibold mb-4">Expense History</h2>
        <table className="w-full table-auto border">
          <thead className="bg-red-600 text-white">
            <tr>
              <th className="p-2">Date</th>
              <th className="p-2">Category</th>
              <th className="p-2">Amount</th>
              <th className="p-2">Supplier</th>
              <th className="p-2">Description</th>
            </tr>
          </thead>
          <tbody>
            {expenses.length === 0 ? (
              <tr>
                <td colSpan="5" className="p-4 text-center text-gray-500">
                  No expenses recorded yet.
                </td>
              </tr>
            ) : (
              expenses.map((exp, idx) => (
                <tr key={idx} className="text-center border-t">
                  <td className="p-2">{exp.date?.slice(0, 10)}</td>
                  <td className="p-2">{exp.category}</td>
                  <td className="p-2">Rs. {exp.amount}</td>
                  <td className="p-2">{exp.supplier}</td>
                  <td className="p-2">{exp.description}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ExpensesPage;
