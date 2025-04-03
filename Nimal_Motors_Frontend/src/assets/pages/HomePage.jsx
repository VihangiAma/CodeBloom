import React, { useState } from "react";
import SalesReport from "./SalesReport";
import SalesReportAdd from "./SalesReportAdd";
import SalesReportUpdate from "./SalesReportUpdate";
import SalesReportDelete from "./SalesReportDelete";
import AdminDashboard from "./AdminDashBord";
import ProfilePage from "./ProfilePage";

export default function HomePage() {
  const [salesReports, setSalesReports] = useState([]);

  // ✅ Function to update sales reports list
  const handleAddReport = (newReport) => {
    setSalesReports([...salesReports, newReport]);
    console.log("✅ Sales report added:", newReport);
  };

  return (
    <div>
      <AdminDashboard />
      <SalesReport />
      {/* ✅ Ensure `onAdd` is passed */}
      <SalesReportAdd onAdd={handleAddReport} />
      <SalesReportUpdate />
      <SalesReportDelete />
      <ProfilePage/>
    </div>
  );
}
