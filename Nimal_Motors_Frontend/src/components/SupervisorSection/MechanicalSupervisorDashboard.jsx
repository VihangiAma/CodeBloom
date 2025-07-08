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

const MechanicalSupervisorSection = () => {
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
        await axios.post("http://localhost:5001/api/mechanical", formData);
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
          <div style={{ padding: "1.5rem" }}>
            <ScheduleDetails section="mechanical" />
          </div>
        );
      case "addcustomer":
        return (
          <div style={{ padding: "1.5rem" }}>
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              style={{
                backgroundColor: "#FFF",
                padding: "2rem",
                borderRadius: "1.5rem",
                boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
              }}
            >
              <AddServiceForm onSubmit={handleFormSubmit} />
            </motion.div>
          </div>
        );
      case "invoices":
        return (
          <div
            style={{
              color: "#444",
              padding: "2rem",
              textAlign: "center",
              fontSize: "1.2rem",
            }}
          >
            <CompletedServices section="mechanical" sectionPrefix="MS" />
          </div>
        );
      default:
        return (
          <>
            {/* Progress Summary Cards */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                gap: "1.5rem",
                marginBottom: "2rem",
                padding: "1.5rem",
              }}
            >
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
                icon={<FaSpinner />}
                label="In Progress"
                value={stats.inProgress}
                color="orange"
              />
              <StatCard
                icon={<FaClock />}
                label="Pending"
                value={stats.pending}
                color="#444"
              />
            </div>

            {/* Dashboard Cards */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                gap: "2rem",
                padding: "1.5rem",
              }}
            >
              <DashboardCard
                title="Add Customer"
                description="Add a new Customer Details."
                emoji="➕"
                onClick={() => setActivePage("addcustomer")}
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

            {/* Progress Fetcher */}
            {showProgressFetcher && (
              <Progress
                section="mechanical"
                onStatsUpdate={handleStatsUpdate}
              />
            )}
          </>
        );
    }
  };

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        backgroundColor: "#F3F4F6",
      }}
    >
      {/* Sidebar */}
      <div
        style={{
          width: "260px",
          backgroundColor: "#1C1C1C",
          color: "#FFF",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <div>
          <div
            style={{
              padding: "1.5rem",
              fontSize: "1.5rem",
              fontWeight: "bold",
              color: "#D32F2F",
            }}
          >
            🚗 NIMAL MOTORS
          </div>
          <div style={{ padding: "1.5rem" }}>
            <h2
              style={{
                fontSize: "1.2rem",
                fontWeight: "bold",
                marginBottom: "1rem",
              }}
            >
              Supervisor Section
            </h2>
            <ul style={{ listStyle: "none", padding: 0 }}>
              {[
                { label: "Dashboard", value: "dashboard" },
                { label: "Add Customer Details", value: "addcustomer" },
                { label: "Manage Appointments", value: "schedules" },
                { label: "View Invoices", value: "invoices" },
              ].map((item) => (
                <li key={item.value}>
                  <button
                    style={{
                      width: "100%",
                      textAlign: "left",
                      padding: "0.75rem 1rem",
                      backgroundColor:
                        activePage === item.value ? "#333" : "transparent",
                      border: "none",
                      color: "#FFF",
                      borderRadius: "0.5rem",
                      marginBottom: "0.5rem",
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
      <div style={{ flex: 1 }}>
        {/* Header */}
        <div
          style={{
            backgroundColor: "#FFF",
            padding: "1rem 2rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: "1px solid #DDD",
          }}
        >
          <h2
            style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#D32F2F" }}
          >
            Mechanical Supervisor Section
          </h2>
          <div
            style={{
              display: "flex",
              gap: "1.5rem",
              fontSize: "1.25rem",
              color: "#333",
            }}
          >
            <button
              title="Profile"
              onClick={() => navigate("/mechanical-supervisor")}
            >
              👤
            </button>
            <button
              title="Logout"
              onClick={() => navigate("/login")}
              style={{ color: "#D32F2F", fontWeight: "bold" }}
            >
              Logout
            </button>
          </div>
        </div>
        {/* Content */}
        <div>{renderContent()}</div>
      </div>
    </div>
  );
};

export default MechanicalSupervisorSection;

// Dashboard Card
const DashboardCard = ({ title, description, emoji, onClick }) => {
  return (
    <div
      onClick={onClick}
      style={{
        backgroundColor: "#D32F2F",
        color: "#FFF",
        borderRadius: "1rem",
        padding: "2rem",
        boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
        cursor: "pointer",
        transition: "transform 0.3s",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1.0)")}
    >
      <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>{emoji}</div>
      <h2
        style={{
          fontSize: "1.5rem",
          fontWeight: "bold",
          marginBottom: "0.5rem",
        }}
      >
        {title}
      </h2>
      <p style={{ opacity: 0.9 }}>{description}</p>
    </div>
  );
};

// Stat Card
const StatCard = ({ icon, label, value, color }) => (
  <div
    style={{
      backgroundColor: "#FFF",
      padding: "1.25rem",
      borderRadius: "0.75rem",
      boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      display: "flex",
      alignItems: "center",
      gap: "1rem",
    }}
  >
    <div style={{ fontSize: "1.75rem", color }}>{icon}</div>
    <div>
      <p style={{ fontSize: "0.9rem", color: "#666" }}>{label}</p>
      <h2 style={{ fontSize: "1.25rem", fontWeight: "600", color: "#333" }}>
        {value}
      </h2>
    </div>
  </div>
);
