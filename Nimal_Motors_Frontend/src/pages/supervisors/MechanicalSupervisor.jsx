import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  FaUserCircle,
  FaSignOutAlt,
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function MechanicalSupervisor() {
  const navigate = useNavigate();

  const [profile, setProfile] = useState({
    userId: "",
    fullName: "",
    email: "",
    username: "",
    phoneNumber: "",
    type: "mechanicalsupervisor",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [showChangePasswordForm, setShowChangePasswordForm] = useState(false); // Added missing state
  const [changePassword, setChangePassword] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
    newPasswordVisible: false,
    oldPasswordVisible: false,
    confirmPasswordVisible: false,
  });

  const [passwordError, setPasswordError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;
      try {
        const res = await axios.get("http://localhost:5001/api/user/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProfile(res.data.user);
      } catch (err) {
        console.error("Error fetching profile data", err);
      }
    };
    fetchProfile();
  }, []);

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
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

  const handleChangePassword = async () => {
    setPasswordError("");
    if (changePassword.newPassword !== changePassword.confirmPassword) {
      setPasswordError("New passwords do not match.");
      return;
    }
    if (changePassword.newPassword.length < 6) {
      setPasswordError("New password must be at least 6 characters.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      await axios.post(
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
      setChangePassword({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
        oldPasswordVisible: false,
        newPasswordVisible: false,
        confirmPasswordVisible: false,
      });
      setShowChangePasswordForm(false);
    } catch (err) {
      console.error("Error changing password", err);
      setPasswordError("Failed to change password.");
    }
  };

  const handleSignOut = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const renderPasswordInput = (field, label) => (
    <div className="relative">
      <input
        type={changePassword[`${field}Visible`] ? "text" : "password"}
        placeholder={label}
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
            [`${field}Visible`]: !prev[`${field}Visible`],
          }))
        }
        className="absolute right-2 top-2"
      >
        {changePassword[`${field}Visible`] ? (
          <FaEyeSlash className="text-white" />
        ) : (
          <FaEye className="text-white" />
        )}
      </button>
    </div>
  );

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
            onClick={() => navigate("/mechanical-supervisor-dashboard")}
            className="flex items-center gap-3 px-3 py-2 w-full text-left rounded-md text-blue-400 hover:bg-gray-700 transition font-semibold"
          >
            <FaUserCircle className="text-lg" />
            Dashboard
          </button>

          <button
            onClick={handleSignOut}
            className="flex items-center gap-3 px-3 py-2 w-full text-left rounded-md text-red-400 hover:bg-gray-700 transition"
          >
            <FaSignOutAlt className="text-lg" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-auto">
        {/* Profile Header */}
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
            <div className="text-white drop-shadow-lg">
              <h2 className="text-2xl font-bold">{profile.fullName}</h2>
              <p className="text-sm">Mechanical Supervisor – Nimal Motors</p>
            </div>
          </div>
        </div>

        {/* About Me & Details */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left: About Me */}
          <section className="bg-gray-700 rounded-xl shadow-md p-6 text-gray-200">
            <h3 className="text-lg font-semibold mb-4">About Me</h3>
            <p className="text-sm leading-relaxed">
              Hi, I’m {profile.fullName || "—"}. As the Mechanical Supervisor at
              Nimal Motors, I lead a team of technicians who handle everything
              from routine maintenance to full engine and drivetrain rebuilds.
              With more than a decade of hands‑on experience in automotive
              mechanics, I manage the mechanical workshop workflow, perform
              advanced diagnostics, and verify that every repair meets OEM
              specifications and our own quality benchmarks. My passion lies in
              combining precision workmanship with clear communication so
              customers understand exactly how we’re bringing their vehicles
              back to peak performance. When I’m not under the hood fine‑tuning
              torque specs, you’ll find me mentoring junior techs, implementing
              lean‑shop practices, or studying the latest power‑train
              technologies to keep our services at the cutting edge.
            </p>
          </section>

          {/* Right: Detail Card */}
          <section className="relative bg-gray-700 rounded-xl shadow-md p-6 text-gray-200">
            <h3 className="text-lg font-semibold mb-4">
              Mechanical Supervisor Profile
            </h3>

            {isEditing ? (
              <div className="space-y-3 text-sm">
                {["fullName", "email", "username", "phoneNumber"].map((f) => (
                  <div key={f} className="flex flex-col">
                    <label className="font-medium capitalize">{f}:</label>
                    <input
                      name={f}
                      value={profile[f]}
                      onChange={handleProfileChange}
                      className="bg-gray-800 border border-gray-500 p-2 rounded text-white"
                    />
                  </div>
                ))}
                <div className="space-x-2 mt-2">
                  <button
                    onClick={saveProfile}
                    className="text-green-400 text-sm hover:underline"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => {
                      setIsEditing(false);
                      setShowChangePasswordForm(false);
                    }}
                    className="text-red-400 text-sm hover:underline"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-sm space-y-2">
                <p>
                  <strong>Full Name:</strong> {profile.fullName || "—"}
                </p>
                <p>
                  <strong>Mobile:</strong> {profile.phoneNumber || "—"}
                </p>
                <p>
                  <strong>Email:</strong> {profile.email || "—"}
                </p>
                <p>
                  <strong>Username:</strong> {profile.username || "—"}
                </p>
                <div className="flex items-center space-x-3 mt-2">
                  <FaFacebook className="text-blue-600" />
                  <FaTwitter className="text-sky-500" />
                  <FaInstagram className="text-pink-500" />
                </div>
              </div>
            )}

            {!isEditing && (
              <button
                onClick={() => {
                  setIsEditing(true);
                  setShowChangePasswordForm(true);
                }}
                className="absolute top-6 right-6 bg-yellow-700 hover:bg-yellow-600 text-sm px-4 py-1 rounded"
              >
                Edit
              </button>
            )}
          </section>
        </div>

        {/* Change Password Section */}
        {isEditing && showChangePasswordForm && (
          <section className="mt-6 bg-gray-700 rounded-xl shadow-md p-6 text-gray-200">
            <h3 className="text-lg font-semibold mb-4">Change Password</h3>
            <div className="space-y-4 text-sm">
              {renderPasswordInput("oldPassword", "Old Password")}
              {renderPasswordInput("newPassword", "New Password")}
              {renderPasswordInput("confirmPassword", "Confirm Password")}

              {passwordError && (
                <p className="text-red-400 text-sm">{passwordError}</p>
              )}

              <button
                onClick={handleChangePassword}
                className="bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded text-white"
              >
                Update Password
              </button>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}