/*import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // 👈 import useNavigate

const DashboardCard = ({ title, description, emoji, color, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`cursor-pointer ${color} text-white rounded-2xl shadow-xl p-8 transform hover:scale-105 transition duration-300 flex flex-col justify-between`}
    >
      <div className="text-5xl mb-4">{emoji}</div>
      <h2 className="text-2xl font-bold mb-2">{title}</h2>
      <p className="opacity-90">{description}</p>
    </div>
  );
};

const AccountantDashboard = () => {
  const navigate = useNavigate(); // 👈 get the navigate function
  const [activePage, setActivePage] = useState("dashboard");

  const renderContent = () => {
    switch (activePage) {
      case "invoices":
        return (
          <div className="text-gray-600 p-8 text-center text-xl">
            Invoice Management coming soon...
            <div>
              <button
                onClick={() => setActivePage("dashboard")}
                className="mt-4 px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded"
              >
                Go Back
              </button>
            </div>
          </div>
        );
      case "reports":
        return (
          <div className="text-gray-600 p-8 text-center text-xl">
            Report Management coming soon...
            <div>
              <button
                onClick={() => setActivePage("dashboard")}
                className="mt-4 px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded"
              >
                Go Back
              </button>
            </div>
          </div>
        );
      default:
        return (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-8">
            <DashboardCard
              title="Inventory Dashboard"
              description="Manage and view inventory levels."
              color="bg-indigo-500"
              emoji="📦"
              onClick={() => navigate("/inventory-dashboard")} // 👈 navigate to new page
            />
            <DashboardCard
              title="Invoices"
              description="Create, manage, and view invoices."
              color="bg-green-500"
              emoji="🧾"
              onClick={() => setActivePage("invoices")}
            />
            <DashboardCard
              title="Manage Reports"
              description="Generate financial reports."
              color="bg-orange-500"
              emoji="📈"
              onClick={() => setActivePage("reports")}
            />
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen w-full overflow-x-hidden">
      {renderContent()}
    </div>
  );
};

export default AccountantDashboard;*/
import React from "react";
import {
  FaMoneyBillWave,
  FaReceipt,
  FaChartBar,
  FaFileInvoice,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const AccountantDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="p-6 bg-pink-100 min-h-screen w-full">
<div className="max-w-screen-xl mx-auto">
      <header className="mb-8 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-blue-800">Accountant Dashboard</h1>
        <button
          onClick={() => navigate("/inventory-dashboard")}
          className="bg-blue-600 text-red px-4 py-2 rounded shadow hover:bg-blue-700 transition"
        >
          Go to Inventory
        </button>
      </header>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-5 rounded shadow flex items-center gap-4 hover:shadow-lg transition">
          <FaMoneyBillWave className="text-green-600 text-3xl" />
          <div>
            <p className="text-sm text-gray-500">Total Stock Value</p>
            <h2 className="text-xl font-semibold">Rs. 0.00</h2>
          </div>
        </div>
        <div className="bg-white p-5 rounded shadow flex items-center gap-4 hover:shadow-lg transition">
          <FaReceipt className="text-orange-500 text-3xl" />
          <div>
            <p className="text-sm text-gray-500">Purchase Records</p>
            <h2 className="text-xl font-semibold">0</h2>
          </div>
        </div>
        <div className="bg-white p-5 rounded shadow flex items-center gap-4 hover:shadow-lg transition">
          <FaFileInvoice className="text-blue-600 text-3xl" />
          <div>
            <p className="text-sm text-gray-500">Invoices</p>
            <h2 className="text-xl font-semibold">0</h2>
          </div>
        </div>
        <div className="bg-white p-5 rounded shadow flex items-center gap-4 hover:shadow-lg transition">
          <FaChartBar className="text-purple-600 text-3xl" />
          <div>
            <p className="text-sm text-gray-500">Outstanding Payments</p>
            <h2 className="text-xl font-semibold">Rs. 0.00</h2>
          </div>
        </div>
      </div>

      {/* Recent Activity Placeholder */}
      <div className="bg-white p-6 rounded shadow mb-8">
        <h2 className="text-xl font-bold mb-2 text-gray-700">Recent Purchase History</h2>
        <p className="text-sm text-gray-500">This section will display latest purchases (coming soon...)</p>
      </div>

      {/* Financial Reports Section */}
      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-xl font-bold mb-4 text-gray-700">Financial Reports</h2>
        <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
          <li>Monthly Purchase Summary</li>
          <li>Supplier Payment History</li>
          <li>Invoice Totals (Paid / Unpaid)</li>
          <li>Stock Value Report</li>
          <li>Export to PDF / Excel (Coming Soon)</li>
        </ul>
        <button className="mt-4 bg-green-600 text-red px-4 py-2 rounded hover:bg-green-700">
          Download Report
        </button>
      </div>
    </div>
    </div>
  );
};

export default AccountantDashboard;
