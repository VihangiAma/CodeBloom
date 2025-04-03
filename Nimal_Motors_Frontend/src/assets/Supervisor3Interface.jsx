import React from "react";
import { FaUserTie, FaPhone, FaEnvelope, FaMapMarkerAlt, FaTools, FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Supervisor3Profile() {
  const navigate = useNavigate();

  const supervisorData = {
    name: "Saman Kumara",
    phoneNumber: "+94 752323125",
    email: "samankumara@gmail.com",
    address: "23/B, New Road, Kahawatta",
    role: "Body Shop Supervisor",
    experience: "2 Years",
    department: "Body Repair & Painting",
  };

  const handleLogout = () => {
    alert("Logging out...");
    navigate("/"); // Redirects to login page or home
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="max-w-3xl w-full bg-white p-8 rounded-lg shadow-lg">
        {/* Header */}
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center flex items-center justify-center gap-2">
          <FaUserTie /> Supervisor3 Profile
        </h2>

        {/* Supervisor Details */}
        <SupervisorDetails supervisorData={supervisorData} onLogout={handleLogout} />
      </div>
    </div>
  );
}

function SupervisorDetails({ supervisorData, onLogout }) {
  return (
    <div className="space-y-4">
      {Object.entries(supervisorData).map(([key, value], index) => (
        <div key={index} className="flex items-center justify-between border-b pb-3">
          <label className="block text-sm font-medium text-gray-600 capitalize flex items-center gap-2">
            {key === "name" && <FaUserTie />}
            {key === "phoneNumber" && <FaPhone />}
            {key === "email" && <FaEnvelope />}
            {key === "address" && <FaMapMarkerAlt />}
            {key === "department" && <FaTools />}
            {key.replace(/([A-Z])/g, " $1").trim()}
          </label>
          <span className="text-lg font-semibold text-gray-800">{value}</span>
        </div>
      ))}

      {/* Logout Button */}
      <div className="mt-6 flex justify-center">
        <button
          onClick={onLogout}
          className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition duration-300 flex items-center gap-2"
        >
          <FaSignOutAlt /> Logout
        </button>
      </div>
    </div>
  );
}
