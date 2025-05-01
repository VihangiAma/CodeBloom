import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AddServiceForm from "../../components/SupervisorSection/AddServiceForm";


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

const FeaturePage = ({ title, content, goBack }) => {
  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6">{title}</h2>
      <p>{content}</p> {/* Replace with actual components if available */}
      <div className="mt-6">
        <button
          onClick={goBack}
          className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded"
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

const PremiumCustomerDashboard = () => {
  const navigate = useNavigate();
  const [activePage, setActivePage] = useState("dashboard");

  const renderContent = () => {
    switch (activePage) {
      case "profile":
        return (
          <FeaturePage
            title="My Profile"
            content="View and update your profile and vehicle details here."
            goBack={() => setActivePage("dashboard")}
          />
        );
      case "serviceHistory":
        return (
          <FeaturePage
            title="Service History"
            content="View all past service records and invoices."
            goBack={() => setActivePage("dashboard")}
          />
        );
      case "booking":
        return (
          <FeaturePage
            title="Booking Management"
            content="Book new services or manage your current appointments."
            goBack={() => setActivePage("dashboard")}
          />
        );
      case "vehicleStatus":
        return (
          <FeaturePage
            title="Vehicle Status"
            content="Track real-time progress of your vehicle’s repair process."
            goBack={() => setActivePage("dashboard")}
          />
        );
      case "invoices":
        return (
          <FeaturePage
            title="Invoices"
            content="Download and view invoices for completed services."
            goBack={() => setActivePage("dashboard")}
          />
        );
      case "specialOffers":
        return (
          <FeaturePage
            title="Special Offers"
            content="Enjoy exclusive discounts and premium-only deals."
            goBack={() => setActivePage("dashboard")}
          />
        );
        case "addservice":
          return (
            <div className="p-8">
              <div className="mb-4">
                <button
                  onClick={() => setActivePage("dashboard")}
                  className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded mb-4"
                >
                  ⬅ Back to Dashboard
                </button>
              </div>
              <AddServiceForm
                onSubmit={(data) => {
                  console.log("Submitted service:", data);
                  setActivePage("dashboard"); // Go back to dashboard after submit
                }}
                isEditMode={false}
              />
            </div>
          );
      default:
        return (
          <div className="p-8">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-3xl font-bold">Premium Customer Dashboard</h1>
              <button
                onClick={() => navigate("/premium-customer")}
                className="px-4 py-2 bg-blue-200 hover:bg-blue-300 rounded"
              >
                ⬅ Back to Profile
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <DashboardCard
                title="My Profile"
                description="Manage your personal and vehicle information."
                color="bg-blue-600"
                emoji="👤"
                onClick={() => setActivePage("profile")}
              />
              <DashboardCard
                title="Service History"
                description="Review your past services and part replacements."
                color="bg-indigo-600"
                emoji="🛠️"
                onClick={() => setActivePage("serviceHistory")}
              />
              <DashboardCard
                title="Add Service"
                description="Add a new body-shop service."
                color="bg-blue-500"
                emoji="➕"
                onClick={() => setActivePage("addservice")}
              />
              <DashboardCard
                title="Vehicle Status"
                description="Track real-time progress of your repairs."
                color="bg-purple-600"
                emoji="🚗"
                onClick={() => setActivePage("vehicleStatus")}
              />
              <DashboardCard
                title="Invoices"
                description="Access and download your service invoices."
                color="bg-orange-600"
                emoji="🧾"
                onClick={() => setActivePage("invoices")}
              />
              <DashboardCard
                title="Special Offers"
                description="Get access to premium-exclusive offers and rewards."
                color="bg-green-600"
                emoji="🎁"
                onClick={() => setActivePage("specialOffers")}
              />
            </div>
          </div>
        );
    }
  };

  return renderContent();
};

export default PremiumCustomerDashboard;
