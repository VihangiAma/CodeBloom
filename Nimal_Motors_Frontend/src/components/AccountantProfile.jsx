import React, { useState } from "react";
import { FaBoxes, FaUserCog, FaBell, FaLock, FaSignOutAlt, FaArrowLeft,FaUser,FaEnvelope,FaPhone } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import userImage from "../assets/user.png"; // Ensure this path is correct

const AccountantProfile = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("personalInfo");

  const notifications = [
    { id: 1, message: "Brake pads stock is running low.", type: "warning" },
    { id: 2, message: "Oil filters have been restocked.", type: "success" },
    { id: 3, message: "5 units of spark plugs marked as damaged.", type: "error" },
  ];


  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-blue-700 text-white p-5 space-y-6">
        <div className="flex flex-col items-center">
          <img src={userImage} alt="User" className="w-20 h-20 rounded-full mb-2" />
          <h2 className="text-lg font-semibold">John Doe</h2>
        </div>
        <nav>
          <ul className="space-y-4">

<li className="flex items-center gap-3 p-2 hover:bg-blue-600 rounded cursor-pointer" onClick={() => setActiveSection("personalInfo")}>
              <FaBoxes /> Personal Information
            </li>

            <li className="flex items-center gap-3 p-2 hover:bg-blue-600 rounded cursor-pointer" onClick={() => setActiveSection("accountSettings")}>
              <FaUserCog /> Account Settings
            </li>


            
            <li className="flex items-center gap-3 p-2 hover:bg-blue-600 rounded cursor-pointer" onClick={() => setActiveSection("notifications")}>
              <FaBell /> Notification
            </li>
            <li className="flex items-center gap-3 p-2 hover:bg-blue-600 rounded cursor-pointer" onClick={() => setActiveSection("privacy")}>
              <FaLock /> Privacy
            </li>
          </ul>
        </nav>
        <button className="flex items-center gap-2 p-2 hover:bg-red-600 rounded mt-auto" onClick={() => navigate("/")}>  
          <FaSignOutAlt /> Sign Out
        </button>
      </aside>
      
      {/* Main Content */}
      <main className="flex-1 bg-gray-100 p-10">
        <header className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold">
            {activeSection === "personalInfo" ? "Personal Information" :
            activeSection === "accountSettings" ? "Account Settings" :
             
             activeSection === "notifications" ? "Notifications" : "Privacy"}
          </h1>
          <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded" onClick={() => navigate("/inventory")}>
            <FaArrowLeft /> Inventory Dashboard
          </button>
        </header>


        {activeSection === "personalInfo" && (
          <div className="bg-white p-6 rounded shadow-md max-w-3xl mx-auto">
            <div className="flex flex-col items-center mb-6">
              <img src={userImage} alt="User" className="w-24 h-24 rounded-full border-4 border-blue-500 shadow-md" />
              <h2 className="text-xl font-bold mt-3">John Doe</h2>
              <p className="text-gray-600">Accountant</p>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="flex items-center bg-gray-100 p-4 rounded shadow">
                <FaUser className="text-blue-600 text-lg mr-3" />
                <span><strong>Username:</strong> john.doe</span>
              </div>
              <div className="flex items-center bg-gray-100 p-4 rounded shadow">
                <FaEnvelope className="text-blue-600 text-lg mr-3" />
                <span><strong>Email:</strong> john.doe@example.com</span>
              </div>
              <div className="flex items-center bg-gray-100 p-4 rounded shadow">
                <FaPhone className="text-blue-600 text-lg mr-3" />
                <span><strong>Phone:</strong> 0918873724</span>
              </div>
            </div>
          </div>
        )}

        
        {activeSection === "accountSettings" && (
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
                <input type="password" className="w-full p-2 border rounded" defaultValue="password123" />
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
              <button className="bg-blue-600 text-white px-6 py-2 rounded mr-4">Save</button>
              <button className="bg-gray-300 text-black px-6 py-2 rounded">Cancel</button>
            </div>
          </div>
        )}
          {activeSection === "notifications" && (
          <div className="bg-white p-6 rounded shadow-md">
            <h2 className="text-lg font-semibold mb-4">Inventory Alerts</h2>
            <ul className="space-y-3">
              {notifications.map((notification) => (
                <li key={notification.id} className={`p-3 rounded ${notification.type === "warning" ? "bg-yellow-100 text-yellow-800" : notification.type === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                  {notification.message}
                </li>
              ))}
            </ul>
          </div>
        )}
        
        
      </main>
    </div>
  );
};

export default AccountantProfile;
