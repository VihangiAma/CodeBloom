import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { FaArrowLeft, FaFileInvoice, FaDownload } from "react-icons/fa";
import { jsPDF } from "jspdf";
import logoImage from "../assets/images/logo.jpg";
import carImage from "../assets/images/car.jpeg";

const GenerateInvoicePage = () => {
  const { id } = useParams();  // Receiving invoice ID
  const navigate = useNavigate();
  const [invoice, setInvoice] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5001/api/invoices/${id}`)
      .then((res) => setInvoice(res.data))
      .catch((err) => {
        console.error(err);
        toast.error("Failed to load invoice details.");
      });
  }, [id]);

  const generatePDF = () => {
    const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });

    doc.addImage(logoImage, "PNG", 10, 10, 20, 20);
    doc.setFontSize(18).setTextColor("#B30000").text("Nimal Motors", 105, 20, { align: "center" });
    doc.setFontSize(10).setTextColor("#000000");
    doc.text("No 52/2, Galle Road, Aluthgama", 105, 30, { align: "center" });
    doc.text("Tel: 034-2238057/7777738057", 105, 35, { align: "center" });
    doc.text("Repairs, Cut & Polish Service Center", 105, 40, { align: "center" });
    doc.addImage(carImage, "JPEG", 170, 10, 20, 20);

    doc.setFontSize(16).setTextColor("#B30000").text("INVOICE", 180, 20, { align: "right" });
    doc.setFontSize(10).setTextColor("#000000");
    doc.text(`Invoice No: ${invoice.invoiceNo}`, 180, 30, { align: "right" });
    doc.text(`Date: ${invoice.invoiceDate?.slice(0, 10)}`, 180, 35, { align: "right" });

    doc.setFontSize(12).setTextColor("#B30000").text("Bill To:", 10, 60);
    doc.setTextColor("#000000");
    doc.text(invoice.customerName, 10, 70);
    doc.text(`Vehicle No: ${invoice.vehicleNumber}`, 10, 75);
    doc.text(`Section: ${invoice.section}`, 10, 80);

    const startY = 90;
    doc.setFillColor("#B30000").rect(10, startY - 5, 190, 10, "F");
    doc.setTextColor("#FFFFFF");
    doc.text("Description", 15, startY);
    doc.text("Qty", 100, startY);
    doc.text("Amount (Rs.)", 150, startY);

    let y = startY + 5;
    invoice.items.forEach((item, index) => {
      doc.setTextColor("#000000");
      doc.text(item.description || "N/A", 15, y);
      doc.text(item.qty?.toString(), 100, y);
      doc.text((parseFloat(item.cost) * parseInt(item.qty)).toFixed(2), 150, y, { align: "right" });
      y += 8;
    });

    y += 10;
    doc.setFont("helvetica", "bold").text(`Total Cost: Rs. ${invoice.totalCost.toFixed(2)}`, 150, y, { align: "right" });

    doc.save(`Invoice_${invoice.invoiceNo}.pdf`);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-[#B30000]">Invoice Details</h1>
        <button
          onClick={() => navigate("/accountant-dashboard")}
          className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-600 flex items-center gap-2"
        >
          <FaArrowLeft /> Back
        </button>
      </div>

      {invoice ? (
        <div className="bg-white p-6 rounded shadow max-w-3xl mx-auto space-y-4">
          <div className="flex items-center gap-2 text-xl font-semibold text-black">
            <FaFileInvoice /> Invoice Summary
          </div>
          <div>
            <p><strong>Invoice No:</strong> {invoice.invoiceNo}</p>
            <p><strong>Customer:</strong> {invoice.customerName}</p>
            <p><strong>Vehicle No:</strong> {invoice.vehicleNumber}</p>
            <p><strong>Section:</strong> {invoice.section}</p>
            <p><strong>Date:</strong> {invoice.invoiceDate?.slice(0, 10)}</p>
          </div>

          <h2 className="font-semibold text-black mt-4">Items:</h2>
          <table className="w-full border text-sm">
            <thead className="bg-red-600 text-white">
              <tr>
                <th className="p-2">Description</th>
                <th className="p-2">Qty</th>
                <th className="p-2">Unit Cost</th>
                <th className="p-2">Total</th>
              </tr>
            </thead>
            <tbody>
              {invoice.items.map((item, idx) => (
                <tr key={idx} className="text-center border-t">
                  <td className="p-2">{item.description}</td>
                  <td className="p-2">{item.qty}</td>
                  <td className="p-2">Rs. {parseFloat(item.cost).toFixed(2)}</td>
                  <td className="p-2">Rs. {(parseFloat(item.cost) * parseInt(item.qty)).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <h2 className="text-right font-bold text-lg mt-4">
            Total: Rs. {invoice.totalCost?.toFixed(2)}
          </h2>

          <div className="flex justify-end gap-3 mt-6">
            <button
              onClick={generatePDF}
              className="bg-[#B30000] text-white px-4 py-2 rounded hover:bg-[#D63333] flex items-center gap-2"
            >
              <FaDownload /> Download Invoice
            </button>
          </div>
        </div>
      ) : (
        <p>Loading invoice details...</p>
      )}
    </div>
  );
};

export default GenerateInvoicePage;
