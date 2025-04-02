import React from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import InventoryTable from "../components/InventoryTable";
import StatsCards from "../components/StatsCards";

const Dashboard = () => {
  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1">
        <Header />
        <div className="p-4">
          <InventoryTable />
          <StatsCards />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
