import React from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { motion } from "framer-motion"; // Import framer-motion
import logo from "../../assets/logo.jpg"; // Adjust the path

// Sidebar Component
function Sidebar() {
  return (
    <aside className="w-64 h-screen bg-gradient-to-b from-blue-700 to-blue-500 text-white p-6 shadow-lg">
      <img src={logo} alt="Logo" className="w-24 h-24 rounded-full mb-6 mx-auto" />
      <h1 className="text-2xl font-bold text-center mb-6">Nimal Motors</h1>
      <h3 className="text-lg font-semibold text-center mb-8">Supervisor</h3>
      <nav className="flex flex-col space-y-4">
        <Link
          to="/supervisor/progress"
          className="hover:bg-blue-600 p-3 rounded-lg transition-colors"
        >
          🔄 Progress
        </Link>
        <Link
          to="/supervisor/report"
          className="hover:bg-blue-600 p-3 rounded-lg transition-colors"
        >
          📋 Report
        </Link>
        <Link
          to="/appointments"
          className="hover:bg-blue-600 p-3 rounded-lg transition-colors"
        >
          📅 Appointments
        </Link>
      </nav>
    </aside>
  );
}

// Header Component
const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  return (
    <header className="flex justify-between items-center p-4 bg-white shadow-md">
      <h1 className="text-xl font-bold">Service Supervisor</h1>
      <div className="flex items-center gap-4">
        <button className="p-2 hover:bg-gray-100 rounded-full">🔔</button>
        <button
          className="p-2 hover:bg-gray-100 rounded-full"
          onClick={() => navigate("/profile")}
        >
          👤
        </button>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
        >
          Logout
        </button>
      </div>
    </header>
  );
};

// Animated Dashboard Cards
const DashboardCard = ({ title, description, link, color, emoji }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
      className={`p-6 rounded-2xl text-white shadow-lg ${color} flex flex-col justify-between`}
    >
      <div className="text-4xl mb-4">{emoji}</div>
      <h3 className="text-2xl font-bold mb-2">{title}</h3>
      <p className="mb-4">{description}</p>
      <Link
        to={link}
        className="mt-auto underline text-sm hover:opacity-80 transition-opacity"
      >
        Go →
      </Link>
    </motion.div>
  );
};

// Main Dashboard Content
const DashboardHome = () => {
  return (
    <div className="p-8">
      <motion.h2
        className="text-3xl font-bold mb-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Welcome, Supervisor! 🎉
      </motion.h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <DashboardCard
          title="View Progress"
          description="Track service progress of vehicles."
          link="/supervisor/progress"
          color="bg-blue-500"
          emoji="🔄"
        />
        <DashboardCard
          title="Manage Appointments"
          description="View and manage customer bookings."
          link="/appointments"
          color="bg-green-500"
          emoji="📅"
        />
        <DashboardCard
          title="View Reports"
          description="Generate and review service reports."
          link="/supervisor/report"
          color="bg-purple-500"
          emoji="📋"
        />
      </div>
    </div>
  );
};

// SupervisorDashboard Component
const SupervisorDashboard = () => {
  const { section } = useParams();

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 overflow-y-auto">
          <DashboardHome />
        </main>
      </div>
    </div>
  );
};

export default SupervisorDashboard;
