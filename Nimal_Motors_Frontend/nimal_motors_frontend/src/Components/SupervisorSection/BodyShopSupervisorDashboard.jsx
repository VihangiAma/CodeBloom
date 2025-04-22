import React, { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import SupervisorLayout from "./Supervisors/SupervisorLayout";
import AddServiceForm from "./AddServiceForm"; // ⬅️ Import your separate form

const BodyShopSupervisorSection = () => {
  const [showForm, setShowForm] = useState(false);

  const handleFormSubmit = async (formData) => {
    try {
      await axios.post("http://localhost:5000/service", formData);
      alert("Service Added Successfully!");
      setShowForm(false);
    } catch (error) {
      console.error(error);
      alert("Failed to add service");
    }
  };

  return (
   // <SupervisorLayout section="Body-Shop">
      <div className="p-6">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">Body-Shop Service Section</h2>
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
            <AddServiceForm onSubmit={handleFormSubmit} /> {/* ⬅️ Use the separate form */}
          </motion.div>
        )}

        {!showForm && (
          <div className="text-gray-500 text-lg mt-8">
            Click <b>"Add Service"</b> to create a new Body-Shop service record.
          </div>
        )}
      </div>
    //</SupervisorLayout>
  );
};

export default BodyShopSupervisorSection;
