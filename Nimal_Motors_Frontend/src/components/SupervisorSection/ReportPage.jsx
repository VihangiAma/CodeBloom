import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ReportPage = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    // Fetch all appointments
    axios.get('http://localhost:5001/api/appointments')
      .then(response => {
        setAppointments(response.data);
      })
      .catch(error => {
        console.error('Error fetching appointments:', error);
      });
  }, []);

  // Example small calculations:
  const totalAppointments = appointments.length;
  const upcomingAppointments = appointments.filter(app => new Date(app.date) >= new Date()).length;
  const todayAppointments = appointments.filter(app => {
    const today = new Date();
    const appDate = new Date(app.date);
    return appDate.toDateString() === today.toDateString();
  }).length;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Report Dashboard</h1>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Total Appointments */}
        <div className="bg-indigo-500 text-white p-6 rounded-2xl shadow-lg text-center">
          <h2 className="text-xl font-semibold mb-2">Total Appointments</h2>
          <p className="text-4xl">{totalAppointments}</p>
        </div>

        {/* Upcoming Appointments */}
        <div className="bg-purple-500 text-white p-6 rounded-2xl shadow-lg text-center">
          <h2 className="text-xl font-semibold mb-2">Upcoming Appointments</h2>
          <p className="text-4xl">{upcomingAppointments}</p>
        </div>

        {/* Today's Appointments */}
        <div className="bg-pink-500 text-white p-6 rounded-2xl shadow-lg text-center">
          <h2 className="text-xl font-semibold mb-2">Today's Appointments</h2>
          <p className="text-4xl">{todayAppointments}</p>
        </div>
      </div>
    </div>
  );
};

export default ReportPage;
