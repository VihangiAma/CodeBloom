import React, { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import Swal from "sweetalert2";
import AddServiceForm from "./AddServiceForm"; 
import ScheduleDetails from "./ScheduleDetails"; 

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

const MechanicalSupervisorSection = () => {
  const [activePage, setActivePage] = useState("dashboard");

  const handleFormSubmit = async (formData) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "Do you want to add this service?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, add it!',
      cancelButtonText: 'Cancel',
    });

    if (result.isConfirmed) {
      try {
        await axios.post("http://localhost:5001/api/mechanical", formData);
        Swal.fire({
          icon: "success",
          title: "Service Added!",
          text: "The new service has been successfully added.",
          confirmButtonColor: "#3085d6",
        });
        setActivePage("dashboard");
      } catch (error) {
        console.error(error);
        Swal.fire({
          icon: "error",
          title: "Failed!",
          text: "Could not add service. Please try again.",
          confirmButtonColor: "#d33",
        });
      }
    }
  };

  const renderContent = () => {
    switch (activePage) {
      case "schedules":
        return (
          <div className="p-6">
            <button
              onClick={() => setActivePage("dashboard")}
              className="px-6 py-2 bg-gray-600 text-white rounded-full hover:bg-gray-700 mb-4"
            >
              Back to Dashboard
            </button>
            <ScheduleDetails section="mechanical" />
          </div>
        );
      case "addservice":
        return (
          <div className="p-6">
            <button
              onClick={() => setActivePage("dashboard")}
              className="px-6 py-2 bg-gray-600 text-white rounded-full hover:bg-gray-700 mb-4"
            >
              Back to Dashboard
            </button>
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white p-8 rounded-2xl shadow-2xl"
            >
              <AddServiceForm onSubmit={handleFormSubmit} />
            </motion.div>
          </div>
        );
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 p-8">
            <DashboardCard
              title="Add Service"
              description="Add a new mechanical service."
              color="bg-blue-500"
              emoji="➕"
              onClick={() => setActivePage("addservice")}
            />
            <DashboardCard
              title="Manage Appointments"
              description="View and manage customer bookings."
              color="bg-green-500"
              emoji="📅"
              onClick={() => setActivePage("schedules")}
            />
            <DashboardCard
              title="View Progress"
              description="Track service progress of vehicles."
              color="bg-yellow-500"
              emoji="🔄"
              onClick={() => setActivePage("progress")}
            />
            <DashboardCard
              title="View Reports"
              description="Generate and review service reports."
              color="bg-purple-500"
              emoji="📋"
              onClick={() => setActivePage("report")}
            />
          </div>
        );
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-8">Mechanical Service Section</h2>
      {renderContent()}
    </div>
  );
};

export default MechanicalSupervisorSection;
