import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import SalesReport from "./SalesReport";
import SalesReportAdd from "./SalesReportAdd";
import SalesReportUpdate from "./SalesReportUpdate";
import SalesReportDelete from "./SalesReportDelete";
import AdminDashboard from "./AdminDashBord";
import ProfilePage from "./ProfilePage";
import SalesReportView from "./SalesReportView";
import InventoryReport from "./InventoryReport";

export default function HomePage() {
  const [salesReports, setSalesReports] = useState([]);

  // ✅ Function to update sales reports list
  const handleAddReport = (newReport) => {
    setSalesReports([...salesReports, newReport]);
    console.log("✅ Sales report added:", newReport);
  };

  const location = useLocation();
  const [tab, setTab] = useState("");
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  return (
    <div>
      <AdminDashboard />
      {tab === "salesreport" && <SalesReport />}
      {tab==="inventoryreport"&&<InventoryReport/>}
      {tab === "addreport" && <SalesReportAdd onAdd={handleAddReport} />}
      {tab === "updatereport" && <SalesReportUpdate />}
      {tab === "deletereport" && <SalesReportDelete />}
      {tab === "profile" && <ProfilePage />}
      {tab === "viewreport" && <SalesReportView />}
    </div>
  );
}
