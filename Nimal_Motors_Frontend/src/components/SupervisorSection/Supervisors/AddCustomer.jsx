import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const AddCustomer = ({ onSubmit, existingBooking, isEditMode, onDelete }) => {
  const initialFormState = {
    customerName: "",
    address: "",
    contact: {
      phone: "",
      email: "",
    },
    vehicleNumber: "",
    vehicleType: "",
    serviceDate: "",
    time: "",
  };

  const [formData, setFormData] = useState(initialFormState);

  const timeSlots = [
    "8.00 am-10.00 am",
    "10.00 am-12.00 pm",
    "1.00 pm-3.00 pm",
    "3.00 pm-5.00 pm",
  ];
  const vehicleTypes = ["Car", "Van"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "phone" || name === "email") {
      setFormData({
        ...formData,
        contact: {
          ...formData.contact,
          [name]: value,
        },
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const validateForm = () => {
    const nameRegex = /^[A-Za-z\s]+$/;
    const phoneRegex = /^[0-9]{10}$/;
    const vehicleNumberRegex = /^[A-Z]{2,3}-\d{3,4}$/i;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!nameRegex.test(formData.customerName.trim())) {
      Swal.fire(
        "Invalid Input",
        "Only letters and spaces allowed in name.",
        "warning"
      );
      return false;
    }
    if (formData.address.trim().length < 5) {
      Swal.fire(
        "Invalid Input",
        "Address must be at least 5 characters.",
        "warning"
      );
      return false;
    }
    if (!phoneRegex.test(formData.contact.phone.trim())) {
      Swal.fire("Invalid Input", "Invalid phone number.", "warning");
      return false;
    }
    if (
      formData.contact.email &&
      !emailRegex.test(formData.contact.email.trim())
    ) {
      Swal.fire("Invalid Input", "Invalid email format.", "warning");
      return false;
    }
    if (!vehicleNumberRegex.test(formData.vehicleNumber.trim())) {
      Swal.fire(
        "Invalid Input",
        "Vehicle Number format must be like ABC-1234.",
        "warning"
      );
      return false;
    }
    if (!formData.vehicleType || !formData.serviceDate || !formData.time) {
      Swal.fire(
        "Missing Field",
        "Please fill in all required fields.",
        "warning"
      );
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      await axios.post("http://localhost:5001/api/appointments", formData);
      Swal.fire("Success", "Customer appointment saved.", "success");
      setFormData(initialFormState);
    } catch (error) {
      let errorMessage = "Something went wrong. Please try again.";
      if (
        error.response?.data?.error?.toLowerCase().includes("already booked")
      ) {
        errorMessage = "This time slot is already booked.";
      }
      Swal.fire("Booking Failed", errorMessage, "error");
    }
  };

  const handleCancel = () => {
    setFormData(initialFormState);
  };

  return (
    <div className="max-w-xl mx-auto p-8 bg-white rounded-xl shadow-md border border-gray-200">
      <h2 className="text-2xl font-bold mb-6 text-center text-red-600">
        Add Customer Details
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5 text-gray-800">
        <input
          type="text"
          name="customerName"
          placeholder="Customer Name"
          value={formData.customerName}
          onChange={handleChange}
          required
          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500"
        />
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
          required
          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500"
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          value={formData.contact.phone}
          onChange={handleChange}
          required
          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500"
        />
        <input
          type="email"
          name="email"
          placeholder="Email (optional)"
          value={formData.contact.email}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500"
        />
        <input
          type="text"
          name="vehicleNumber"
          placeholder="Vehicle Number (ABC-1234)"
          value={formData.vehicleNumber}
          onChange={handleChange}
          required
          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500"
        />
        <select
          name="vehicleType"
          value={formData.vehicleType}
          onChange={handleChange}
          required
          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500"
        >
          <option value="" disabled>
            Select Vehicle Type
          </option>
          {vehicleTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
        <input
          type="date"
          name="serviceDate"
          value={formData.serviceDate}
          onChange={handleChange}
          required
          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500"
        />
        <select
          name="time"
          value={formData.time}
          onChange={handleChange}
          required
          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500"
        >
          <option value="" disabled>
            Select Time Slot
          </option>
          {timeSlots.map((slot) => (
            <option key={slot} value={slot}>
              {slot}
            </option>
          ))}
        </select>

        <div className="flex gap-4">
          <button
            type="submit"
            className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-md transition"
          >
            Add Details
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 rounded-md transition"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCustomer;
