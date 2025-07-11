import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import logoImage from "../assets/images/logo.jpg";
import carImage from "../assets/images/car.jpeg";

const GenerateInvoicePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [invoice, setInvoice] = useState(null);
  const [invoiceNo, setInvoiceNo] = useState("");
  const [advance, setAdvance] = useState(0);
  const [balance, setBalance] = useState(0);
  const [remarks, setRemarks] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:5001/api/invoice/${id}`)
      .then((res) => setInvoice(res.data))
      .catch((err) => {
        console.error("Failed to fetch invoice", err);
        toast.error("Failed to load invoice details.");
      });
  }, [id]);

  const generatePDF = () => {
    if (!invoice) return;

    const doc = new jsPDF();

    doc.addImage(logoImage, "PNG", 10, 10, 25, 25);
    doc.addImage(carImage, "JPEG", 170, 10, 25, 25);

    doc.setFontSize(20).setTextColor("#B30000").text("Nimal Motors", 105, 20, { align: "center" });
    doc.setFontSize(10).setTextColor("#000000");
    doc.text("No 52/2, Galle Road, Aluthgama", 105, 27, { align: "center" });
    doc.text("Tel: 034-2238057 / 077-77738057", 105, 32, { align: "center" });
    doc.text("Repairs, Cut & Polish Service Center", 105, 37, { align: "center" });

    doc.setFontSize(14).setTextColor("#B30000").text("INVOICE", 180, 45, { align: "right" });
    doc.setFontSize(10).setTextColor("#000000");
    doc.text(`Invoice No: ${invoiceNo}`, 180, 50, { align: "right" });
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 180, 55, { align: "right" });

    doc.setFontSize(11).setTextColor("#B30000").text("Customer Information", 14, 65);
    doc.setFontSize(10).setTextColor("#000000");
    doc.text(`Name: ${invoice.customerName}`, 14, 72);
    doc.text(`Vehicle No: ${invoice.vehicleNumber}`, 14, 77);
    doc.text(`Service ID: ${invoice.serviceID}`, 14, 82);
    doc.text(`Date: ${new Date(invoice.serviceDate).toLocaleDateString()}`, 14, 87);
    doc.text(`Present Meter: ${invoice.presentMeter} km`, 14, 92);

    let y = 100;

    doc.setFontSize(11).setTextColor("#B30000").text("Repair Details", 14, y);
    y += 4;

    invoice.repairs.forEach((pkg) => {
      y += 6;
      doc.setFont("helvetica", "bold").setTextColor("#2C2C2C").text(`Package: ${pkg.package}`, 14, y);
      y += 4;

      doc.autoTable({
        startY: y,
        head: [["Repair", "Cost (Rs.)"]],
        body: pkg.repairs.map((r) => [r.label, r.price.toFixed(2)]),
        styles: { fontSize: 9 },
        theme: "striped",
        margin: { left: 14 },
        headStyles: { fillColor: [179, 0, 0], textColor: 255 },
      });

      y = doc.autoTable.previous.finalY + 5;
      doc.setFont("helvetica", "bold").text(`Package Total: Rs. ${pkg.price.toFixed(2)}`, 160, y);
    });

    y += 10;

    doc.setFont("helvetica", "bold").setTextColor("#B30000").text("Used Items", 14, y);
    y += 4;

    doc.autoTable({
      startY: y,
      head: [["Item", "Qty", "Unit Price (Rs.)", "Total (Rs.)"]],
      body: invoice.items.map((item) => [
        item.itemName,
        item.qty,
        item.price.toFixed(2),
        (item.qty * item.price).toFixed(2),
      ]),
      styles: { fontSize: 9 },
      theme: "striped",
      margin: { left: 14 },
      headStyles: { fillColor: [179, 0, 0], textColor: 255 },
    });

    y = doc.autoTable.previous.finalY + 8;

    doc.setFont("helvetica", "bold").setFontSize(11).setTextColor("#000000");
    doc.text(`Total Cost: Rs. ${invoice.totalCost.toFixed(2)}`, 180, y, { align: "right" });
    y += 6;
    doc.text(`Advance: Rs. ${advance.toFixed(2)}`, 180, y, { align: "right" });
    y += 6;
    doc.text(`Balance: Rs. ${balance.toFixed(2)}`, 180, y, { align: "right" });

    y += 10;
    doc.setFont("helvetica", "normal").setFontSize(10).setTextColor("#000000");
    doc.text("Remarks:", 14, y);
    doc.setFont("helvetica", "italic").text(remarks || "-", 30, y);

    doc.save(`Invoice_${invoiceNo}.pdf`);
  };

  if (!invoice) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6 min-h-screen bg-[#F5F5F5]">
      <div className="bg-white shadow rounded-lg max-w-4xl mx-auto p-6">
        <h2 className="text-2xl font-bold text-[#B30000] mb-6 text-center">
          Finalize & Download Invoice
        </h2>

        {/* === Invoice Details from Admin === */}
        <div className="mb-6 border rounded p-4 bg-gray-50">
          <h3 className="text-lg font-semibold text-[#B30000] mb-3">Invoice Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div><strong>Customer Name:</strong> {invoice.customerName}</div>
            <div><strong>Vehicle Number:</strong> {invoice.vehicleNumber}</div>
            <div><strong>Service ID:</strong> {invoice.serviceID}</div>
            <div><strong>Service Date:</strong> {new Date(invoice.serviceDate).toLocaleDateString()}</div>
            <div><strong>Present Meter:</strong> {invoice.presentMeter} km</div>
            <div><strong>Total Cost:</strong> Rs. {invoice.totalCost.toFixed(2)}</div>
          </div>

          <div className="mt-4">
            <h4 className="text-sm font-semibold text-[#2C2C2C] mb-1">Repairs:</h4>
            {invoice.repairs.map((pkg, index) => (
              <div key={index} className="mb-2">
                <p className="font-semibold text-[#B30000]">{pkg.package}</p>
                <ul className="list-disc pl-6 text-sm text-gray-700">
                  {pkg.repairs.map((r, i) => (
                    <li key={i}>{r.label} - Rs. {r.price.toFixed(2)}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-3">
            <h4 className="text-sm font-semibold text-[#2C2C2C] mb-1">Used Items:</h4>
            {invoice.items.length === 0 ? (
              <p className="text-gray-500 italic">No items added.</p>
            ) : (
              <ul className="list-disc pl-6 text-sm text-gray-700">
                {invoice.items.map((item, idx) => (
                  <li key={idx}>{item.itemName} – Qty: {item.qty}, Price: Rs. {item.price.toFixed(2)}</li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* === Accountant Fillable Form === */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-semibold mb-1">Invoice No:</label>
            <input type="text" value={invoiceNo} onChange={(e) => setInvoiceNo(e.target.value)} className="w-full border rounded px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">Advance Payment (Rs.):</label>
            <input type="number" value={advance} onChange={(e) => setAdvance(parseFloat(e.target.value) || 0)} className="w-full border rounded px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">Balance (Rs.):</label>
            <input type="number" value={balance} onChange={(e) => setBalance(parseFloat(e.target.value) || 0)} className="w-full border rounded px-3 py-2" />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold mb-1">Remarks:</label>
            <textarea value={remarks} onChange={(e) => setRemarks(e.target.value)} rows={3} className="w-full border rounded px-3 py-2" />
          </div>
        </div>

        <div className="text-right">
          <button onClick={generatePDF} className="bg-[#B30000] hover:bg-[#D63333] text-white px-6 py-2 rounded">
            Download Invoice
          </button>
        </div>
      </div>
    </div>
  );
};

export default GenerateInvoicePage;
