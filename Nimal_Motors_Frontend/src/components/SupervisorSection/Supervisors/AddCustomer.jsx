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
        "Invalid Customer Name. Only letters and spaces allowed.",
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
      Swal.fire("Invalid Input", "Check the phone number. ", "warning");
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
        "Vehicle Number must be like ABC-1234.",
        "warning"
      );
      return false;
    }
    if (!formData.vehicleType) {
      Swal.fire("Invalid Input", "Please select a vehicle type.", "warning");
      return false;
    }
    if (!formData.serviceDate) {
      Swal.fire("Invalid Input", "Date is required.", "warning");
      return false;
    }
    if (!formData.time) {
      Swal.fire("Invalid Input", "Time slot must be selected.", "warning");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      await axios.post("http://localhost:5001/api/appointments", formData);

      Swal.fire({
        icon: "success",
        title: "Customer Added",
        text: "Customer appointment has been saved.",
      });

      setFormData(initialFormState);
    } catch (error) {
      console.error(error);
      let errorMessage = "Something went wrong. Please try again.";
      if (error.response?.data?.error) {
        const serverError = error.response.data.error;
        if (serverError.toLowerCase().includes("already booked")) {
          errorMessage =
            "This time slot is already booked. Please choose another time.";
        } else {
          errorMessage = serverError;
        }
      }

      Swal.fire({
        icon: "error",
        title: "Booking Failed",
        text: errorMessage,
      });
    }
  };

  const handleCancel = () => {
    setFormData(initialFormState);
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-black rounded-2xl shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-center text-red-600">
        Add Customer Details
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        <input
          type="text"
          name="customerName"
          placeholder="Name"
          value={formData.customerName}
          onChange={handleChange}
          required
          className="w-full p-3 rounded-lg border border-red-600 bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600"
        />
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
          required
          className="w-full p-3 rounded-lg border border-red-600 bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600"
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          value={formData.contact.phone}
          onChange={handleChange}
          required
          className="w-full p-3 rounded-lg border border-red-600 bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600"
        />
        <input
          type="email"
          name="email"
          placeholder="Email (optional)"
          value={formData.contact.email}
          onChange={handleChange}
          className="w-full p-3 rounded-lg border border-red-600 bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600"
        />
        <input
          type="text"
          name="vehicleNumber"
          placeholder="Vehicle Number (ABC-1234)"
          value={formData.vehicleNumber}
          onChange={handleChange}
          required
          className="w-full p-3 rounded-lg border border-red-600 bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600"
        />

        <select
          name="vehicleType"
          value={formData.vehicleType}
          onChange={handleChange}
          required
          className="w-full p-3 rounded-lg border border-red-600 bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600"
        >
          <option value="" disabled>
            Vehicle Type
          </option>
          {vehicleTypes.map((type) => (
            <option key={type} value={type} className="text-black">
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
          className="w-full p-3 rounded-lg border border-red-600 bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600"
        />

        <select
          name="time"
          value={formData.time}
          onChange={handleChange}
          required
          className="w-full p-3 rounded-lg border border-red-600 bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600"
        >
          <option value="" disabled>
            Select Time
          </option>
          {timeSlots.map((slot) => (
            <option key={slot} value={slot} className="text-black">
              {slot}
            </option>
          ))}
        </select>

        <div className="flex gap-4">
          <button
            type="submit"
            className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-lg transition"
          >
            Add Customer Details
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="flex-1 bg-gray-700 hover:bg-gray-800 text-white font-semibold py-3 rounded-lg transition"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCustomer;
