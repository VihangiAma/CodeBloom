// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import AppointmentDetails from "./Supervisors/AppointmentDetails";
// import ApprovedAppointments from "./Supervisors/ApprovedAppointments";
// import Completedappoinments from "./Supervisors/Competedappoinments";
// import AddCustomer from "./Supervisors/AddCustomer";
// //import { FaListAlt, FaCheckCircle, FaSpinner, FaClock } from "react-icons/fa";

// const DashboardCard = ({ title, description, emoji, color, onClick }) => (
//   <div
//     onClick={onClick}
//     className={`cursor-pointer ${color} text-white rounded-2xl shadow-xl p-8 transform hover:scale-105 transition duration-300 flex flex-col justify-between`}
//   >
//     <div className="text-5xl mb-4">{emoji}</div>
//     <h2 className="text-2xl font-bold mb-2">{title}</h2>
//     <p className="opacity-90">{description}</p>
//   </div>
// );

// const ServiceSupervisorDashboard = () => {
//   const navigate = useNavigate();

//   const [activePage, setActivePage] = useState("dashboard");

//   const renderContent = () => {
//     switch (activePage) {
//       case "appointments":
//         return (
//           <AppointmentDetails
//             view="all"
//             goBack={() => setActivePage("dashboard")}
//           />
//         );
//       case "approved":
//         return (
//           <ApprovedAppointments
//             view="approved"
//             goBack={() => setActivePage("dashboard")}
//           />
//         );

//       case "invoices":
//         return (
//           <Completedappoinments
//             view="invoices"
//             goBack={() => setActivePage("dashboard")}
//           />
//         );

//       case "addservice":
//         return (
//           <div className="text-gray-600 p-8 text-center text-xl">
//             <AddCustomer
//               goBack={() => setActivePage("dashboard")}
//               sectionPrefix="service"
//               section="appointments"
//             />
//           </div>
//         );
//       default:
//         return (
//           <>
//             {/* Dashboard Cards */}
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-8">
//               <DashboardCard
//                 title="Add Customer"
//                 description="Add a new customer details."
//                 color="bg-blue-500"
//                 emoji="➕"
//                 onClick={() => setActivePage("addservice")}
//               />
//               <DashboardCard
//                 title="Manage Appointments"
//                 description="View and manage customer bookings."
//                 color="bg-green-500"
//                 emoji="📅"
//                 onClick={() => setActivePage("appointments")}
//               />

//               <DashboardCard
//                 title="View Invoice"
//                 description="View invoices of vehicles."
//                 color="bg-yellow-500"
//                 emoji="💰"
//                 onClick={() => setActivePage("invoices")}
//               />
//               <DashboardCard
//                 title="Approved Appointments"
//                 description="Track approved appointments."
//                 color="bg-indigo-500"
//                 emoji="✅"
//                 onClick={() => setActivePage("approved")}
//               />
//             </div>
//           </>
//         );
//     }
//   };

//   return (
//     <div className="flex min-w-screen bg-gray-100">
//       {/* Sidebar */}
//       <div className="w-64 bg-gray-800 text-white flex flex-col justify-between">
//         <div>
//           {/* Company Name */}
//           <div className="flex items-center p-6 space-x-3">
//             <h1 className="text-2xl font-extrabold text-gray-300 mb-6">
//               🚗 NIMAL MOTORS
//             </h1>
//           </div>

//           {/* Navigation */}
//           <div className="p-6">
//             <h2 className="text-xl font-bold mb-6">Supervisor Section</h2>
//             <ul className="space-y-3">
//               <li>
//                 <button
//                   className={`w-full text-left px-4 py-2 rounded hover:bg-gray-700 ${
//                     activePage === "dashboard" && "bg-gray-700"
//                   }`}
//                   onClick={() => setActivePage("dashboard")}
//                 >
//                   Dashboard
//                 </button>
//               </li>
//               <li>
//                 <button
//                   className={`w-full text-left px-4 py-2 rounded hover:bg-gray-700 ${
//                     activePage === "addservice" && "bg-gray-700"
//                   }`}
//                   onClick={() => setActivePage("addservice")}
//                 >
//                   Add Customer Details
//                 </button>
//               </li>
//               <li>
//                 <button
//                   className={`w-full text-left px-4 py-2 rounded hover:bg-gray-700 ${
//                     activePage === "appointments" && "bg-gray-700"
//                   }`}
//                   onClick={() => setActivePage("appointments")}
//                 >
//                   Manage Appointments
//                 </button>
//               </li>
//               <li></li>
//               <li>
//                 <button
//                   className={`w-full text-left px-4 py-2 rounded hover:bg-gray-700 ${
//                     activePage === "invoices" && "bg-gray-700"
//                   }`}
//                   onClick={() => setActivePage("invoices")}
//                 >
//                   View Invoices
//                 </button>
//               </li>
//               <li>
//                 <button
//                   className={`w-full text-left px-4 py-2 rounded hover:bg-gray-700 ${
//                     activePage === "approved" && "bg-gray-700"
//                   }`}
//                   onClick={() => setActivePage("approved")}
//                 >
//                   Approved Appointments
//                 </button>
//               </li>
//             </ul>
//           </div>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="flex-1 w-full">
//         {/* Header */}
//         <div className="bg-white shadow flex justify-between items-center px-6 py-4">
//           <h2 className="text-2xl font-bold text-gray-800">
//             Service Supervisor Section
//           </h2>
//           <div className="flex items-center space-x-4">
//             <button
//               className="hover:text-blue-600 text-gray-700 text-xl"
//               title="Notifications"
//               onClick={() => navigate("/notification")}
//             >
//               🔔
//             </button>
//             <button
//               className="hover:text-blue-600 text-gray-700 text-xl"
//               title="Profile"
//               onClick={() => navigate("/service-supervisor")}
//             >
//               👤
//             </button>
//             <button
//               className="hover:text-red-600 text-gray-700 text-xl"
//               title="Logout"
//               onClick={() => navigate("/login")}
//             >
//               LogOut
//             </button>
//           </div>
//         </div>

//         {/* Page Content */}
//         <div className="p-6 w-full">{renderContent()}</div>
//       </div>
//     </div>
//   );
// };

// export default ServiceSupervisorDashboard;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AppointmentDetails from "./Supervisors/AppointmentDetails";
import ApprovedAppointments from "./Supervisors/ApprovedAppointments";
import Completedappoinments from "./Supervisors/Competedappoinments";
import AddCustomer from "./Supervisors/AddCustomer";

const DashboardCard = ({ title, description, emoji, onClick }) => (
  <div
    onClick={onClick}
    style={{
      backgroundColor: "#D32F2F",
      color: "white",
      borderRadius: "1rem",
      boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
      padding: "2rem",
      cursor: "pointer",
      transition: "transform 0.3s",
    }}
    onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
    onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1.0)")}
  >
    <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>{emoji}</div>
    <h2
      style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "0.5rem" }}
    >
      {title}
    </h2>
    <p style={{ opacity: 0.9 }}>{description}</p>
  </div>
);

const ServiceSupervisorDashboard = () => {
  const navigate = useNavigate();
  const [activePage, setActivePage] = useState("dashboard");

  const renderContent = () => {
    switch (activePage) {
      case "appointments":
        return (
          <AppointmentDetails
            view="all"
            goBack={() => setActivePage("dashboard")}
          />
        );
      case "approved":
        return (
          <ApprovedAppointments
            view="approved"
            goBack={() => setActivePage("dashboard")}
          />
        );
      case "invoices":
        return (
          <Completedappoinments
            view="invoices"
            goBack={() => setActivePage("dashboard")}
          />
        );
      case "addservice":
        return (
          <div
            style={{
              color: "#444",
              padding: "2rem",
              textAlign: "center",
              fontSize: "1.2rem",
            }}
          >
            <AddCustomer
              goBack={() => setActivePage("dashboard")}
              sectionPrefix="service"
              section="appointments"
            />
          </div>
        );
      default:
        return (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "2rem",
              padding: "2rem",
            }}
          >
            <DashboardCard
              title="Add Customer"
              description="Add a new customer details."
              emoji="➕"
              onClick={() => setActivePage("addservice")}
            />
            <DashboardCard
              title="Manage Appointments"
              description="View and manage customer bookings."
              emoji="📅"
              onClick={() => setActivePage("appointments")}
            />
            <DashboardCard
              title="View Invoice"
              description="View invoices of vehicles."
              emoji="💰"
              onClick={() => setActivePage("invoices")}
            />
            <DashboardCard
              title="Approved Appointments"
              description="Track approved appointments."
              emoji="✅"
              onClick={() => setActivePage("approved")}
            />
          </div>
        );
    }
  };

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        backgroundColor: "#F3F4F6",
      }}
    >
      {/* Sidebar */}
      <div
        style={{
          width: "260px",
          backgroundColor: "#1C1C1C",
          color: "#FFF",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <div>
          <div
            style={{
              padding: "1.5rem",
              fontSize: "1.5rem",
              fontWeight: "bold",
              color: "#D32F2F",
            }}
          >
            🚗 NIMAL MOTORS
          </div>
          <div style={{ padding: "1.5rem" }}>
            <h2
              style={{
                fontSize: "1.2rem",
                fontWeight: "bold",
                marginBottom: "1rem",
              }}
            >
              Supervisor Section
            </h2>
            <ul style={{ listStyle: "none", padding: 0 }}>
              {[
                { label: "Dashboard", value: "dashboard" },
                { label: "Add Customer Details", value: "addservice" },
                { label: "Manage Appointments", value: "appointments" },
                { label: "View Invoices", value: "invoices" },
                { label: "Approved Appointments", value: "approved" },
              ].map((item) => (
                <li key={item.value}>
                  <button
                    style={{
                      width: "100%",
                      textAlign: "left",
                      padding: "0.75rem 1rem",
                      backgroundColor:
                        activePage === item.value ? "#333" : "transparent",
                      border: "none",
                      color: "#FFF",
                      borderRadius: "0.5rem",
                      marginBottom: "0.5rem",
                      cursor: "pointer",
                    }}
                    onClick={() => setActivePage(item.value)}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1 }}>
        <div
          style={{
            backgroundColor: "#FFF",
            padding: "1rem 2rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: "1px solid #DDD",
          }}
        >
          <h2
            style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#D32F2F" }}
          >
            Service Supervisor Section
          </h2>
          <div
            style={{
              display: "flex",
              gap: "1.5rem",
              fontSize: "1.25rem",
              color: "#333",
            }}
          >
            <button
              title="Profile"
              onClick={() => navigate("/service-supervisor")}
            >
              👤
            </button>
            <button
              title="Logout"
              onClick={() => navigate("/login")}
              style={{ color: "#D32F2F", fontWeight: "bold" }}
            >
              Logout
            </button>
          </div>
        </div>
        <div>{renderContent()}</div>
      </div>
    </div>
  );
};

export default ServiceSupervisorDashboard;
