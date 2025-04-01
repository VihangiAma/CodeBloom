import React, { useState } from "react";
import axios from "axios";

const timeSlots = [
  "08:00-10:00",
  "10:00-12:00",
  "12:00-14:00",
  "14:00-16:00",
  "16:00-18:00",
  "18:00-20:00"
];

const AppointmentForm = () => {
  const [formData, setFormData] = useState({
    customerName: "",
    address: "",
    phone: "",
    vehicleType: "",
    vehicleNumber: "",
    date: "",
    time: "",
  });
  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    for (let key in formData) {
      if (!formData[key]) {
        alert("All fields are required");
        return;
      }
    }
    
    if (!timeSlots.includes(formData.time)) {
      alert("Invalid time slot selected.");
      return;
    }
    
    // Confirmation popup
    const confirmSubmission = window.confirm("Are you sure you want to submit the appointment?");
    if (!confirmSubmission) {
      return;
    }
    
    try {
      await axios.post("http://localhost:5000/api/appointments", formData);
      alert("Appointment booked successfully! Notification sent to supervisor.");
      setFormData({ customerName: "", address: "", phone: "", vehicleType: "", vehicleNumber: "", date: "", time: "" });
    } catch (error) {
      console.error("Error booking appointment", error);
      alert("Failed to book appointment");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-bold mb-4">Book an Appointment</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="customerName" placeholder="Customer Name" value={formData.customerName} onChange={handleChange} required className="w-full p-2 border rounded" />
        <input type="text" name="address" placeholder="Address" value={formData.address} onChange={handleChange} required className="w-full p-2 border rounded" />
        <input type="text" name="phone" placeholder="Telephone Number" value={formData.phone} onChange={handleChange} required className="w-full p-2 border rounded" />
        <input type="text" name="vehicleType" placeholder="Vehicle Type" value={formData.vehicleType} onChange={handleChange} required className="w-full p-2 border rounded" />
        <input type="text" name="vehicleNumber" placeholder="Vehicle Number" value={formData.vehicleNumber} onChange={handleChange} required className="w-full p-2 border rounded" />
        <input type="date" name="date" value={formData.date} onChange={handleChange} required className="w-full p-2 border rounded" />
        <select name="time" value={formData.time} onChange={handleChange} required className="w-full p-2 border rounded">
          <option value="">Select Time Slot</option>
          {timeSlots.map((slot, index) => (
            <option key={index} value={slot}>{slot}</option>
          ))}
        </select>
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">Book Appointment</button>
      </form>
    </div>
  );
};

export default AppointmentForm;
