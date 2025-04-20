import React from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import logo from "../../assets/logo.jpg"; // Adjust the path

// Sidebar Component
function Sidebar() {
  return (
    <aside className="w-72 h-screen bg-gradient-to-b from-blue-800 to-blue-500 text-white p-6 shadow-2xl rounded-r-3xl flex flex-col items-center">
      <motion.img
        src={logo}
        alt="Logo"
        className="w-28 h-28 rounded-full mb-6 shadow-md"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      />
      <motion.h1
        className="text-3xl font-extrabold text-center mb-2"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        Nimal Motors
      </motion.h1>
      <h3 className="text-lg font-semibold text-center mb-8 opacity-80">
        Supervisor
      </h3>

      <nav className="flex flex-col space-y-6 w-full">
        <Link
          to="/supervisor/progress"
          className="flex items-center gap-3 p-4 rounded-xl hover:bg-blue-600 transition-all duration-300"
        >
          <span className="text-2xl">🔄</span>
          <span className="text-lg font-medium">Progress</span>
        </Link>

        <Link
          to="/supervisor/report"
          className="flex items-center gap-3 p-4 rounded-xl hover:bg-blue-600 transition-all duration-300"
        >
          <span className="text-2xl">📋</span>
          <span className="text-lg font-medium">Report</span>
        </Link>

        <Link
          to="/appointments"
          className="flex items-center gap-3 p-4 rounded-xl hover:bg-blue-600 transition-all duration-300"
        >
          <span className="text-2xl">📅</span>
          <span className="text-lg font-medium">Appointments</span>
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
    <header className="flex justify-between items-center p-4 bg-white shadow-md rounded-b-3xl">
      <h1 className="text-2xl font-bold text-blue-700">Service Supervisor</h1>
      <div className="flex items-center gap-4">
        <button className="p-2 hover:bg-gray-100 rounded-full text-2xl">🔔</button>
        <button
          className="p-2 hover:bg-gray-100 rounded-full text-2xl"
          onClick={() => navigate("/profile")}
        >
          👤
        </button>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-all"
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

const DashboardHome = () => {
  const todaySummary = {
    appointments: 8,
    ongoing: 5,
    completed: 3,
  };

  return (
    <div className="p-8">
      <motion.h2
        className="text-3xl font-bold mb-6 text-blue-700"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Welcome, Supervisor! 🎉
      </motion.h2>

      {/* Today's Summary Section */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <div className="bg-white p-6 rounded-2xl shadow-md flex flex-col items-center">
          <h3 className="text-lg font-semibold mb-2">Appointments</h3>
          <p className="text-3xl font-bold text-blue-600">{todaySummary.appointments}</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-md flex flex-col items-center">
          <h3 className="text-lg font-semibold mb-2">Ongoing Services</h3>
          <p className="text-3xl font-bold text-green-600">{todaySummary.ongoing}</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-md flex flex-col items-center">
          <h3 className="text-lg font-semibold mb-2">Completed Services</h3>
          <p className="text-3xl font-bold text-purple-600">{todaySummary.completed}</p>
        </div>
      </motion.div>

      {/* Cards Section */}
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
        <main className="flex-1 overflow-y-auto p-6">
          <DashboardHome />
        </main>
      </div>
    </div>
  );
};

export default SupervisorDashboard;
