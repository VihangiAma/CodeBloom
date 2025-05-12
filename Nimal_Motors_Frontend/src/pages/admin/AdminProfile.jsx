import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  FaUserCircle,
  FaSignOutAlt,
  FaShieldAlt,
  FaFacebook,
  FaTwitter,
  FaInstagram,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

// ------------------ JWT Decoding ------------------
const decodeJWT = (token) => {
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/\_/g, "/");
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

  // Profile edit form state
  const [editUser, setEditUser] = useState(null);

  // Password change form state
  const [changePassword, setChangePassword] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [passwordError, setPasswordError] = useState("");

  // ------------------ Handlers ------------------
  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditUser((prev) => ({ ...prev, [name]: value }));
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

      await axios.put(
        "http://localhost:5001/api/user/me",
        {
          fullName: profile.fullName,
          email: profile.email,
          username: profile.username,
          phoneNumber: profile.phoneNumber,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      alert("Profile updated successfully!");
    } catch (err) {
      console.error("Error updating user data", err);
      alert("Failed to update profile.");
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

  // ------------------ Main Render ------------------
  return (
    <div className="flex h-screen bg-gray-900 text-white font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 shadow-lg p-6 flex flex-col justify-between">
        <h1 className="text-2xl font-extrabold text-gray-300 mb-6">🚗 NIMAL MOTORS </h1>
        <nav className="flex-1" />
        <div className="space-y-2 border-t border-gray-600 pt-6">
          <button
            onClick={() => navigate("/admin-dashboard")}
            className="flex items-center gap-3 px-3 py-2 w-full text-left rounded-md text-blue-400 hover:bg-gray-700 transition font-semibold"
          >
            <FaUserCircle className="text-lg" /> Dashboard
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
              optimisation...
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
              <div className="space-y-3 text-sm">
                <ReadOnlyField label="Full Name" value={profile.fullName} />
                <ReadOnlyField label="Email" value={profile.email} />
                <ReadOnlyField label="Username" value={profile.username} />
                <ReadOnlyField label="Phone Number" value={profile.phoneNumber} />
                <button
                  onClick={() => setIsEditing(true)}
                  className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
                >
                  Edit Profile
                </button>
<div className="flex items-center space-x-3 mt-2">
                  <FaFacebook className="text-blue-600" />
                  <FaTwitter className="text-sky-500" />
                  <FaInstagram className="text-pink-500" />
                </div>

              </div>
            )}

            {/* Change Password Form  */}
            {isEditing && (
              <section className="mt-6 bg-gray-700 rounded-xl shadow-md p-6 text-gray-200">
                <h3 className="text-lg font-semibold mb-4">Change Password</h3>
                <div className="space-y-4 text-sm">
                  <input
                    type="password"
                    placeholder="Old Password"
                    className="w-full p-2 bg-gray-800 rounded text-white"
                    value={changePassword.oldPassword}
                    onChange={(e) =>
                      setChangePassword({
                        ...changePassword,
                        oldPassword: e.target.value,
                      })
                    }
                  />
                  <input
                    type="password"
                    placeholder="New Password"
                    className="w-full p-2 bg-gray-800 rounded text-white"
                    value={changePassword.newPassword}
                    onChange={(e) =>
                      setChangePassword({
                        ...changePassword,
                        newPassword: e.target.value,
                      })
                    }
                  />
                  <input
                    type="password"
                    placeholder="Confirm New Password"
                    className="w-full p-2 bg-gray-800 rounded text-white"
                    value={changePassword.confirmPassword}
                    onChange={(e) =>
                      setChangePassword({
                        ...changePassword,
                        confirmPassword: e.target.value,
                      })
                    }
                  />
                  <button
                    onClick={handleChangePassword}
                    className="w-full px-4 py-2 bg-green-500 text-white rounded mt-4"
                  >
                    Change Password
                  </button>
                  {passwordError && (
                    <p className="text-red-500 text-xs mt-2">{passwordError}</p>
                  )}
                </div>
              </section>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}
