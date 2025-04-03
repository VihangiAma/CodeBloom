import React, { useState } from "react";
import { FaUserShield, FaPhone, FaEnvelope, FaMapMarkerAlt, FaCog, FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const AdminProfile = () => {
  const navigate = useNavigate();

  const initialFormData = {
    firstName: "Dinuka",
    lastName: "Heshan",
    username: "dinukaheshan",
    password: "password123", // Default password (view only)
    email: "heshandinuka.hd@gmail.com",
    phoneNumber: "+9471 7286020",
    address: "No 321/A, Galle Road, Aluthgama",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [isEditing, setIsEditing] = useState(false);
  const [successMessage, setSuccessMessage] = useState(""); // New state for message

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    console.log("Saved Data:", formData);
    setIsEditing(false);

    // Show success message
    setSuccessMessage("Profile saved successfully! ✅");
    
    // Hide message after 3 seconds
    setTimeout(() => {
      setSuccessMessage("");
    }, 3000);
  };

  const handleCancel = () => {
    setFormData(initialFormData);
    setIsEditing(false);
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
          <h2 className="text-lg font-bold">{`${formData.firstName} ${formData.lastName}`}</h2> {/* Admin's name */}
        </div>
        <nav className="flex-1">
          <ul className="space-y-4">
            <li className="flex items-center gap-3 p-3 bg-blue-700 rounded cursor-pointer hover:bg-blue-600 transition">
              <FaCog /> <span className="font-semibold">Account Settings</span>
            </li>
            <li className="flex items-center gap-3 p-3 hover:bg-blue-600 rounded cursor-pointer transition" onClick={() => navigate("/personalinfo-admin")}>
              <FaUserShield /> <span className="font-semibold">Personal Information</span>
            </li>
            <li className="flex items-center gap-3 p-3 hover:bg-blue-600 rounded cursor-pointer transition">
              <FaPhone /> <span className="font-semibold">Notifications</span>
            </li>
            <li className="flex items-center gap-3 p-3 hover:bg-blue-600 rounded cursor-pointer transition">
              <FaMapMarkerAlt /> <span className="font-semibold">Privacy</span>
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
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Admin Profile</h1>
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
                  <p className="w-full p-3 border border-gray-300 rounded-lg bg-gray-200 text-black">
                    {value}
                  </p>
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

export default AdminProfile;
