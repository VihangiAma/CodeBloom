import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

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

const ReportSection = ({ reportType, goBack }) => {
  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6">{reportType}</h2>
      {reportType === "Sales Report" ? (
        <SalesReport />
      ) : (
        <p>Displaying {reportType} data...</p>
      )}
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
      case "specialOffers":
        return (
          <div className="text-gray-600 p-8 text-center text-xl">
            Special Offers for Premium Customers coming soon...
            <div className="mt-4">
              <button
                onClick={() => setActivePage("dashboard")}
                className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded"
              >
                Go Back
              </button>
            </div>
          </div>
        );
      case "prioritySupport":
        return (
          <div className="text-gray-600 p-8 text-center text-xl">
            Priority Support page coming soon...
            <div className="mt-4">
              <button
                onClick={() => setActivePage("dashboard")}
                className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded"
              >
                Go Back
              </button>
            </div>
          </div>
        );
      case "salesReport":
        return (
          <ReportSection
            reportType="Sales Report"
            goBack={() => setActivePage("dashboard")}
          />
        );
      case "premiumOffers":
        return (
          <ReportSection
            reportType="Exclusive Premium Offers"
            goBack={() => setActivePage("dashboard")}
          />
        );
      case "premiumSupport":
        return (
          <ReportSection
            reportType="Premium Support"
            goBack={() => setActivePage("dashboard")}
          />
        );
      default:
        return (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-8">
            <DashboardCard
              title="Special Offers"
              description="Exclusive offers just for Premium customers."
              color="bg-blue-500"
              emoji="🎁"
              onClick={() => setActivePage("specialOffers")}
            />
            <DashboardCard
              title="Priority Support"
              description="Get priority assistance from our support team."
              color="bg-indigo-500"
              emoji="🚑"
              onClick={() => setActivePage("prioritySupport")}
            />
            <DashboardCard
              title="Sales Report"
              description="View and analyze sales data for Premium customers."
              color="bg-purple-500"
              emoji="📈"
              onClick={() => setActivePage("salesReport")}
            />
            <DashboardCard
              title="Exclusive Premium Offers"
              description="View exclusive offers for Premium members."
              color="bg-green-500"
              emoji="💎"
              onClick={() => setActivePage("premiumOffers")}
            />
            <DashboardCard
              title="Premium Support"
              description="Access dedicated support channels."
              color="bg-yellow-500"
              emoji="👩‍💻"
              onClick={() => setActivePage("premiumSupport")}
            />
          </div>
        );
    }
  };

  return renderContent();
};

export default PremiumCustomerDashboard;
