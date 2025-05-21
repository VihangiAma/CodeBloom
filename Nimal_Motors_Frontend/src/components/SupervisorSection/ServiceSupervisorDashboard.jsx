import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AppointmentDetails from "./Supervisors/AppointmentDetails";
import ApprovedAppointments from "./Supervisors/ApprovedAppointments";
import Completedappoinments from "./Supervisors/Competedappoinments";
import AddCustomer from "./Supervisors/AddCustomer";
//import { FaListAlt, FaCheckCircle, FaSpinner, FaClock } from "react-icons/fa";

const DashboardCard = ({ title, description, emoji, color, onClick }) => (
  <div
    onClick={onClick}
    className={`cursor-pointer ${color} text-white rounded-2xl shadow-xl p-8 transform hover:scale-105 transition duration-300 flex flex-col justify-between`}
  >
    <div className="text-5xl mb-4">{emoji}</div>
    <h2 className="text-2xl font-bold mb-2">{title}</h2>
    <p className="opacity-90">{description}</p>
  </div>
);

const ServiceSupervisorDashboard = () => {
  const navigate = useNavigate();

  const [activePage, setActivePage] = useState("dashboard");
  // const [stats, setStats] = useState({
  //   total: 0,
  //   completed: 0,
  //   pending: 0,
  //   inProgress: 0,
  // });
  // const [showProgressFetcher, setShowProgressFetcher] = useState(true);

  // useEffect(() => {
  //   if (activePage === "dashboard") {
  //     setShowProgressFetcher(true);
  //   }
  // }, [activePage]);

  // const handleStatsUpdate = (data) => {
  //   setStats(data);
  //   setShowProgressFetcher(false);
  // };


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
      

      case "report":
        return (
          <div className="text-gray-600 p-8 text-center text-xl">
            {activePage === "report"
              ? "Report page coming soon..."
              : "Invoices page coming soon..."}
          </div>
        );
      case "addservice":
        return (
          <div className="text-gray-600 p-8 text-center text-xl">
            <AddCustomer
              goBack={() => setActivePage("dashboard")}
              sectionPrefix="service"
              section="appointments"
            />
          </div>
        );
      default:
        return (
          <>
          {/* Progress Summary Cards */}
          {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 px-4">
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
            </div> */}
          {/* Dashboard Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-8">
            <DashboardCard
              title="Add Customer"
              description="Add a new customer details."
              color="bg-blue-500"
              emoji="➕"
              onClick={() => setActivePage("addservice")}
            />
            <DashboardCard
              title="Manage Appointments"
              description="View and manage customer bookings."
              color="bg-green-500"
              emoji="📅"
              onClick={() => setActivePage("appointments")}
            />
            <DashboardCard
              title="View Reports"
              description="Generate and review service reports."
              color="bg-purple-500"
              emoji="📋"
              onClick={() => setActivePage("report")}
            />
            <DashboardCard
              title="View Invoice"
              description="View invoices of vehicles."
              color="bg-yellow-500"
              emoji="💰"
              onClick={() => setActivePage("invoices")}
            />
            <DashboardCard
              title="Approved Appointments"
              description="Track approved appointments."
              color="bg-indigo-500"
              emoji="✅"
              onClick={() => setActivePage("approved")}
            />
          </div>
          {/* Progress Updater */}
          {/* {showProgressFetcher && (
              <Progress
                section="appointments"
                onStatsUpdate={handleStatsUpdate}
              />
            )} */}
          </>
        );
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white flex flex-col justify-between">
        <div>
          {/* Company Name */}
          <div className="flex items-center p-6 space-x-3">
          <h1 className="text-2xl font-extrabold text-gray-300 mb-6">
          🚗 NIMAL MOTORS
        </h1>
          </div>

          {/* Navigation */}
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
                  Add Customer Details
                </button>
              </li>
              <li>
                <button
                  className={`w-full text-left px-4 py-2 rounded hover:bg-gray-700 ${
                    activePage === "appointments" && "bg-gray-700"
                  }`}
                  onClick={() => setActivePage("appointments")}
                >
                  Manage Appointments
                </button>
              </li>
              <li>
                <button
                  className={`w-full text-left px-4 py-2 rounded hover:bg-gray-700 ${
                    activePage === "report" && "bg-gray-700"
                  }`}
                  onClick={() => setActivePage("report")}
                >
                  View Reports
                </button>
              </li>
              <li>
                <button
                  className={`w-full text-left px-4 py-2 rounded hover:bg-gray-700 ${
                    activePage === "invoices" && "bg-gray-700"
                  }`}
                  onClick={() => setActivePage("invoices")}
                >
                  View Invoices
                </button>
              </li>
              <li>
                <button
                  className={`w-full text-left px-4 py-2 rounded hover:bg-gray-700 ${
                    activePage === "approved" && "bg-gray-700"
                  }`}
                  onClick={() => setActivePage("approved")}
                >
                  Approved Appointments
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        {/* Header */}
        <div className="bg-white shadow flex justify-between items-center px-6 py-4">
          <h2 className="text-2xl font-bold text-gray-800">
            Service Service Section
          </h2>
          <div className="flex items-center space-x-4">
            <button
              className="hover:text-blue-600 text-gray-700 text-xl"
              title="Notifications"
              onClick={() => navigate("/notification")}
            >
              🔔
            </button>
            <button
              className="hover:text-blue-600 text-gray-700 text-xl"
              title="Profile"
              onClick={() => navigate("/service-supervisor")}
            >
              👤
            </button>
            <button
              className="hover:text-red-600 text-gray-700 text-xl"
              title="Logout"
              onClick={() => navigate("/login")}
            >
              LogOut
            </button>
          </div>
        </div>

        {/* Page Content */}
        <div className="p-6">{renderContent()}</div>
      </div>
    </div>
  );
};

export default ServiceSupervisorDashboard;
