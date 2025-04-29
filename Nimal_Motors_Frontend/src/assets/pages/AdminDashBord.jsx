import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SalesReport from "./SalesReport";
import AdminUsers from "../../pages/admin/AdminUsers";
import InventoryReport from "./InventoryReport";

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
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6">{reportType}</h2>
      {reportType === "Sales Report" ? (
        <SalesReport />
      ) : (
        <p>Displaying {reportType} data...</p>
      )}
      <div className="mt-6">
        <button
          onClick={goBack}
          className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded"
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activePage, setActivePage] = useState("dashboard");


  const renderContent = () => {
    switch (activePage) {
      case "booking":
        return (
          <div className="text-gray-600 p-8 text-center text-xl">
            Booking Management page coming soon...
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
          navigate("/admin/users"); 
        return null;

      case "salesReport":
        return (
          <ReportSection
            reportType="Sales Report"
            goBack={() => setActivePage("dashboard")}
          />
        );
      case "inventoryReport":
        return (
          <ReportSection
            reportType="Inventory Report"
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
              onClick={() => navigate("/admin/users")}            />
            <DashboardCard
              title="Sales Report"
              description="View and analyze sales data."
              color="bg-purple-500"
              emoji="📈"
              onClick={() => setActivePage("salesReport")}
            />
            <DashboardCard
              title="Inventory Report"
              description="Track inventory status."
              color="bg-yellow-500"
              emoji="📦"
              onClick={() => setActivePage("inventoryReport")}
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

  return renderContent();
};

export default AdminDashboard;
