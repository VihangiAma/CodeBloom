import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaMoneyBillWave,
  FaReceipt,
  FaChartBar,
  FaFileInvoice,
  FaCogs,
  FaClipboardList,
  FaHome,
} from "react-icons/fa";
import logoImage from "../assets/logo.jpg";

const AccountantDashboard = () => {
  const navigate = useNavigate();
  const [recentExpenses, setRecentExpenses] = useState([]); // ✅ Moved inside the component

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-red-500 text-black p-5 flex flex-col">
        <div className="mb-8 flex flex-col items-center">
          <img src={logoImage} alt="Logo" className="w-20 h-20 rounded mb-2" />
          <h1 className="text-xl font-bold text-center">Nimal Motors</h1>
        </div>
        <nav className="space-y-4">
          <button
            className="flex items-center gap-3 px-3 py-2 rounded hover:bg-blue-600 "
            onClick={() => navigate("/accountant-dashboard")}
          >
            <FaHome /> Dashboard
          </button>
          <button
            className="flex items-center gap-3 px-3 py-2 rounded hover:bg-blue-600"
            onClick={() => navigate("/expenses")}
          >
            <FaClipboardList /> Manage Expenses / Purchases
          </button>
          <button
            className="flex items-center gap-3 px-3 py-2 rounded hover:bg-blue-800"
            onClick={() => navigate("/inventory-dashboard")}
          >
            <FaCogs /> Go to Inventory
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto bg-gray-200 w-300">
        <h2 className="text-3xl font-bold mb-6 text-black">Accountant Dashboard</h2>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-4 rounded shadow flex items-center gap-4">
            <FaMoneyBillWave className="text-green-600 text-3xl" />
            <div>
              <p className="text-sm">Total Stock Value</p>
              <h2 className="text-xl font-semibold">Rs. 0.00</h2>
            </div>
          </div>
          <div className="bg-white p-4 rounded shadow flex items-center gap-4">
            <FaReceipt className="text-orange-500 text-3xl" />
            <div>
              <p className="text-sm">Purchase Records</p>
              <h2 className="text-xl font-semibold">0</h2>
            </div>
          </div>
          <div className="bg-white p-4 rounded shadow flex items-center gap-4">
            <FaFileInvoice className="text-blue-600 text-3xl" />
            <div>
              <p className="text-sm">Invoices</p>
              <h2 className="text-xl font-semibold">0</h2>
            </div>
          </div>
          <div className="bg-white p-4 rounded shadow flex items-center gap-4">
            <FaChartBar className="text-purple-600 text-3xl" />
            <div>
              <p className="text-sm">Outstanding Payments</p>
              <h2 className="text-xl font-semibold">Rs. 0.00</h2>
            </div>
          </div>
        </div>

        {/* Recent Expenses */}
        <div className="bg-white p-6 rounded shadow mt-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Recent Expense History</h2>
          {recentExpenses.length === 0 ? (
            <p className="text-gray-500 text-sm">No recent expenses available.</p>
          ) : (
            <>
              <table className="w-full text-sm border">
                <thead className="bg-blue-600 text-white">
                  <tr>
                    <th className="p-2">Date</th>
                    <th className="p-2">Category</th>
                    <th className="p-2">Amount (Rs.)</th>
                    <th className="p-2">Supplier</th>
                  </tr>
                </thead>
                <tbody>
                  {recentExpenses.map((exp, idx) => (
                    <tr key={idx} className="text-center border-t hover:bg-gray-50">
                      <td className="p-2">{new Date(exp.date).toLocaleDateString()}</td>
                      <td className="p-2">{exp.category}</td>
                      <td className="p-2 text-green-700 font-semibold">
                        {exp.amount.toFixed(2)}
                      </td>
                      <td className="p-2">{exp.supplier}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="text-right mt-4">
                <button
                  onClick={() => navigate("/expenses")}
                  className="text-blue-600 hover:underline text-sm font-medium"
                >
                  View All Expenses →
                </button>
              </div>
            </>
          )}
        </div>

        {/* Reports Section */}
        <div className="bg-white p-6 rounded shadow mt-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Financial Reports</h2>
          <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
            <li>Monthly Purchase Summary</li>
            <li>Supplier Payment History</li>
            <li>Invoice Totals (Paid/Unpaid)</li>
            <li>Stock Value Report</li>
            <li>Export to PDF / Excel (Coming Soon)</li>
          </ul>
          <button className="mt-4 bg-green-600 text-black px-4 py-2 rounded hover:bg-green-700">
            Download Report
          </button>
        </div>

        <div className="mt-4 text-right">
          <button
            onClick={() => navigate("/accountant")}
            className="bg-gray-200 text-black px-4 py-2 rounded hover:bg-gray-300"
          >
            ← Back to Profile
          </button>
        </div>
      </main>
    </div>
  );
};

export default AccountantDashboard;
