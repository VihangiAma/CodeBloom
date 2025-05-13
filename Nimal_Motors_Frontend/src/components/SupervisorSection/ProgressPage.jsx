import React, { useState, useEffect } from "react";
import axios from "axios";

const ProgressPage = ({ section, onStatsUpdate, showVisual = false }) => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    fetchAppointments();
  }, [section]);

  const fetchAppointments = async () => {
    try {
      const response = await axios.get(`http://localhost:5001/api/${section}`);
      setAppointments(response.data);

      const total = response.data.length;
      const completed = response.data.filter(app => app.status === "Completed").length;
      const pending = response.data.filter(app => app.status === "Pending").length;
      const inProgress = response.data.filter(app => app.status === "In Progress").length;

      if (onStatsUpdate) {
        onStatsUpdate({ total, completed, pending, inProgress });
      }
    } catch (error) {
      console.error("Error fetching appointments", error);
    }
  };

  if (!showVisual) return null;

  const totalAppointments = appointments.length;
  const completedAppointments = appointments.filter(app => app.status === "Completed").length;
  const pendingAppointments = appointments.filter(app => app.status === "Pending").length;
  const inProgressAppointments = appointments.filter(app => app.status === "In Progress").length;

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Progress Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-blue-500 text-white p-6 rounded-2xl shadow-lg text-center">
          <h2 className="text-xl font-semibold mb-2">Total Appointments</h2>
          <p className="text-5xl">{totalAppointments}</p>
        </div>

        <div className="bg-green-500 text-white p-6 rounded-2xl shadow-lg text-center">
          <h2 className="text-xl font-semibold mb-2">Completed</h2>
          <p className="text-5xl">{completedAppointments}</p>
        </div>

        <div className="bg-yellow-400 text-white p-6 rounded-2xl shadow-lg text-center">
          <h2 className="text-xl font-semibold mb-2">In Progress</h2>
          <p className="text-5xl">{inProgressAppointments}</p>
        </div>

        <div className="bg-red-400 text-white p-6 rounded-2xl shadow-lg text-center">
          <h2 className="text-xl font-semibold mb-2">Pending</h2>
          <p className="text-5xl">{pendingAppointments}</p>
        </div>
      </div>
    </div>
  );
};

export default ProgressPage;
