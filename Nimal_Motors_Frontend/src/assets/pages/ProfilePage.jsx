import React from "react";
import { FaCog, FaUser, FaBell, FaLock, FaSignOutAlt } from "react-icons/fa";

const ProfilePage = () => {
  return (
    <div className="flex h-screen bg-gray-200 p-6">
      {/* Sidebar */}
      <div className="w-1/4 bg-blue-900 text-white p-6 rounded-xl">
        <div className="flex flex-col items-center">
          <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-white">
            <img
              src="https://via.placeholder.com/100"
              alt="Profile"
              className="w-full h-full object-cover"
            />
            <button className="absolute bottom-0 right-0 bg-white text-black p-1 rounded-full text-xs">+</button>
          </div>
          <h2 className="mt-4 text-lg font-semibold">Admin</h2>
        </div>
        <nav className="mt-6">
          <ul>
            <li className="flex items-center py-2 px-4 hover:bg-blue-700 rounded cursor-pointer">
              <FaCog className="mr-2" /> Account Settings
            </li>
            <li className="flex items-center py-2 px-4 hover:bg-blue-700 rounded cursor-pointer">
              <FaUser className="mr-2" /> Personal Information
            </li>
            <li className="flex items-center py-2 px-4 hover:bg-blue-700 rounded cursor-pointer">
              <FaBell className="mr-2" /> Notification
            </li>
            <li className="flex items-center py-2 px-4 hover:bg-blue-700 rounded cursor-pointer">
              <FaLock className="mr-2" /> Privacy
            </li>
          </ul>
        </nav>
        <button className="mt-6 flex items-center py-2 px-4 bg-red-600 hover:bg-red-700 rounded w-full">
          <FaSignOutAlt className="mr-2" /> Sign Out
        </button>
      </div>

      {/* Main Content */}
      <div className="w-3/4 bg-white p-8 rounded-xl shadow-md ml-6">
        <h2 className="text-2xl font-semibold mb-4">Account Settings</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700">First Name</label>
            <input type="text" value="" className="w-full p-2 border rounded" readOnly />
          </div>
          <div>
            <label className="block text-gray-700">Last Name</label>
            <input type="text" value="" className="w-full p-2 border rounded" readOnly />
          </div>
          <div>
            <label className="block text-gray-700">User Name</label>
            <input type="text" value="" className="w-full p-2 border rounded" readOnly />
          </div>
          <div>
            <label className="block text-gray-700">Password</label>
            <input type="password" value="" className="w-full p-2 border rounded" readOnly />
          </div>
          <div>
            <label className="block text-gray-700">Email</label>
            <input type="email" value="" className="w-full p-2 border rounded" readOnly />
          </div>
          <div>
            <label className="block text-gray-700">Phone Number</label>
            <input type="text" value="" className="w-full p-2 border rounded" readOnly />
          </div>
        </div>
        <div className="mt-6 flex space-x-4">
          <button className="bg-blue-700 text-white py-2 px-6 rounded">Save</button>
          <button className="bg-gray-300 text-black py-2 px-6 rounded">Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
