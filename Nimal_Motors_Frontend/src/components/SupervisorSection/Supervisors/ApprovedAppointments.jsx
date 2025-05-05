import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const ApprovedAppointments = ({ goBack }) => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const fetchAppointments = async () => {
    try {
      const res = await axios.get("http://localhost:5001/api/appointments/");
      const approved = res.data.filter((app) => app.status === "Approved");
      setAppointments(approved);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setErrorMessage("Failed to fetch appointments.");
      setLoading(false);
    }
  };

  const deleteAppointment = async (serviceID) => {
    const confirmResult = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    });

    if (confirmResult.isConfirmed) {
      try {
        await axios.delete(`http://localhost:5001/api/appointments/${serviceID}`);
        fetchAppointments();
        Swal.fire('Deleted!', 'Appointment has been deleted.', 'success');
      } catch (error) {
        console.error(error);
        Swal.fire('Failed!', 'Could not delete the appointment.', 'error');
      }
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  if (loading) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className="max-w-7xl mx-auto mt-10 p-6 bg-white shadow-2xl rounded-2xl">
      <h2 className="text-3xl font-bold mb-6 text-center">Approved Appointments</h2>

      {errorMessage && (
        <div className="bg-red-100 text-red-700 p-2 mb-4 rounded">{errorMessage}</div>
      )}

      <table className="min-w-full table-auto border mb-6">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2 border">Service ID</th>
            <th className="px-4 py-2 border">Customer</th>
            <th className="px-4 py-2 border">Phone</th>
            <th className="px-4 py-2 border">Vehicle No.</th>
            <th className="px-4 py-2 border">Vehicle Type</th>
            <th className="px-4 py-2 border">Date</th>
            <th className="px-4 py-2 border">Time Slot</th>
            <th className="px-4 py-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appointment) => (
            <tr key={appointment._id} className="text-center">
              <td className="px-4 py-2 border font-medium">
                {appointment.displayID || `SS${String(appointment.serviceID).padStart(3, "0")}`}
              </td>
              <td className="px-4 py-2 border">{appointment.customerName}</td>
              <td className="px-4 py-2 border">{appointment.phone}</td>
              <td className="px-4 py-2 border">{appointment.vehicleNumber}</td>
              <td className="px-4 py-2 border">{appointment.vehicleType}</td>
              <td className="px-4 py-2 border">{new Date(appointment.date).toLocaleDateString()}</td>
              <td className="px-4 py-2 border">{appointment.time}</td>
              <td className="px-4 py-2 border">
                <button
                  onClick={() => deleteAppointment(appointment.serviceID)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ApprovedAppointments;
