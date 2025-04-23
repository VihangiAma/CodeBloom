import React, { useState } from "react";
import AppointmentDetails from "./Supervisors/AppointmentDetails";

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

const ServiceSupervisorDashboard = () => {
  const [activePage, setActivePage] = useState("dashboard");

  const renderContent = () => {
    switch (activePage) {
      case "appointments":
        return <AppointmentDetails view="all" goBack={() => setActivePage("dashboard")} />;
      case "approved":
        return <AppointmentDetails view="approved" goBack={() => setActivePage("dashboard")} />;
        const approveAppointment = async (id) => {
          try {
            await axios.put(`http://localhost:5001/api/appointments/${id}`, { status: "Approved" });
            fetchAppointments();
          } catch (error) {
            console.error(error);
            setErrorMessage("Failed to approve appointment.");
          }
        };
      case "progress":
        return (
          <div className="text-gray-600 p-8 text-center text-xl">
            Progress page coming soon...
          </div>
        );
      case "report":
        return (
          <div className="text-gray-600 p-8 text-center text-xl">
            Report page coming soon...
          </div>
        );
      default:
        return (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-8">
            <DashboardCard
              title="View Progress"
              description="Track service progress of vehicles."
              color="bg-blue-500"
              emoji="🔄"
              onClick={() => setActivePage("progress")}
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
              title="Approved Appointments"
              description="View and track approved customer appointments."
              color="bg-yellow-500"
              emoji="✅"
              onClick={() => setActivePage("approved")}
            />
          </div>
        );
    }
  };

  return renderContent();
};

export default ServiceSupervisorDashboard;
