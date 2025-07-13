import React, { useEffect, useState } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const CompletedServiceHistory = () => {
  const [data, setData] = useState(null);
  const [user, setUser] = useState({ fullName: "", email: "" });

  // Decode user info from JWT token for report header
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = JSON.parse(atob(token.split(".")[1]));
        setUser({
          fullName: decoded.fullName || "Nimal Motors Customer",
          email: decoded.email || "No Email",
        });
      } catch (err) {
        console.error("Error decoding token", err);
      }
    }
  }, []);

  useEffect(() => {
    const fetchCompleted = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5001/api/history/premiumcompleted", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setData(res.data);
      } catch (err) {
        console.error("Failed to load history", err);
      }
    };

    fetchCompleted();
  }, []);

  const downloadPDF = () => {
    if (
      !data ||
      !data.mechanical ||
      !data.electrical ||
      !data.bodyshop ||
      !data.appointments
    ) {
      alert("No completed service history available to export.");
      return;
    }

    const allData = [
      ...data.mechanical.map((d) => ({ section: "Mechanical", ...d })),
      ...data.electrical.map((d) => ({ section: "Electrical", ...d })),
      ...data.bodyshop.map((d) => ({ section: "Bodyshop", ...d })),
      ...data.appointments.map((d) => ({ section: "Appointment", ...d })),
    ];

    if (allData.length === 0) {
      alert("No completed services found to export.");
      return;
    }

    const doc = new jsPDF();

    // Header
    doc.setFontSize(18);
    doc.setTextColor("#B00020");
    doc.setFont("helvetica", "bold");
    doc.text("Nimal Motors Aluthgama", 14, 20);

    doc.setFontSize(14);
    doc.setTextColor("#212121");
    doc.text("Completed Service History Report", 14, 30);

    // Customer info
    doc.setFontSize(11);
    doc.setTextColor("#444444");
    doc.text(`Customer Name: ${user.fullName}`, 14, 40);
    doc.text(`Email: ${user.email}`, 14, 47);

    // Table
    autoTable(doc, {
      startY: 55,
      head: [["Section", "Vehicle No", "Date", "Status"]],
      body: allData.map((d) => [
        d.section,
        d.vehicleNumber || "N/A",
        d.serviceDate
          ? new Date(d.serviceDate).toLocaleDateString()
          : d.date
          ? new Date(d.date).toLocaleDateString()
          : "N/A",
        d.status || "Completed",
      ]),
      styles: {
        fontSize: 10,
        cellPadding: 3,
        overflow: "linebreak",
      },
      headStyles: {
        fillColor: "#B00020",
        textColor: "#FFFFFF",
        fontStyle: "bold",
      },
      alternateRowStyles: {
        fillColor: "#f9f9f9",
      },
      margin: { left: 14, right: 14 },
    });

    // Footer with page number
    const pageCount = doc.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(9);
      doc.setTextColor("#999999");
      doc.text(
        `Page ${i} of ${pageCount}`,
        doc.internal.pageSize.getWidth() - 40,
        doc.internal.pageSize.getHeight() - 10
      );
    }

    doc.save("Completed_Service_History.pdf");
  };

  if (!data) return <p>Loading service history...</p>;

  return (
    <div className="p-4">
      <button
        onClick={downloadPDF}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Download Completed Service History (PDF)
      </button>
    </div>
  );
};

export default CompletedServiceHistory;
