// src/pages/SupervisorLoginForm.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SupervisorLoginForm = () => {
  const [selectedSection, setSelectedSection] = useState("mechanical");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    if (selectedSection) {
      localStorage.setItem("authToken", "123456"); // Example token
      localStorage.setItem("supervisorSection", selectedSection); // Save selected section
      navigate(`/supervisor/${selectedSection}`); // Go to dashboard
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Supervisor Login</h2>
        <form onSubmit={handleLogin}>
          <label className="block text-gray-700 font-semibold mb-2">Select Section</label>
          <select
            className="w-full p-2 border rounded-lg mb-6"
            value={selectedSection}
            onChange={(e) => setSelectedSection(e.target.value)}
          >
            <option value="mechanical">Mechanical</option>
            <option value="electrical">Electrical</option>
            <option value="body-shop">Body Shop</option>
            <option value="service">Service</option>
          </select>

          <button
            type="submit"
            className="w-full p-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default SupervisorLoginForm;
