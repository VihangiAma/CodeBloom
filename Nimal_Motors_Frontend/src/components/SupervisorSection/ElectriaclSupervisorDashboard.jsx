// import React, { useState, useEffect } from "react";
// import { motion } from "framer-motion";
// import axios from "axios";
// import Swal from "sweetalert2";
// import { useNavigate } from "react-router-dom";
// import { FaListAlt, FaCheckCircle, FaSpinner, FaClock } from "react-icons/fa";
// import AddServiceForm from "./AddServiceForm";
// import ScheduleDetails from "./ScheduleDetails";
// import Progress from "./ProgressPage";
// import CompletedServices from "./CompletedServices";

// const ElectricalSupervisorSection = () => {
//   const navigate = useNavigate();
//   const [activePage, setActivePage] = useState("dashboard");
//   const [stats, setStats] = useState({
//     total: 0,
//     completed: 0,
//     pending: 0,
//     inProgress: 0,
//   });
//   const [showProgressFetcher, setShowProgressFetcher] = useState(true);

//   useEffect(() => {
//     if (activePage === "dashboard") {
//       setShowProgressFetcher(true);
//     }
//   }, [activePage]);

//   const handleStatsUpdate = (data) => {
//     setStats(data);
//     setShowProgressFetcher(false);
//   };

//   const handleFormSubmit = async (formData) => {
//     const result = await Swal.fire({
//       title: "Are you sure?",
//       text: "Do you want to add this service?",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#3085d6",
//       cancelButtonColor: "#d33",
//       confirmButtonText: "Yes, add it!",
//       cancelButtonText: "Cancel",
//     });

//     if (result.isConfirmed) {
//       try {
//         await axios.post("http://localhost:5001/api/electrical", formData);
//         Swal.fire({
//           icon: "success",
//           title: "Service Added!",
//           text: "The new service has been successfully added.",
//           confirmButtonColor: "#3085d6",
//         });
//         setActivePage("dashboard");
//       } catch (error) {
//         console.error(error);
//         Swal.fire({
//           icon: "error",
//           title: "Failed!",
//           text: "Could not add service. Please try again.",
//           confirmButtonColor: "#d33",
//         });
//       }
//     }
//   };

//   const renderContent = () => {
//     switch (activePage) {
//       case "schedules":
//         return (
//           <div className="p-6">
//             <ScheduleDetails section="electrical" />
//           </div>
//         );
//       case "addservice":
//         return (
//           <div className="p-6">
//             <motion.div
//               initial={{ opacity: 0, y: -20 }}
//               animate={{ opacity: 1, y: 0 }}
//               className="bg-white p-8 rounded-2xl shadow-2xl"
//             >
//               <AddServiceForm onSubmit={handleFormSubmit} />
//             </motion.div>
//           </div>
//         );
//       case "invoices":
//         return (
//           <div className="text-gray-600 p-8 text-center text-xl">
//             <CompletedServices section="electrical" sectionPrefix="ES" />
//           </div>
//         );

//       default:
//         return (
//           <>
//             {/* Stats Cards */}
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 px-4">
//               <StatCard
//                 icon={<FaListAlt />}
//                 label="Total Appointments"
//                 value={stats.total}
//                 color="text-blue-600"
//               />
//               <StatCard
//                 icon={<FaCheckCircle />}
//                 label="Completed"
//                 value={stats.completed}
//                 color="text-green-600"
//               />
//               <StatCard
//                 icon={<FaSpinner className="animate-spin-slow" />}
//                 label="In Progress"
//                 value={stats.inProgress}
//                 color="text-yellow-500"
//               />
//               <StatCard
//                 icon={<FaClock />}
//                 label="Pending"
//                 value={stats.pending}
//                 color="text-red-500"
//               />
//             </div>

//             {/* Dashboard Cards */}
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 p-8">
//               <DashboardCard
//                 title="Add Service"
//                 description="Add a new electrical service."
//                 color="bg-blue-500"
//                 emoji="➕"
//                 onClick={() => setActivePage("addservice")}
//               />
//               <DashboardCard
//                 title="Manage Appointments"
//                 description="View and manage customer bookings."
//                 color="bg-green-500"
//                 emoji="📅"
//                 onClick={() => setActivePage("schedules")}
//               />
//               <DashboardCard
//                 title="Invoices"
//                 description="View invoices."
//                 color="bg-yellow-500"
//                 emoji="🧾"
//                 onClick={() => setActivePage("invoices")}
//               />
//             </div>

//             {/* Stats Fetcher */}
//             {showProgressFetcher && (
//               <Progress
//                 section="electrical"
//                 onStatsUpdate={handleStatsUpdate}
//               />
//             )}
//           </>
//         );
//     }
//   };

//   return (
//     <div className="flex min-w-screen bg-gray-100">
//       {/* Sidebar */}
//       <div className="w-64 bg-gray-800 text-white flex flex-col justify-between">
//         <div>
//           <div className="flex items-center p-6 space-x-3">
//             <h1 className="text-2xl font-extrabold text-gray-300 mb-6">
//               🚗 NIMAL MOTORS
//             </h1>
//           </div>
//           <div className="p-6">
//             <h2 className="text-xl font-bold mb-6">Supervisor Section</h2>
//             <ul className="space-y-3">
//               {["dashboard", "addservice", "schedules", "invoices"].map(
//                 (item) => (
//                   <li key={item}>
//                     <button
//                       className={`w-full text-left px-4 py-2 rounded hover:bg-gray-700 ${
//                         activePage === item && "bg-gray-700"
//                       }`}
//                       onClick={() => setActivePage(item)}
//                     >
//                       {item === "dashboard"
//                         ? "Dashboard"
//                         : item === "addservice"
//                         ? "Add Service"
//                         : item === "schedules"
//                         ? "Manage Appointments"
//                         : item === "invoices"
//                         ? "Invoices"
//                         : "View Reports"}
//                     </button>
//                   </li>
//                 )
//               )}
//             </ul>
//           </div>
//         </div>
//       </div>
//       {/* Main Content */}
//       <div className="flex-1">
//         <div className="bg-white shadow flex justify-between items-center px-6 py-4">
//           <h2 className="text-2xl font-bold text-gray-800">
//             Electrical Supervisor Section
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
//               onClick={() => navigate("/electrical-supervisor")}
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
//         <div className="p-4">{renderContent()}</div>
//       </div>
//     </div>
//   );
// };

// export default ElectricalSupervisorSection;

// // Reusable Stat Card
// const StatCard = ({ icon, label, value, color }) => (
//   <div className="bg-white p-4 rounded shadow flex items-center gap-4">
//     <div className={`${color} text-3xl`}>{icon}</div>
//     <div>
//       <p className="text-sm">{label}</p>
//       <h2 className="text-xl font-semibold">{value}</h2>
//     </div>
//   </div>
// );

// // Dashboard Card
// const DashboardCard = ({ title, description, emoji, color, onClick }) => {
//   return (
//     <div
//       onClick={onClick}
//       className={`cursor-pointer ${color} text-white rounded-2xl shadow-xl p-8 transform hover:scale-105 transition duration-300 flex flex-col justify-between`}
//     >
//       <div className="text-5xl mb-4">{emoji}</div>
//       <h2 className="text-2xl font-bold mb-2">{title}</h2>
//       <p className="opacity-90">{description}</p>
//     </div>
//   );
// };

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { FaListAlt, FaCheckCircle, FaSpinner, FaClock } from "react-icons/fa";
import AddServiceForm from "./AddServiceForm";
import ScheduleDetails from "./ScheduleDetails";
import Progress from "./ProgressPage";
import CompletedServices from "./CompletedServices";

const ElectricalSupervisorSection = () => {
  const navigate = useNavigate();
  const [activePage, setActivePage] = useState("dashboard");
  const [stats, setStats] = useState({
    total: 0,
    completed: 0,
    pending: 0,
    inProgress: 0,
  });
  const [showProgressFetcher, setShowProgressFetcher] = useState(true);

  useEffect(() => {
    if (activePage === "dashboard") {
      setShowProgressFetcher(true);
    }
  }, [activePage]);

  const handleStatsUpdate = (data) => {
    setStats(data);
    setShowProgressFetcher(false);
  };

  const handleFormSubmit = async (formData) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to add this service?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#D32F2F",
      cancelButtonColor: "#1C1C1C",
      confirmButtonText: "Yes, add it!",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      try {
        await axios.post("http://localhost:5001/api/electrical", formData);
        Swal.fire({
          icon: "success",
          title: "Service Added!",
          text: "The new service has been successfully added.",
          confirmButtonColor: "#D32F2F",
        });
        setActivePage("dashboard");
      } catch (error) {
        console.error(error);
        Swal.fire({
          icon: "error",
          title: "Failed!",
          text: "Could not add service. Please try again.",
          confirmButtonColor: "#D32F2F",
        });
      }
    }
  };

  const renderContent = () => {
    switch (activePage) {
      case "schedules":
        return (
          <div style={{ padding: "1.5rem" }}>
            <ScheduleDetails section="electrical" />
          </div>
        );
      case "addservice":
        return (
          <div style={{ padding: "1.5rem" }}>
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              style={{
                backgroundColor: "#FFF",
                padding: "2rem",
                borderRadius: "1.5rem",
                boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
              }}
            >
              <AddServiceForm onSubmit={handleFormSubmit} />
            </motion.div>
          </div>
        );
      case "invoices":
        return (
          <div
            style={{
              color: "#444",
              padding: "2rem",
              textAlign: "center",
              fontSize: "1.2rem",
            }}
          >
            <CompletedServices section="electrical" sectionPrefix="ES" />
          </div>
        );

      default:
        return (
          <>
            {/* Stats Cards */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                gap: "1.5rem",
                marginBottom: "2rem",
                padding: "1.5rem",
              }}
            >
              <StatCard
                icon={<FaListAlt />}
                label="Total Appointments"
                value={stats.total}
                color="#D32F2F"
              />
              <StatCard
                icon={<FaCheckCircle />}
                label="Completed"
                value={stats.completed}
                color="green"
              />
              <StatCard
                icon={<FaSpinner />}
                label="In Progress"
                value={stats.inProgress}
                color="orange"
              />
              <StatCard
                icon={<FaClock />}
                label="Pending"
                value={stats.pending}
                color="#444"
              />
            </div>

            {/* Dashboard Cards */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                gap: "2rem",
                padding: "1.5rem",
              }}
            >
              <DashboardCard
                title="Add Service"
                description="Add a new electrical service."
                emoji="➕"
                onClick={() => setActivePage("addservice")}
              />
              <DashboardCard
                title="Manage Appointments"
                description="View and manage customer bookings."
                emoji="📅"
                onClick={() => setActivePage("schedules")}
              />
              <DashboardCard
                title="Invoices"
                description="View invoices."
                emoji="🧾"
                onClick={() => setActivePage("invoices")}
              />
            </div>

            {/* Stats Fetcher */}
            {showProgressFetcher && (
              <Progress
                section="electrical"
                onStatsUpdate={handleStatsUpdate}
              />
            )}
          </>
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
                { label: "Add Service", value: "addservice" },
                { label: "Manage Appointments", value: "schedules" },
                { label: "Invoices", value: "invoices" },
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
        {/* Header */}
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
            Electrical Supervisor Section
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
              title="Notifications"
              onClick={() => navigate("/notification")}
            >
              🔔
            </button>
            <button
              title="Profile"
              onClick={() => navigate("/electrical-supervisor")}
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

        {/* Page Content */}
        <div>{renderContent()}</div>
      </div>
    </div>
  );
};

export default ElectricalSupervisorSection;

// Stat Card
const StatCard = ({ icon, label, value, color }) => (
  <div
    style={{
      backgroundColor: "#FFF",
      padding: "1.25rem",
      borderRadius: "0.75rem",
      boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      display: "flex",
      alignItems: "center",
      gap: "1rem",
    }}
  >
    <div style={{ fontSize: "1.75rem", color }}>{icon}</div>
    <div>
      <p style={{ fontSize: "0.9rem", color: "#666" }}>{label}</p>
      <h2 style={{ fontSize: "1.25rem", fontWeight: "600", color: "#333" }}>
        {value}
      </h2>
    </div>
  </div>
);

// Dashboard Card
const DashboardCard = ({ title, description, emoji, onClick }) => {
  return (
    <div
      onClick={onClick}
      style={{
        backgroundColor: "#D32F2F",
        color: "#FFF",
        borderRadius: "1rem",
        padding: "2rem",
        boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
        cursor: "pointer",
        transition: "transform 0.3s",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1.0)")}
    >
      <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>{emoji}</div>
      <h2
        style={{
          fontSize: "1.5rem",
          fontWeight: "bold",
          marginBottom: "0.5rem",
        }}
      >
        {title}
      </h2>
      <p style={{ opacity: 0.9 }}>{description}</p>
    </div>
  );
};
