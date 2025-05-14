import React, { useState, useEffect } from "react";
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

const ServiceHistoryTable = ({ customerName }) => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true); // Track loading state
  const [error, setError] = useState(null); // Track errors

  useEffect(() => {
    const fetchUserHistory = async () => {
      try {
        setLoading(true);
        setError(null);

        const [mechRes, bodyRes, elecRes, appRes] = await Promise.all([
          fetch('http://localhost:5001/api/mechanical'),
          fetch('http://localhost:5001/api/bodyshop'),
          fetch('http://localhost:5001/api/electrical'),
          fetch('http://localhost:5001/api/appointments'),
        ]);

        // Check if responses are OK
        if (!mechRes.ok || !bodyRes.ok || !elecRes.ok || !appRes.ok) {
          throw new Error('One or more API requests failed');
        }

        const [mechData, bodyData, elecData, appData] = await Promise.all([
          mechRes.json(),
          bodyRes.json(),
          elecRes.json(),
          appRes.json(),
        ]);

        // Log raw data for debugging
        console.log('API Data:', { mechData, bodyData, elecData, appData });
        console.log('Filtering for customerName:', customerName);

        const formatData = (data, section) =>
          data
            .filter((item) =>
              item.customerName
                ? item.customerName.trim().toLowerCase() === customerName.trim().toLowerCase()
                : false
            )
            .map((item) => ({
              customerName: item.customerName || 'N/A',
              displayID: item.displayID || 'N/A',
              contact: item.contact?.phone || item.contact || 'N/A',
              vehicleNumber: item.vehicleNumber || 'N/A',
              serviceDate: item.serviceDate ? item.serviceDate.slice(0, 10) : 'N/A',
              section,
            }));

        const userHistory = [
          ...formatData(mechData, 'Mechanical'),
          ...formatData(bodyData, 'BodyShop'),
          ...formatData(elecData, 'Electrical'),
          ...formatData(appData, 'Appointments'),
        ];

        // Log filtered history
        console.log('Filtered History:', userHistory);

        setHistory(userHistory);
      } catch (err) {
        console.error('Error fetching user history:', err);
        setError('Failed to fetch service history. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    if (customerName) {
      fetchUserHistory();
    } else {
      setError('No customer name provided.');
      setLoading(false);
    }
  }, [customerName]);

  return (
    <div className="p-6 bg-white shadow-md rounded-xl">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Your Service History</h2>
      {error ? (
        <div className="text-red-500 text-center py-4">{error}</div>
      ) : loading ? (
        <div className="text-gray-500 text-center py-4">Loading service history...</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-4 py-2 text-left">Customer Name</th>
                <th className="border px-4 py-2 text-left">Display ID</th>
                <th className="border px-4 py-2 text-left">Contact</th>
                <th className="border px-4 py-2 text-left">Vehicle Number</th>
                <th className="border px-4 py-2 text-left">Service Date</th>
                <th className="border px-4 py-2 text-left">Section</th>
              </tr>
            </thead>
            <tbody>
              {history.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center py-4 text-gray-500">
                    No Service History Found...
                  </td>
                </tr>
              ) : (
                history.map((record, idx) => (
                  <tr key={idx} className="hover:bg-gray-50">
                    <td className="border px-4 py-2">{record.customerName}</td>
                    <td className="border px-4 py-2">{record.displayID}</td>
                    <td className="border px-4 py-2">{record.contact}</td>
                    <td className="border px-4 py-2">{record.vehicleNumber}</td>
                    <td className="border px-4 py-2">{record.serviceDate}</td>
                    <td className="border px-4 py-2">{record.section}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

const PremiumCustomerDashboard = () => {
  const navigate = useNavigate();
  const [activePage, setActivePage] = useState("dashboard");
  // Replace with actual auth system (e.g., context, prop, or API)
  const loggedInUser = { customerName: "John Doe" }; // Mock; update with real user data

  const renderContent = () => {
    switch (activePage) {
      case "serviceHistory":
        return (
          <div className="p-8 bg-white rounded-xl shadow-lg m-4 min-h-screen">
            <div className="mb-6">
              <button
                onClick={() => setActivePage("dashboard")}
                className="px-5 py-2 bg-gradient-to-r from-sky-500 to-indigo-600 text-white font-semibold rounded hover:from-sky-600 hover:to-indigo-700 transition"
              >
                ⬅ Go Back
              </button>
            </div>
            <ServiceHistoryTable customerName={loggedInUser.customerName} />
          </div>
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
                onClick={() => navigate("/premium-customer")}
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