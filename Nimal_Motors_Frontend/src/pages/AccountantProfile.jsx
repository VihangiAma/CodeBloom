import { useState } from "react";
import {
  FaChartPie,
  FaFileInvoice,
  FaMoneyCheckAlt,
  FaCogs,
  FaUserCircle,
  FaSignOutAlt,
  FaFacebook,
  FaTwitter,
  FaInstagram,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

export default function AccountantProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  const [profile, setProfile] = useState({
    fullName: "Tharindu Silva",
    mobile: "0781122334",
    email: "tharindu.silva@gmail.com",
    username: "tharindu.silva",
    location: "Colombo, Sri Lanka",
  });

  const [accountSettings] = useState({
    financialView: "Monthly Overview",
    exportFormat: "PDF",
    twoFA: "Biometric Authentication",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const saveProfile = () => {
    setIsEditing(false);
  };

  const handleSignOut = () => {
    // Clear any auth data if necessary
    navigate("/login");
  };

  return (
    <div className="flex h-screen bg-gray-900 text-white font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 shadow-lg p-6 flex flex-col justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-400 mb-6">🚗 NIMAL MOTORS</h1>
          <nav className="space-y-2">
            {[
              { name: "Dashboard", icon: FaChartPie, path: "/dashboard" },
              { name: "Financial Reports", icon: FaFileInvoice, path: "/financial-reports" },
              { name: "Invoices", icon: FaMoneyCheckAlt, path: "/invoices" },
              { name: "Transactions", icon: FaMoneyCheckAlt, path: "/transactions" },
              { name: "Settings", icon: FaCogs, path: "/settings" },
            ].map(({ name, icon: Icon, path }, idx) => (
              <Link
                key={idx}
                to={path}
                className="flex items-center gap-3 px-3 py-2 rounded-md text-gray-300 hover:bg-gray-700 hover:text-white transition duration-150"
              >
                <Icon className="text-lg" />
                <span>{name}</span>
              </Link>
            ))}
          </nav>
        </div>

        <div className="pt-6 border-t border-gray-600">
          <nav className="space-y-2">
            <Link
              to="/profile"
              className="flex items-center gap-3 px-3 py-2 rounded-md text-blue-400 hover:bg-gray-700 transition duration-150 font-semibold"
            >
              <FaUserCircle className="text-lg" />
              Profile
            </Link>
            <button
              onClick={handleSignOut}
              className="flex items-center gap-3 px-3 py-2 rounded-md text-red-400 hover:bg-gray-700 transition duration-150 w-full text-left"
            >
              <FaSignOutAlt className="text-lg" />
              Sign Out
            </button>
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-auto">
        {/* Header */}
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
              <p className="text-sm">Accountant - Nimal Motors</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* System Preferences */}
          <div className="bg-gray-800 rounded-xl shadow-md p-6 text-gray-200">
            <h3 className="text-lg font-semibold mb-4">System Preferences</h3>
            <div className="text-sm space-y-3">
              <p><strong>Financial Summary View:</strong> {accountSettings.financialView}</p>
              <p><strong>Report Export Format:</strong> {accountSettings.exportFormat}</p>
              <p><strong>Authentication Method:</strong> {accountSettings.twoFA}</p>
            </div>
          </div>

          {/* Profile Info */}
          <div className="bg-gray-800 rounded-xl shadow-md p-6 text-gray-200">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Accountant Profile</h3>
              {isEditing ? (
                <div className="space-x-2">
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
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="text-blue-400 text-sm hover:underline"
                >
                  Edit
                </button>
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
              <>
                <p className="text-sm text-gray-400 mb-4">
                  Hello, I'm {profile.fullName}. I manage the financial records, oversee reports and ensure transparent accounting for Nimal Motors.
                </p>
                <div className="text-sm space-y-2">
                  <p><strong>Full Name:</strong> {profile.fullName}</p>
                  <p><strong>Mobile:</strong> {profile.mobile}</p>
                  <p><strong>Email:</strong> {profile.email}</p>
                  <p><strong>Username:</strong> {profile.username}</p>
                  <p><strong>Location:</strong> {profile.location}</p>
                  <div className="flex items-center space-x-3 mt-2">
                    <a href="https://facebook.com/sahan.samarasinghe" target="_blank" rel="noreferrer">
                      <FaFacebook className="text-blue-600 hover:text-blue-400 text-xl" />
                    </a>
                    <a href="https://twitter.com/sahan_s" target="_blank" rel="noreferrer">
                      <FaTwitter className="text-sky-500 hover:text-sky-300 text-xl" />
                    </a>
                    <a href="https://instagram.com/sahan.s" target="_blank" rel="noreferrer">
                      <FaInstagram className="text-pink-500 hover:text-pink-400 text-xl" />
                    </a>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
