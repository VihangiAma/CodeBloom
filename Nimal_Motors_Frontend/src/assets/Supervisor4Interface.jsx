import React from "react";
import { FaUserTie, FaPhone, FaEnvelope, FaMapMarkerAlt, FaTools } from "react-icons/fa";

export default function Supervisor33Interface() {
  const supervisorData = {
    name: "Waruna Silva",
    phoneNumber: "++94 702358977",
    email: "warunasilva@gmail.com",
    address: "N0697/,Aluthgama",
    role: "Body Shop Supervisor",
    experience: "3 Years",
    department: "Body Repair & Painting",
  };

  const handleLogout = () => {
    alert("Logging out...");
    // Here, you can add actual logout functionality like redirecting or clearing authentication
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="max-w-3xl w-full bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center flex items-center justify-center gap-2">
          <FaUserTie /> Electric Supervisor
        </h2>
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
            {key.replace(/([A-Z])/g, " $1")}
          </label>
          <span className="text-lg font-semibold text-gray-800">{value}</span>
        </div>
      ))}
      <div className="mt-6 flex justify-center">
        <button
          onClick={onLogout}
          className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition duration-300"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
