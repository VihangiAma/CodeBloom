import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from 'sweetalert2';

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

  // const approveAppointment = async (id) => {
  //   try {
  //     await axios.put(`http://localhost:5001/api/appointments/${id}`, { status: "Approved" });
  //     fetchAppointments();
  //   } catch (error) {
  //     console.error(error);
  //     setErrorMessage("Failed to approve appointment.");
  //   }
  // };

  // const rejectAppointment = async (id) => {
  //   try {
  //     await axios.put(`http://localhost:5001/api/appointments/${id}`, { status: "Rejected" });
  //     fetchAppointments();
  //   } catch (error) {
  //     console.error(error);
  //     setErrorMessage("Failed to reject appointment.");
  //   }
  // };
  const approveAppointment = async (id) => {
    try {
      await axios.put(`http://localhost:5001/api/appointments/${id}`, { status: "Approved" });
      fetchAppointments();
      Swal.fire({
        icon: 'success',
        title: 'Appointment Approved!',
        showConfirmButton: false,
        timer: 1500
      });
    } catch (error) {
      console.error(error);
      setErrorMessage("Failed to approve appointment.");
      Swal.fire({
        icon: 'error',
        title: 'Approval Failed!',
        text: 'Something went wrong.',
      });
    }
  };
  
  const rejectAppointment = async (id) => {
    try {
      await axios.put(`http://localhost:5001/api/appointments/${id}`, { status: "Rejected" });
      fetchAppointments();
      Swal.fire({
        icon: 'success',
        title: 'Appointment Rejected!',
        showConfirmButton: false,
        timer: 1500
      });
    } catch (error) {
      console.error(error);
      setErrorMessage("Failed to reject appointment.");
      Swal.fire({
        icon: 'error',
        title: 'Rejection Failed!',
        text: 'Something went wrong.',
      });
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

      <Section title="Pending Appointments" appointments={pendingAppointments} onApprove={approveAppointment} onReject={rejectAppointment} />
      <Section title="Approved Appointments" appointments={approvedAppointments} />
      <Section title="Rejected Appointments" appointments={rejectedAppointments} />
    </div>
  );
};

const Section = ({ title, appointments, onApprove, onReject }) => (
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
            {onApprove && onReject ? <th className="px-4 py-2 border">Actions</th> : <th className="px-4 py-2 border">Status</th>}
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
              {onApprove && onReject ? (
                <td className="px-4 py-2 border">
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
                </td>
              ) : (
                <td className="px-4 py-2 border">{appointment.status}</td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    )}
  </div>
);

export default AppointmentDashboard;
