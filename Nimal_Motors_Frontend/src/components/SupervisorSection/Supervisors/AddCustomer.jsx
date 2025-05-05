import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const AddCustomer = ({ onSubmit, existingBooking, isEditMode, onDelete }) => {
  const [formData, setFormData] = useState({
    customerName: "",
    address: "",
    contact: {
      phone: "",
      email: "",
    },
    vehicleNumber: "",
    vehicleType: "",
    date: "",
    time: "",
    status: "Not Complete yet", // Default status
  });

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
        contact: { ...formData.contact, [name]: value },
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:5001/api/appointments", formData);

      Swal.fire({
        icon: "success",
        title: "Customer Added",
        text: "Customer appointment has been saved.",
      });

      setFormData({
        customerName: "",
        address: "",
        contact: {
          phone: "",
          email: "",
        },
        vehicleNumber: "",
        vehicleType: "",
        date: "",
        time: "",
        status: "Not Complete yet",
      });
    } catch (error) {
      console.error("Error saving appointment:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to save customer. Please try again.",
      });
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-2xl rounded-2xl">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Add Customer Deatils
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="customerName"
          placeholder="Customer Name"
          value={formData.customerName}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone (10 digits)"
          value={formData.contact.phone}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />
        <input
          type="email"
          name="email"
          placeholder="Email (optional)"
          value={formData.contact.email}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <input
          type="text"
          name="vehicleNumber"
          placeholder="Vehicle Number (ABC-1234)"
          value={formData.vehicleNumber}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />

        <select
          name="vehicleType"
          value={formData.vehicleType}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        >
          <option value="" disabled>Select Vehicle Type</option>
          {vehicleTypes.map((type) => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>

        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />

        <select
          name="time"
          value={formData.time}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        >
          <option value="" disabled>Select Time Slot</option>
          {timeSlots.map((slot) => (
            <option key={slot} value={slot}>{slot}</option>
          ))}
        </select>

        <button
          type="submit"
          className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700"
        >
          Add Customer Details 
        </button>
      </form>
    </div>
  );
};

export default AddCustomer;
