import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const BookAppointment = () => {
  const [formData, setFormData] = useState({
    customerName: "",
    address: "",
    phone: "",
    vehicleID: "",
    vehicleType: "",
    date: "",
    time: ""
  });

  const timeSlots = ["8.00 am-10.00 am", "10.00 am-12.00 pm", "1.00 pm-3.00 pm", "3.00 pm-5.00 pm"];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const validateForm = () => {
    const nameRegex = /^[A-Za-z\s]+$/;
    const phoneRegex = /^[0-9]{10}$/;
    const vehicleIdRegex = /^[A-Z]{2,3}-\d{3,4}$/i;

    if (!nameRegex.test(formData.customerName.trim())) {
      Swal.fire("Invalid Input", "Invalid Customer Name. Only letters and spaces allowed.", "warning");
      return false;
    }
    if (formData.address.trim().length < 5) {
      Swal.fire("Invalid Input", "Address must be at least 5 characters.", "warning");
      return false;
    }
    if (!phoneRegex.test(formData.phone.trim())) {
      Swal.fire("Invalid Input", "Phone must be a valid 10-digit number.", "warning");
      return false;
    }
    if (!vehicleIdRegex.test(formData.vehicleID.trim())) {
      Swal.fire("Invalid Input", "Vehicle ID must be like ABC-1234.", "warning");
      return false;
    }
    if (formData.vehicleType.trim().length < 2) {
      Swal.fire("Invalid Input", "Vehicle Type must be specified.", "warning");
      return false;
    }
    if (!formData.date) {
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

    if (!validateForm()) {
      return; // Don't submit if validation fails
    }

    try {
      await axios.post("http://localhost:5001/api/appointments", formData);

      Swal.fire({
        icon: "success",
        title: "Appointment Booked!",
        text: "Your appointment has been placed successfully.",
      });

      setFormData({
        customerName: "",
        address: "",
        phone: "",
        vehicleID: "",
        vehicleType: "",
        date: "",
        time: ""
      });

    } catch (error) {
      console.error(error);

      let errorMessage = "Something went wrong. Please try again.";

      if (error.response && error.response.data && error.response.data.error) {
        const serverError = error.response.data.error;

        if (serverError.toLowerCase().includes("already booked")) {
          errorMessage = "This time slot is already booked. Please choose another time.";
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

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-2xl rounded-2xl">
      <h2 className="text-2xl font-bold mb-6 text-center">Book an Appointment</h2>

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
          value={formData.phone}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />
        <input
          type="text"
          name="vehicleID"
          placeholder="Vehicle ID (ABC-1234)"
          value={formData.vehicleID}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />
        <input
          type="text"
          name="vehicleType"
          placeholder="Vehicle Type (e.g., Sedan, SUV)"
          value={formData.vehicleType}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />

        {/* Time Slot Dropdown */}
        <select
          name="time"
          value={formData.time}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        >
          <option value="" disabled>Select Time Slot</option>
          {timeSlots.map((slot) => (
            <option key={slot} value={slot}>
              {slot}
            </option>
          ))}
        </select>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          Book Appointment
        </button>
      </form>
    </div>
  );
};

export default BookAppointment;
