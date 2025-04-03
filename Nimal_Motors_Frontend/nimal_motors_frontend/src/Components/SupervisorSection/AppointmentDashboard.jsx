import React, { useEffect, useState } from "react";

const AppointmentTable = () => {
  const [appointments, setAppointments] = useState([]);

  // Fetch appointments from the database
  useEffect(() => {
    fetch("http://localhost:5000/api/appointments")  // Change this URL to your API endpoint
      .then((res) => res.json())
      .then((data) => setAppointments(data))
      .catch((error) => console.error("Error fetching appointments:", error));
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Appointment Details</h2>
      <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-3 text-left">Appointment ID</th>
            <th className="p-3 text-left">Customer Name</th>
            <th className="p-3 text-left">Vehicle ID</th>
            <th className="p-3 text-left">Date</th>
            <th className="p-3 text-left">Time</th>
            <th className="p-3 text-left">Status</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appointment) => (
            <tr key={appointment.id} className="border-b hover:bg-gray-100">
              <td className="p-3">{appointment.id}</td>
              <td className="p-3">{appointment.customerName}</td>
              <td className="p-3">{appointment.vehicleId}</td>
              <td className="p-3">{new Date(appointment.date).toLocaleDateString()}</td>
              <td className="p-3">{appointment.time}</td>
              <td className="p-3 text-blue-600">{appointment.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AppointmentTable;
