

import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import SupervisorLoginForm from "./Components/SupervisorSection/SupervisorLoginForm";
import SupervisorDashboard from "./Components/SupervisorSection/SupervisorDashboard";
import SupervisorProfile from "./Components/SupervisorSection/SupervisorProfile"; // Import SupervisorProfile
//import UpdateForm from "./Components/SupervisorSection/UpdateForm";
import BookAppointment from "./Components/CustomerSection/BookAppoinment";
import AppointmentDashboard from "./Components/SupervisorSection/AppointmentDashboard"; // Import AppointmentDashboard
import ProgressPage from "./Components/SupervisorSection/ProgressPage"; // Import ProgressPage
import ReportPage from "./Components/SupervisorSection/ReportPage"; // Import ReportPage


const App = () => {
  const isAuthenticated = () => localStorage.getItem("authToken") !== null;

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<SupervisorLoginForm />} />
        <Route path="/dashboard" element={isAuthenticated() ? <SupervisorDashboard /> : <Navigate to="/login" />} />
        <Route path="/profile" element={isAuthenticated() ? <SupervisorProfile /> : <Navigate to="/login" />} /> {/* Added Route */}
        <Route path="/supervisor-dashboard" element={<SupervisorDashboard />} />
        <Route path="/book-appointment" element={<BookAppointment />} />
        <Route path="/appointments" element={<AppointmentDashboard />} /> 
        <Route path="/progress" element={<ProgressPage />} />
        <Route path="/report" element={<ReportPage />} />
        
       
      </Routes>
    </Router>
  );
};

export default App;

