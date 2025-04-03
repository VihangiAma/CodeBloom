

import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import SupervisorLoginForm from "./Components/SupervisorSection/SupervisorLoginForm";
import SupervisorDashboard from "./Components/SupervisorSection/SupervisorDashboard";
import SupervisorProfile from "./Components/SupervisorSection/SupervisorProfile"; // Import SupervisorProfile
//import UpdateForm from "./Components/SupervisorSection/UpdateForm";
//import AppointmentTable from "./Components/SupervisorSection/AppointmentDashboard";

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
        {/* <Route path="/update/:taskId" element={<UpdateForm />} /> */}
        {/* <Route path="/appointment" element={isAuthenticated() ? <AppointmentTable /> : <Navigate to="/appointment" />} /> */}
      </Routes>
    </Router>
  );
};

export default App;

