import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AppointmentDetails from "./Supervisors/AppointmentDetails";
import ApprovedAppointments from "./Supervisors/ApprovedAppointments";
import Completedappoinments from "./Supervisors/Competedappoinments";
import AddCustomer from "./Supervisors/AddCustomer";

const DashboardCard = ({ title, description, emoji, onClick }) => (
  <div
    onClick={onClick}
    style={{
      backgroundColor: "#D32F2F",
      color: "white",
      borderRadius: "1rem",
      boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
      padding: "2rem",
      cursor: "pointer",
      transition: "transform 0.3s",
    }}
    onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
    onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1.0)")}
  >
    <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>{emoji}</div>
    <h2
      style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "0.5rem" }}
    >
      {title}
    </h2>
    <p style={{ opacity: 0.9 }}>{description}</p>
  </div>
);

const ServiceSupervisorDashboard = () => {
  const navigate = useNavigate();
  const [activePage, setActivePage] = useState("dashboard");

  const renderContent = () => {
    switch (activePage) {
      case "appointments":
        return (
          <AppointmentDetails
            view="all"
            goBack={() => setActivePage("dashboard")}
          />
        );
      case "approved":
        return (
          <ApprovedAppointments
            view="approved"
            goBack={() => setActivePage("dashboard")}
          />
        );
      case "invoices":
        return (
          <Completedappoinments
            view="invoices"
            goBack={() => setActivePage("dashboard")}
          />
        );

      case "addservice":
        return (
          <div
            style={{
              color: "#444",
              padding: "2rem",
              textAlign: "center",
              fontSize: "1.2rem",
            }}
          >
            <AddCustomer
              goBack={() => setActivePage("dashboard")}
              sectionPrefix="service"
              section="appointments"
            />
          </div>
        );
      default:
        return (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "2rem",
              padding: "2rem",
            }}
          >
            <DashboardCard
              title="Add Customer"
              description="Add a new customer details."
              emoji="➕"
              onClick={() => setActivePage("addservice")}
            />
            <DashboardCard
              title="Manage Appointments"
              description="View and manage customer bookings."
              emoji="📅"
              onClick={() => setActivePage("appointments")}
            />
            <DashboardCard
              title="View Invoice"
              description="View invoices of vehicles."
              emoji="💰"
              onClick={() => setActivePage("invoices")}
            />
            <DashboardCard
              title="Approved Appointments"
              description="Track approved appointments."
              emoji="✅"
              onClick={() => setActivePage("approved")}
            />
          </div>
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
                { label: "Add Customer Details", value: "addservice" },
                { label: "Manage Appointments", value: "appointments" },
                { label: "Approved Appointments", value: "approved" },
                { label: "View Invoices", value: "invoices" },
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
      <div style={{ flex: 1 }}>
        <div
          style={{
            backgroundColor: "#1f2937",
            padding: "2rem 3rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: "1px solid #DDD",
          }}
        >
          <h2
            style={{ fontSize: "1.5rem", fontWeight: "bold", color: "white" }}
          >
            Service Supervisor Section
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
              onClick={() => navigate("/service-supervisor")}
            >
              🙍‍♂️
            </button>
            <button
              title="Logout"
              onClick={() => navigate("/login")}
              style={{ color: "red", fontWeight: "bold" }}
            >
              Logout
            </button>
          </div>
        </div>
        <div>{renderContent()}</div>
      </div>
    </div>
  );
};

export default ServiceSupervisorDashboard;
