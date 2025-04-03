import React, { useState } from "react";
import { FaUserTie, FaPhone, FaEnvelope, FaMapMarkerAlt, FaTools, FaBell, FaShieldAlt, FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const SupervisorProfile = () => {
  const navigate = useNavigate();

  const initialSupervisorData = {
    name: "Kamal Perera",
    phoneNumber: "+94 702358966",
    email: "kamalperera@gmail.com",
    address: "No78/B, Kandy",
    role: "Body Shop Supervisor",
    experience: "2 Years",
    department: "Body Repair & Painting",
    photo: "https://via.placeholder.com/150", // Replace with actual image URL
  };

  const [supervisorData, setSupervisorData] = useState(initialSupervisorData);
  const [isEditing, setIsEditing] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    setSupervisorData({ ...supervisorData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    console.log("Saved Data:", supervisorData);
    setIsEditing(false);
    setSuccessMessage("Profile saved successfully! ✅");

    setTimeout(() => {
      setSuccessMessage("");
    }, 3000);
  };

  const handleCancel = () => {
    setSupervisorData(initialSupervisorData);
    setIsEditing(false);
  };

  const handleLogout = () => {
    alert("Logging out...");
    // Here, you can clear authentication data if necessary, then redirect to login page
    navigate("/"); // Redirect to login page after logout
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-72 bg-blue-800 text-white p-6 flex flex-col">
        <div className="flex flex-col items-center mb-8">
          <img
            src={supervisorData.photo}
            alt={supervisorData.name}
            className="w-24 h-24 rounded-full mb-3 cursor-pointer border-2 border-white hover:opacity-80 transition"
          />
          <h2 className="text-lg font-bold">{supervisorData.name}</h2>
        </div>
        <nav className="flex-1">
          <ul className="space-y-4">
            <li
              className="flex items-center gap-3 p-3 hover:bg-blue-600 rounded cursor-pointer transition"
              onClick={() => navigate("/account-settings")}
            >
              <FaTools /> <span className="font-semibold">Account Settings</span>
            </li>
            <li
              className="flex items-center gap-3 p-3 hover:bg-blue-600 rounded cursor-pointer transition"
              onClick={() => navigate("/personal-info")}
            >
              <FaUserTie /> <span className="font-semibold">Personal Information</span>
            </li>
            <li
              className="flex items-center gap-3 p-3 hover:bg-blue-600 rounded cursor-pointer transition"
              onClick={() => navigate("/notifications")}
            >
              <FaBell /> <span className="font-semibold">Notifications</span>
            </li>
            <li
              className="flex items-center gap-3 p-3 hover:bg-blue-600 rounded cursor-pointer transition"
              onClick={() => navigate("/privacy")}
            >
              <FaShieldAlt /> <span className="font-semibold">Privacy Settings</span>
            </li>
          </ul>
        </nav>
        <button
          className="flex items-center gap-2 p-3 bg-red-600 hover:bg-red-700 rounded mt-auto transition"
          onClick={handleLogout}
        >
          <FaSignOutAlt /> <span className="font-semibold">Sign Out</span>
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Supervisor Profile</h1>
        
        {/* Success Message */}
        {successMessage && (
          <div className="mb-4 p-3 bg-green-100 border border-green-500 text-green-700 rounded-lg">
            {successMessage}
          </div>
        )}

        {/* Profile Form */}
        <div className="bg-white p-8 rounded-lg shadow-md">
          <form className="grid grid-cols-2 gap-6">
            {Object.entries(supervisorData).map(([key, value], index) => (
              key !== "photo" && (
                <div key={index}>
                  <label className="block font-semibold text-gray-800">
                    {key.replace(/([A-Z])/g, " $1").trim()}
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      name={key}
                      value={value}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-lg bg-white text-black"
                    />
                  ) : (
                    <p className="w-full p-3 border border-gray-300 rounded-lg bg-gray-200 text-black">
                      {value}
                    </p>
                  )}
                </div>
              )
            ))}
          </form>

          {/* Buttons */}
          <div className="flex gap-4 mt-6">
            {isEditing ? (
              <>
                <button
                  className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition"
                  onClick={handleSave}
                >
                  Save Changes
                </button>
                <button
                  className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600 transition"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
              </>
            ) : (
              <button
                className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
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

export default SupervisorProfile;
