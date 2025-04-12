// 

// 
import React, { useState } from "react";
import { FaUserTie, FaEnvelope, FaMapMarkerAlt, FaCog, FaSignOutAlt, FaToolbox } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const ElectricalSupervisor = () => {
  const navigate = useNavigate();

  const initialFormData = {
    firstName: "Nuwan",
    lastName: "Silva",
    username: "nuwansilva",
    password: "securePass456",
    email: "nuwan.silva@example.com",
    phoneNumber: "+9477 1234567",
    address: "No 42, Matara Road, Galle",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [isEditing, setIsEditing] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSave = () => {
    console.log("Saved Data:", formData);
    setIsEditing(false);
    setSuccessMessage("Profile saved successfully! ✅");
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  const handleCancel = () => {
    setFormData(initialFormData);
    setIsEditing(false);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-72 bg-yellow-800 text-white p-6 flex flex-col">
        <div className="flex flex-col items-center mb-8">
          <img
            src="https://via.placeholder.com/150"
            alt="User"
            className="w-24 h-24 rounded-full mb-3 border-2 border-white"
          />
          <h2 className="text-lg font-bold">{`${formData.firstName} ${formData.lastName}`}</h2>
        </div>
        <nav className="flex-1">
          <ul className="space-y-4">
            <li className="flex items-center gap-3 p-3 bg-yellow-700 rounded">
              <FaCog /> <span>Account Settings</span>
            </li>
            <li className="flex items-center gap-3 p-3 hover:bg-yellow-600 rounded cursor-pointer" onClick={() => navigate("/personalinfo-bodyshop")}>
              <FaUserTie /> <span>Personal Info</span>
            </li>
            <li className="flex items-center gap-3 p-3 hover:bg-yellow-600 rounded cursor-pointer">
              <FaToolbox /> <span>Bodyshop Tasks</span>
            </li>
          </ul>
        </nav>
        <button
          className="flex items-center gap-2 p-3 bg-red-600 hover:bg-red-700 rounded mt-auto"
          onClick={() => navigate("/")}
        >
          <FaSignOutAlt /> <span>Sign Out</span>
        </button>
      </aside>

      {/* Main */}
      <main className="flex-1 p-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Bodyshop Supervisor Profile</h1>
        <div className="bg-white p-8 rounded-lg shadow-md">
          {successMessage && (
            <div className="mb-4 p-3 bg-green-100 border border-green-500 text-green-700 rounded-lg">
              {successMessage}
            </div>
          )}
          <form className="grid grid-cols-2 gap-6">
            {Object.entries(formData).map(([key, value], index) => (
              <div key={index}>
                <label className="block font-semibold text-gray-800">
                  {key.replace(/([A-Z])/g, " $1").trim()}
                </label>
                {key === "password" ? (
                  <p className="w-full p-3 border border-gray-300 rounded-lg bg-gray-200 text-black">{value}</p>
                ) : (
                  <input
                    type="text"
                    name={key}
                    value={value}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className={`w-full p-3 border border-gray-300 rounded-lg text-black ${
                      isEditing ? "bg-white" : "bg-gray-200"
                    }`}
                  />
                )}
              </div>
            ))}
          </form>

          <div className="flex gap-4 mt-6">
            {isEditing ? (
              <>
                <button className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700" onClick={handleSave}>
                  Save Changes
                </button>
                <button className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600" onClick={handleCancel}>
                  Cancel
                </button>
              </>
            ) : (
              <button
                className="bg-yellow-600 text-white px-6 py-2 rounded hover:bg-yellow-700"
                onClick={() => setIsEditing(true)}
              >
                Edit Profile
              </button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ElectricalSupervisor;
