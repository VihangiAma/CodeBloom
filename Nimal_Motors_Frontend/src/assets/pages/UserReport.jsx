
import React, { useState, useEffect } from "react";
import axios from "axios";
import { jsPDF } from "jspdf";

const UsersReport = () => {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const { data } = await axios.get("/api/user-reports");
      setReports(data);
    } catch (err) {
      console.error("Error fetching user reports:", err);
    }
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("User Service Reports", 14, 20);

    // Table headers
    doc.setFontSize(12);
    const headers = [
      "Customer Name",
      "Vehicle ID",
      "Service Date",
      "Service Time",
      "Description",
    ];
    headers.forEach((h, i) => doc.text(h, 14 + i * 38, 30));

    // Table rows
    reports.forEach((r, rowIndex) => {
      const y = 40 + rowIndex * 10;
      doc.text(r.customerName, 14, y);
      doc.text(r.vehicleID, 52, y);
      doc.text(new Date(r.serviceDate).toLocaleDateString(), 90, y);
      doc.text(r.serviceTime, 128, y);
      doc.text(r.description, 166, y);
    });

    doc.save("users_report.pdf");
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex justify-end mb-4">
        <button
          onClick={handleDownloadPDF}
          className="flex items-center bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Download PDF
        </button>
      </div>

      <h2 className="text-2xl font-bold mb-4">User Service Reports</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow rounded-lg">
          <thead className="bg-gray-100 text-gray-700 uppercase text-sm">
            <tr>
              <th className="py-2 px-4 text-left">Customer Name</th>
              <th className="py-2 px-4 text-left">Vehicle ID</th>
              <th className="py-2 px-4 text-left">Service Date</th>
              <th className="py-2 px-4 text-left">Service Time</th>
              <th className="py-2 px-4 text-left">Description</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm">
            {reports.map((r) => (
              <tr key={`${r.customerName}-${r.serviceDate}`}>
                <td className="border-t py-2 px-4">{r.customerName}</td>
                <td className="border-t py-2 px-4">{r.vehicleID}</td>
                <td className="border-t py-2 px-4">
                  {new Date(r.serviceDate).toLocaleDateString()}
                </td>
                <td className="border-t py-2 px-4">{r.serviceTime}</td>
                <td className="border-t py-2 px-4">{r.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersReport;
