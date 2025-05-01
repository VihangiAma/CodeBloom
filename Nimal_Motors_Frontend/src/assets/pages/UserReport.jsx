import React, { useState, useEffect } from "react";
import axios from "axios";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

const UsersReport = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [pdfError, setPdfError] = useState("");

  useEffect(() => {
    const fetchReports = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:5001/api/mechanical");
        
        if (!response.data) {
          throw new Error("No data received from server");
        }
        
        if (!Array.isArray(response.data)) {
          console.warn("API response is not an array:", response.data);
          setReports([response.data]);
        } else {
          setReports(response.data);
        }
        
        setLoading(false);
      } catch (err) {
        console.error("API Error Details:", {
          message: err.message,
          response: err.response?.data,
          stack: err.stack
        });
        setError(`Failed to load reports: ${err.message}`);
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  const formatPhone = (contact) => {
    if (!contact) return "N/A";
    if (typeof contact === 'string') return contact;
    return contact.phone || "N/A";
  };

  const handleDownloadPDF = () => {
    try {
      setPdfError("");
      
      if (!reports || reports.length === 0) {
        throw new Error("No reports available to generate PDF");
      }

      const doc = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4"
      });

      // Add Nimal Motors header
      doc.setFont("helvetica", "bold");
      doc.setFontSize(16);
      doc.text("NIMAL MOTORS", 105, 15, { align: "center" });
      
      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      doc.text("No:321/2A, Galle Road, Aluthgama", 105, 20, { align: "center" });
      doc.text("Tel: 055-2298868 / 077-8888888", 105, 25, { align: "center" });
      doc.text("Email: nimalmotors.nm@gmail.com", 105, 30, { align: "center" });
      doc.text("All Vehicle Repairs, Cut & Polish & Service Center", 105, 35, { align: "center" });
      doc.text(`Reg No: 168507`, 105, 40, { align: "center" });
      
      // Add separator line
      doc.setDrawColor(200);
      doc.setLineWidth(0.5);
      doc.line(20, 45, 190, 45);

      // Report title
      doc.setFont("helvetica", "bold");
      doc.setFontSize(18);
      doc.text("User Service Reports", 105, 55, { align: "center" });

      doc.setFontSize(10);
      doc.setTextColor(100);
      doc.text(`Generated on ${new Date().toLocaleString()}`, 105, 65, { align: "center" });

      const headers = [
        ["Service ID", "Customer", "Phone", "Vehicle ID", "Service Date"]
      ];

      const rows = reports.map((report) => {
        try {
          return [
            report.serviceID?.toString() || "N/A",
            report.customerName?.toString() || "N/A",
            formatPhone(report.contact),
            report.vehicleID?.toString() || "N/A", 
            report.serviceDate ? formatDate(report.serviceDate) : "N/A"
          ];
        } catch (rowError) {
          console.error("Error processing row:", report, rowError);
          return ["Error", "Error", "Error", "Error", "Error"];
        }
      });

      autoTable(doc, {
        startY: 70,
        head: headers,
        body: rows,
        margin: { top: 70 },
        styles: {
          fontSize: 9,
          cellPadding: 3,
          overflow: "linebreak",
          valign: "middle",
          halign: "left"
        },
        headStyles: {
          fillColor: [33, 150, 243],
          textColor: 255,
          fontStyle: "bold"
        },
        alternateRowStyles: {
          fillColor: [245, 245, 245]
        },
        columnStyles: {
          0: { cellWidth: 20 },  // Service ID
          1: { cellWidth: 60 },  // Customer
          2: { cellWidth: 30 },  // Phone
          3: { cellWidth: 30 },  // Vehicle ID
          4: { cellWidth: 30 }   // Service Date
        },
        didDrawPage: (data) => {
          doc.setFontSize(8);
          doc.setTextColor(150);
          doc.text(
            `Page ${data.pageCount}`,
            data.settings.margin.left,
            doc.internal.pageSize.height - 10
          );
        }
      });

      try {
        doc.save(`service_reports_${new Date().toISOString().slice(0, 10)}.pdf`);
      } catch (saveError) {
        console.warn("Standard save failed, trying alternative method:", saveError);
        const pdfUrl = doc.output("bloburl");
        window.open(pdfUrl, "_blank");
      }
    } catch (error) {
      console.error("PDF Generation Failure:", {
        error: error.message,
        stack: error.stack,
        reportsData: reports,
        reportsType: typeof reports,
        reportsLength: Array.isArray(reports) ? reports.length : "N/A"
      });
      setPdfError(`PDF generation failed: ${error.message}`);
    }
  };

  const formatDate = (dateString) => {
    try {
      const options = { year: "numeric", month: "short", day: "numeric" };
      return new Date(dateString).toLocaleDateString(undefined, options);
    } catch {
      return "Invalid Date";
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        <span className="ml-4 text-gray-700">Loading reports...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-red-50 border-l-4 border-red-500 text-red-700">
        <p className="font-bold">Error Loading Data</p>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-120xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">User Service Details</h2>
        <div className="flex items-center space-x-4">
          {pdfError && (
            <span className="text-red-500 text-sm">{pdfError}</span>
          )}
          <button
            onClick={handleDownloadPDF}
            disabled={reports.length === 0}
            className={`px-4 py-2 rounded-lg shadow transition-colors ${
              reports.length === 0
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
          >
            Download PDF
          </button>
        </div>
      </div>

      {reports.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-500">No service reports found</p>
        </div>
      ) : (
        <div className="overflow-x-auto shadow-md rounded-lg border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-blue-600">
              <tr>
                {["Service ID", "Customer", "Phone", "Vehicle ID", "Service Date"].map((header) => (
                  <th
                    key={header}
                    className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {reports.map((report, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {report.serviceID || "N/A"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {report.customerName || "N/A"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {formatPhone(report.contact)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {report.vehicleID || "N/A"}  
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {report.serviceDate ? formatDate(report.serviceDate) : "N/A"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default UsersReport;