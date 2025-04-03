

// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";


// const SupervisorLoginForm = () => {
//   const [selectedSection, setSelectedSection] = useState("mechanical");
//   const navigate = useNavigate();

//   const handleLogin = (e) => {
//     e.preventDefault();

//      // Perform login authentication (this is a simple example)
//      localStorage.setItem("authToken", "123456"); // Store authentication token
//      navigate("/dashboard"); // Redirect to dashboard after login
//    };

//   return (
//     <div className="flex justify-center items-center h-screen bg-gray-100">
//       <div className="bg-white p-6 rounded-lg shadow-lg w-96">
//         <h2 className="text-2xl font-bold mb-4 text-center">Supervisor Login</h2>
//         <label className="block text-gray-700 font-semibold mb-2">Select Section</label>
//         <select
//           className="w-full p-2 border rounded-lg mb-4"
//           value={selectedSection}
//           onChange={(e) => setSelectedSection(e.target.value)}
//         >
//           <option value="mechanical">Service</option>
//           <option value="electrical">Electrical</option>
//           <option value="body-shop">Body Shop</option>
//           <option value="service">Mechanical</option>
//         </select>
//         <button
//           onClick={handleLogin}
//           className="w-full bg-blue-700 text-black p-2 rounded-lg hover:bg-blue-700"
//         >
//           Login
//         </button>
//       </div>
//     </div>
//   );
// };


// export default SupervisorLoginForm;


import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SupervisorLoginForm = () => {
  const [selectedSection, setSelectedSection] = useState("mechanical");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Only allow login if "Service" is selected
    if (selectedSection === "service") {
      localStorage.setItem("authToken", "123456"); // Store authentication token
      navigate("/dashboard"); // Redirect to dashboard
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">Supervisor Login</h2>
        
        <label className="block text-gray-700 font-semibold mb-2">Select Section</label>
        <select
          className="w-full p-2 border rounded-lg mb-4"
          value={selectedSection}
          onChange={(e) => setSelectedSection(e.target.value)}
        >
          <option value="mechanical">Mechanical</option>
          <option value="electrical">Electrical</option>
          <option value="body-shop">Body Shop</option>
          <option value="service">Service</option>
        </select>

        <button
          onClick={handleLogin}
          disabled={selectedSection !== "service"} // Disable if not "service"
          className={`w-full p-2 rounded-lg ${
            selectedSection === "service"
              ? "bg-blue-700 text-white hover:bg-blue-800"
              : "bg-gray-400 text-gray-700 cursor-not-allowed"
          }`}
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default SupervisorLoginForm;
