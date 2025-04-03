import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const PersonalInfoAdmin = () => {
  const navigate = useNavigate();

  // Hardcoded admin info (view-only)
  const adminData = {
    name: "Dinuka Heshan",
    phoneNumber: "+9471 7286020",
    email: "heshandinuka.hd@gmail.com",
    address: "No 321/A, Galle Road, Aluthgama",
    role: "Admin",
  };

  return (
    <div className="flex h-screen bg-gray-100 p-10">
      <div className="w-full max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <div className="flex items-center mb-6">
          <button
            className="text-blue-600 hover:text-blue-800"
            onClick={() => navigate(-1)} // Go back to the previous page
          >
            <FaArrowLeft size={20} />
          </button>
          <h1 className="text-2xl font-bold text-gray-900 ml-4">Admin Information</h1>
        </div>

        <div className="grid grid-cols-2 gap-6">
          {Object.entries(adminData).map(([key, value]) => (
            <div key={key} className="col-span-2 sm:col-span-1">
              <label className="block font-semibold text-gray-800">
                {key.replace(/([A-Z])/g, " $1").trim()}
              </label>
              <p className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 text-black">
                {value}
              </p>
            </div>
          ))}
        </div>

        <div className="flex justify-end mt-6">
          <button
            className="bg-gray-300 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-400 transition"
            onClick={() => navigate(-1)} // Go back to the previous page
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default PersonalInfoAdmin;
