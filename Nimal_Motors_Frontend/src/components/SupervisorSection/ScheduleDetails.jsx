//Manage Mechanical,BodyShop,Eectrical Section Services.

import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { ImSpinner2 } from "react-icons/im";
import UpdateBookingForm from "./UpdateBookingForm";

const ScheduleDetails = ({ section }) => {
  const [appointments, setAppointments] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [updatingStatusId, setUpdatingStatusId] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [statusFilter, setStatusFilter] = useState("All");
  const [monthFilter, setMonthFilter] = useState("All");
  const [currentYear] = useState(new Date().getFullYear());

  useEffect(() => {
    fetchAppointments();
  }, [section]);

  useEffect(() => {
    applyFilters();
  }, [appointments, statusFilter, monthFilter]);

  const fetchAppointments = async () => {
    try {
      const response = await axios.get(`http://localhost:5001/api/${section}`);
      setAppointments(response.data);
    } catch (error) {
      console.error("Error fetching appointments", error);
    }
  };

  const applyFilters = () => {
    let filtered = [...appointments];
    if (statusFilter !== "All") {
      filtered = filtered.filter((a) => a.status === statusFilter);
    }
    if (monthFilter !== "All") {
      const month = new Date(`${monthFilter}-01`).getMonth();
      filtered = filtered.filter(
        (a) => new Date(a.serviceDate).getMonth() === month
      );
    }
    setFilteredAppointments(filtered);
  };

  const confirmDelete = (serviceID) => {
    setDeleteId(serviceID);
    setShowConfirmModal(true);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5001/api/${section}/${deleteId}`);
      fetchAppointments();
    } catch (error) {
      console.error("Error deleting appointment", error);
    } finally {
      setShowConfirmModal(false);
      setDeleteId(null);
    }
  };

  const handleUpdate = (appointment) => {
    setIsEditing(true);
    setSelectedAppointment({
      serviceID: appointment.serviceID,
      displayID: appointment.displayID,
      customerName: appointment.customerName,
      vehicleNumber: appointment.vehicleNumber,
      serviceDate: appointment.serviceDate,
      description: appointment.description,
      status: appointment.status,
      contact: {
        phone: appointment.contact?.phone || "",
      },
    });
  };

  const handleCancelUpdate = () => {
    setIsEditing(false);
    setSelectedAppointment(null);
  };

  const handleFormSubmit = async (updatedData) => {
    try {
      await axios.put(
        `http://localhost:5001/api/${section}/${selectedAppointment.serviceID}`,
        updatedData
      );
      setIsEditing(false);
      fetchAppointments();
    } catch (error) {
      console.error("Error updating appointment", error);
    }
  };

  const handleStatusChange = async (serviceID, newStatus) => {
    setUpdatingStatusId(serviceID);
    try {
      await axios.put(`http://localhost:5001/api/${section}/${serviceID}`, {
        status: newStatus,
      });
      fetchAppointments();
    } catch (error) {
      console.error("Error updating status", error);
    } finally {
      setUpdatingStatusId(null);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Completed":
        return "text-green-600 font-semibold";
      case "Pending":
        return "text-yellow-500 font-semibold";
      case "In Progress":
        return "text-blue-600 font-semibold";
      default:
        return "";
    }
  };

  const months = Array.from({ length: 12 }, (_, index) => {
    const date = new Date(currentYear, index, 1);
    return date.toLocaleString("default", { month: "long" });
  });

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4 capitalize">
        {section} Appointment Schedule
      </h2>

      {/* Filters */}
      <div className="mb-4 flex space-x-4">
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border border-gray-300 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="All">All Statuses</option>
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>

        <select
          value={monthFilter}
          onChange={(e) => setMonthFilter(e.target.value)}
          className="border border-gray-300 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="All">All Months</option>
          {months.map((month, index) => (
            <option key={index} value={`${currentYear}-${index + 1}`}>
              {month}
            </option>
          ))}
        </select>
      </div>

      {isEditing ? (
        <UpdateBookingForm
          existingBooking={selectedAppointment}
          isEditMode={true}
          onSubmit={handleFormSubmit}
          onCancel={handleCancelUpdate}
        />
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-separate border-spacing-0">
            <thead className="bg-gray-200">
              <tr className="bg-red-300 text-sm">
                <th className="border px-4 py-2">Service ID</th>
                <th className="border px-4 py-2">Customer Name</th>
                <th className="border px-4 py-2">Vehicle Number</th>
                <th className="border px-4 py-2">Service Date</th>
                <th className="border px-4 py-2">Phone</th>
                <th className="border px-4 py-2">Status</th>
                <th className="border px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm text-gray-700">
              {filteredAppointments.map((appointment) => (
                <tr key={appointment._id} className="hover:bg-gray-100">
                  <td className="border px-4 py-2">{appointment.displayID}</td>
                  <td className="border px-4 py-2">
                    {appointment.customerName}
                  </td>
                  <td className="border px-4 py-2">
                    {appointment.vehicleNumber}
                  </td>
                  <td className="border px-4 py-2">
                    {new Date(appointment.serviceDate).toLocaleDateString()}
                  </td>
                  <td className="border px-4 py-2">
                    {appointment.contact?.phone || "N/A"}
                  </td>
                  <td className="border px-4 py-2">
                    {updatingStatusId === appointment.serviceID ? (
                      <div className="flex justify-center">
                        <ImSpinner2 className="animate-spin text-blue-500 text-2xl" />
                      </div>
                    ) : (
                      <select
                        value={appointment.status}
                        onChange={(e) =>
                          handleStatusChange(
                            appointment.serviceID,
                            e.target.value
                          )
                        }
                        className={`border border-gray-300 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 ${getStatusColor(
                          appointment.status
                        )}`}
                      >
                        <option value="Pending">Pending</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                      </select>
                    )}
                  </td>
                  <td className="border px-4 py-2 flex justify-center space-x-2">
                    <button
                      onClick={() => handleUpdate(appointment)}
                      className="text-blue-500 hover:text-blue-700 p-2 rounded-md transition"
                    >
                      <FaEdit className="text-xl" />
                    </button>
                    <button
                      onClick={() => confirmDelete(appointment.serviceID)}
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

      {/* Delete Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full">
            <h3 className="text-lg font-semibold mb-4">Confirm Delete</h3>
            <p className="mb-6">
              Are you sure you want to delete this appointment?
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded-lg text-sm"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ScheduleDetails;
