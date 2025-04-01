import React from "react";
import DashboardCard from "../Components/DashboardCard";
import Sidebar from "../Components/Sidebar";
import StockChart from "../Components/StockChart";
import { FaBox, FaExclamationTriangle, FaCheckCircle, FaTruck } from "react-icons/fa";

const Dashboard = () => {
  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-6 bg-gray-100">
        <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

        {/* Cards Section */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <DashboardCard title="Total Products" value="9" icon={<FaBox />} color="bg-blue-500 text-white" />
          <DashboardCard title="Low Stock" value="4" icon={<FaExclamationTriangle />} color="bg-yellow-500 text-white" />
          <DashboardCard title="Out of Stock" value="1" icon={<FaCheckCircle />} color="bg-red-500 text-white" />
          <DashboardCard title="Suppliers" value="5" icon={<FaTruck />} color="bg-green-500 text-white" />
        </div>

        {/* Stock Chart */}
        <StockChart />
      </div>
    </div>
  );
};

export default Dashboard;
