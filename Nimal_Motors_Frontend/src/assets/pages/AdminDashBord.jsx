import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SalesReport from "./SalesReport";
import UsersReport from "./UserReport";

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

const ReportSection = ({ reportType, goBack }) => {
  return (
    <div className="p-8 min-h-[calc(100vh-8rem)]">
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold mb-6">{reportType}</h2>
        {reportType === "Sales Report" ? (
          <SalesReport />
        ) : reportType === "User Report" ? (
          <UsersReport />
        ) : (
          <p>Displaying {reportType} data...</p>
        )}
        <div className="mt-6">
          <button
            onClick={goBack}
            className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded transition"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activePage, setActivePage] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const renderContent = () => {
    switch (activePage) {
      case "booking":
        return (
          <div className="p-8 min-h-[calc(100vh-8rem)]">
            <div className="bg-white rounded-lg shadow p-6 text-center">
              <p className="text-gray-600 text-xl mb-4">
                Booking Management page coming soon...
              </p>
              <button
                onClick={() => setActivePage("dashboard")}
                className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded transition"
              >
                Go Back
              </button>
            </div>
          </div>
        );
      case "sectionManagement":
        return (
          <div className="p-8 min-h-[calc(100vh-8rem)]">
            <div className="bg-white rounded-lg shadow p-6 text-center">
              <p className="text-gray-600 text-xl mb-4">
                Section Management page coming soon...
              </p>
              <button
                onClick={() => setActivePage("dashboard")}
                className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded transition"
              >
                Go Back
              </button>
            </div>
          </div>
        );
      case "userManagement":
        return (
          <div className="p-8 min-h-[calc(100vh-8rem)]">
            <div className="bg-white rounded-lg shadow p-6 text-center">
              <p className="text-gray-600 text-xl mb-4">
                User Management page coming soon...
              </p>
              <button
                onClick={() => setActivePage("dashboard")}
                className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded transition"
              >
                Go Back
              </button>
            </div>
          </div>
        );
      case "salesReport":
        return (
          <ReportSection
            reportType="Sales Report"
            goBack={() => setActivePage("dashboard")}
          />
        );
      case "userReport":
        return (
          <ReportSection
            reportType="User Report"
            goBack={() => setActivePage("dashboard")}
          />
        );
      default:
        return (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-8 min-h-[calc(100vh-8rem)]">
            <DashboardCard
              title="Booking"
              description="Manage customer bookings."
              color="bg-blue-500"
              emoji="🛒"
              onClick={() => setActivePage("booking")}
            />
            <DashboardCard
              title="Section Management"
              description="Manage service sections."
              color="bg-indigo-500"
              emoji="📦"
              onClick={() => setActivePage("sectionManagement")}
            />
            <DashboardCard
              title="User Management"
              description="Manage system users."
              color="bg-green-500"
              emoji="👥"
              onClick={() => setActivePage("userManagement")}
            />
            <DashboardCard
              title="Financial Report"
              description="View and analyze sales data."
              color="bg-purple-500"
              emoji="📈"
              onClick={() => setActivePage("salesReport")}
            />
            <DashboardCard
              title="User Report"
              description="Analyze user activity."
              color="bg-pink-500"
              emoji="👤"
              onClick={() => setActivePage("userReport")}
            />
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`${
          sidebarOpen ? "w-64" : "w-20"
        } bg-blue-800 text-white transition-all duration-300 flex flex-col`}
      >
        {/* Admin Profile */}
        <div className="p-4 flex items-center border-b border-blue-700">
          <img
            src="https://via.placeholder.com/40"
            alt="Admin"
            className="w-10 h-10 rounded-full"
          />
          {sidebarOpen && (
            <div className="ml-3">
              <p className="font-medium">Admin User</p>
              <p className="text-xs text-blue-200">admin@example.com</p>
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            <li>
              <button
                onClick={() => setActivePage("dashboard")}
                className={`w-full text-left p-4 rounded-lg flex items-center transition ${
                  activePage === "dashboard" ? "bg-blue-700" : "hover:bg-blue-700"
                }`}
              >
                <span className="text-xl">📊</span>
                {sidebarOpen && <span className="ml-4">Dashboard</span>}
              </button>
            </li>
            <li>
              <button
                onClick={() => setActivePage("booking")}
                className={`w-full text-left p-4 rounded-lg flex items-center transition ${
                  activePage === "booking" ? "bg-blue-700" : "hover:bg-blue-700"
                }`}
              >
                <span className="text-xl">🛒</span>
                {sidebarOpen && <span className="ml-4">Booking</span>}
              </button>
            </li>
            <li>
              <button
                onClick={() => setActivePage("sectionManagement")}
                className={`w-full text-left p-4 rounded-lg flex items-center transition ${
                  activePage === "sectionManagement" ? "bg-blue-700" : "hover:bg-blue-700"
                }`}
              >
                <span className="text-xl">📦</span>
                {sidebarOpen && <span className="ml-4">Sections</span>}
              </button>
            </li>
            <li>
              <button
                onClick={() => setActivePage("userManagement")}
                className={`w-full text-left p-4 rounded-lg flex items-center transition ${
                  activePage === "userManagement" ? "bg-blue-700" : "hover:bg-blue-700"
                }`}
              >
                <span className="text-xl">👥</span>
                {sidebarOpen && <span className="ml-4">Users</span>}
              </button>
            </li>
            <li>
              <button
                onClick={() => setActivePage("salesReport")}
                className={`w-full text-left p-4 rounded-lg flex items-center transition ${
                  activePage === "salesReport" ? "bg-blue-700" : "hover:bg-blue-700"
                }`}
              >
                <span className="text-xl">📈</span>
                {sidebarOpen && <span className="ml-4">Financial Report</span>}
              </button>
            </li>
            <li>
              <button
                onClick={() => setActivePage("userReport")}
                className={`w-full text-left p-4 rounded-lg flex items-center transition ${
                  activePage === "userReport" ? "bg-blue-700" : "hover:bg-blue-700"
                }`}
              >
                <span className="text-xl">👤</span>
                {sidebarOpen && <span className="ml-4">User Report</span>}
              </button>
            </li>
          </ul>
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-blue-700">
          <button 
            onClick={() => navigate("/login")}
            className="w-full p-2 rounded-lg hover:bg-blue-700 flex items-center transition"
          >
            <span className="text-xl">🚪</span>
            {sidebarOpen && <span className="ml-3">Logout</span>}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="min-h-[calc(100vh-4rem)]">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;