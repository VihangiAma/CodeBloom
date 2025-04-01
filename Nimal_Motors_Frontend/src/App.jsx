import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./assets/pages/HomePage";
import AdminDashboard from "./assets/pages/AdminDashBord";
import SalesReport from "./assets/pages/SalesReport";
import SalesReportAdd from "./assets/pages/SalesReportAdd";
import SalesReportUpdate from "./assets/pages/SalesReportUpdate";
import SalesReportDelete from "./assets/pages/SalesReportDelete";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/sales-report" element={<SalesReport />} />
        <Route path="/add-sales-report" element={<SalesReportAdd />} />
        <Route path="/update-sales-report" element={<SalesReportUpdate />} />
        <Route path="/delete-sales-report" element={<SalesReportDelete />} />
      </Routes>
    </Router>
  );
}

export default App;
