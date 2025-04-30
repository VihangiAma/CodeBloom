import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  FaUserCircle,
  FaSignOutAlt,
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaShieldAlt,
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

  // Password change form state
  const [changePassword, setChangePassword] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [showChangePasswordForm, setShowChangePasswordForm] = useState(false);
  const [passwordError, setPasswordError] = useState("");

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

  const handleChangePassword = async () => {
    if (changePassword.newPassword !== changePassword.confirmPassword) {
      setPasswordError("New passwords do not match.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const res = await axios.post(
        "http://localhost:5001/api/user/change-password",
        {
          userId: profile.userId,
          oldPassword: changePassword.oldPassword,
          newPassword: changePassword.newPassword,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      alert("Password changed successfully!");
      setShowChangePasswordForm(false); // Close the form on success
    } catch (err) {
      console.error("Error changing password", err);
      setPasswordError("Failed to change password.");
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
            onClick={() => setShowChangePasswordForm(true)}
            className="flex items-center gap-3 px-3 py-2 w-full text-left rounded-md text-yellow-400 hover:bg-gray-700 transition font-semibold"
          >
            <FaShieldAlt className="text-lg" /> Change Password
          </button>
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
                <div className="space-x-2 mt-4">
                  <button
                    onClick={saveProfile}
                    className="px-4 py-2 bg-yellow-500 text-black rounded"
                  >
                    Save Changes
                  </button>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-2 bg-gray-500 text-white rounded"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <ReadOnlyField label="Full Name" value={profile.fullName} />
                <ReadOnlyField label="Email" value={profile.email} />
                <ReadOnlyField label="Username" value={profile.username} />
                <ReadOnlyField label="Phone" value={profile.phoneNumber} />

<div className="flex items-center space-x-3 mt-2">
                  <FaFacebook className="text-blue-600" />
                  <FaTwitter className="text-sky-500" />
                  <FaInstagram className="text-pink-500" />
                </div>

                <button
                  onClick={() => setIsEditing(true)}
                  className="mt-4 px-4 py-2 bg-yellow-500 text-blue rounded"
                >
                  Edit Profile
                </button>
              </div>
            )}
          </section>
        </div>

        {showChangePasswordForm && (
  <section className="mt-6 bg-gray-700 rounded-xl shadow-md p-6 text-gray-200">
    <h3 className="text-lg font-semibold mb-4">Change Password</h3>
    <div className="space-y-3 relative">
      {["oldPassword", "newPassword", "confirmPassword"].map((field, index) => (
        <div key={field} className="relative">
          <input
            type={changePassword[`show${field}`] ? "text" : "password"}
            placeholder={
              field === "oldPassword"
                ? "Old Password"
                : field === "newPassword"
                ? "New Password"
                : "Confirm New Password"
            }
            value={changePassword[field]}
            onChange={(e) =>
              setChangePassword((prev) => ({
                ...prev,
                [field]: e.target.value,
              }))
            }
            className="w-full p-2 rounded bg-gray-900 text-white border border-gray-600 pr-10"
          />
          <button
            type="button"
            onClick={() =>
              setChangePassword((prev) => ({
                ...prev,
                [`show${field}`]: !prev[`show${field}`],
              }))
            }
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-sm text-yellow-400"
          >
            {changePassword[`show${field}`] ? "Hide" : "Show"}
          </button>
        </div>
      ))}

      {changePassword.newPassword.length > 0 &&
        changePassword.newPassword.length < 6 && (
          <p className="text-red-400 text-sm">
            New password must be at least 6 characters.
          </p>
      )}

      {passwordError && (
        <p className="text-red-500 text-sm mt-1">{passwordError}</p>
      )}

      <div className="flex space-x-4 mt-2">
        <button
          onClick={handleChangePassword}
          className="px-4 py-2 bg-yellow-500 text-black rounded hover:bg-yellow-400"
        >
          Change Password
        </button>
        <button
          onClick={() => {
            setShowChangePasswordForm(false);
            setChangePassword({
              oldPassword: "",
              newPassword: "",
              confirmPassword: "",
            });
            setPasswordError("");
          }}
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
        >
          Cancel
        </button>
      </div>
    </div>
  </section>
)}

        
      </main>
    </div>
  );
}