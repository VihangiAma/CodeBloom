import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SalesReport from "./SalesReport";
<<<<<<< Updated upstream
import ProfilePage from "./ProfilePage";

const Sidebar = ({ setReport }) => {
=======
import UsersReport from "./UserReport";

const DashboardCard = ({ title, description, emoji, color, onClick }) => {
>>>>>>> Stashed changes
  return (
    <aside className="w-64 h-screen bg-blue-600 text-white p-5">
      <h2 className="text-xl font-bold mb-6">Admin Dashboard</h2>
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
          <a
            href="#"
            onClick={() => setReport("Sales Report")}
            className="block p-2 rounded-lg hover:bg-blue-500"
          >
            Sales Report
          </a>
          <a
            href="#"
            onClick={() => setReport("Inventory Report")}
            className="block p-2 rounded-lg hover:bg-blue-500"
          >
            Inventory Report
          </a>
          <a
            href="#"
            onClick={() => setReport("User Report")}
            className="block p-2 rounded-lg hover:bg-blue-500"
          >
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
      {reportType === "Sales Report" ? (
        <SalesReport />
<<<<<<< Updated upstream
=======
      ) : reportType === "User Report" ? (
        <UsersReport />
>>>>>>> Stashed changes
      ) : (
        <p>Displaying {reportType} data...</p>
      )}
    </div>
  );
};

const AdminDashboard = () => {
<<<<<<< Updated upstream
  const [selectedReport, setSelectedReport] = useState("Dashboard");

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar setReport={setSelectedReport} />
      <div className="flex-1 flex flex-col">
        <Header />
        {selectedReport ? (
          <ReportSection reportType={selectedReport} />
        ) : (
          <p className="p-4">Select a report to view.</p>
        )}
=======
  const navigate = useNavigate();
  const [activePage, setActivePage] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const renderContent = () => {
    switch (activePage) {
      case "booking":
        return (
          <div className="text-gray-600 p-8 text-center text-xl">
            Booking Management page coming 
            <div className="mt-4">
              <button
                onClick={() => setActivePage("dashboard")}
                className="px-4 py-2 bg-blue-600 hover:bg-gray-400 rounded"
              >
                Go Back
              </button>
            </div>
          </div>
        );
      case "sectionManagement":
        return (
          <div className="text-gray-600 p-8 text-center text-xl">
            Section Management page coming soon...
            <div className="mt-4">
              <button
                onClick={() => setActivePage("dashboard")}
                className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded"
              >
                Go Back
              </button>
            </div>
          </div>
        );
      case "userManagement":
        return (
          <div className="text-gray-600 p-8 text-center text-xl">
            User Management page coming soon...
            <div className="mt-4">
              <button
                onClick={() => setActivePage("dashboard")}
                className="px-4 py-2 bg-blue-600 hover:bg-gray-800 rounded"
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-8">
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
                className={`w-full text-left p-4 rounded-lg flex items-center ${
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
                className={`w-full text-left p-4 rounded-lg flex items-center ${
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
                className={`w-full text-left p-4 rounded-lg flex items-center ${
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
                className={`w-full text-left p-4 rounded-lg flex items-center ${
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
                className={`w-full text-left p-4 rounded-lg flex items-center ${
                  activePage === "salesReport" ? "bg-blue-700" : "hover:bg-blue-700"
                }`}
              >
                <span className="text-xl">📈</span>
                {sidebarOpen && <span className="ml-4">Sales Report</span>}
              </button>
            </li>
            <li>
              <button
                onClick={() => setActivePage("userReport")}
                className={`w-full text-left p-4 rounded-lg flex items-center ${
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
          <button className="w-full p-2 rounded-lg hover:bg-blue-700 flex items-center">
            <span className="text-xl">🚪</span>
            {sidebarOpen && <span className="ml-3">Logout</span>}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {renderContent()}
>>>>>>> Stashed changes
      </div>
    </div>
  );
};

export default AdminDashboard;