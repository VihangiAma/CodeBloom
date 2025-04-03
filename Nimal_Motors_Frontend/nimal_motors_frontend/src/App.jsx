
import React from "react";
import { BrowserRouter as Router, Routes, Route,Navigate } from "react-router-dom";
import SupervisorLoginForm from "./Components/SupervisorSection/SupervisorLoginForm";
import SupervisorDashboard from "./Components/SupervisorSection/SupervisorDashboard";

const App = () => {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<SupervisorLoginForm />} />
        <Route path="/dashboard" element={<SupervisorDashboard />} />

        {/* <Route path="/supervisor-dashboard" element={<SupervisorDashboard />} />
        <Route path="/supervisor-profile" element={<SupervisorProfile />} /> */}

      </Routes>
    </Router>
  );
};

const isAuthenticated = () => {
    return localStorage.getItem("authToken") !== null;
  };

  <Route path="/dashboard" element={isAuthenticated() ? <SupervisorDashboard /> : <Navigate to="/login" />} />

export default App;


