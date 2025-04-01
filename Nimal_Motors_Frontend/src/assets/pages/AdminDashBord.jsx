// AdminDashboard.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";

const Sidebar = ({ setReport }) => {
  return (
    <aside className="w-64 h-screen bg-blue-600 text-white p-5">
      <h2 className="text-xl font-bold mb-6">Admin Dashboard</h2>
      <nav className="space-y-4">
        <Link
          to="/admin-dashboard"
          className="flex items-center space-x-3 p-2 rounded-lg hover:bg-blue-500"
        >
          <span>📊 Dashboard</span>
        </Link>
        <a href="#" className="flex items-center space-x-3 p-2 rounded-lg bg-white text-blue-600">
          <span>🛒 Booking</span>
        </a>
        <a href="#" className="flex items-center space-x-3 p-2 rounded-lg hover:bg-blue-500">
          <span>📦 Section Management</span>
        </a>
        <a href="#" className="flex items-center space-x-3 p-2 rounded-lg hover:bg-blue-500">
          <span>📦 User Management</span>
        </a>
        <div>
          <p className="text-sm font-semibold mb-2">🏬 Reports</p>
          <Link to="/sales-report" className="block p-2 rounded-lg hover:bg-blue-500">
            Sales Report
          </Link>
          <a href="#" onClick={() => setReport("Inventory Report")} className="block p-2 rounded-lg hover:bg-blue-500">
            Inventory Report
          </a>
          <a href="#" onClick={() => setReport("User Report")} className="block p-2 rounded-lg hover:bg-blue-500">
            User Report
          </a>
        </div>
      </nav>
    </aside>
  );
};

const Header = () => {
  return (
    <header className="flex justify-between items-center p-4 bg-white shadow-md">
      <h1 className="text-lg font-semibold">Order Management</h1>
      <div className="flex items-center space-x-4">
        <span className="text-gray-600 cursor-pointer">⚙️</span>
        <span className="text-gray-600 cursor-pointer">👤</span>
      </div>
    </header>
  );
};

const ReportSection = ({ reportType }) => {
  return (
    <div className="p-4">
      <h2 className="text-lg font-bold mb-4">{reportType}</h2>
      <p>Displaying {reportType} data...</p>
    </div>
  );
};

const AdminDashboard = () => {
  const [selectedReport, setSelectedReport] = useState(null);

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar setReport={setSelectedReport} />
      <div className="flex-1 flex flex-col">
        <Header />
        {selectedReport ? <ReportSection reportType={selectedReport} /> : <p className="p-4">Select a report to view.</p>}
      </div>
    </div>
  );
};

export default AdminDashboard;
