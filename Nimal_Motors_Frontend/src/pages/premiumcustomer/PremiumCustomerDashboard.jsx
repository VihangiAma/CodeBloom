import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PremiumServiceForm from "./PremiumServiceForm";

const DashboardCard = ({ title, description, emoji, color, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`cursor-pointer ${color} text-white rounded-2xl shadow-lg p-6 md:p-8 transform hover:scale-105 transition duration-300 ease-in-out flex flex-col justify-between hover:brightness-110`}
    >
      <div className="text-6xl mb-4 drop-shadow-md">{emoji}</div>
      <h2 className="text-2xl font-bold mb-2">{title}</h2>
      <p className="text-sm opacity-90">{description}</p>
    </div>
  );
};

const FeaturePage = ({ title, content, goBack }) => {
  return (
    <div className="p-8 bg-white rounded-xl shadow-lg m-4 min-h-screen">
      <h2 className="text-3xl font-extrabold mb-4 text-gray-800">{title}</h2>
      <p className="text-gray-600">{content}</p>
      <div className="mt-6">
        <button
          onClick={goBack}
          className="px-5 py-2 bg-gradient-to-r from-sky-500 to-indigo-600 text-white font-semibold rounded hover:from-sky-600 hover:to-indigo-700 transition"
        >
          ⬅ Go Back
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
      case "serviceHistory":
        return (
          <FeaturePage
            title="Service History"
            content="View all past service records and invoices."
            goBack={() => setActivePage("dashboard")}
          />
        );
      case "addservice":
        return (
          <div className="p-8 bg-white rounded-xl shadow-lg m-4 min-h-screen">
            <div className="mb-6">
              <button
                onClick={() => setActivePage("dashboard")}
                className="px-5 py-2 bg-gradient-to-r from-rose-400 to-pink-500 text-white rounded font-medium hover:from-rose-500 hover:to-pink-600 transition"
              >
                ⬅ Back to Dashboard
              </button>
            </div>
            <PremiumServiceForm
              onSubmit={(data) => {
                console.log("Submitted service:", data);
                setActivePage("dashboard");
              }}
              isEditMode={false}
            />
          </div>
        );
      default:
        return (
          <div className="min-h-screen bg-gray-50 p-6 md:p-10 flex flex-col justify-start">
            <div className="flex items-center justify-between mb-10">
              <h1 className="text-4xl font-extrabold text-gray-800">
                Premium Customer Dashboard
              </h1>
              <button
                onClick={() => navigate("/premium-customer")}
                className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded hover:from-cyan-600 hover:to-blue-700 transition"
              >
                ⬅ Back to Profile
              </button>
            </div>

            <div className="mb-8 text-lg text-gray-600">
              Welcome back! Choose one of the options below to continue:
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <DashboardCard
                title="My Profile"
                description="Manage your personal information."
                color="bg-gradient-to-r from-indigo-500 to-blue-600"
                emoji="👤"
                onClick={() => navigate("/premium-customer")} // 👈 updated
              />
              <DashboardCard
                title="Service History"
                description="Review your past services and part replacements."
                color="bg-gradient-to-r from-fuchsia-500 to-pink-600"
                emoji="🛠️"
                onClick={() => setActivePage("serviceHistory")}
              />
              <DashboardCard
                title="Add Service"
                description="Add a new body-shop service."
                color="bg-gradient-to-r from-emerald-500 to-teal-600"
                emoji="➕"
                onClick={() => setActivePage("addservice")}
              />
            </div>
          </div>
        );
    }
  };

  return renderContent();
};

export default PremiumCustomerDashboard;
