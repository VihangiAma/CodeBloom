import React, { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import Swal from "sweetalert2"; // ⬅️ Import Swal
import AddServiceForm from "./AddServiceForm";

const MechanicalSupervisorSection = () => {
  const [showForm, setShowForm] = useState(false);

  const handleFormSubmit = async (formData) => {
    // Show confirmation popup first
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "Do you want to add this service?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, add it!',
      cancelButtonText: 'Cancel',
    });

    if (result.isConfirmed) {
      try {
        await axios.post("http://localhost:5001/api/mechanical", formData);
        Swal.fire({
          icon: "success",
          title: "Service Added!",
          text: "The new service has been successfully added.",
          confirmButtonColor: "#3085d6",
        });
        setShowForm(false);
      } catch (error) {
        console.error(error);
        Swal.fire({
          icon: "error",
          title: "Failed!",
          text: "Could not add service. Please try again.",
          confirmButtonColor: "#d33",
        });
      }
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800">Mechanical Service Section</h2>
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

      {!showForm && (
        <div className="text-gray-500 text-lg mt-8">
          Click <b>"Add Service"</b> to create a new mechanical service record.
        </div>
      )}
    </div>
  );
};

export default MechanicalSupervisorSection;
