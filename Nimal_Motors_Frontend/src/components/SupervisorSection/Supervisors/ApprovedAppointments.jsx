import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const ApprovedAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch appointments with status Approved or Complete
  const fetchAppointments = async () => {
    try {
      const res = await axios.get("http://localhost:5001/api/appointments/");
      const filtered = res.data.filter(
        (app) => app.status === "Approved" || app.status === "Complete"
      );
      setAppointments(filtered);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  // Mark appointment as Complete
  const handleComplete = async (serviceID) => {
    try {
      await axios.put(`http://localhost:5001/api/appointments/${serviceID}`, {
        status: "Complete",
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

  // Mark appointment as Not Complete (Approved)
  const handleNotComplete = async (serviceID) => {
    try {
      await axios.put(`http://localhost:5001/api/appointments/${serviceID}`, {
        status: "Approved",
      });

      setAppointments((prev) =>
        prev.map((a) =>
          a.serviceID === serviceID ? { ...a, status: "Approved" } : a
        )
      );

      Swal.fire("Updated!", "Appointment marked as not complete.", "success");
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
      <h2 className="text-3xl font-bold mb-6 text-center">
        Approved Appointments
      </h2>
      <table className="min-w-full table-auto border mb-6  bg-red">
        <thead className="bg-gray-200">
          <tr className="bg-red-200">
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
                {appointment.displayID ||
                  `SS${String(appointment.serviceID).padStart(3, "0")}`}
              </td>
              <td className="px-4 py-2 border">{appointment.customerName}</td>
              <td className="px-4 py-2 border">{appointment.vehicleNumber}</td>
              <td className="px-4 py-2 border">{appointment.contact.phone}</td>
              <td className="px-4 py-2 border">
                {new Date(appointment.serviceDate).toLocaleDateString()}
              </td>
              <td className="px-4 py-2 border">{appointment.time}</td>
              <td className="px-4 py-2 border bg-gray-200">
                <select
                  value={appointment.status}
                  onChange={(e) => {
                    const newStatus = e.target.value;
                    if (newStatus === "Complete") {
                      handleComplete(appointment.serviceID);
                    } else if (newStatus === "Approved") {
                      handleNotComplete(appointment.serviceID);
                    }
                  }}
                  style={{
                    backgroundColor:
                      appointment.status === "Complete" ? "#d1fae5" : "#fee2e2",
                    color: appointment.status === "Complete" ? "green" : "red",
                    padding: "0.25rem 0.5rem",
                    borderRadius: "6px",
                    border: "1px solid #ccc",
                  }}
                >
                  <option value="Approved">Not Complete</option>
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
