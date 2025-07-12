import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { FaListAlt, FaCheckCircle, FaSpinner, FaClock } from "react-icons/fa";
import AddServiceForm from "./AddServiceForm";
import ScheduleDetails from "./ScheduleDetails";
import Progress from "./ProgressPage";
import CompletedServices from "./CompletedServices";

const BodyShopSupervisorSection = () => {
  const navigate = useNavigate();

  const [activePage, setActivePage] = useState("dashboard");
  const [stats, setStats] = useState({
    total: 0,
    completed: 0,
    pending: 0,
    inProgress: 0,
  });
  const [showProgressFetcher, setShowProgressFetcher] = useState(true);

  useEffect(() => {
    if (activePage === "dashboard") {
      setShowProgressFetcher(true);
    }
  }, [activePage]);

  const handleStatsUpdate = (data) => {
    setStats(data);
    setShowProgressFetcher(false);
  };

  const handleFormSubmit = async (formData) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to add this service?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#D32F2F",
      cancelButtonColor: "#1C1C1C",
      confirmButtonText: "Yes, add it!",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      try {
        await axios.post("http://localhost:5001/api/bodyshop", formData);
        Swal.fire({
          icon: "success",
          title: "Service Added!",
          text: "The new service has been successfully added.",
          confirmButtonColor: "#D32F2F",
        });
        setActivePage("dashboard");
      } catch (error) {
        console.error(error);
        Swal.fire({
          icon: "error",
          title: "Failed!",
          text: "Could not add service. Please try again.",
          confirmButtonColor: "#D32F2F",
        });
      }
    }
  };

  const renderContent = () => {
    switch (activePage) {
      case "schedules":
        return (
          <div className="p-6">
            <ScheduleDetails section="bodyshop" />
          </div>
        );
      case "addservice":
        return (
          <div className="p-6">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white p-8 rounded-2xl shadow-2xl"
            >
              <AddServiceForm onSubmit={handleFormSubmit} />
            </motion.div>
          </div>
        );
      case "invoices":
        return (
          <div className="text-gray-600 p-8 text-center text-xl">
            <CompletedServices section="bodyshop" sectionPrefix="BS" />
          </div>
        );

      default:
        return (
          <>
            {/* Progress Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 px-4">
              <StatCard
                icon={<FaListAlt />}
                label="Total Appointments"
                value={stats.total}
                color="#D32F2F"
              />
              <StatCard
                icon={<FaCheckCircle />}
                label="Completed"
                value={stats.completed}
                color="green"
              />
              <StatCard
                icon={<FaSpinner className="animate-spin-slow" />}
                label="In Progress"
                value={stats.inProgress}
                color="orange"
              />
              <StatCard
                icon={<FaClock />}
                label="Pending"
                value={stats.pending}
                color="gray"
              />
            </div>

            {/* Dashboard Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 p-8">
              <DashboardCard
                title="Add Service"
                description="Add a new bodyshop service."
                emoji="➕"
                onClick={() => setActivePage("addservice")}
              />
              <DashboardCard
                title="Manage Appointments"
                description="View and manage customer bookings."
                emoji="📅"
                onClick={() => setActivePage("schedules")}
              />
              <DashboardCard
                title="Invoices"
                description="View invoices."
                emoji="🧾"
                onClick={() => setActivePage("invoices")}
              />
            </div>

            {showProgressFetcher && (
              <Progress section="bodyshop" onStatsUpdate={handleStatsUpdate} />
            )}
          </>
        );
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-black text-white flex flex-col justify-between">
        <div>
          <div className="p-6">
            <h1 className="text-2xl font-extrabold text-red-600 mb-6">
              🚗 NIMAL MOTORS
            </h1>
            <h2 className="text-xl font-bold mb-6">Supervisor Section</h2>
            <ul className="space-y-3">
              {[
                { label: "Dashboard", value: "dashboard" },
                { label: "Add Service", value: "addservice" },
                { label: "Manage Appointments", value: "schedules" },
                { label: "Invoices", value: "invoices" },
              ].map((item) => (
                <li key={item.value}>
                  <button
                    style={{
                      width: "100%",
                      textAlign: "left",
                      padding: "0.75rem 1rem",
                      backgroundColor:
                        activePage === item.value ? "#D32F2F" : "transparent",
                      border: item.special ? "2px solid #FF5C5C" : "none",
                      color: item.special ? "#B00020" : "#FFF",
                      borderRadius: "0.5rem",
                      marginBottom: "0.5rem",
                      fontWeight: item.special ? "bold" : "normal",
                      cursor: "pointer",
                    }}
                    onClick={() => setActivePage(item.value)}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        <div className="bg-red shadow flex justify-between items-center px-6 py-8">
          <h2 className="text-2xl font-bold text-black-700">
            BodyShop Supervisor Section
          </h2>
          <div className="flex items-center space-x-4 text-xl text-gray-700">
            <button
              className="hover:text-red-600"
              title="Profile"
              onClick={() => navigate("/bodyshop-supervisor")}
            >
              👤
            </button>
            <button
              className="hover:text-red-600"
              title="Logout"
              onClick={() => navigate("/login")}
            >
              LogOut
            </button>
          </div>
        </div>

        <div className="p-4">{renderContent()}</div>
      </div>
    </div>
  );
};

export default BodyShopSupervisorSection;

// Stat Card Component
const StatCard = ({ icon, label, value, color }) => (
  <div className="bg-white p-4 rounded shadow flex items-center gap-4">
    <div className="text-3xl" style={{ color }}>
      {icon}
    </div>
    <div>
      <p className="text-sm text-gray-600">{label}</p>
      <h2 className="text-xl font-semibold">{value}</h2>
    </div>
  </div>
);

// Dashboard Card Component
const DashboardCard = ({ title, description, emoji, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="cursor-pointer bg-red-600 text-white rounded-2xl shadow-xl p-8 transform hover:scale-105 transition duration-300 flex flex-col justify-between"
    >
      <div className="text-5xl mb-4">{emoji}</div>
      <h2 className="text-2xl font-bold mb-2">{title}</h2>
      <p className="opacity-90">{description}</p>
    </div>
  );
};
