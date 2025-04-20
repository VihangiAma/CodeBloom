import React, { useEffect, useState } from "react";
import axios from "axios";

const AppointmentDashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const fetchAppointments = async () => {
    try {
      const res = await axios.get("http://localhost:5001/api/appointments");
      setAppointments(res.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setErrorMessage("Failed to fetch appointments.");
      setLoading(false);
    }
  };

  const deleteAppointment = async (id) => {
    if (!window.confirm("Are you sure you want to delete this appointment?")) return;

    try {
      await axios.delete("http://localhost:5001/api/appointments/${id}");
      setAppointments(appointments.filter((app) => app._id !== id));
    } catch (error) {
      console.error(error);
      setErrorMessage("Failed to delete appointment.");
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  if (loading) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className="max-w-7xl mx-auto mt-10 p-6 bg-white shadow-2xl rounded-2xl">
      <h2 className="text-3xl font-bold mb-6 text-center">Appointments Dashboard</h2>

      {errorMessage && (
        <div className="bg-red-100 text-red-700 p-2 mb-4 rounded">{errorMessage}</div>
      )}

      <table className="min-w-full table-auto border">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2 border">Customer</th>
            <th className="px-4 py-2 border">Phone</th>
            <th className="px-4 py-2 border">Vehicle ID</th>
            <th className="px-4 py-2 border">Vehicle Type</th>
            <th className="px-4 py-2 border">Date</th>
            <th className="px-4 py-2 border">Time Slot</th>
            <th className="px-4 py-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appointment) => (
            <tr key={appointment._id} className="text-center">
              <td className="px-4 py-2 border">{appointment.customerName}</td>
              <td className="px-4 py-2 border">{appointment.phone}</td>
              <td className="px-4 py-2 border">{appointment.vehicleID}</td>
              <td className="px-4 py-2 border">{appointment.vehicleType}</td>
              <td className="px-4 py-2 border">{new Date(appointment.date).toLocaleDateString()}</td>
              <td className="px-4 py-2 border">{appointment.time}</td>
              <td className="px-4 py-2 border">
                <button
                  onClick={() => deleteAppointment(appointment._id)}
                  className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {appointments.length === 0 && (
        <div className="text-center mt-6 text-gray-600">No appointments found.</div>
      )}
    </div>
  );
};

export default AppointmentDashboard;
