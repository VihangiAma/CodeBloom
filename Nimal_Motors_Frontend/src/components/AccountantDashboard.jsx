import React from "react";
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

  return (
    <div className="flex h-screen ">
      {/* Sidebar */}
      <aside className="w-64 bg-red-500 text-black p-5 flex flex-col">
        <div className="mb-8 flex flex-col items-center">
          <img src={logoImage} alt="Logo" className="w-20 h-20 rounded mb-2" />
          <h1 className="text-xl font-bold text-center">Nimal Motors</h1>
        </div>
        <nav className="space-y-4">
          <button
            className="flex items-center gap-3 px-3 py-2 rounded hover:bg-blue-600 bg-blue-700"
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
      <main className="flex-1  p-8 overflow-y-auto  w-300 h-300 bg-gray-200">
        <h2 className="text-3xl font-bold mb-6 text-black">
          Accountant Dashboard
        </h2>

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

        {/* Recent Purchases */}
        <div className="bg-white p-4 rounded shadow mb-6">
          <h2 className="text-xl font-bold mb-2">Recent Purchase History</h2>
          <p className="text-sm text-gray-500">Coming soon...</p>
        </div>

        {/* Reports Section */}
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">
            Financial Reports
          </h2>
          <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
            <li>Monthly Purchase Summary</li>
            <li>Supplier Payment History</li>
            <li>Invoice Totals (Paid/Unpaid)</li>
            <li>Stock Value Report</li>
            <li>Export to PDF / Excel (Coming Soon)</li>
          </ul>
          <button className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
            Download Report
          </button>
        </div>
      </main>
    </div>
  );
};

export default AccountantDashboard;
