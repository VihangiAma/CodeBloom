// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import InventoryDashboard from "./components/InventoryDashboard";

import AccountantProfile from "./components/AccountantProfile";

function App() {
  return (
    <Router>
      <div className="container mx-auto">
        <Routes>
          
          <Route path="/accountant" element={<AccountantProfile />} />
          <Route path="/inventory" element={<InventoryDashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
