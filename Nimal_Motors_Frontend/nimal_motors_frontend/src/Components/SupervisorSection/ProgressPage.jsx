import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProgressPage = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    // Fetch all appointments
    axios.get('http://localhost:5000/api/appointments')
      .then(response => {
        setAppointments(response.data);
      })
      .catch(error => {
        console.error('Error fetching appointments:', error);
      });
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Progress Dashboard</h1>

      {/* Cards Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Total Appointments */}
        <div className="bg-blue-500 text-white p-6 rounded-2xl shadow-lg text-center">
          <h2 className="text-xl font-semibold mb-2">Total Appointments</h2>
          <p className="text-4xl">{appointments.length}</p>
        </div>

        {/* Completed Services */}
        <div className="bg-green-500 text-white p-6 rounded-2xl shadow-lg text-center">
          <h2 className="text-xl font-semibold mb-2">Completed Services</h2>
          <p className="text-4xl">
            {appointments.filter(app => app.status === 'Completed').length}
          </p>
        </div>

        {/* Pending Services */}
        <div className="bg-yellow-500 text-white p-6 rounded-2xl shadow-lg text-center">
          <h2 className="text-xl font-semibold mb-2">Pending Services</h2>
          <p className="text-4xl">
            {appointments.filter(app => !app.status || app.status === 'Pending').length}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProgressPage;
