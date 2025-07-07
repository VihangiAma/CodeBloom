import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom"; // Add this import
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
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
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
          confirmButtonColor: "#3085d6",
        });
        setActivePage("dashboard");
      } catch (error) {
        console.error(error);
        Swal.fire({
          icon: "error",
          title: "Failed!",
          text: "Could not add service. Please try again.",
          confirmButtonColor: "#d33",
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
              <div className="bg-white p-4 rounded shadow flex items-center gap-4">
                <FaListAlt className="text-blue-600 text-3xl" />
                <div>
                  <p className="text-sm">Total Appointments</p>
                  <h2 className="text-xl font-semibold">{stats.total}</h2>
                </div>
              </div>

              <div className="bg-white p-4 rounded shadow flex items-center gap-4">
                <FaCheckCircle className="text-green-600 text-3xl" />
                <div>
                  <p className="text-sm">Completed</p>
                  <h2 className="text-xl font-semibold">{stats.completed}</h2>
                </div>
              </div>

              <div className="bg-white p-4 rounded shadow flex items-center gap-4">
                <FaSpinner className="text-yellow-500 text-3xl animate-spin-slow" />
                <div>
                  <p className="text-sm">In Progress</p>
                  <h2 className="text-xl font-semibold">{stats.inProgress}</h2>
                </div>
              </div>

              <div className="bg-white p-4 rounded shadow flex items-center gap-4">
                <FaClock className="text-red-500 text-3xl" />
                <div>
                  <p className="text-sm">Pending</p>
                  <h2 className="text-xl font-semibold">{stats.pending}</h2>
                </div>
              </div>
            </div>

            {/* Dashboard Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 p-8">
              <DashboardCard
                title="Add Service"
                description="Add a new mechanical service."
                color="bg-blue-500"
                emoji="➕"
                onClick={() => setActivePage("addservice")}
              />
              <DashboardCard
                title="Manage Appointments"
                description="View and manage customer bookings."
                color="bg-green-500"
                emoji="📅"
                onClick={() => setActivePage("schedules")}
              />
              <DashboardCard
                title="Invoices"
                description="View invoices."
                color="bg-yellow-500"
                emoji="🧾"
                onClick={() => setActivePage("invoices")}
              />
            </div>

            {/* Progress Updater */}
            {showProgressFetcher && (
              <Progress section="bodyshop" onStatsUpdate={handleStatsUpdate} />
            )}
          </>
        );
    }
  };

  return (
    <div className="flex min-w-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white flex flex-col justify-between">
        <div>
          {/* Company Name and Logo */}
          <div className="flex items-center p-6 space-x-3">
            <h1 className="text-2xl font-extrabold text-gray-300 mb-6">
              🚗 NIMAL MOTORS
            </h1>
          </div>
          {/* Navigation Menu */}
          <div className="p-6">
            <h2 className="text-xl font-bold mb-6">Supervisor Section</h2>
            <ul className="space-y-3">
              <li>
                <button
                  className={`w-full text-left px-4 py-2 rounded hover:bg-gray-700 ${
                    activePage === "dashboard" && "bg-gray-700"
                  }`}
                  onClick={() => setActivePage("dashboard")}
                >
                  Dashboard
                </button>
              </li>
              <li>
                <button
                  className={`w-full text-left px-4 py-2 rounded hover:bg-gray-700 ${
                    activePage === "addservice" && "bg-gray-700"
                  }`}
                  onClick={() => setActivePage("addservice")}
                >
                  Add Customer Details.
                </button>
              </li>
              <li>
                <button
                  className={`w-full text-left px-4 py-2 rounded hover:bg-gray-700 ${
                    activePage === "schedules" && "bg-gray-700"
                  }`}
                  onClick={() => setActivePage("schedules")}
                >
                  Manage Appointments
                </button>
              </li>
              <li>
                <button
                  className={`w-full text-left px-4 py-2 rounded hover:bg-gray-700 ${
                    activePage === "invoices" && "bg-gray-700"
                  }`}
                  onClick={() => setActivePage("invoices")}
                >
                  Invoices
                </button>
              </li>
              <li></li>
            </ul>
          </div>
        </div>
      </div>
      {/* Main Content */}
      <div className="flex-1">
        {/* Header */}
        <div className="bg-white shadow flex justify-between items-center px-6 py-4">
          <h2 className="text-2xl font-bold text-gray-800">
            BodyShop Supervisor Section
          </h2>
          <div className="flex items-center space-x-4">
            <button
              className="hover:text-blue-600 text-gray-700 text-xl"
              title="Notifications"
              onClick={() => navigate("/notification")} // Replace with actual route
            >
              🔔
            </button>
            <button
              className="hover:text-blue-600 text-gray-700 text-xl"
              title="Profile"
              onClick={() => navigate("/bodyshop-supervisor")} // Replace with actual route
            >
              👤
            </button>
            <button
              className="hover:text-red-600 text-gray-700 text-xl"
              title="Logout"
              onClick={() => navigate("/login")} // Replace with actual route
            >
              LogOut
            </button>
          </div>
        </div>

        {/* Page Content */}
        <div className="p-4">{renderContent()}</div>
      </div>
    </div>
  );
};

export default BodyShopSupervisorSection;

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
