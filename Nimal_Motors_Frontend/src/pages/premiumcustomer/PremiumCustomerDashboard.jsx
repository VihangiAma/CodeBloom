import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import PremiumServiceBodyshop from "./PremiumServiceBodyshop";
import PremiumServiceElectrical from "./PremiumServiceElecrical";
import PremiumServiceMechanical from "./PremiumServiceMechanical";
import PremiumServiceAppointment from "./PremiumServiceAppointment";
import PremiumCustomerBookings from "./PremiumCustomerBookings";
import CompletedServiceHistory from "./PremiumCompletedHistory";

const DashboardCard = ({ title, description, emoji, onClick }) => (
  <div
    onClick={onClick}
    style={{
      cursor: "pointer",
      backgroundColor: "#B00020",
      color: "#F5F5F5",
      borderRadius: "16px",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      padding: "24px",
      transition: "transform 0.3s ease-in-out, filter 0.3s ease-in-out",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      fontFamily: "Roboto, sans-serif",
      minWidth: "260px",
      maxWidth: "320px",
      flex: 1,
    }}
    onMouseOver={(e) => {
      e.currentTarget.style.transform = "scale(1.05)";
      e.currentTarget.style.filter = "brightness(1.1)";
    }}
    onMouseOut={(e) => {
      e.currentTarget.style.transform = "scale(1)";
      e.currentTarget.style.filter = "brightness(1)";
    }}
  >
    <div style={{ fontSize: "40px", marginBottom: "16px" }}>{emoji}</div>
    <h2 style={{ fontSize: "20px", fontWeight: "700", marginBottom: "8px" }}>
      {title}
    </h2>
    <p style={{ fontSize: "14px", opacity: "0.9" }}>{description}</p>
  </div>
);

const PremiumCustomerDashboard = () => {
  const navigate = useNavigate();
  const [activePage, setActivePage] = useState("dashboard");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [user, setUser] = useState({ fullName: "John Doe" });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = JSON.parse(atob(token.split(".")[1]));
        setUser({ fullName: decoded.fullName || "John Doe" });
      } catch (err) {
        console.error("Error decoding JWT:", err);
      }
    }
  }, []);

  const renderAddServiceForm = () => {
    switch (selectedCategory) {
      case "electrical":
        return <PremiumServiceElectrical isEditMode={false} />;
      case "mechanical":
        return <PremiumServiceMechanical isEditMode={false} />;
      case "bodyshop":
        return <PremiumServiceBodyshop isEditMode={false} user={user} />;
      case "appointment":
        return <PremiumServiceAppointment isEditMode={false} />;
      default:
        return renderAddServiceCategory();
    }
  };

  const renderAddServiceCategory = () => (
    <div
      style={{
        padding: "24px",
        backgroundColor: "#F5F5F5",
        borderRadius: "12px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        fontFamily: "Roboto, sans-serif",
      }}
    >
      <h2
        style={{
          fontSize: "24px",
          fontWeight: "700",
          marginBottom: "24px",
          color: "#212121",
          fontFamily: "Poppins, sans-serif",
        }}
      >
        Select Service Category
      </h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: "24px",
        }}
      >
        <DashboardCard
          title="Electrical"
          description="Add an electrical service request"
          emoji="⚡"
          onClick={() => setSelectedCategory("electrical")}
        />
        <DashboardCard
          title="Mechanical"
          description="Add a mechanical service request"
          emoji="🔧"
          onClick={() => setSelectedCategory("mechanical")}
        />
        <DashboardCard
          title="Bodyshop"
          description="Add a bodyshop service request"
          emoji="🚗"
          onClick={() => setSelectedCategory("bodyshop")}
        />
        <DashboardCard
          title="Appointment"
          description="General appointment booking"
          emoji="📅"
          onClick={() => setSelectedCategory("appointment")}
        />
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activePage) {
      case "addservice":
        return (
          <div
            style={{
              padding: "32px",
              backgroundColor: "#F5F5F5",
              minHeight: "100vh",
            }}
          >
            <button
              onClick={() => {
                setActivePage("dashboard");
                setSelectedCategory(null);
              }}
              style={{
                padding: "10px 20px",
                marginBottom: "24px",
                backgroundColor: "#B00020",
                color: "#FAFAFA",
                fontWeight: "600",
                borderRadius: "6px",
                fontSize: "14px",
                cursor: "pointer",
                border: "none",
              }}
            >
              ⬅ Back to Dashboard
            </button>
            {renderAddServiceForm()}
          </div>
        );

      case "servicehistory":
        return (
          <div
            style={{
              padding: "32px",
              backgroundColor: "#F5F5F5",
              minHeight: "100vh",
            }}
          >
            <button
              onClick={() => setActivePage("dashboard")}
              style={{
                padding: "10px 20px",
                marginBottom: "24px",
                backgroundColor: "#B00020",
                color: "#FAFAFA",
                fontWeight: "600",
                borderRadius: "6px",
                fontSize: "14px",
                cursor: "pointer",
                border: "none",
              }}
            >
              ⬅ Back to Dashboard
            </button>
            <h2
              style={{
                fontSize: "24px",
                fontWeight: "700",
                color: "#212121",
                marginBottom: "16px",
                fontFamily: "Poppins, sans-serif",
              }}
            >
              Service History
            </h2>

            <div
              style={{
                marginTop: "24px",
                backgroundColor: "#ffffff",
                padding: "24px",
                borderRadius: "12px",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                fontFamily: "Roboto, sans-serif",
              }}
            >
              <h3
                style={{
                  fontSize: "20px",
                  fontWeight: "700",
                  marginBottom: "16px",
                  color: "#212121",
                  fontFamily: "Poppins, sans-serif",
                }}
              >
                All Bookings Overview
              </h3>
              <PremiumCustomerBookings />
            </div>

            <div
              style={{
                marginTop: "32px",
                backgroundColor: "#ffffff",
                padding: "24px",
                borderRadius: "12px",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                fontFamily: "Roboto, sans-serif",
              }}
            >
              <h3
                style={{
                  fontSize: "20px",
                  fontWeight: "700",
                  marginBottom: "16px",
                  color: "#212121",
                  fontFamily: "Poppins, sans-serif",
                }}
              >
                Completed Service History & PDF Export
              </h3>
              <CompletedServiceHistory />
            </div>
          </div>
        );

      default:
        return (
          <div
            style={{
              flex: 1,
              padding: "32px",
              fontFamily: "Poppins, sans-serif",
            }}
          >
            <h1
              style={{
                fontSize: "32px",
                fontWeight: "800",
                color: "#9B0A0A",
                marginBottom: "32px",
              }}
            >
              Premium Customer Dashboard
            </h1>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
                gap: "24px",
                marginTop: "16px",
              }}
            >
              <DashboardCard
                title="Add Service"
                description="Add a new service request."
                emoji="➕"
                onClick={() => setActivePage("addservice")}
              />
              <DashboardCard
                title="Service History"
                description="Review your past services and part replacements."
                emoji="🛠️"
                onClick={() => setActivePage("servicehistory")}
              />
              <DashboardCard
                title="My Profile"
                description="Manage your personal information."
                emoji="👤"
                onClick={() => navigate("/premium-customer")}
              />
            </div>
          </div>
        );
    }
  };

  return (
    <div
      style={{
        display: "flex",
        height: "100vh", // full screen height
        overflow: "hidden", // prevent overflow issues
        fontFamily: "Roboto, sans-serif",
      }}
    >
      {/* Sidebar */}
      <div
        style={{
          width: "240px",
          backgroundColor: "#000000",
          padding: "24px",
          color: "#FFFFFF",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <div>
          <h2
            style={{
              fontSize: "20px",
              fontWeight: "700",
              marginBottom: "32px",
              fontFamily: "Montserrat, sans-serif",
            }}
          >
            ☰ Premium Menu
          </h2>
          {[
            { label: "Dashboard", page: "dashboard" },
            { label: "Add Service", page: "addservice" },
            { label: "Service History", page: "servicehistory" },
            {
              label: "Back to Profile",
              action: () => navigate("/premium-customer"),
            },
          ].map(({ label, page, action }, i) => (
            <div
              key={i}
              onClick={() => (page ? setActivePage(page) : action())}
              style={{
                padding: "12px 16px",
                borderRadius: "6px",
                fontSize: "14px",
                fontWeight: "500",
                backgroundColor:
                  page && activePage === page ? "#B00020" : "transparent",
                color: "#FAFAFA",
                cursor: "pointer",
                marginBottom: "12px",
                transition: "background-color 0.3s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor =
                  page && activePage !== page
                    ? "#333333"
                    : e.currentTarget.style.backgroundColor)
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor =
                  page && activePage === page ? "#B00020" : "transparent")
              }
            >
              {label}
            </div>
          ))}
        </div>
        <div
          style={{
            fontSize: "12px",
            opacity: "0.6",
            textAlign: "center",
            marginTop: "40px",
          }}
        >
          © 2025 Nimal Motors
        </div>
      </div>

      {/* Main Content */}
      <div
        style={{
          flex: 1,
          height: "100vh",
          overflowY: "auto",
          backgroundColor: "#FAFAFA",
          padding: "32px",
        }}
      >
        {renderContent()}
      </div>
    </div>
  );
};

export default PremiumCustomerDashboard;
