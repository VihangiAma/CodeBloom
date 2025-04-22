import React, { useState } from "react";

const ServiceForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    serviceID: "",
    customerName: "",
    vehicleID: "",
    serviceDate: "",
    serviceTime: "",
    description: "",
    status: "Pending",
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};

    if (!formData.serviceID.trim()) newErrors.serviceID = "Service ID is required.";
    if (!formData.customerName.trim()) newErrors.customerName = "Customer name is required.";
    if (!formData.vehicleID.trim()) newErrors.vehicleID = "Vehicle ID is required.";
    if (!formData.serviceDate) newErrors.serviceDate = "Service date is required.";
    else if (new Date(formData.serviceDate) < new Date().setHours(0,0,0,0))
      newErrors.serviceDate = "Service date cannot be in the past.";
    if (!formData.serviceTime) newErrors.serviceTime = "Service time is required.";
    if (!formData.description.trim()) newErrors.description = "Description is required.";
    if (formData.description.length > 100)
      newErrors.description = "Description must be 100 characters or less.";

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      onSubmit(formData);
      setFormData({
        serviceID: "",
        customerName: "",
        vehicleID: "",
        serviceDate: "",
        serviceTime: "",
        description: "",
        status: "Pending",
      });
      setErrors({});
      alert("Service booked successfully! ✅");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-2xl shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Book a Service Appointment</h2>
      <form onSubmit={handleSubmit} className="space-y-4">

        {/* Service ID */}
        <div>
          <label className="block mb-1 font-medium">
            Service ID <span title="Unique identifier for the service.">🛈</span>
          </label>
          <input
            type="text"
            name="serviceID"
            value={formData.serviceID}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
          />
          {errors.serviceID && <p className="text-red-500 text-sm">{errors.serviceID}</p>}
        </div>

        {/* Customer Name */}
        <div>
          <label className="block mb-1 font-medium">
            Customer Name <span title="Enter full name of the customer.">🛈</span>
          </label>
          <input
            type="text"
            name="customerName"
            value={formData.customerName}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
          />
          {errors.customerName && <p className="text-red-500 text-sm">{errors.customerName}</p>}
        </div>

        {/* Vehicle ID */}
        <div>
          <label className="block mb-1 font-medium">
            Vehicle ID <span title="Vehicle Registration Number.">🛈</span>
          </label>
          <input
            type="text"
            name="vehicleID"
            value={formData.vehicleID}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
          />
          {errors.vehicleID && <p className="text-red-500 text-sm">{errors.vehicleID}</p>}
        </div>

        {/* Service Date */}
        <div>
          <label className="block mb-1 font-medium">
            Service Date <span title="Choose a future appointment date.">🛈</span>
          </label>
          <input
            type="date"
            name="serviceDate"
            value={formData.serviceDate}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
          />
          {errors.serviceDate && <p className="text-red-500 text-sm">{errors.serviceDate}</p>}
        </div>

        {/* Service Time */}
        <div>
          <label className="block mb-1 font-medium">
            Service Time <span title="Select a preferred time slot.">🛈</span>
          </label>
          <input
            type="time"
            name="serviceTime"
            value={formData.serviceTime}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
          />
          {errors.serviceTime && <p className="text-red-500 text-sm">{errors.serviceTime}</p>}
        </div>

        {/* Description */}
        <div>
          <label className="block mb-1 font-medium">
            Description (Max 100 characters) <span title="Brief description about the service.">🛈</span>
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            maxLength="100"
            className="w-full p-2 border rounded-lg"
          />
          <div className="text-sm text-gray-500 mt-1">
            {formData.description.length} / 100 characters
          </div>
          {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
        </div>

        {/* Status */}
        <div>
          <label className="block mb-1 font-medium">
            Status <span title="Current status of the service.">🛈</span>
          </label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
          >
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition"
        >
          Submit
        </button>

      </form>
    </div>
  );
};

export default ServiceForm;
