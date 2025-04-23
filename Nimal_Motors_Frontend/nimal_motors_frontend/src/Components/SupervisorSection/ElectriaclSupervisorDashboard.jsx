import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import AddServiceForm from "./AddServiceForm";

const ElectricalSupervisorSection = () => {
  const [showForm, setShowForm] = useState(false);
  const [services, setServices] = useState([]); // ⬅️ New state to hold services

  // Fetch services from backend
  const fetchServices = async () => {
    try {
      const response = await axios.get("http://localhost:5001/api/electrical");
      setServices(response.data); // Save to state
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  };

  // Load services when page loads
  useEffect(() => {
    fetchServices();
  }, []);

  const handleFormSubmit = async (formData) => {
    try {
      await axios.post("http://localhost:5001/api/electrical", formData);
      alert("Service Added Successfully!");
      setShowForm(false);
      fetchServices(); // ⬅️ Refresh services after adding
    } catch (error) {
      console.error(error);
      alert("Failed to add service");
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800">Electrical Service Section</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition"
        >
          {showForm ? "Close Form" : "Add Service"}
        </button>
      </div>

      {showForm && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-8 rounded-2xl shadow-2xl"
        >
          <AddServiceForm onSubmit={handleFormSubmit} />
        </motion.div>
      )}

      {/* Display Services */}
      {!showForm && services.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service) => (
            <div key={service._id} className="bg-white p-6 rounded-2xl shadow-lg">
              <h3 className="text-xl font-bold mb-2">{service.customerName}</h3>
              <p><strong>Vehicle ID:</strong> {service.vehicleID}</p>
              <p><strong>Service Date:</strong> {new Date(service.serviceDate).toLocaleDateString()}</p>
              <p><strong>Service Time:</strong> {service.serviceTime}</p>
              <p><strong>Description:</strong> {service.description}</p>
              <p><strong>Status:</strong> {service.status}</p>
            </div>
          ))}
        </div>
      )}

      {/* If no services */}
      {!showForm && services.length === 0 && (
        <div className="text-gray-500 text-lg mt-8">
          No electrical services found. Click <b>"Add Service"</b> to create one!
        </div>
      )}
    </div>
  );
};

export default ElectricalSupervisorSection;
