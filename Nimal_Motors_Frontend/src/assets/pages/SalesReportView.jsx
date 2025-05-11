import React, { useState, useEffect } from "react";
import axios from "axios";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

const SalesReportView = () => {
  const [salesReports, setSalesReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [pdfError, setPdfError] = useState("");

  useEffect(() => {
    const fetchSalesReports = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:5001/api/SalesReports");
        
        if (!response.data) {
          throw new Error("No data received from server");
        }
        
        if (!Array.isArray(response.data)) {
          console.warn("API response is not an array:", response.data);
          setSalesReports([response.data]);
        } else {
          setSalesReports(response.data);
        }
        
        setLoading(false);
      } catch (err) {
        console.error("API Error Details:", {
          message: err.message,
          response: err.response?.data,
          stack: err.stack
        });
        setError(`Failed to load sales reports: ${err.message}`);
        setLoading(false);
      }
    };

    fetchSalesReports();
  }, []);

  const handleDownloadPDF = () => {
    try {
      setPdfError("");
      
      if (!salesReports || salesReports.length === 0) {
        throw new Error("No sales reports available to generate PDF");
      }

      const doc = new jsPDF({
        orientation: "landscape",
        unit: "mm",
        format: "a4"
      });

      // Add company header
      doc.setFont("helvetica", "bold");
      doc.setFontSize(16);
      doc.text("NIMAL MOTORS", 148, 15, { align: "center" });
      
      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      doc.text("No:321/2A, Galle Road, Aluthgama", 148, 20, { align: "center" });
      doc.text("Tel: 055-2298868 / 077-8888888", 148, 25, { align: "center" });
      doc.text("Email: nimalmotors.nm@gmail.com", 148, 30, { align: "center" });
      doc.text("All Vehicle Repairs, Cut & Polish & Service Center", 148, 35, { align: "center" });
      doc.text(`Reg No: 168507`, 148, 40, { align: "center" });
      
      // Add separator line
      doc.setDrawColor(200);
      doc.setLineWidth(0.5);
      doc.line(20, 45, 276, 45);

      // Report title
      doc.setFont("helvetica", "bold");
      doc.setFontSize(18);
      doc.text("Sales Reports", 148, 55, { align: "center" });

      doc.setFontSize(10);
      doc.setTextColor(100);
      doc.text(`Generated on ${new Date().toLocaleString()}`, 148, 65, { align: "center" });

      const headers = [
        ["ID", "Name", "Price", "Net Price", "Quantity", "Amount"]
      ];

      // Calculate total amount
      let totalAmount = 0;
      
      const rows = salesReports.map((report) => {
        try {
          const amount = report.net_price_for_item * report.Sales_Quntity;
          totalAmount += amount;
          return [
            report.itemId?.toString() || "N/A",
            report.itemName?.toString() || "N/A",
            `Rs ${report.price?.toFixed(2) || "0.00"}`,
            `Rs ${report.net_price_for_item?.toFixed(2) || "0.00"}`,
            report.Sales_Quntity?.toString() || "0",
            `Rs ${amount.toFixed(2)}`
          ];
        } catch (rowError) {
          console.error("Error processing row:", report, rowError);
          return ["Error", "Error", "Error", "Error", "Error", "Error"];
        }
      });

      // Add total row only to PDF
      const footer = [
        {
          content: "Total Amount:",
          colSpan: 5,
          styles: { halign: 'right', fontStyle: 'bold' }
        },
        {
          content: `Rs ${totalAmount.toFixed(2)}`,
          styles: { fontStyle: 'bold' }
        }
      ];

      autoTable(doc, {
        startY: 70,
        head: headers,
        body: rows,
        foot: [footer],
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
          0: { cellWidth: 20 },  // ID
          1: { cellWidth: 80 },  // Name
          2: { cellWidth: 25 },  // Price
          3: { cellWidth: 25 },  // Net Price
          4: { cellWidth: 20 },  // Quantity
          5: { cellWidth: 40 }   // Amount
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
        doc.save(`sales_reports_${new Date().toISOString().slice(0, 10)}.pdf`);
      } catch (saveError) {
        console.warn("Standard save failed, trying alternative method:", saveError);
        const pdfUrl = doc.output("bloburl");
        window.open(pdfUrl, "_blank");
      }
    } catch (error) {
      console.error("PDF Generation Failure:", {
        error: error.message,
        stack: error.stack,
        reportsData: salesReports,
        reportsType: typeof salesReports,
        reportsLength: Array.isArray(salesReports) ? salesReports.length : "N/A"
      });
      setPdfError(`PDF generation failed: ${error.message}`);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        <span className="ml-4 text-gray-700">Loading sales reports...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-red-50 border-l-4 border-red-500 text-red-700">
        <p className="font-bold">Error Loading Data</p>
        <p>{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-red-100 hover:bg-red-200 rounded"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-screen-2xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Expences Details</h2>
        <div className="flex items-center space-x-4">
          {pdfError && (
            <span className="text-red-500 text-sm">{pdfError}</span>
          )}
          <button
            onClick={handleDownloadPDF}
            disabled={salesReports.length === 0}
            className={`px-4 py-2 rounded-lg shadow transition-colors ${
              salesReports.length === 0
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
          >
            Download PDF
          </button>
        </div>
      </div>

      {salesReports.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-500">No sales reports found</p>
        </div>
      ) : (
        <div className="overflow-x-auto shadow-md rounded-lg border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-blue-600">
              <tr>
                {["ID", "Name", "Price", "Net Price", "Quantity", "Amount"].map((header) => (
                  <th
                    key={header}
                    className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {salesReports.map((report, index) => {
                const amount = report.net_price_for_item * report.Sales_Quntity;
                return (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {report.itemId || "N/A"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {report.itemName || "N/A"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      Rs {report.price?.toFixed(2) || "0.00"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      Rs {report.net_price_for_item?.toFixed(2) || "0.00"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {report.Sales_Quntity || "0"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      Rs {amount.toFixed(2)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default SalesReportView;