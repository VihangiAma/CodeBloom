import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ExpensesPage = () => {
  const [editModalOpen, setEditModalOpen] = useState(false);
const [selectedExpense, setSelectedExpense] = useState(null);
const [editForm, setEditForm] = useState({ amount: "", description: "" });
const [deleteId, setDeleteId] = useState(null);

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
  const isSpareParts = formData.category === "Spare Parts";

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
  const handleEdit = (expense) => {
  setSelectedExpense(expense);
  setEditForm({ amount: expense.amount, description: expense.description });
  setEditModalOpen(true);
};

const handleUpdateExpense = async () => {
  try {
    await axios.put(`http://localhost:5001/api/expenses/update/${selectedExpense._id}`, editForm);
    toast.success("Expense updated successfully!");
    fetchExpenses();
    setEditModalOpen(false);
  } catch (err) {
    toast.error("Update failed.");
  }
};

const handleDeleteConfirm = (id) => {
  setDeleteId(id);
};

const confirmDelete = async () => {
  try {
    await axios.delete(`http://localhost:5001/api/expenses/delete/${deleteId}`);
    toast.success("Expense deleted.");
    fetchExpenses();
    setDeleteId(null);
  } catch (err) {
    toast.error("Failed to delete.");
  }
};
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-red-600">Manage Expenses / Purchases</h1>
        <button
          onClick={() => navigate("/accountant-dashboard")}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
        >
          ← Back to Dashboard
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Form Section */}
        <form onSubmit={handleAddExpense} className="bg-white p-6 rounded shadow space-y-4">
          <h2 className="text-xl font-semibold text-black">Add New Expense/Purchase</h2>
          <div>
            <label className="block font-medium mb-1">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full border rounded p-2"
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
            <label className="block font-medium mb-1">Amount (Rs.)</label>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              className="w-full border rounded p-2"
              required
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Date</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full border rounded p-2"
              max={new Date().toISOString().slice(0, 10)}
              required
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Supplier</label>
            <select
              name="supplier"
              value={formData.supplier}
              onChange={handleChange}
              className="w-full border rounded p-2"
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

          <div>
            <label className="block font-medium mb-1">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full border rounded p-2"
              placeholder="Optional note"
              rows={3}
            ></textarea>
          </div>

          <button
            type="submit"
            className="bg-black hover:bg-gray-800 text-white px-4 py-2 rounded mt-2"
          >
            <FaPlus className="inline mr-2" /> Add Expense
          </button>
        </form>

        {/* Table Section */}
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-xl font-semibold mb-4 text-black">Expense History</h2>
          <div className="overflow-x-auto">
            <table className="w-full table-auto border">
              <thead className="bg-red-600 text-white">
                <tr>
                  <th className="p-2">Date</th>
                  <th className="p-2">Category</th>
                  <th className="p-2">Amount</th>
                  <th className="p-2">Supplier</th>
                  <th className="p-2">Description</th>
                  <th className="p-2">Actions</th> {/* 🆕 Add Actions column */}
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
                    <tr key={idx} className="text-center border-t hover:bg-gray-100">
                      <td className="p-2">{exp.date?.slice(0, 10)}</td>
                      <td className="p-2">{exp.category}</td>
                      <td className="p-2">Rs. {exp.amount}</td>
                      <td className="p-2">{exp.supplier}</td>
                      <td className="p-2">{exp.description}</td>
                       <td className="p-2 space-x-2">
           <button onClick={() => handleEdit(exp)} className="text-blue-600 hover:text-blue-800">
            <FaEdit />
          </button>
           <button onClick={() => handleDeleteConfirm(exp._id)} className="text-red-600 hover:text-red-800">
            <FaTrash />
          </button>
        </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
        {editMode && editData && (
  <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
    <div className="bg-white p-6 rounded shadow w-full max-w-md">
      <h2 className="text-xl font-bold mb-4">Edit Expense</h2>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          try {
            await axios.put(`http://localhost:5001/api/expenses/update/${editData._id}`, editData);
            toast.success("Expense updated!");
            fetchExpenses();
            setEditMode(false);
          } catch (err) {
            console.error("Update failed", err);
            toast.error("Failed to update expense.");
          }
        }}
        className="space-y-4"
      >
        <input
          className="w-full border p-2 rounded"
          type="number"
          value={editData.amount}
          onChange={(e) => setEditData({ ...editData, amount: e.target.value })}
          placeholder="Amount"
          required
        />
        <textarea
          className="w-full border p-2 rounded"
          value={editData.description}
          onChange={(e) => setEditData({ ...editData, description: e.target.value })}
          placeholder="Description"
        ></textarea>
        <div className="flex justify-end gap-2">
          <button type="submit" className="bg-green-600 px-4 py-2 rounded text-white">
            Save
          </button>
          <button
            type="button"
            className="bg-gray-400 px-4 py-2 rounded text-black"
            onClick={() => setEditMode(false)}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  </div>
)}

{deleteId && (
  <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
    <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm">
      <h3 className="text-lg font-semibold text-red-700 mb-3">Confirm Delete?</h3>
      <p className="text-gray-600 mb-4">This action cannot be undone.</p>
      <div className="flex justify-end gap-3">
        <button onClick={confirmDelete} className="bg-red-600 text-white px-4 py-2 rounded">Delete</button>
        <button onClick={() => setDeleteId(null)} className="bg-gray-300 px-4 py-2 rounded">Cancel</button>
      </div>
    </div>
  </div>
)}

      </div>
    </div>
    
  );
};

export default ExpensesPage;
