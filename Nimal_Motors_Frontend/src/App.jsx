import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./assets/pages/HomePage";
import AdminDashboard from "./assets/pages/AdminDashBord";
import SalesReport from "./assets/pages/SalesReport";
import SalesReportAdd from "./assets/pages/SalesReportAdd";
import SalesReportUpdate from "./assets/pages/SalesReportUpdate";
import SalesReportDelete from "./assets/pages/SalesReportDelete";
import SalesReportView from "./assets/pages/SalesReportView";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />

        <Route path="/sales-report" element={<SalesReport />} />
        <Route
          path="/add-sales-report"
          element={<SalesReportAdd onAdd={() => {}} />}
        />

        <Route path="/update-sales-report" element={<SalesReportUpdate />} />
        <Route path="/delete-sales-report" element={<SalesReportDelete />} />
        <Route path ="/view-sales-report" element={<SalesReportView/>}/>
      </Routes>
    </Router>
  );
}

export default App;
