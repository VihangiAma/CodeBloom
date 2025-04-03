import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SupervisorLoginForm from "./Components/SupervisorSection/SupervisorLoginForm";
import SupervisorDashboard from "./Components/SupervisorSection/SupervisorDashboard";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Route for Supervisor Login */}
        <Route path="/" element={<SupervisorLoginForm />} />
        
        {/* Dynamic route to Supervisor Dashboard based on the selected section */}
        <Route path="/supervisor-dashboard/:section" element={<SupervisorDashboard />} />
      </Routes>
    </Router>
  );
};

export default App;

