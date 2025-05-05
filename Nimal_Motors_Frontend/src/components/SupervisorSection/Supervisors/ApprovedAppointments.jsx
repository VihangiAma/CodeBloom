//Approved Appointments can only be marked as complete      

import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const ApprovedAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch only approved appointments
  const fetchAppointments = async () => {
    try {
      const res = await axios.get("http://localhost:5001/api/appointments/");
      const approved = res.data.filter((app) => app.status === "Approved");
      setAppointments(approved);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  // Handle setting status to 'Complete'
  const handleComplete = async (serviceID) => {
    try {
      await axios.put(`http://localhost:5001/api/appointments/${serviceID}`, {
        status: "Complete"
      });

      setAppointments((prev) =>
        prev.map((a) =>
          a.serviceID === serviceID ? { ...a, status: "Complete" } : a
        )
      );

      Swal.fire("Updated!", "Appointment marked as complete.", "success");
    } catch (error) {
      console.error(error);
      Swal.fire("Error!", "Failed to update status.", "error");
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  if (loading) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className="max-w-6xl mx-auto mt-10 p-6 bg-white shadow-md rounded-2xl">
      <h2 className="text-3xl font-bold mb-6 text-center">Approved Appointments</h2>
      <table className="min-w-full table-auto border mb-6">
        <thead className="bg-gray-200">
          <tr>
            <th className="px-4 py-2 border">Service ID</th>
            <th className="px-4 py-2 border">Customer</th>
            <th className="px-4 py-2 border">Vehicle No</th>
            <th className="px-4 py-2 border">Contact No</th>
            <th className="px-4 py-2 border">Date</th>
            <th className="px-4 py-2 border">Time</th>
            <th className="px-4 py-2 border">Status</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appointment) => (
            <tr key={appointment._id} className="text-center">
              <td className="px-4 py-2 border">
                {appointment.displayID || `SS${String(appointment.serviceID).padStart(3, "0")}`}
              </td>
              <td className="px-4 py-2 border">{appointment.customerName}</td>
              <td className="px-4 py-2 border">{appointment.vehicleNumber}</td>
              <td className="px-4 py-2 border">{appointment.phone}</td>
              <td className="px-4 py-2 border">
                {new Date(appointment.date).toLocaleDateString()}
              </td>
             
              <td className="px-4 py-2 border">{appointment.time}</td>
              <td className="px-4 py-2 border">
                <select
                  value={appointment.status === "Complete" ? "Complete" : "Not Complete yet"}
                  onChange={(e) => {
                    if (e.target.value === "Complete") {
                      handleComplete(appointment.serviceID);
                    }
                  }}
                  className="bg-gray-100 px-2 py-1 rounded"
                >
                  <option value="Not Complete yet">Not Complete yet</option>
                  <option value="Complete">Complete</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ApprovedAppointments;
