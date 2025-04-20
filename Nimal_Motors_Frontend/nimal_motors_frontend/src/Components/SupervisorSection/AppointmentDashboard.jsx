import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2"; // SweetAlert2 for confirmation popups

const AppointmentDashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  // Fetch appointments from the server
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

  // Approve an appointment
  const approveAppointment = async (id) => {
    try {
      await axios.put(`http://localhost:5001/api/appointments/${id}`, { status: "Approved" });
      fetchAppointments();
    } catch (error) {
      console.error(error);
      setErrorMessage("Failed to approve appointment.");
    }
  };

  // Reject an appointment
  const rejectAppointment = async (id) => {
    try {
      await axios.put(`http://localhost:5001/api/appointments/${id}`, { status: "Rejected" });
      fetchAppointments();
    } catch (error) {
      console.error(error);
      setErrorMessage("Failed to reject appointment.");
    }
  };

  // Delete an appointment after confirmation
  const deleteAppointment = async (id) => {
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
        await axios.delete(`http://localhost:5001/api/appointments/${id}`);
        fetchAppointments(); // Refresh the list after deletion
        Swal.fire(
          'Deleted!',
          'Appointment has been deleted.',
          'success'
        );
      } catch (error) {
        console.error(error);
        Swal.fire(
          'Failed!',
          'Could not delete the appointment.',
          'error'
        );
      }
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  if (loading) return <div className="text-center mt-10">Loading...</div>;

  const pendingAppointments = appointments.filter(app => app.status === "Pending");
  const approvedAppointments = appointments.filter(app => app.status === "Approved");
  const rejectedAppointments = appointments.filter(app => app.status === "Rejected");

  return (
    <div className="max-w-7xl mx-auto mt-10 p-6 bg-white shadow-2xl rounded-2xl">
      <h2 className="text-3xl font-bold mb-6 text-center">Appointments Dashboard</h2>

      {errorMessage && (
        <div className="bg-red-100 text-red-700 p-2 mb-4 rounded">{errorMessage}</div>
      )}

      <Section 
        title="Pending Appointments" 
        appointments={pendingAppointments} 
        onApprove={approveAppointment} 
        onReject={rejectAppointment} 
        onDelete={deleteAppointment} 
      />
      <Section 
        title="Approved Appointments" 
        appointments={approvedAppointments} 
        onDelete={deleteAppointment} 
      />
      <Section 
        title="Rejected Appointments" 
        appointments={rejectedAppointments} 
        onDelete={deleteAppointment} 
      />
    </div>
  );
};

// Section component to display appointment details
const Section = ({ title, appointments, onApprove, onReject, onDelete }) => (
  <div className="mb-10">
    <h3 className="text-2xl font-semibold mb-4">{title}</h3>
    {appointments.length === 0 ? (
      <div className="text-center text-gray-600">No appointments found.</div>
    ) : (
      <table className="min-w-full table-auto border mb-6">
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
                {onApprove && onReject && appointment.status === "Pending" ? (
                  <>
                    <button
                      onClick={() => onApprove(appointment._id)}
                      className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 mr-2"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => onReject(appointment._id)}
                      className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                    >
                      Reject
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => onDelete(appointment._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    )}
  </div>
);

export default AppointmentDashboard;
