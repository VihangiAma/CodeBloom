import React, { useState } from "react";
import SalesReport from "./SalesReport";
import UsersReport from "./UserReport";

const ReportSection = ({ reportType, goBack }) => {
  return (
    <div className="p-8 min-h-[calc(100vh-8rem)]">
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold mb-6">{reportType}</h2>
        {reportType === "Financial Report" ? (
          <SalesReport />
        ) : reportType === "User Report" ? (
          <UsersReport />
        ) : null}
        <button
          onClick={goBack}
          className="mt-6 px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded transition"
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  );
};

const OperationDashboard = () => {
  const [activeReport, setActiveReport] = useState(null);

  const renderContent = () => {
    switch (activeReport) {
      case "financial":
        return (
          <ReportSection
            reportType="Financial Report"
            goBack={() => setActiveReport(null)}
          />
        );
      case "user":
        return (
          <ReportSection
            reportType="User Report"
            goBack={() => setActiveReport(null)}
          />
        );
      default:
        return (
          <>
            <h2 className="text-2xl font-bold mb-6">Operation Dashboard</h2>
            <button
              onClick={() => setActiveReport("financial")}
              className="px-6 py-4 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition flex items-center mb-4"
            >
              <span className="text-2xl mr-3">📈</span>
              <div className="text-left">
                <h3 className="font-bold">Financial Report</h3>
                <p className="text-sm opacity-90">View and analyze sales data</p>
              </div>
            </button>
            
            <button
              onClick={() => setActiveReport("user")}
              className="px-6 py-4 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition flex items-center"
            >
              <span className="text-2xl mr-3">👤</span>
              <div className="text-left">
                <h3 className="font-bold">User Report</h3>
                <p className="text-sm opacity-90">Analyze user activity</p>
              </div>
            </button>
          </>
        );
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Operation Dashboard</h1>
        </div>
      </header>
      <main>
        <div className="max-w-10xl mx-auto py-6 sm:px-6 lg:px-8">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default OperationDashboard;