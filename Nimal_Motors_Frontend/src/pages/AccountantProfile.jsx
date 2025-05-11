
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  FaUserCircle,
  FaSignOutAlt,
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaShieldAlt,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function AccountantProfile() {
  const navigate = useNavigate();



  /* ────────── state ────────── */
  const [profile, setProfile] = useState({
    userId: "",
    fullName: "",
    email: "",
    username: "",
    phoneNumber: "",
    type: "accountant",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [showChangePasswordForm, setShowChangePasswordForm] = useState(false); // Add this state
  const [changePassword, setChangePassword] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [passwordError, setPasswordError] = useState("");

  /* ────────── data fetch ────────── */
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

  useEffect(() => {
    fetchProfile();
  }, []);
  /* ────────── handlers ────────── */
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


  const handleSignOut = () => navigate("/login");

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

  /* ────────── render ────────── */
  return (
    <div className="flex h-screen bg-gray-900 text-white font-sans">
      {/* ───── sidebar ───── */}
      <aside className="w-64 bg-gray-800 shadow-lg p-6 flex flex-col justify-between">
        <h1 className="text-2xl font-extrabold text-gray-300 mb-6">
          🚗 NIMAL MOTORS
        </h1>

        <nav className="flex-1" />

        <div className="space-y-2 border-t border-gray-600 pt-6">
          {/* <button
            onClick={fetchProfile}
            className="flex items-center gap-3 px-3 py-2 w-full text-left rounded-md text-blue-400 hover:bg-gray-700 transition font-semibold"
          >
            <FaUserCircle className="text-lg" />
            Profile
          </button> */}
<button
            onClick={() => setShowChangePasswordForm(true)}
            className="flex items-center gap-3 px-3 py-2 w-full text-left rounded-md text-yellow-400 hover:bg-gray-700 transition font-semibold"
          >
            <FaShieldAlt className="text-lg" /> Change Password
          </button>

          
          <button
            onClick={() => navigate("/accountant-dashboard")}
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

      {/* ───── main content ───── */}
      <main className="flex-1 p-6 overflow-auto">
        {/* cover image + name */}
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
              <p className="text-sm">
                Accountant – Nimal Motors
                {profile.fullName && ` – ${profile.fullName}`}
              </p>
            </div>
          </div>
        </div>

        {/* about‑me & details */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* left: about me */}
          <section className="bg-gray-700 rounded-xl shadow-md p-6 text-gray-200">
            <h3 className="text-lg font-semibold mb-4">About Me</h3>
            <p className="text-sm leading-relaxed">
              Hi, I’m {profile.fullName || "—"}. As the Accountant at Nimal
              Motors, I keep our financial engine running smoothly—overseeing
              everything from daily transaction reconciliations and payroll to
              quarterly forecasting and tax compliance. With more than ten years
              of automotive‑industry accounting experience, I translate raw
              numbers into clear insights that guide strategic decisions and
              maintain the company’s fiscal health. My passion is building
              robust financial controls while supporting each department with
              timely, accurate reporting. When I’m not immersed in ledgers and
              spreadsheets you’ll find me refining cost‑management processes,
              mentoring junior finance staff, or researching the latest
              regulatory changes to ensure we stay ahead of the curve.
            </p>
          </section>

          {/* right: detail card */}
          <section className="relative bg-gray-700 rounded-xl shadow-md p-6 text-gray-200">
            <h3 className="text-lg font-semibold mb-4">Accountant Profile</h3>

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
                    onClick={() => setIsEditing(false)}
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
                onClick={() => setIsEditing(true)}
                className="absolute top-6 right-6 bg-yellow-700 hover:bg-yellow-600 text-sm px-4 py-1 rounded"
              >
                Edit
              </button>
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


