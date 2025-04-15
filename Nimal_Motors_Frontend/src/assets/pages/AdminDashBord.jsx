import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SalesReport from "./SalesReport";
import ProfilePage from "./ProfilePage";

const Sidebar = ({ setReport }) => {
  return (
    <aside className="w-64 h-screen bg-blue-600 text-white p-5">
      <h2 className="text-xl font-bold mb-6">Admin  Dashboard</h2>
      <nav className="space-y-4">
        <a
          href="#"
          onClick={() => setReport("Dashboard")}
          className="flex items-center space-x-3 p-2 rounded-lg hover:bg-blue-500"
        >
          <span>📊 Dashboard</span>
        </a>
        <a
          href="#"
          onClick={() => setReport("Booking")}
          className="flex items-center space-x-3 p-2 rounded-lg bg-blue-500 text-blue-600"
        >
          <span>🛒 Booking</span>
        </a>
        <a
          href="#"
          onClick={() => setReport("Section Management")}
          className="flex items-center space-x-3 p-2 rounded-lg hover:bg-blue-500"
        >
          <span>📦 Section Management</span>
        </a>
        <a
          href="#"
          onClick={() => setReport("User Management")}
          className="flex items-center space-x-3 p-2 rounded-lg hover:bg-blue-500"
        >
          <span>📦 User Management</span>
        </a>
        <div>
          <p className="text-sm font-semibold mb-2">🏬 Reports</p>
          <a href="#" onClick={() => setReport("Sales Report")} className="block p-2 rounded-lg hover:bg-blue-500">
            Sales Report
          </a>
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
  const navigate = useNavigate();

  return (
    <header className="flex justify-between items-center p-4 bg-white shadow-md">
      <h1 className="text-lg font-semibold">Reports</h1>
      <div className="flex items-center space-x-4">
        <span className="text-gray-600 cursor-pointer">⚙️</span>
        <span 
          className="text-gray-600 cursor-pointer" 
          onClick={() => navigate("/profile")}
        >
          👤
        </span>
      </div>
    </header>
  );
};

const ReportSection = ({ reportType }) => {
  return (
    <div className="p-4">
      <h2 className="text-lg font-bold mb-4">{reportType}</h2>
      {reportType === "Sales Report" ? <SalesReport /> : <p>Displaying {reportType} data...</p>}
    </div>
  );
};

const AdminDashboard = () => {
  const [selectedReport, setSelectedReport] = useState("Dashboard");

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
