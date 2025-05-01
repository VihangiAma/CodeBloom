import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import logo from "../../../assets/logo.jpg"; // adjust path if needed

function Sidebar({ isCollapsed, toggleSidebar, activePage, setActivePage }) {
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
        <img
          src={logo}
          alt="Logo"
          className="w-16 h-16 rounded-full shadow-md"
        />
        {!isCollapsed && (
          <>
            <h1 className="text-2xl font-bold mt-2">Nimal Motors</h1>
            <p className="text-sm opacity-80">Supervisor</p>
          </>
        )}
      </motion.div>

      <nav className="flex flex-col space-y-4 w-full">
        <NavItem
          to="dashboard"
          icon="🏠"
          label="Dashboard"
          isCollapsed={isCollapsed}
          activePage={activePage}
          setActivePage={setActivePage}
        />
        <NavItem
          to="invoices"
          icon="🔄"
          label="Invoices"
          isCollapsed={isCollapsed}
          activePage={activePage}
          setActivePage={setActivePage}
        />
        <NavItem
          to="report"
          icon="📋"
          label="Report"
          isCollapsed={isCollapsed}
          activePage={activePage}
          setActivePage={setActivePage}
        />
        <NavItem
          to="appointments"
          icon="📅"
          label="Appointments"
          isCollapsed={isCollapsed}
          activePage={activePage}
          setActivePage={setActivePage}
        />
      </nav>
    </motion.aside>
  );
}

function NavItem({ to, icon, label, isCollapsed, activePage, setActivePage }) {
  const isActive = activePage === to;

  return (
    <button
      onClick={() => setActivePage(to)}
      className={`flex items-center gap-3 p-4 rounded-xl transition-all duration-300 w-full ${
        isActive ? "bg-blue-700" : "hover:bg-blue-600"
      }`}
    >
      <span className="text-2xl">{icon}</span>
      {!isCollapsed && <span className="text-lg font-medium">{label}</span>}
    </button>
  );
}

function Header({ section }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("supervisorSection");
    navigate("/login");
  };

  return (
    <header className="flex justify-between items-center p-6 bg-white shadow-lg rounded-bl-3xl">
      <h1 className="text-2xl font-bold text-gray-800">{section} Supervisor</h1>
      <div className="flex items-center gap-4">
        <button className="p-2 hover:bg-gray-100 rounded-full text-xl">
          🔔
        </button>
        {/* <button
          className="p-2 hover:bg-gray-100 rounded-full text-xl"
          onClick={() => navigate("/profile")}
          //onClick={() => navigate(`/profile/${section}`)}
        >
          👤
        </button> */}
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

const SupervisorLayout = ({ section, children, activePage, setActivePage }) => {
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      <Sidebar
        isCollapsed={isCollapsed}
        toggleSidebar={toggleSidebar}
        activePage={activePage}
        setActivePage={setActivePage}
      />
      <div className="flex-1 flex flex-col">
        <Header section={section} />
        <main className="flex-1 overflow-y-auto p-4 w-300">{children}</main>
      </div>
    </div>
  );
};

export default SupervisorLayout;
