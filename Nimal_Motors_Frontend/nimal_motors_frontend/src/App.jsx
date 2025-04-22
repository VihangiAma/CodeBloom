import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import SupervisorLoginForm from "./Components/SupervisorSection/SupervisorLoginForm";
import SupervisorDashboard from "./Components/SupervisorSection/SupervisorDashboard";
import SupervisorProfile from "./Components/SupervisorSection/SupervisorProfile";


import BookAppointment from "./Components/CustomerSection/BookAppoinment";
import AppointmentDashboard from "./Components/SupervisorSection/Supervisors/AppointmentDetails"; // Importing the AppointmentDashboard component
import ProgressPage from "./Components/SupervisorSection/ProgressPage";
import ReportPage from "./Components/SupervisorSection/ReportPage";

// Newly imported

import MechanicalDashboard from "./Components/SupervisorSection/Supervisors/MechanicalDashboard";
import ElectricalDashboard from "./Components/SupervisorSection/Supervisors/ElectricalDashboard";
import BodyShopDashboard from "./Components/SupervisorSection/Supervisors/BodyShopDashboard"; 
import ServiceDashboard from "./Components/SupervisorSection/Supervisors/ServiceDashboard";

import ServiceSupervisorDashboard from "./Components/SupervisorSection/ServiceSupervisorDashboard";
import AppointmentDetails from "./Components/SupervisorSection/Supervisors/AppointmentDetails";


function App() {
  const isAuthenticated = () => localStorage.getItem("authToken") !== null;

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<SupervisorLoginForm />} />

        {/* Main supervisor area */}
        <Route path="/dashboard" element={isAuthenticated() ? <SupervisorDashboard /> : <Navigate to="/login" />} />
        <Route path="/profile" element={isAuthenticated() ? <SupervisorProfile /> : <Navigate to="/login" />} />

        {/* Customer area */}
        <Route path="/book-appointment" element={<BookAppointment />} />

        Supervisor pages
        <Route path="/appointments" element={<AppointmentDetails />} />
        <Route path="/progress" element={<ProgressPage />} />
        <Route path="/report" element={<ReportPage />} />

        {/* Section Specific Dashboards */}
        <Route path="/supervisor/mechanical" element={<MechanicalDashboard />} />
        <Route path="/supervisor/electrical" element={<ElectricalDashboard />} />
        <Route path="/supervisor/body-shop" element={<BodyShopDashboard />} />
        <Route path="/supervisor/service" element={<ServiceDashboard />} />

        <Route path="/service-dashboard" element={<ServiceSupervisorDashboard />} />

      </Routes>
    </Router>
  );
}

export default App;
