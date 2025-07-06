import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
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

  const [editData, setEditData] = useState(null); // For editing
  const [editMode, setEditMode] = useState(false); // Modal toggle
  const [deleteId, setDeleteId] = useState(null); // For deletion

  const navigate = useNavigate();
  const isSpareParts = formData.category === "Spare Parts";

  // Fetch all expenses
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

  // Add new expense
  const handleAddExpense = async (e) => {
    e.preventDefault();
    const { category, amount, date, supplier } = formData;

    if (!category || !amount || !date) {
      toast.error("Category, amount, and date are required.");
      return;
    }

    if (isSpareParts && !supplier) {
      toast.error("Supplier is required for Spare Parts.");
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
      toast.error("Failed to add expense.");
    }
  };

  const handleEdit = (exp) => {
    setEditData({ ...exp });
    setEditMode(true);
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:5001/api/expenses/update/${editData._id}`, editData);
      toast.success("Expense updated!");
      setEditMode(false);
      fetchExpenses();
    } catch (err) {
      toast.error("Failed to update expense.");
    }
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`http://localhost:5001/api/expenses/delete/${deleteId}`);
      toast.success("Expense deleted.");
      setDeleteId(null);
      fetchExpenses();
    } catch (err) {
      toast.error("Failed to delete expense.");
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F5F5] p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-[#B30000]">Manage Expenses / Purchases</h1>
        <button onClick={() => navigate("/accountant-dashboard")} className="bg-[#2C2C2C] text-white px-4 py-2 rounded hover:bg-[#5A5A5A] shadow-sm">
          ← Back to Dashboard
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Form Section */}
        <form onSubmit={handleAddExpense} className="bg-[#FFFFFF] p-6 rounded shadow space-y-4">
          <h2 className="text-xl font-semibold text-[#000000]">Add New Expense</h2>
          <select name="category" value={formData.category} onChange={handleChange} required className="w-full p-2 border border-[#2C2C2C] rounded text-[#000000] focus:ring-[#B30000] focus:border-[#B30000]">
            <option value="">Select Category</option>
            <option value="Spare Parts">Spare Parts</option>
            <option value="Electricity">Electricity</option>
            <option value="Maintenance">Maintenance</option>
            <option value="Others">Others</option>
          </select>

          <input type="number" name="amount" value={formData.amount} onChange={handleChange} placeholder="Amount (Rs.)" className="w-full p-2 border border-[#2C2C2C] rounded text-[#000000] focus:ring-[#B30000] focus:border-[#B30000]" required />

          <input type="date" name="date" value={formData.date} onChange={handleChange} className="w-full p-2 border border-[#2C2C2C] rounded text-[#000000] focus:ring-[#B30000] focus:border-[#B30000]" max={new Date().toISOString().slice(0, 10)} required />

          <select name="supplier" value={formData.supplier} onChange={handleChange} className="w-full p-2 border border-[#2C2C2C] rounded text-[#000000] focus:ring-[#B30000] focus:border-[#B30000]" disabled={!isSpareParts} required={isSpareParts}>
            <option value="">Select Supplier</option>
            {suppliers.map((s) => (
              <option key={s._id} value={s.companyName}>{s.companyName}</option>
            ))}
          </select>

          <textarea name="description" value={formData.description} onChange={handleChange} rows="3" placeholder="Description" className="w-full p-2 border border-[#2C2C2C] rounded text-[#000000] focus:ring-[#B30000] focus:border-[#B30000]"></textarea>

          <button type="submit" className="bg-[#B30000] text-white px-4 py-2 rounded hover:bg-[#D63333] shadow-sm">
            <FaPlus className="inline mr-2" /> Add Expense
          </button>
        </form>

        {/* Expense Table */}
        <div className="bg-[#FFFFFF] p-6 rounded shadow">
          <h2 className="text-xl font-semibold mb-4 text-[#000000]">Expense History</h2>
          <table className="w-full border border-[#2C2C2C] text-sm">
            <thead className="bg-[#B30000] text-white">
              <tr>
                <th className="p-2">Date</th>
                <th className="p-2">Category</th>
                <th className="p-2">Amount</th>
                <th className="p-2">Supplier</th>
                <th className="p-2">Description</th>
                <th className="p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {expenses.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center p-4 text-[#2C2C2C]">No records found.</td>
                </tr>
              ) : (
                expenses.map((exp, i) => (
                  <tr key={i} className="text-center border-t border-[#2C2C2C] hover:bg-[#F5F5F5]">
                    <td className="p-2 text-[#000000]">{exp.date?.slice(0, 10)}</td>
                    <td className="p-2 text-[#000000]">{exp.category}</td>
                    <td className="p-2 text-[#000000]">Rs. {exp.amount}</td>
                    <td className="p-2 text-[#000000]">{exp.supplier}</td>
                    <td className="p-2 text-[#000000]">{exp.description}</td>
                    <td className="p-2 space-x-2">
                      <button onClick={() => handleEdit(exp)} className="text-[#B30000] hover:text-[#D63333]"><FaEdit /></button>
                      <button onClick={() => setDeleteId(exp._id)} className="text-[#B30000] hover:text-[#D63333]"><FaTrash /></button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Modal */}
      {editMode && editData && (
        <div className="fixed inset-0 bg-[#000000] bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-[#FFFFFF] rounded-lg shadow-lg p-6 w-full max-w-lg">
            <h2 className="text-2xl font-bold text-[#B30000] mb-4">Edit Expense</h2>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                try {
                  await axios.put(`http://localhost:5001/api/expenses/update/${editData._id}`, editData);
                  toast.success("Expense updated successfully!");
                  fetchExpenses();
                  setEditMode(false);
                } catch (err) {
                  console.error("Update failed:", err);
                  toast.error("Failed to update expense.");
                }
              }}
              className="space-y-4"
            >
              {/* Category */}
              <div>
                <label className="block text-sm font-semibold mb-1 text-[#000000]">Category</label>
                <select
                  value={editData.category}
                  onChange={(e) => setEditData({ ...editData, category: e.target.value })}
                  className="w-full p-2 border border-[#2C2C2C] rounded text-[#000000] focus:ring-[#B30000] focus:border-[#B30000]"
                  required
                >
                  <option value="">Select</option>
                  <option value="Spare Parts">Spare Parts</option>
                  <option value="Electricity">Electricity</option>
                  <option value="Maintenance">Maintenance</option>
                  <option value="Others">Others</option>
                </select>
              </div>

              {/* Amount */}
              <div>
                <label className="block text-sm font-semibold mb-1 text-[#000000]">Amount (Rs.)</label>
                <input
                  type="number"
                  value={editData.amount}
                  onChange={(e) => setEditData({ ...editData, amount: e.target.value })}
                  className="w-full p-2 border border-[#2C2C2C] rounded text-[#000000] focus:ring-[#B30000] focus:border-[#B30000]"
                  required
                />
              </div>

              {/* Date */}
              <div>
                <label className="block text-sm font-semibold mb-1 text-[#000000]">Date</label>
                <input
                  type="date"
                  value={editData.date?.slice(0, 10)}
                  onChange={(e) => setEditData({ ...editData, date: e.target.value })}
                  className="w-full p-2 border border-[#2C2C2C] rounded text-[#000000] focus:ring-[#B30000] focus:border-[#B30000]"
                  max={new Date().toISOString().slice(0, 10)}
                  required
                />
              </div>

              {/* Supplier */}
              {editData.category === "Spare Parts" && (
                <div>
                  <label className="block text-sm font-semibold mb-1 text-[#000000]">Supplier</label>
                  <select
                    value={editData.supplier}
                    onChange={(e) => setEditData({ ...editData, supplier: e.target.value })}
                    className="w-full p-2 border border-[#2C2C2C] rounded text-[#000000] focus:ring-[#B30000] focus:border-[#B30000]"
                    required
                  >
                    <option value="">Select Supplier</option>
                    {suppliers.map((s) => (
                      <option key={s._id} value={s.companyName}>{s.companyName}</option>
                    ))}
                  </select>
                </div>
              )}

              {/* Description */}
              <div>
                <label className="block text-sm font-semibold mb-1 text-[#000000]">Description</label>
                <textarea
                  value={editData.description}
                  onChange={(e) => setEditData({ ...editData, description: e.target.value })}
                  className="w-full p-2 border border-[#2C2C2C] rounded text-[#000000] focus:ring-[#B30000] focus:border-[#B30000]"
                  rows={3}
                ></textarea>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="submit"
                  className="bg-[#B30000] text-white px-4 py-2 rounded hover:bg-[#D63333] shadow-sm"
                >
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={() => setEditMode(false)}
                  className="bg-[#2C2C2C] text-white px-4 py-2 rounded hover:bg-[#5A5A5A] shadow-sm"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {deleteId && (
        <div className="fixed inset-0 bg-[#000000] bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-[#FFFFFF] p-6 rounded-lg shadow-md w-full max-w-sm">
            <h3 className="text-xl font-semibold text-[#B30000] mb-2">Confirm Deletion</h3>
            <p className="text-[#2C2C2C] mb-4">Are you sure you want to delete this expense? This action cannot be undone.</p>
            <div className="flex justify-end gap-3">
              <button
                onClick={confirmDelete}
                className="bg-[#B30000] text-white px-4 py-2 rounded hover:bg-[#D63333] shadow-sm"
              >
                Yes, Delete
              </button>
              <button
                onClick={() => setDeleteId(null)}
                className="bg-[#2C2C2C] text-white px-4 py-2 rounded hover:bg-[#5A5A5A] shadow-sm"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExpensesPage;