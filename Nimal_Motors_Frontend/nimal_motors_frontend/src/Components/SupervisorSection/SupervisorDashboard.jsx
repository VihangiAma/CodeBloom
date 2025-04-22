// src/pages/SupervisorDashboard.jsx




import React, { useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import logo from "../../assets/logo.jpg"; // adjust path

// Sidebar
function Sidebar({ isCollapsed, toggleSidebar }) {
  return (
    <motion.aside
      animate={{ width: isCollapsed ? "5rem" : "18rem" }}
      className="h-screen bg-gradient-to-b from-blue-800 to-blue-500 text-white p-4 shadow-2xl flex flex-col items-center transition-all duration-300 rounded-r-3xl"
    >
      <button
        onClick={toggleSidebar}
        className="self-end mb-6 p-2 hover:bg-blue-700 rounded-lg transition"
      >
        {isCollapsed ? <Menu size={24} /> : <X size={24} />}
      </button>

      <motion.div
        className="flex flex-col items-center mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <img src={logo} alt="Logo" className="w-16 h-16 rounded-full shadow-md" />
        {!isCollapsed && (
          <>
            <h1 className="text-2xl font-bold mt-2">Nimal Motors</h1>
            <p className="text-sm opacity-80">Supervisor</p>
          </>
        )}
      </motion.div>

      <nav className="flex flex-col space-y-4 w-full">
        <NavItem to="progress" icon="🔄" label="Progress" isCollapsed={isCollapsed} />
        <NavItem to="report" icon="📋" label="Report" isCollapsed={isCollapsed} />
        <NavItem to="appointments" icon="📅" label="Appointments" isCollapsed={isCollapsed} />
      </nav>
    </motion.aside>
  );
}

// Single NavItem
function NavItem({ to, icon, label, isCollapsed }) {
  return (
    <Link
      to={to}
      className="flex items-center gap-3 p-4 rounded-xl hover:bg-blue-600 transition-all duration-300"
    >
      <span className="text-2xl">{icon}</span>
      {!isCollapsed && <span className="text-lg font-medium">{label}</span>}
    </Link>
  );
}

// Header
function Header({ section }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("supervisorSection");
    navigate("/login");
  };

  return (
    <header className="flex justify-between items-center p-6 bg-white shadow-lg rounded-bl-3xl">
      <h1 className="text-2xl font-bold text-gray-800 capitalize">{section} Supervisor</h1>
      <div className="flex items-center gap-4">
        <button className="p-2 hover:bg-gray-100 rounded-full text-xl">🔔</button>
        <button
          className="p-2 hover:bg-gray-100 rounded-full text-xl"
          onClick={() => navigate("/profile")}
        >
          👤
        </button>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
        >
          Logout
        </button>
      </div>
    </header>
  );
}

// Dashboard Home
function DashboardHome() {
  const todaySummary = { appointments: 8, ongoing: 5, completed: 3 };

  return (
    <div className="p-8">
      <motion.h2
        className="text-3xl font-bold mb-6 text-gray-800"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Welcome, Supervisor! 🎉
      </motion.h2>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <SummaryCard title="Appointments" value={todaySummary.appointments} color="text-blue-600" />
        <SummaryCard title="Ongoing Services" value={todaySummary.ongoing} color="text-green-600" />
        <SummaryCard title="Completed Services" value={todaySummary.completed} color="text-purple-600" />
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <DashboardCard title="View Progress" description="Track service progress." link="progress" color="bg-blue-500" emoji="🔄" />
        <DashboardCard title="Manage Appointments" description="View and manage customer bookings." link="appointments" color="bg-green-500" emoji="📅" />
        <DashboardCard title="View Reports" description="Generate and review reports." link="report" color="bg-purple-500" emoji="📋" />
      </div>
    </div>
  );
}

// DashboardCard
function DashboardCard({ title, description, link, color, emoji }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
      className={`p-6 rounded-2xl text-white shadow-xl ${color} flex flex-col justify-between`}
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
}

// SummaryCard
function SummaryCard({ title, value, color }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-md flex flex-col items-center">
      <h3 className="text-lg font-semibold mb-2 text-gray-700">{title}</h3>
      <p className={`text-3xl font-bold ${color}`}>{value}</p>
    </div>
  );
}

// Main Dashboard
const SupervisorDashboard = () => {
  const navigate = useNavigate();
  const { section } = useParams(); // from URL

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      navigate("/login"); // Redirect if not logged in
    }
  }, [navigate]);

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      <Sidebar isCollapsed={false} toggleSidebar={() => {}} />
      <div className="flex-1 flex flex-col">
        <Header section={section} />
        <main className="flex-1 overflow-y-auto p-4">
          <DashboardHome />
        </main>
      </div>
    </div>
  );
};

export default SupervisorDashboard;
