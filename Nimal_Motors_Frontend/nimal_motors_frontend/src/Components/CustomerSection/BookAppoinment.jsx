import React, { useState } from "react";
import axios from "axios";

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

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

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
      setErrorMessage("Invalid Customer Name. Only letters and spaces allowed.");
      return false;
    }
    if (formData.address.trim().length < 5) {
      setErrorMessage("Address must be at least 5 characters.");
      return false;
    }
    if (!phoneRegex.test(formData.phone.trim())) {
      setErrorMessage("Phone must be a valid 10-digit number.");
      return false;
    }
    if (!vehicleIdRegex.test(formData.vehicleID.trim())) {
      setErrorMessage("Vehicle ID must be like ABC-1234.");
      return false;
    }
    if (formData.vehicleType.trim().length < 2) {
      setErrorMessage("Vehicle Type must be specified.");
      return false;
    }
    if (!formData.date) {
      setErrorMessage("Date is required.");
      return false;
    }
    if (!formData.time) {
      setErrorMessage("Time slot must be selected.");
      return false;
    }

    // If all pass
    setErrorMessage("");
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return; // Don't submit if validation fails
    }

    try {
      await axios.post("http://localhost:5001/api/appointments", formData);
      setSuccessMessage("Appointment booked successfully!");
      setErrorMessage("");
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
      setErrorMessage("Failed to book appointment. Please try again.");
      setSuccessMessage("");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-2xl rounded-2xl">
      <h2 className="text-2xl font-bold mb-6 text-center">Book an Appointment</h2>
      
      {successMessage && <div className="bg-green-100 text-green-700 p-2 mb-4 rounded">{successMessage}</div>}
      {errorMessage && <div className="bg-red-100 text-red-700 p-2 mb-4 rounded">{errorMessage}</div>}

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
