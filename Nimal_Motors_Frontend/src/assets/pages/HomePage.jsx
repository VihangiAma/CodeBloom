import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import SalesReport from "./SalesReport";
import AdminDashboard from "./AdminDashBord";




import UsersReport from "./UserReport";

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
      {tab==="mk"&&<InvoiceApproORreject/>}
      {tab === "salesreport" && <SalesReport />}

      {tab === "User Report" && <UsersReport/>}

     
      {tab === "viewreport" && <SalesReportView />}
    </div>
  );
}