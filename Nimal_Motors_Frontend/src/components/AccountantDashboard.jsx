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
import { FaMoneyBillWave, FaReceipt, FaChartBar, FaFileInvoice } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const AccountantDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-blue-700">Accountant Dashboard</h1>

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

      {/* Placeholder for Next Steps */}
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-xl font-bold mb-2">Recent Purchase History</h2>
        <p className="text-sm text-gray-500">Coming soon...</p>
      </div>
      <button
          onClick={() => navigate("/inventory-dashboard")}
          className="bg-blue-600 text-black px-4 py-2 rounded hover:bg-blue-700"
        >
          Go to Inventory
        </button>
        <div className="bg-white p-6 rounded shadow mt-6">
  <h2 className="text-xl font-semibold mb-4 text-gray-700">Financial Reports</h2>
  <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
    <li>Monthly Purchase Summary</li>
    <li>Supplier Payment History</li>
    <li>Invoice Totals (Paid/Unpaid)</li>
    <li>Stock Value Report</li>
    <li>Export to PDF / Excel (Coming Soon)</li>
  </ul>
  <button className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
    Generate Report
  </button>
</div>
    </div>
  );
};

export default AccountantDashboard;

