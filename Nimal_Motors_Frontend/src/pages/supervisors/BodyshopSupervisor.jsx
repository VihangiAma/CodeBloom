import { useState } from "react";
import {
  FaUserTie,
  FaToolbox,
  FaCogs,
  FaUserCircle,
  FaSignOutAlt,
  FaFacebook,
  FaTwitter,
  FaInstagram,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

export default function BodyshopSupervisorProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  const [profile, setProfile] = useState({
    fullName: "Nuwan Silva",
    mobile: "077 123 4567",
    email: "nuwan.silva@example.com",
    username: "nuwansilva",
    location: "Galle, Sri Lanka",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const saveProfile = () => {
    setIsEditing(false);
  };

  const handleSignOut = () => {
    navigate("/login");
  };

  return (
    <div className="flex h-screen bg-gray-900 text-white font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-yellow-800 p-6 flex flex-col justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-white mb-6">🚗 NIMAL MOTORS</h1>
          <nav className="space-y-2">
            <Link to="/bodyshop-tasks" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-yellow-700 transition">
              <FaToolbox /> <span>Bodyshop Tasks</span>
            </Link>
            <Link to="/settings" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-yellow-700 transition">
              <FaCogs /> <span>Settings</span>
            </Link>
          </nav>
        </div>

        <div className="pt-6 border-t border-yellow-600">
          <nav className="space-y-2">
            <Link to="/profile" className="flex items-center gap-3 px-3 py-2 rounded-md text-yellow-200 hover:bg-yellow-700 transition font-semibold">
              <FaUserCircle /> Profile
            </Link>
            <button onClick={handleSignOut} className="flex items-center gap-3 px-3 py-2 rounded-md text-red-300 hover:bg-red-600 transition w-full text-left">
              <FaSignOutAlt /> Sign Out
            </button>
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-auto">
        {/* Header */}
        <div className="rounded-xl h-48 bg-cover bg-center relative" style={{ backgroundImage: `url("/garage-bg.jpg")` }}>
          <div className="absolute bottom-[-30px] left-8 flex items-center space-x-4">
            <img src="/bodyshop-profile.jpg" alt="profile" className="w-20 h-20 rounded-full border-4 border-white shadow-lg" />
            <div className="text-white drop-shadow-lg">
              <h2 className="text-2xl font-bold">{profile.fullName}</h2>
              <p className="text-sm">Bodyshop Supervisor - Nimal Motors</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Description */}
          <div className="bg-gray-800 rounded-xl shadow-md p-6 text-gray-200">
            <h3 className="text-lg font-semibold mb-3">About Me</h3>
            <p className="text-sm text-gray-400">
              Hi, I'm {profile.fullName}. I handle the operations and management of the bodyshop unit to ensure top-quality service delivery.
            </p>
          </div>

          {/* Profile Info */}
          <div className="bg-gray-800 rounded-xl shadow-md p-6 text-gray-200">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Bodyshop Supervisor Profile</h3>
              {isEditing ? (
                <div className="space-x-2">
                  <button onClick={saveProfile} className="text-green-400 text-sm hover:underline">Save</button>
                  <button onClick={() => setIsEditing(false)} className="text-red-400 text-sm hover:underline">Cancel</button>
                </div>
              ) : (
                <button onClick={() => setIsEditing(true)} className="text-yellow-400 text-sm hover:underline">Edit</button>
              )}
            </div>

            {isEditing ? (
              <div className="text-sm space-y-2">
                {[
                  ["Full Name", "fullName"],
                  ["Mobile", "mobile"],
                  ["Email", "email"],
                  ["Username", "username"],
                  ["Location", "location"],
                ].map(([label, name]) => (
                  <div key={name} className="flex flex-col">
                    <label className="font-medium">{label}:</label>
                    <input
                      type="text"
                      name={name}
                      value={profile[name]}
                      onChange={handleChange}
                      className="border border-gray-500 bg-gray-900 rounded p-1 text-white"
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-sm space-y-2">
                <p><strong>Full Name:</strong> {profile.fullName}</p>
                <p><strong>Mobile:</strong> {profile.mobile}</p>
                <p><strong>Email:</strong> {profile.email}</p>
                <p><strong>Username:</strong> {profile.username}</p>
                <p><strong>Location:</strong> {profile.location}</p>
                <div className="flex items-center space-x-3 mt-2">
                  <a href="https://facebook.com/nuwan.silva" target="_blank" rel="noreferrer"><FaFacebook className="text-blue-600 hover:text-blue-400 text-xl" /></a>
                  <a href="https://twitter.com/nuwan_s" target="_blank" rel="noreferrer"><FaTwitter className="text-sky-500 hover:text-sky-300 text-xl" /></a>
                  <a href="https://instagram.com/nuwan.s" target="_blank" rel="noreferrer"><FaInstagram className="text-pink-500 hover:text-pink-400 text-xl" /></a>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
