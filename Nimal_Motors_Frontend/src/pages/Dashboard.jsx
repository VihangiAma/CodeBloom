import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import StatsCards from "../components/StatsCards";
import InventoryTable from "../components/InventoryTable";

const Dashboard = () => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 p-6 bg-gray-100">
        <Header />
        <StatsCards />
        <InventoryTable />
      </div>
    </div>
  );
};

export default Dashboard;
