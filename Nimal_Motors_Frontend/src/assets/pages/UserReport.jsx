import React, { useState, useEffect } from "react";
import axios from "axios";
import { jsPDF } from "jspdf";
import "jspdf-autotable"; // Important for tables

const UsersReport = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const { data } = await axios.get("http://localhost:5001/api/mechanical");
      setReports(data);
      setLoading(false);
    } catch (err) {
      console.error("❌ Error fetching user reports:", err);
      setError("Failed to fetch user reports.");
      setLoading(false);
    }
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();

    // Load Image (Base64 or URL)
    const imgData = "https://via.placeholder.com/150"; // <-- Replace with your logo URL or Base64 image
    doc.addImage(imgData, "PNG", 10, 10, 30, 30); // (image, type, x, y, width, height)

    // Add H1 Title
    doc.setFontSize(22);
    doc.setFont("helvetica", "bold");
    doc.text("User Service Reports", 50, 25); // (text, x, y)

    // Add Table
    const tableColumn = ["Customer Name", "Vehicle ID", "Service Date", "Service Time", "Description"];
    const tableRows = [];

    reports.forEach((report) => {
      const reportData = [
        report.customerName,
        report.vehicleID,
        new Date(report.serviceDate).toLocaleDateString(),
        report.serviceTime,
        report.description,
      ];
      tableRows.push(reportData);
    });

    doc.autoTable({
      startY: 50, // Start after image + title
      head: [tableColumn],
      body: tableRows,
      theme: "striped",
      headStyles: { fillColor: [63, 81, 181] }, // Blue heading
    });

    doc.save("users_report.pdf");
  };

  if (loading) return <p>Loading User Reports...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-end mb-4">
        <button
          onClick={handleDownloadPDF}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 shadow"
        >
          Download PDF
        </button>
      </div>

      <h2 className="text-2xl font-bold mb-4 text-center">User Service Details</h2>

      <div className="overflow-x-auto shadow-md rounded-lg">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-200 text-gray-700 uppercase text-sm">
            <tr>
              <th className="py-3 px-4 text-left">Customer Name</th>
              <th className="py-3 px-4 text-left">Vehicle ID</th>
              <th className="py-3 px-4 text-left">Service Date</th>
              <th className="py-3 px-4 text-left">Service Time</th>
              <th className="py-3 px-4 text-left">Description</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm">
            {reports.map((report, index) => (
              <tr key={index} className="border-t hover:bg-gray-100">
                <td className="py-2 px-4">{report.customerName}</td>
                <td className="py-2 px-4">{report.vehicleID}</td>
                <td className="py-2 px-4">{new Date(report.serviceDate).toLocaleDateString()}</td>
                <td className="py-2 px-4">{report.serviceTime}</td>
                <td className="py-2 px-4">{report.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersReport;
