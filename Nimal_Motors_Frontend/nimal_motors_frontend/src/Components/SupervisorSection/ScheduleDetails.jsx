import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { FaEdit, FaTrashAlt } from "react-icons/fa";  // Import icons
import UpdateBookingForm from "./UpdateBookingForm";

const ScheduleDetails = ({ section }) => {
  const [appointments, setAppointments] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  useEffect(() => {
    fetchAppointments();
  }, [section]);

  const fetchAppointments = async () => {
    try {
      const response = await axios.get(`http://localhost:5001/api/${section}`);
      setAppointments(response.data);
    } catch (error) {
      console.error("Error fetching appointments", error);
    }
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to delete this appointment?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`http://localhost:5001/api/${section}/${id}`);
        Swal.fire({
          icon: "success",
          title: "Deleted!",
          text: "Appointment has been deleted.",
        });
        fetchAppointments();
      } catch (error) {
        console.error("Error deleting appointment", error);
        Swal.fire({
          icon: "error",
          title: "Failed!",
          text: "Could not delete appointment. Please try again.",
        });
      }
    }
  };

  const handleUpdate = (appointment) => {
    setIsEditing(true);
    setSelectedAppointment({
      serviceID: appointment.serviceID,
      customerName: appointment.customerName,
      vehicleID: appointment.vehicleID,
      serviceDate: appointment.serviceDate,
      serviceTime: appointment.serviceTime,
      description: appointment.description,
      status: appointment.status,
      contact: {
        phone: appointment.contact?.phone || "",
      },
      _id: appointment._id,
    });
  };

  const handleCancelUpdate = () => {
    setIsEditing(false);
    setSelectedAppointment(null);
  };

  const handleFormSubmit = async (updatedData) => {
    try {
      await axios.put(`http://localhost:5001/api/${section}/${selectedAppointment._id}`, updatedData);
      Swal.fire({
        icon: "success",
        title: "Updated!",
        text: "Appointment updated successfully.",
      });
      setIsEditing(false);
      fetchAppointments();
    } catch (error) {
      console.error("Error updating appointment", error);
      Swal.fire({
        icon: "error",
        title: "Failed!",
        text: "Could not update appointment. Please try again.",
      });
    }
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">
        {section.charAt(0).toUpperCase() + section.slice(1)} Appointment Schedule
      </h2>

      {isEditing ? (
        <div>
          <UpdateBookingForm
            existingBooking={selectedAppointment}
            isEditMode={true}
            onSubmit={handleFormSubmit}
            onCancel={handleCancelUpdate}
          />
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-separate border-spacing-0">
            <thead className="bg-gray-200">
              <tr>
                <th className="border px-4 py-2">Service ID</th>
                <th className="border px-4 py-2">Customer Name</th>
                <th className="border px-4 py-2">Vehicle ID</th>
                <th className="border px-4 py-2">Service Date</th>
                <th className="border px-4 py-2">Service Time</th>
                <th className="border px-4 py-2">Phone</th>
                <th className="border px-4 py-2">Status</th>
                <th className="border px-4 py-2">Description</th>
                <th className="border px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm text-gray-700">
              {appointments.map((appointment) => (
                <tr key={appointment._id} className="hover:bg-gray-100">
                  <td className="border px-4 py-2">{appointment.serviceID}</td>
                  <td className="border px-4 py-2">{appointment.customerName}</td>
                  <td className="border px-4 py-2">{appointment.vehicleID}</td>
                  <td className="border px-4 py-2">{new Date(appointment.serviceDate).toLocaleDateString()}</td>
                  <td className="border px-4 py-2">{appointment.serviceTime}</td>
                  <td className="border px-4 py-2">{appointment.contact?.phone || "N/A"}</td>
                  <td className="border px-4 py-2">{appointment.status}</td>
                  <td className="border px-4 py-2">{appointment.description}</td>
                  <td className="border px-4 py-2 flex justify-center space-x-2">
                    <button
                      onClick={() => handleUpdate(appointment)}
                      className="text-blue-500 hover:text-blue-700 p-2 rounded-md transition"
                    >
                      <FaEdit className="text-xl" />
                    </button>
                    <button
                      onClick={() => handleDelete(appointment._id)}
                      className="text-red-500 hover:text-red-700 p-2 rounded-md transition"
                    >
                      <FaTrashAlt className="text-xl" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ScheduleDetails;
