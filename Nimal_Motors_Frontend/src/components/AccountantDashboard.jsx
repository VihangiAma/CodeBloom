import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  FaMoneyBillWave,
  FaReceipt,
  FaChartBar,
  FaFileInvoice,
  FaCogs,
  FaClipboardList,
  FaHome,
  FaChartLine,
} from "react-icons/fa";

import logoImage from "../assets/logo.jpg";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";

// Color schema for pie chart (red tones and gray variants)
const COLORS = ["#B30000", "#D63333", "#E06666", "#2C2C2C", "#5A5A5A"];

const AccountantDashboard = () => {
  const navigate = useNavigate();

  // State variables for various summaries
  // Monthly expenses, category summary, supplier summary, and approved repairs
  const [monthlyExpenses, setMonthlyExpenses] = useState([]);
  const [categorySummary, setCategorySummary] = useState([]);
  const [supplierSummary, setSupplierSummary] = useState([]);
  const [approvedRepairs, setApprovedRepairs] = useState([]); //used for invoicing 

  // Fetch approved repairs for invoicing
  // This effect runs once when the component mounts
  useEffect(() => {
    axios.get("http://localhost:5001/api/repairs/approved") // Adjust API path as needed
      .then((res) => setApprovedRepairs(res.data))
      .catch((err) => console.error("Failed to fetch approved repairs", err));
  }, []);

  useEffect(() => {
    axios.get("http://localhost:5001/api/expenses/summary/monthly")
      .then(res => setMonthlyExpenses(res.data))
      .catch(err => console.error("Failed to load monthly expenses", err));

    axios.get("http://localhost:5001/api/expenses/summary/category")
      .then(res => setCategorySummary(res.data))
      .catch(err => console.error("Failed to load category summary", err));

    axios.get("http://localhost:5001/api/expenses/summary/supplier")
      .then(res => setSupplierSummary(res.data))
      .catch(err => console.error("Failed to load supplier summary", err));
  }, []);

  return (
    <div className="flex h-screen bg-[#F5F5F5] w-380">
      <aside className="w-64 bg-[#2C2C2C] text-white p-5 flex flex-col">
        <div className="mb-8 flex flex-col items-center">
          <img src={logoImage} alt="Logo" className="w-20 h-20 rounded mb-2" />
          <h1 className="text-xl font-bold text-center text-white">Nimal Motors</h1>
        </div>
        <nav className="space-y-4">
          <button onClick={() => navigate("/accountant-dashboard")} className="flex items-center gap-3 px-3 py-2 rounded bg-[#B30000] hover:bg-[#D63333] text-white"><FaHome /> Dashboard</button>
          <button onClick={() => navigate("/expenses")} className="flex items-center gap-3 px-3 py-2 rounded hover:bg-[#5A5A5A] text-white"><FaClipboardList /> Manage Expenses</button>
          <button onClick={() => navigate("/inventory-dashboard")} className="flex items-center gap-3 px-3 py-2 rounded hover:bg-[#5A5A5A] text-white"><FaCogs /> Inventory Overview</button>
          <button onClick={() => navigate("/reports")} className="flex items-center gap-3 px-3 py-2 rounded hover:bg-[#5A5A5A] text-white"><FaChartLine /> Financial Reports</button>
        </nav>
      </aside>

      <main className="flex-1 p-8 overflow-y-auto bg-[#F5F5F5]">
        <h2 className="text-3xl font-bold mb-6 text-[#000000]">Accountant Dashboard</h2>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-[#FFFFFF] p-4 rounded shadow flex items-center gap-4">
            <FaMoneyBillWave className="text-[#B30000] text-3xl" />
            <div>
              <p className="text-sm text-[#000000]">Total Stock Value</p>
              <h2 className="text-xl font-semibold text-[#000000]">Rs. 0.00</h2>
            </div>
          </div>
          <div className="bg-[#FFFFFF] p-4 rounded shadow flex items-center gap-4">
            <FaReceipt className="text-[#B30000] text-3xl" />
            <div>
              <p className="text-sm text-[#000000]">Purchase Records</p>
              <h2 className="text-xl font-semibold text-[#000000]">0</h2>
            </div>
          </div>
          <div className="bg-[#FFFFFF] p-4 rounded shadow flex items-center gap-4">
            <FaFileInvoice className="text-[#B30000] text-3xl" />
            <div>
              <p className="text-sm text-[#000000]">Invoices</p>
              <h2 className="text-xl font-semibold text-[#000000]">0</h2>
            </div>
          </div>
          <div className="bg-[#FFFFFF] p-4 rounded shadow flex items-center gap-4">
            <FaChartBar className="text-[#B30000] text-3xl" />
            <div>
              <p className="text-sm text-[#000000]">Outstanding Payments</p>
              <h2 className="text-xl font-semibold text-[#000000]">Rs. 0.00</h2>
            </div>
          </div>
        </div>

        {/* Approved Repairs for Invoicing */}
        <div className="bg-[#FFFFFF] p-6 rounded shadow mb-6">
          <h3 className="text-xl font-semibold mb-4 text-[#000000]">Approved Repairs – Generate Invoice</h3>
          {approvedRepairs.length === 0 ? (
            <p className="text-[#2C2C2C] text-sm">No approved repairs available.</p>
          ) : (
            <table className="w-full text-sm border">
              <thead className="bg-[#B30000] text-white">
                <tr>
                  <th className="p-2">Customer</th>
                  <th className="p-2">Vehicle No</th>
                  <th className="p-2">Section</th>
                  <th className="p-2">Estimated Cost</th>
                  <th className="p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {approvedRepairs.map((repair, index) => (
                  <tr key={index} className="text-center border-t hover:bg-[#F5F5F5]">
                    <td className="p-2 text-[#000000]">{repair.customerName}</td>
                    <td className="p-2 text-[#000000]">{repair.vehicleNo}</td>
                    <td className="p-2 text-[#000000]">{repair.section || "N/A"}</td>
                    <td className="p-2 text-[#000000]">Rs. {repair.totalCost?.toFixed(2) || "0.00"}</td>
                    <td className="p-2">
                      <button
                        onClick={() => navigate(`/generate-invoice/${repair._id}`)}
                        className="bg-[#B30000] hover:bg-[#D63333] text-white px-3 py-1 rounded shadow-sm"
                      >
                        Generate Invoice
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Monthly Expense Bar Chart */}
        <div className="bg-[#FFFFFF] p-6 rounded shadow mb-6">
          <h3 className="text-xl font-semibold mb-4 text-[#000000]">Monthly Expenses (Last 6 Months)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyExpenses}>
              <CartesianGrid strokeDasharray="3 3" stroke="#2C2C2C" />
              <XAxis dataKey="_id" label={{ value: "Month", position: "insideBottom", offset: -5, fill: "#000000" }} tick={{ fill: "#000000" }} />
              <YAxis label={{ value: "Rs.", angle: -90, position: "insideLeft", fill: "#000000" }} tick={{ fill: "#000000" }} />
              <Tooltip formatter={(value) => `Rs. ${value.toFixed(2)}`} />
              <Bar dataKey="total" fill="#B30000" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Category Summary Pie Chart */}
        <div className="bg-[#FFFFFF] p-6 rounded shadow mb-6">
          <h3 className="text-xl font-semibold mb-4 text-[#000000]">Expense by Category</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={categorySummary} dataKey="total" nameKey="_id" cx="50%" cy="50%" outerRadius={100} label>
                {categorySummary.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `Rs. ${value.toFixed(2)}`} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Supplier-wise Summary Table */}
        <div className="bg-[#FFFFFF] p-6 rounded shadow mb-6">
          <h3 className="text-xl font-semibold mb-4 text-[#000000]">Top Supplier Expenses</h3>
          <table className="w-full text-sm border border-[#2C2C2C]">
            <thead className="bg-[#2C2C2C] text-white">
              <tr>
                <th className="p-2">Supplier</th>
                <th className="p-2">Total Amount (Rs.)</th>
              </tr>
            </thead>
            <tbody>
              {supplierSummary.map((s, index) => (
                <tr key={index} className="text-center border-t border-[#2C2C2C] hover:bg-[#F5F5F5]">
                  <td className="p-2 text-[#000000]">{s._id}</td>
                  <td className="p-2 text-[#B30000] font-semibold">{s.total.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Back Button */}
        <div className="mt-6 text-right">
          <button onClick={() => navigate("/accountant")} className="bg-[#2C2C2C] text-white px-4 py-2 rounded hover:bg-[#5A5A5A] shadow-sm">← Back to Profile</button>
        </div>
      </main>
    </div>
  );
};

export default AccountantDashboard;