// 

import React, { useState } from "react";
import { FaBoxes, FaUserCog, FaBell, FaLock, FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const AccountantProfile = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "John",
    lastName: "Doe",
    username: "nj",
    email: "john.doe@example.com",
    phoneNumber: "0918873724",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-72 bg-blue-800 text-white p-6 flex flex-col">
        <div className="flex flex-col items-center mb-8">
          <img
            src="https://via.placeholder.com/150"
            alt="User"
            className="w-24 h-24 rounded-full mb-3 cursor-pointer border-2 border-white hover:opacity-80 transition"
          />
          <h2 className="text-lg font-bold">Accountant Profile</h2>
        </div>
        <nav className="flex-1">
          <ul className="space-y-4">
            <li className="flex items-center gap-3 p-3 bg-blue-700 rounded cursor-pointer hover:bg-blue-600 transition">
              <FaUserCog /> <span className="font-semibold">Account Settings</span>
            </li>
            <li
              className="flex items-center gap-3 p-3 hover:bg-blue-600 rounded cursor-pointer transition"
              onClick={() => navigate("/personalinfo-acc")}
            >
              <FaBoxes /> <span className="font-semibold">Personal Information</span>
            </li>
            <li className="flex items-center gap-3 p-3 hover:bg-blue-600 rounded cursor-pointer transition">
              <FaBell /> <span className="font-semibold">Notifications</span>
            </li>
            <li className="flex items-center gap-3 p-3 hover:bg-blue-600 rounded cursor-pointer transition">
              <FaLock /> <span className="font-semibold">Privacy</span>
            </li>
          </ul>
        </nav>
        <button
          className="flex items-center gap-2 p-3 bg-red-600 hover:bg-red-700 rounded mt-auto transition"
          onClick={() => navigate("/")}
        >
          <FaSignOutAlt /> <span className="font-semibold">Sign Out</span>
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Account Settings</h1>
        <div className="bg-white p-8 rounded-lg shadow-md">
          <form className="grid grid-cols-2 gap-6">
            {Object.entries(formData).map(([key, value]) => (
              <div key={key}>
                <label className="block font-semibold text-gray-800">
                  {key.replace(/([A-Z])/g, " $1").trim()}
                </label>
                <input
                  type="text"
                  name={key}
                  value={value}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 text-black"
                />
              </div>
            ))}
          </form>
          
          <div className="flex justify-end mt-6 space-x-4">
            {/* Back Button */}
            <button
              className="bg-gray-300 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-400 transition"
              onClick={() => (window.history.length > 1 ? navigate(-1) : navigate("/accountant-dashboard"))}
            >
              Back
            </button>

            {/* Cancel Button */}
            <button
              className="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition"
              onClick={() => navigate("/accountant-dashboard")}
            >
              Cancel
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AccountantProfile; // Ensure default export


