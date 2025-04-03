
import React from "react";
import { FaBoxes, FaUserCog, FaBell, FaLock, FaSignOutAlt, FaArrowLeft } from "react-icons/fa";
import { BrowserRouter as Router, useNavigate } from "react-router-dom";

const SupervisorProfile = () => {
  const navigate = useNavigate();
  const defaultUserImage = "https://via.placeholder.com/150"; // Default user image

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-blue-700 text-white p-5 flex flex-col space-y-6">
        <div className="flex flex-col items-center">
          <img src={defaultUserImage} alt="User" className="w-20 h-20 rounded-full mb-2" />
          <h2 className="text-lg font-semibold">John Doe</h2>
        </div>
        <nav className="flex-grow">
          <ul className="space-y-4">
            <li className="flex items-center gap-3 p-2 hover:bg-blue-600 rounded cursor-pointer">
              <FaUserCog /> Account Settings
            </li>
            <li className="flex items-center gap-3 p-2 hover:bg-blue-600 rounded cursor-pointer">
              <FaBoxes /> Personal Information
            </li>
            <li className="flex items-center gap-3 p-2 hover:bg-blue-600 rounded cursor-pointer">
              <FaBell /> Notification
            </li>
            <li className="flex items-center gap-3 p-2 hover:bg-blue-600 rounded cursor-pointer">
              <FaLock /> Privacy
            </li>
          </ul>
        </nav>
        <button
          className="flex items-center gap-2 p-2 bg-red-600 hover:bg-red-700 rounded mt-auto"
          onClick={() => navigate("/")}
        >
          <FaSignOutAlt /> Sign Out
        </button>
      </aside>
      
      {/* Main Content */}
      <main className="flex-1 bg-gray-100 p-10">
        <header className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold">Account Settings</h1>
          <button
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
            onClick={() => navigate("/supervisor-dashboard")}
          >
            <FaArrowLeft /> Supervisor Dashboard
          </button>
        </header>

        <div className="bg-white p-6 rounded shadow-md">
          <form className="grid grid-cols-2 gap-6">
            <div>
              <label className="block font-semibold">First Name</label>
              <input type="text" className="w-full p-2 border rounded" defaultValue="John" />
            </div>
            <div>
              <label className="block font-semibold">Last Name</label>
              <input type="text" className="w-full p-2 border rounded" defaultValue="Doe" />
            </div>
            <div>
              <label className="block font-semibold">Username</label>
              <input type="text" className="w-full p-2 border rounded" defaultValue="john.doe" />
            </div>
            <div>
              <label className="block font-semibold">Password</label>
              <input type="password" className="w-full p-2 border rounded" defaultValue="" placeholder="Enter new password" />
            </div>
            <div>
              <label className="block font-semibold">Email</label>
              <input type="email" className="w-full p-2 border rounded" defaultValue="john.doe@example.com" />
            </div>
            <div>
              <label className="block font-semibold">Phone Number</label>
              <input type="text" className="w-full p-2 border rounded" defaultValue="0918873724" />
            </div>
          </form>
          <div className="flex justify-end mt-6">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded mr-4">Save</button>
            <button className="bg-gray-300 hover:bg-gray-400 text-black px-6 py-2 rounded">Cancel</button>
          </div>
        </div>
      </main>
    </div>
  );
};



export default SupervisorProfile;
