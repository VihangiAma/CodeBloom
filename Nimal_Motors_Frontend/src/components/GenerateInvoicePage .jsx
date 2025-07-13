

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable"; // ✅ Correct autoTable import
import { useNavigate } from "react-router-dom";


// Base64 placeholder logos (or replace with working imports)
import logoImage from "../assets/images/logo.jpg";
import carImage from "../assets/images/car.jpeg";

const GenerateInvoicePage = () => {

  const navigate = useNavigate();

  const { id } = useParams();
  const [invoice, setInvoice] = useState(null);
  const [invoiceNo, setInvoiceNo] = useState("");
  const [advance, setAdvance] = useState("");
  const [balance, setBalance] = useState("");
  //const [remarks, setRemarks] = useState("");

  // Fetch invoice from backend
  useEffect(() => {
    axios
      .get(`http://localhost:5001/api/invoice/${id}`)
      .then((res) => setInvoice(res.data))
      .catch((err) => {
        console.error("Failed to fetch invoice", err);
        toast.error("Failed to load invoice details.");
      });
  }, [id]);

  // Calculate balance based on advance and total cost
  useEffect(() => {
  if (invoice && !isNaN(advance)) {
    const calculatedBalance = invoice.totalCost - advance;
    setBalance(calculatedBalance >= 0 ? calculatedBalance : 0);
  }
}, [advance, invoice]);


// useEffect(() => {

//   // Fetch the current invoice
//   axios
//     .get(`http://localhost:5001/api/invoice/${id}`)
//     .then((res) => setInvoice(res.data))
//     .catch((err) => {
//       console.error("Failed to fetch invoice", err);
//       toast.error("Failed to load invoice details.");
//     });

//   // Fetch all existing invoices to auto-generate the invoice number
//   axios
//     .get("http://localhost:5001/api/accountant-invoices") // Replace with your actual accountant-side invoice endpoint
//     .then((res) => {
//       const existingInvoices = res.data;
//       const numbers = existingInvoices
//         .map(inv => inv.invoiceNo)
//         .filter(num => /^INV-\d+$/.test(num))
//         .map(num => parseInt(num.split("-")[1]));
//       const nextNumber = numbers.length > 0 ? Math.max(...numbers) + 1 : 1;
//       const nextInvoiceNo = `INV-${String(nextNumber).padStart(4, "0")}`;
//       setInvoiceNo(nextInvoiceNo);
//     })
//     .catch(err => {
//       console.error("Failed to generate invoice number", err);
//       toast.error("Failed to auto-generate invoice number.");
//     });
// }, [id]);


//
const formatCurrency = (amount) =>
  `Rs. ${Number(amount).toLocaleString("en-LK", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;



    // Generate PDF
  const generatePDF = async () => {
  if (!invoice) return;

  if (!invoice || !invoice.repairs || !invoice.items) {
  toast.error("Invoice data is incomplete.");
  return;
}


  if (!invoiceNo.trim()) {
    toast.error("Please enter the Invoice Number before downloading.");
    return;
  }
  if (advance > invoice.totalCost) {
    toast.error("Advance payment cannot exceed total cost.");
    return;
  }
  if (isNaN(advance) || isNaN(balance)) {
  toast.error("Advance and balance must be valid numbers.");
  return;
}

  //const doc = new jsPDF();

  const serviceInvoiceId = invoice.serviceInvoiceId?._id;
  


    try {
  const doc = new jsPDF();

  


  // Header
  doc.addImage(logoImage, "JPG", 10, 10, 25, 25);
  doc.setFontSize(20).setTextColor("#B30000").text("Nimal Motors", 105, 20, { align: "center" });
  doc.setFontSize(10).setTextColor("#000000");
  doc.text("No 52/2, Galle Road, Aluthgama", 105, 27, { align: "center" });
  doc.text("Tel: 034-2238057 / 077-77738057", 105, 32, { align: "center" });
  doc.text("Repairs, Cut & Polish Service Center", 105, 37, { align: "center" });
  doc.addImage(carImage, "JPEG", 170, 10, 25, 25);

  // Invoice Info
  doc.setFontSize(14).setTextColor("#B30000").text("INVOICE", 200, 50, { align: "right" });
  doc.setFontSize(10).setTextColor("#000000");
  doc.text(`Invoice No: ${invoiceNo || "-"}`, 200, 55, { align: "right" });
  doc.text(`Date: ${new Date().toLocaleDateString()}`, 200, 60, { align: "right" });

  let y = 70;

  // Customer Info Section – Two Columns Layout
doc.setFontSize(11).setTextColor("#B30000").text("Customer Information", 14, y);
y += 7;

doc.setFontSize(10).setTextColor("#000000");

const leftX = 14;
const rightX = 110; // adjust for 2-column layout

doc.text(`Name: ${invoice.customerName}`, leftX, y);
doc.text(`Service ID: ${invoice.serviceID}`, rightX, y);
y += 6;

doc.text(`Vehicle No: ${invoice.vehicleNumber}`, leftX, y);
doc.text(`Date: ${new Date(invoice.serviceDate).toLocaleDateString()}`, rightX, y);
y += 6;

doc.text(`Present Meter: ${invoice.presentMeter} km`, leftX, y);
y += 10;


  // Repair Details
  doc.setFontSize(11).setTextColor("#B30000").text("Repair Details", 14, y);
  y += 6;

  invoice.repairs.forEach((pkg) => {
    doc.setFont("helvetica", "bold").setTextColor("#2C2C2C").text(`Package: ${pkg.package}`, 14, y);
    y += 6;

    autoTable(doc, {
      startY: y,
      head: [["Repair", "Cost (Rs.)"]],
      body: pkg.repairs.map((r) => [r.label, r.price.toFixed(2)]),
      styles: { fontSize: 9, halign: "left" },
      headStyles: { fillColor: [179, 0, 0], textColor: 255 },
      margin: { left: 14, right: 14 },
      theme: "striped",
    });

    y = doc.lastAutoTable.finalY + 4;
    doc.setFont("helvetica", "bold").setTextColor("#000000").text(`Package Total: Rs. ${pkg.price.toFixed(2)}`, 180, y, { align: "right" });
    y += 8;
  });

  // Used Parts
  doc.setFont("helvetica", "bold").setTextColor("#B30000").text(" Parts", 14, y);
  y += 6;

  autoTable(doc, {
    startY: y,
    head: [["Item", "Qty", "Unit Price (Rs.)", "Total (Rs.)"]],
    body: invoice.items.map((item) => [
      item.itemName,
      item.qty,
      item.price.toFixed(2),
      (item.qty * item.price).toFixed(2),
    ]),
    styles: { fontSize: 9, halign: "left" },
    headStyles: { fillColor: [179, 0, 0], textColor: 255 },
    margin: { left: 14, right: 14 },
    theme: "striped",
  });

  y = doc.lastAutoTable.finalY + 10;

  // Summary Section
  doc.setFont("helvetica", "bold").setFontSize(11).setTextColor("#000000");
  doc.text(`Total Cost: Rs. ${invoice.totalCost.toFixed(2)}`, 200, y, { align: "right" }); y += 6;

  const parsedAdvance = parseFloat(advance) || 0;
  const parsedBalance = parseFloat(balance) || 0;
  doc.text(`Advance: Rs. ${parsedAdvance.toFixed(2)}`, 200, y, { align: "right" }); y += 6;
  doc.text(`Balance: Rs. ${parsedBalance.toFixed(2)}`, 200, y, { align: "right" }); y += 8;

  y += 10;

// Footer Note and Signature Section

// Signature (Right side)
const signatureY = y + 10;
doc.setFont("helvetica", "normal").setFontSize(10).setTextColor("#000000");
doc.text("__________________________", 150, signatureY);
doc.text("Checked By", 160, signatureY + 5, { align: "center" });


// Footer notes (Left side, slightly lower)
let footerY = signatureY + 15;
doc.setFont("helvetica", "normal").setFontSize(9).setTextColor("#000000");
doc.text(
  "Note: The above cost are calculated according to the workshop cost accumulation and labor charges.",
  14,
  footerY,
  { maxWidth: 170 }
);
footerY += 6;

doc.text(
  "Thank you for your business.",
  14,
  footerY,
  { maxWidth: 170 }
);



  /// 1. Generate PDF
    doc.save(`Invoice_${invoiceNo || "unknown"}.pdf`);

    // 2. Save invoice to backend
    try {
  await axios.post("http://localhost:5001/api/accountant-invoices",{
    serviceInvoiceId,
    invoiceNo,
    advance,
    balance,
    //finalizedAt: new Date(),
  });
  toast.success("Invoice saved successfully!");
  navigate("/accountant-dashboard");
} catch (err) {
  console.error("PDF Generation or Saving Failed:", err);
  if (err.response?.status === 409) {
    toast.error("Invoice number already exists.");
  } else {
    toast.error("Failed to generate or save invoice.");
  }
}
  } catch (error) {
    console.error("PDF Generation Error:", error);
    //toast.error("Failed to generate PDF. Please try again.");
  }

};

  

  if (!invoice) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6 min-h-screen bg-[#F5F5F5]">
      <div className="bg-white shadow rounded-lg max-w-4xl mx-auto p-6">
        <h2 className="text-2xl font-bold text-[#B30000] mb-6 text-center">Finalize & Download Invoice</h2>

        {/* === Admin-Side Invoice Summary === */}
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
          {/* === Repair Details from Admin === */}
{invoice.repairs && invoice.repairs.length > 0 && (
  <div className="mt-4">
    <h4 className="text-sm font-semibold text-[#2C2C2C] mb-1">Repairs:</h4>
    {invoice.repairs.map((pkg, index) => (
      <div key={index} className="mb-3">
        <p className="font-semibold text-[#B30000]">Package: {pkg.package}</p>
        <ul className="list-disc pl-6 text-sm text-gray-700">
          {pkg.repairs.map((r, i) => (
            <li key={i}>
              {r.label} - Rs. {r.price?.toFixed(2) || "0.00"}
            </li>
          ))}
        </ul>
        <p className="mt-1 text-sm font-medium text-right text-gray-800">
          Package Total: Rs. {pkg.price?.toFixed(2) || "0.00"}
        </p>
      </div>
    ))}
  </div>
)}

{/* === Items / Parts Used === */}
{invoice.items && invoice.items.length > 0 && (
  <div className="mt-3">
    <h4 className="text-sm font-semibold text-[#2C2C2C] mb-1">Parts:</h4>
    <table className="w-full text-sm border border-gray-300">
      <thead className="bg-gray-200">
        <tr>
          <th className="px-2 py-1 border">Item</th>
          <th className="px-2 py-1 border">Qty</th>
          <th className="px-2 py-1 border">Unit Price</th>
          <th className="px-2 py-1 border">Total</th>
        </tr>
      </thead>
      <tbody>
        {invoice.items.map((item, idx) => (
          <tr key={idx} className="border-t">
            <td className="px-2 py-1">{item.itemName}</td>
            <td className="px-2 py-1 text-center">{item.qty}</td>
            <td className="px-2 py-1 text-right">Rs. {item.price.toFixed(2)}</td>
            <td className="px-2 py-1 text-right">
              Rs. {(item.qty * item.price).toFixed(2)}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)}

        </div>

        {/* === Form Section === */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-semibold mb-1">Invoice No:</label>
            <input
              type="text"
              value={invoiceNo}
              onChange={(e) => setInvoiceNo(e.target.value)}
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div>
  <label className="block text-sm font-semibold mb-1">Advance Payment (Rs.):</label>
  <input
  type="number"
  value={advance}
  onChange={(e) => {
    const value = e.target.value;
    setAdvance(value);
    if (!isNaN(parseFloat(value))) {
      const balanceCalc = (invoice?.totalCost || 0) - parseFloat(value);
      setBalance(balanceCalc >= 0 ? balanceCalc.toFixed(2) : 0);
    } else {
      setBalance(invoice?.totalCost?.toFixed(2) || 0);
    }
  }}
  className="w-full border rounded px-3 py-2"
/>

{advance > invoice?.totalCost && (
  <p className="text-red-600 text-sm mt-1">
    ⚠️ Advance cannot exceed total cost (Rs. {invoice.totalCost.toFixed(2)})
  </p>
)}


</div>

<div>
  <label className="block text-sm font-semibold mb-1">Balance (Rs.):</label>
  <input
  type="text"
  value={formatCurrency(balance)}
  readOnly
  className="w-full border rounded px-3 py-2 bg-gray-100 text-gray-700"
/>

</div>

          {/*<div className="md:col-span-2">
            <label className="block text-sm font-semibold mb-1">Remarks:</label>
            <textarea
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              rows={3}
              className="w-full border rounded px-3 py-2"
            />
          </div>*/}
        </div>

        <div className="text-right">
          <button
            onClick={generatePDF}
            className="bg-[#B30000] hover:bg-[#D63333] text-white px-6 py-2 rounded"
          >
            Download Invoice
          </button>
        </div>
      </div>
    </div>
  );
};

export default GenerateInvoicePage;
