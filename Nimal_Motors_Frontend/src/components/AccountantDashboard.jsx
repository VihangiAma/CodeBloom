import React, { useState } from "react";
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

export default AccountantDashboard;
