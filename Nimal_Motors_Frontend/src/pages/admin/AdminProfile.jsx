import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  FaUserCircle,
  FaSignOutAlt,
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaUserPlus,
  FaUsers,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

// ------------------ JWT Decoding ------------------
const decodeJWT = (token) => {
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
      .join("")
  );
  return JSON.parse(jsonPayload);
};

export default function AdminProfile() {
  const navigate = useNavigate();

  // ------------------ States ------------------
  const [profile, setProfile] = useState({
    userId: "",
    fullName: "",
    email: "",
    username: "",
    phoneNumber: "",
    type: "admin",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [showAddUserForm, setShowAddUserForm] = useState(false);
  const [newUser, setNewUser] = useState({
    userId: "",
    fullName: "",
    email: "",
    username: "",
    phoneNumber: "",
    type: "",
  });

  // ------------------ Handlers ------------------
  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleNewUserChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prev) => ({ ...prev, [name]: value }));
  };

  const toggleAddUserForm = () => setShowAddUserForm((prev) => !prev);

  const handleSignOut = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const saveProfile = async () => {
    setIsEditing(false);
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      await axios.post("http://localhost:5001/api/user", profile, {
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch (err) {
      console.error("Error updating user data", err);
    }
  };

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const res = await axios.get(
        "http://localhost:5001/api/user/admin/profile",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setProfile(res.data.user);
    } catch (err) {
      console.error("Error fetching profile data", err);
      navigate("/unauthorized");
    }
  };

  // ------------------ Effects ------------------
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const decoded = decodeJWT(token);
      if (decoded.type !== "admin") {
        navigate("/unauthorized");
      } else {
        fetchProfile();
      }
    } catch (err) {
      console.error("Token error", err);
      navigate("/login");
    }
  }, []);

  // ------------------ UI Components ------------------
  const ProfileField = ({ label, value, name, onChange }) => (
    <div className="flex flex-col">
      <label className="font-medium capitalize">{label}:</label>
      <input
        name={name}
        value={value}
        onChange={onChange}
        className="bg-gray-800 border border-gray-500 p-2 rounded text-white"
      />
    </div>
  );

  const ReadOnlyField = ({ label, value }) => (
    <p>
      <strong>{label}:</strong> {value || "—"}
    </p>
  );

  const AddUserForm = () => (
    <div className="mt-4 p-4 bg-gray-800 rounded space-y-2 border border-gray-600">
      <h4 className="font-semibold text-white mb-2">Add New User</h4>
      {["userId", "fullName", "email", "phoneNumber", "username"].map(
        (field) => (
          <input
            key={field}
            name={field}
            value={newUser[field]}
            onChange={handleNewUserChange}
            placeholder={field}
            className="w-full p-2 rounded bg-gray-900 text-white border border-gray-600 placeholder-gray-400"
          />
        )
      )}
      <select
        name="type"
        value={newUser.type}
        onChange={handleNewUserChange}
        className="w-full p-2 rounded bg-gray-900 text-white border border-gray-600"
      >
        <option value="">Select user type</option>
        <option value="Bodyshop Supervisor">Bodyshop Supervisor</option>
        <option value="Mechanical Supervisor">Mechanical Supervisor</option>
        <option value="Electrical Supervisor">Electrical Supervisor</option>
        <option value="Service Supervisor">Service Supervisor</option>
        <option value="Accountant">Accountant</option>
        <option value="Admin">Admin</option>
      </select>
    </div>
  );

  // ------------------ Main Render ------------------
  return (
    <div className="flex h-screen bg-gray-900 text-white font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 shadow-lg p-6 flex flex-col justify-between">
        <h1 className="text-2xl font-extrabold text-gray-300 mb-6">
          🚗 NIMAL MOTORS
        </h1>
        <nav className="flex-1" />
        <div className="space-y-2 border-t border-gray-600 pt-6">
        
          <button
            onClick={() => navigate("/admin-dashboard")}
            className="flex items-center gap-3 px-3 py-2 w-full text-left rounded-md text-blue-400 hover:bg-gray-700 transition font-semibold"
          >
            <FaUserCircle className="text-lg" />
            Dashboard
          </button>

          <button
            onClick={handleSignOut}
            className="flex items-center gap-3 px-3 py-2 w-full text-left rounded-md text-red-400 hover:bg-gray-700 transition"
          >
            <FaSignOutAlt className="text-lg" /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-auto">
        {/* Cover */}
        <div
          className="rounded-xl h-48 bg-cover bg-center relative"
          style={{ backgroundImage: `url("/bgimage.jpg")` }}
        >
          <div className="absolute bottom-[-30px] left-8 flex items-center space-x-4">
            <img
              src="/accprofile.jpg"
              alt="profile"
              className="w-20 h-20 rounded-full border-4 border-white shadow-lg"
            />
            <div>
              <h2 className="text-2xl font-bold text-white">
                {profile.fullName}
              </h2>
              <p className="text-sm text-white">Admin – Nimal Motors</p>
            </div>
          </div>
        </div>

        {/* Content Sections */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* About Me */}
          <section className="bg-gray-700 rounded-xl shadow-md p-6 text-gray-200">
            <h3 className="text-lg font-semibold mb-4">About Me</h3>
            <p className="text-sm leading-relaxed">
              Hi, I’m {profile.fullName || "—"}. As the Admin at Nimal Motors I
              oversee the company’s key support functions—from user management
              and system access control to compliance reporting and process
              optimisation. With a decade of experience in automotive operations
              and administration, I bridge the gap between technical teams and
              management, ensuring every department gets the resources and data
              they need to perform at their best.
            </p>
          </section>

          {/* Profile Details */}
          <section className="relative bg-gray-700 rounded-xl shadow-md p-6 text-gray-200">
            <h3 className="text-lg font-semibold mb-4">Admin Profile</h3>
            {isEditing ? (
              <div className="space-y-3 text-sm">
                {["fullName", "email", "username", "phoneNumber"].map((f) => (
                  <ProfileField
                    key={f}
                    label={f}
                    name={f}
                    value={profile[f]}
                    onChange={handleProfileChange}
                  />
                ))}
                <div className="space-x-2 mt-2">
                  <button
                    onClick={saveProfile}
                    className="text-green-400 text-sm hover:underline"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="text-red-400 text-sm hover:underline"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-sm space-y-2">
                <ReadOnlyField label="Full Name" value={profile.fullName} />
                <ReadOnlyField label="Mobile" value={profile.phoneNumber} />
                <ReadOnlyField label="Email" value={profile.email} />
                <ReadOnlyField label="Username" value={profile.username} />
                <div className="flex items-center space-x-3 mt-2">
                  <FaFacebook className="text-blue-600" />
                  <FaTwitter className="text-sky-500" />
                  <FaInstagram className="text-pink-500" />
                </div>
              </div>
            )}

            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="absolute top-6 right-6 bg-yellow-700 hover:bg-yellow-600 text-sm px-4 py-1 rounded text-red-400"
              >
                Edit
              </button>
            )}

            {/* Quick Tools */}
            {/* <hr className="my-6 border-gray-600" />
            <h4 className="text-base font-semibold mb-3">Quick Tools</h4>
            <div className="space-y-2">
              <button
                onClick={toggleAddUserForm}
                className="flex items-center gap-2 text-green-400 hover:text-white"
              >
                <FaUserPlus /> Add User
              </button>
              <button
                onClick={() => navigate("/admin/users")}
                className="flex items-center gap-2 text-blue-400 hover:text-white"
              >
                <FaUsers /> View All Users
              </button>
            </div>

            {showAddUserForm && <AddUserForm />} */}
          </section>
        </div>
      </main>
    </div>
  );
}
