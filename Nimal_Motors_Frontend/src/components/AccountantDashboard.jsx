import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  FaMoneyBillWave,
  FaReceipt,
  FaChartBar,
  FaFileInvoice,
  FaCogs,
  FaClipboardList,
  FaHome,
  FaChartLine,
  FaUser,
} from "react-icons/fa";
import { toast } from "react-toastify";

import logoImage from "../assets/images/logo.jpg";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";
// import jsPDF from "jspdf";
// import "jspdf-autotable";
//import logoImage from "../assets/images/logo.jpg"; // adjust path if needed
//import carImage from "../assets/images/car.jpeg";   // adjust path if needed


// Color schema for pie chart (red tones and gray variants)
const COLORS = ["#B30000", "#D63333", "#E06666", "#2C2C2C", "#5A5A5A"];

const AccountantDashboard = () => {
  const navigate = useNavigate();

  // State variables for various summaries
  // Monthly expenses, category summary, supplier summary, and approved repairs
  const [monthlyExpenses, setMonthlyExpenses] = useState([]);
  const [categorySummary, setCategorySummary] = useState([]);
  const [supplierSummary, setSupplierSummary] = useState([]);
  const [approvedRepairs, setApprovedInvoices] = useState([]);
  const [summary, setSummary] = useState({
    stockValue: 0,
    purchases: 0,
    invoices: 0,
    outstanding: 0,
  });
  const [finalizedInvoices, setFinalizedInvoices] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
const [sortBy, setSortBy] = useState("date-desc");


// Filter and sort finalized invoices based on search term and sort criteria
// This will be used to display the finalized invoices in the table
const filteredAndSortedInvoices = finalizedInvoices
  .filter((inv) => {
    const customer = inv.serviceInvoiceId?.customerName?.toLowerCase() || "";
    const vehicle = inv.serviceInvoiceId?.vehicleNumber?.toLowerCase() || "";
    const invoiceNo = inv.invoiceNo.toLowerCase();
    return (
      customer.includes(searchTerm.toLowerCase()) ||
      vehicle.includes(searchTerm.toLowerCase()) ||
      invoiceNo.includes(searchTerm.toLowerCase())
    );
  })
  .sort((a, b) => {
    const dateA = new Date(a.finalizedAt);
    const dateB = new Date(b.finalizedAt);

    if (sortBy === "date-asc") return dateA - dateB;
    if (sortBy === "date-desc") return dateB - dateA;

    return 0;
  });
  const [selectedInvoice, setSelectedInvoice] = useState(null);
const [showModal, setShowModal] = useState(false);


// const generateInvoicePDF = async (invoice) => {
//   try {
//     const doc = new jsPDF();

//     const invoiceNo = invoice.invoiceNo || "N/A";
//     const advance = invoice.advance || 0;
//     const balance = invoice.balance || 0;

//     // Header
//     doc.addImage(logoImage, "JPG", 10, 10, 25, 25);
//     doc.setFontSize(20).setTextColor("#B30000").text("Nimal Motors", 105, 20, { align: "center" });
//     doc.setFontSize(10).setTextColor("#000000");
//     doc.text("No 52/2, Galle Road, Aluthgama", 105, 27, { align: "center" });
//     doc.text("Tel: 034-2238057 / 077-77738057", 105, 32, { align: "center" });
//     doc.text("Repairs, Cut & Polish Service Center", 105, 37, { align: "center" });
//     doc.addImage(carImage, "JPEG", 170, 10, 25, 25);

//     // Invoice Info
//     doc.setFontSize(14).setTextColor("#B30000").text("INVOICE", 200, 50, { align: "right" });
//     doc.setFontSize(10).setTextColor("#000000");
//     doc.text(`Invoice No: ${invoiceNo}`, 200, 55, { align: "right" });
//     doc.text(`Date: ${new Date(invoice.finalizedAt).toLocaleDateString()}`, 200, 60, { align: "right" });

//     let y = 70;

//     // Customer Info Section
//     doc.setFontSize(11).setTextColor("#B30000").text("Customer Information", 14, y);
//     y += 7;

//     doc.setFontSize(10).setTextColor("#000000");
//     const leftX = 14;
//     const rightX = 110;

//     doc.text(`Name: ${invoice.serviceInvoiceId?.customerName || "-"}`, leftX, y);
//     doc.text(`Service ID: ${invoice.serviceInvoiceId?.serviceID || "-"}`, rightX, y);
//     y += 6;

//     doc.text(`Vehicle No: ${invoice.serviceInvoiceId?.vehicleNumber || "-"}`, leftX, y);
//     doc.text(`Date: ${new Date(invoice.serviceInvoiceId?.serviceDate).toLocaleDateString()}`, rightX, y);
//     y += 6;

//     doc.text(`Present Meter: ${invoice.serviceInvoiceId?.presentMeter || "-"} km`, leftX, y);
//     y += 10;

//     // Repair Details
//     doc.setFontSize(11).setTextColor("#B30000").text("Repair Details", 14, y);
//     y += 6;

//     const repairs = invoice.serviceInvoiceId?.repairs || [];

//     for (const pkg of repairs) {
//       doc.setFont("helvetica", "bold").setTextColor("#2C2C2C").text(`Package: ${pkg.package}`, 14, y);
//       y += 6;

//       autoTable(doc, {
//         startY: y,
//         head: [["Repair", "Cost (Rs.)"]],
//         body: pkg.repairs.map((r) => [r.label, r.price.toFixed(2)]),
//         styles: { fontSize: 9 },
//         headStyles: { fillColor: [179, 0, 0], textColor: 255 },
//         margin: { left: 14, right: 14 },
//         theme: "striped",
//       });

//       y = doc.lastAutoTable.finalY + 4;
//       doc.setFont("helvetica", "bold").setTextColor("#000000").text(`Package Total: Rs. ${pkg.price.toFixed(2)}`, 200, y, { align: "right" });
//       y += 8;
//     }

//     // Used Parts
//     doc.setFont("helvetica", "bold").setTextColor("#B30000").text("Parts", 14, y);
//     y += 6;

//     const parts = invoice.serviceInvoiceId?.items || [];

//     autoTable(doc, {
//       startY: y,
//       head: [["Item", "Qty", "Unit Price (Rs.)", "Total (Rs.)"]],
//       body: parts.map((item) => [
//         item.itemName,
//         item.qty,
//         item.price.toFixed(2),
//         (item.qty * item.price).toFixed(2),
//       ]),
//       styles: { fontSize: 9 },
//       headStyles: { fillColor: [179, 0, 0], textColor: 255 },
//       margin: { left: 14, right: 14 },
//       theme: "striped",
//     });

//     y = doc.lastAutoTable.finalY + 10;

//     // Summary
//     doc.setFont("helvetica", "bold").setFontSize(11).setTextColor("#000000");
//     doc.text(`Total Cost: Rs. ${invoice.serviceInvoiceId?.totalCost.toFixed(2)}`, 200, y, { align: "right" }); y += 6;
//     doc.text(`Advance: Rs. ${advance.toFixed(2)}`, 200, y, { align: "right" }); y += 6;
//     doc.text(`Balance: Rs. ${balance.toFixed(2)}`, 200, y, { align: "right" }); y += 8;

//     // Signature & Footer
//     const signatureY = y + 10;
//     doc.setFont("helvetica", "normal").setFontSize(10);
//     doc.text("__________________________", 150, signatureY);
//     doc.text("Checked By", 160, signatureY + 5, { align: "center" });

//     let footerY = signatureY + 15;
//     doc.setFontSize(9).setTextColor("#000000");
//     doc.text("Note: The above costs are calculated based on workshop cost accumulation and labor charges.", 14, footerY, { maxWidth: 170 });
//     footerY += 6;
//     doc.text("Thank you for your business.", 14, footerY);

//     doc.save(`Invoice_${invoiceNo}.pdf`);
//   } catch (err) {
//     console.error("PDF Generation Error:", err);
//     toast.error("Failed to generate PDF.");
//   }
// };


// View Details in Modal
const handleView = (invoice) => {
  setSelectedInvoice(invoice);
  setShowModal(true);
};


// Delete Invoice
const handleDelete = async (id) => {
  try {
    await axios.delete(`http://localhost:5001/api/accountant-invoices/${id}`);
    toast.success("Invoice deleted.");
    refreshInvoices(); // make sure this function exists and works
  } catch (error) {
    console.error("Delete failed", error);
    toast.error("Delete failed.");
  }
};



// Refresh invoices function
const refreshInvoices = async () => {
  try {
    const [invoicesRes, finalizedRes] = await Promise.all([
      axios.get("http://localhost:5001/api/invoice"),
      axios.get("http://localhost:5001/api/accountant-invoices"),
    ]);

    // ✅ Only get invoices that are approved and not finalized
    const approved = invoicesRes.data.filter(
      (inv) => inv.status === "approved" && inv.isApproved === true
    );

    setApprovedInvoices(approved);
    setFinalizedInvoices(finalizedRes.data);
  } catch (err) {
    console.error("Failed to refresh invoice data", err);
    toast.error("Failed to refresh invoice list.");
  }
};

// Initial fetch of invoices
useEffect(() => {
  refreshInvoices(); // Simple now!
}, []);


// const refreshInvoices = async () => {
//   try {
//     const [invoicesRes, finalizedRes] = await Promise.all([
//       axios.get("http://localhost:5001/api/invoice"),
//       axios.get("http://localhost:5001/api/accountant-invoices"),
//     ]);

//     const approved = invoicesRes.data.filter((inv) => inv.isApproved === true);
//     setFinalizedInvoices(finalizedRes.data);

//     const finalizedServiceIds = new Set(finalizedRes.data.map((i) => i.serviceInvoiceId?._id));
//     const unfinalized = approved.filter((inv) => !finalizedServiceIds.has(inv._id));
//     setApprovedInvoices(unfinalized);
//   } catch (err) {
//     console.error("Failed to refresh invoice data", err);
//   }
// };

// // Call refreshInvoices() after invoice finalized







  // Fetch approved repairs for invoice generation
  
  useEffect(() => {
  axios
    .get("http://localhost:5001/api/invoice")
    .then((res) => {
      const approved = res.data.filter((inv) => inv.isApproved === true);
      setApprovedInvoices(approved);
    })
    .catch((err) => console.error("Failed to fetch invoices", err));
}, []);



// Fetch finalized invoices
useEffect(() => {
  axios
    .get("http://localhost:5001/api/accountant-invoices")
    .then((res) => {
      setFinalizedInvoices(res.data);
    })
    .catch((err) => console.error("Failed to load finalized invoices", err));
}, []);



useEffect(() => {
  const fetchData = async () => {
    try {
      const [invoicesRes, finalizedRes] = await Promise.all([
        axios.get("http://localhost:5001/api/invoice"),
        axios.get("http://localhost:5001/api/accountant-invoices"),
      ]);

      const approved = invoicesRes.data.filter(
  (inv) => inv.status === "approved" && inv.isApproved === true
);

      setFinalizedInvoices(finalizedRes.data);

      // Get list of already finalized serviceInvoiceIds
      const finalizedServiceIds = new Set(finalizedRes.data.map((i) => i.serviceInvoiceId?._id));

      // Filter out finalized ones from approved
      const unfinalized = approved.filter((inv) => !finalizedServiceIds.has(inv._id));
      setApprovedInvoices(unfinalized);
    } catch (err) {
      console.error("Failed to fetch invoice data", err);
    }
  };

  fetchData();
}, []);





  useEffect(() => {
    axios
      .get("http://localhost:5001/api/expenses/summary/monthly")
      .then((res) => setMonthlyExpenses(res.data))
      .catch((err) => console.error("Failed to load monthly expenses", err));

    axios
      .get("http://localhost:5001/api/expenses/summary/category")
      .then((res) => setCategorySummary(res.data))
      .catch((err) => console.error("Failed to load category summary", err));

    axios
      .get("http://localhost:5001/api/expenses/summary/supplier")
      .then((res) => setSupplierSummary(res.data))
      .catch((err) => console.error("Failed to load supplier summary", err));
  }, []);
  useEffect(() => {
    axios
      .get("http://localhost:5001/api/dashboard/summary")
      .then((res) => setSummary(res.data))
      .catch((err) => console.error("Dashboard summary load failed", err));
  }, []);

  return (
    <div className="flex h-screen bg-[#F5F5F5] w-380">
      <aside className="w-64 bg-[#2C2C2C] text-white p-5 flex flex-col">
        <div className="mb-8 flex flex-col items-center">
          <img src={logoImage} alt="Logo" className="w-20 h-20 rounded mb-2" />
          <h2 className="text-2xl font-bold text-center text-white">
            Nimal Motors
          </h2>
        </div>
        <nav className="space-y-4">
          <button
            onClick={() => navigate("/accountant-dashboard")}
            className="flex items-center gap-3 px-3 py-2 rounded bg-[#B30000] hover:bg-[#D63333] text-white"
          >
            <FaHome /> Dashboard
          </button>
          <button
            onClick={() => navigate("/expenses")}
            className="flex items-center gap-3 px-3 py-2 rounded hover:bg-[#5A5A5A] text-white"
          >
            <FaClipboardList /> Manage Expenses
          </button>
          <button
            onClick={() => navigate("/inventory-dashboard")}
            className="flex items-center gap-3 px-3 py-2 rounded hover:bg-[#5A5A5A] text-white"
          >
            <FaCogs /> Inventory Overview
          </button>
          <button
            onClick={() => navigate("/operation-dashboard")}
            className="flex items-center gap-3 px-3 py-2 rounded hover:bg-[#5A5A5A] text-white"
          >
            <FaChartLine /> Financial Reports
          </button>
          <button
            onClick={() => navigate("/repair-packages")}
            className="flex items-center gap-3 px-3 py-2 rounded hover:bg-[#5A5A5A] text-white"
          >
            <FaFileInvoice /> Repair Packages
          </button>
        </nav>
      </aside>

      <main className="flex-1 p-8 overflow-y-auto bg-[#F5F5F5]">
        <h2 className="text-3xl font-bold mb-6 text-[#000000]">
          Accountant Dashboard
        </h2>
        {/* Back Button */}
        <div className="flex justify-end mb-4">
  <button
    onClick={() => navigate("/accountant")}
    className="bg-[#2C2C2C] text-white px-4 py-2 rounded hover:bg-[#5A5A5A] shadow-sm flex items-center gap-2"
  >
    <FaUser className="text-white" />
    Back to Profile
  </button>
</div>


        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-[#FFFFFF] p-4 rounded shadow flex items-center gap-4">
            <FaMoneyBillWave className="text-[#B30000] text-3xl" />
            <div>
              <p className="text-sm text-[#000000]">Total Stock Value</p>
              <h2 className="text-xl font-semibold text-[#000000]">
                Rs.{" "}
                {Number(summary.stockValue).toLocaleString("en-LK", {
                  minimumFractionDigits: 2,
                })}
              </h2>
            </div>
          </div>
          <div className="bg-[#FFFFFF] p-4 rounded shadow flex items-center gap-4">
            <FaReceipt className="text-[#B30000] text-3xl" />
            <div>
              <p className="text-sm text-[#000000]">Expence/Purchase Records</p>
              <h2 className="text-xl font-semibold text-[#000000]">
                {summary.purchases}
              </h2>
            </div>
          </div>
          <div className="bg-[#FFFFFF] p-4 rounded shadow flex items-center gap-4">
            <FaFileInvoice className="text-[#B30000] text-3xl" />
            <div>
              <p className="text-sm text-[#000000]">Invoices</p>
              <h2 className="text-xl font-semibold text-[#000000]">
                {summary.invoices}
              </h2>
            </div>
          </div>
          <div className="bg-[#FFFFFF] p-4 rounded shadow flex items-center gap-4">
            <FaChartBar className="text-[#B30000] text-3xl" />
            <div>
              <p className="text-sm text-[#000000]">Outstanding Payments</p>
              <h2 className="text-xl font-semibold text-[#000000]">
                Rs.{" "}
                {Number(summary.outstanding).toLocaleString("en-LK", {
                  minimumFractionDigits: 2,
                })}
              </h2>
            </div>
          </div>
        </div>

        
        {/* Approved Repairs Table for Invoice Generation */}
<div className="bg-[#FFFFFF] p-6 rounded shadow mb-6">
  <h3 className="text-xl font-semibold mb-4 text-[#000000]">
    Approved Repairs – Generate Invoice
  </h3>

  {approvedRepairs.length === 0 ? (
    <p className="text-gray-500 text-sm">No approved repairs available.</p>
  ) : (
    <table className="w-full text-sm border border-[#2C2C2C]">
      <thead className="bg-[#B30000] text-white">
        <tr>
          <th className="p-2">Customer</th>
          <th className="p-2">Vehicle No</th>
          <th className="p-2">Service ID</th>
          <th className="p-2">Service Date</th>
          <th className="p-2">Estimated Cost (Rs.)</th>
          <th className="p-2">Actions
            
          </th>
        </tr>
      </thead>
      <tbody>
        {approvedRepairs.map((invoice, index) => (
          <tr key={index} className="text-center border-t border-[#2C2C2C] hover:bg-[#F5F5F5]">
            <td className="p-2 text-[#000000]">{invoice.customerName}</td>
            <td className="p-2 text-[#000000]">{invoice.vehicleNumber}</td>
            <td className="p-2 text-[#000000]">{invoice.serviceID}</td>
            <td className="p-2 text-[#000000]">
              {new Date(invoice.serviceDate).toLocaleDateString()}
            </td>
            <td className="p-2 text-[#B30000] font-semibold">
              Rs. {invoice.totalCost?.toFixed(2)}
            </td>
            <td className="p-2">
              <button
                onClick={() => navigate(`/generate-invoice/${invoice._id}`)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded"
              >
                Generate Invoice
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )}
  

</div>

{/* Search and Sort Controls */}
<div className="flex justify-between items-center mb-4">
  <input
    type="text"
    placeholder="Search by invoice no / customer / vehicle..."
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    className="border px-3 py-2 rounded w-2/3 text-sm text-[#000000]"
  />

  <select
    value={sortBy}
    onChange={(e) => setSortBy(e.target.value)}
    className="border px-2 py-1 rounded text-sm text-[#000000]"
  >
    <option value="date-desc">Newest First</option>
    <option value="date-asc">Oldest First</option>
  </select>
</div>

{/* Finalized Invoices Table */}
<div className="bg-[#FFFFFF] p-6 rounded shadow mb-6">
  <h3 className="text-xl font-semibold mb-4 text-[#000000]">
    Finalized Invoices
  </h3>

  {finalizedInvoices.length === 0 ? (
    <p className="text-gray-500 text-sm">No finalized invoices available yet.</p>
  ) : (
    <table className="w-full text-sm border border-[#2C2C2C]">
      <thead className="bg-[#2C2C2C] text-white">
        <tr>
          <th className="p-2">Invoice No</th>
          <th className="p-2">Customer</th>
          <th className="p-2">Vehicle No</th>
          <th className="p-2">Advance (Rs.)</th>
          <th className="p-2">Balance (Rs.)</th>
          <th className="p-2">Finalized Date</th>
          <th className="p-2">Actions
            
          </th>
        </tr>
      </thead>
      <tbody>
        {filteredAndSortedInvoices.map((invoice, index) => (

          <tr
            key={index}
            className="text-center border-t border-[#2C2C2C] hover:bg-[#F5F5F5]"
          >
            <td className="p-2 text-[#000000]">{invoice.invoiceNo}</td>
            <td className="p-2 text-[#000000]">
              {invoice.serviceInvoiceId?.customerName || "N/A"}
            </td>
            <td className="p-2 text-[#000000]">
              {invoice.serviceInvoiceId?.vehicleNumber || "N/A"}
            </td>
            <td className="p-2 text-[#B30000] font-semibold">
              {invoice.advance.toFixed(2)}
            </td>
            <td className="p-2 text-[#B30000] font-semibold">
              {invoice.balance.toFixed(2)}
            </td>
            <td className="p-2 text-[#000000]">
              {new Date(invoice.finalizedAt).toLocaleDateString()}
            </td>
             <td className="p-2 space-x-2">
              <button
                onClick={() => handleView(invoice)}
                className="bg-green-600 hover:bg-green-700 text-white px-2 py-1 rounded text-sm"
              >
                View
              </button>
              {/* <button
  onClick={() => generateInvoicePDF(invoice)}
  className="bg-blue-600 hover:bg-blue-700 text-white px-2 py-1 rounded text-sm"
>
  Download
</button> */}

              <button
                onClick={() => handleDelete(invoice._id)}
                className="bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded text-sm"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
        
      </tbody>
    </table>
  )}
</div>



        {/* Monthly Expense Bar Chart */}
        <div className="bg-[#FFFFFF] p-6 rounded shadow mb-6">
          <h3 className="text-xl font-semibold mb-4 text-[#000000]">
            Monthly Expenses (Last 6 Months)
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyExpenses}>
              <CartesianGrid strokeDasharray="3 3" stroke="#2C2C2C" />
              <XAxis
                dataKey="_id"
                label={{
                  value: "Month",
                  position: "insideBottom",
                  offset: -5,
                  fill: "#000000",
                }}
                tick={{ fill: "#000000" }}
              />
              <YAxis
                label={{
                  value: "Rs.",
                  angle: -90,
                  position: "insideLeft",
                  fill: "#000000",
                }}
                tick={{ fill: "#000000" }}
              />
              <Tooltip formatter={(value) => `Rs. ${value.toFixed(2)}`} />
              <Bar dataKey="total" fill="#B30000" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Category Summary Pie Chart */}
        <div className="bg-[#FFFFFF] p-6 rounded shadow mb-6">
          <h3 className="text-xl font-semibold mb-4 text-[#000000]">
            Expense by Category
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categorySummary}
                dataKey="total"
                nameKey="_id"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {categorySummary.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `Rs. ${value.toFixed(2)}`} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Supplier-wise Summary Table */}
        <div className="bg-[#FFFFFF] p-6 rounded shadow mb-6">
          <h3 className="text-xl font-semibold mb-4 text-[#000000]">
            Top Supplier Expenses
          </h3>
          <table className="w-full text-sm border border-[#2C2C2C]">
            <thead className="bg-[#2C2C2C] text-white">
              <tr>
                <th className="p-2">Supplier</th>
                <th className="p-2">Total Amount (Rs.)</th>
              </tr>
            </thead>
            <tbody>
              {supplierSummary.map((s, index) => (
                <tr
                  key={index}
                  className="text-center border-t border-[#2C2C2C] hover:bg-[#F5F5F5]"
                >
                  <td className="p-2 text-[#000000]">{s._id}</td>
                  <td className="p-2 text-[#B30000] font-semibold">
                    {s.total.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Back Button */}
        {/* <div className="mt-6 text-right">
          <button
            onClick={() => navigate("/accountant")}
            className="bg-[#2C2C2C] text-white px-4 py-2 rounded hover:bg-[#5A5A5A] shadow-sm"
          >
            ← Back to Profile
          </button>
        </div> */}
{showModal && selectedInvoice && (
  <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center overflow-y-auto">
    <div className="bg-white rounded-lg shadow-xl w-[90%] max-w-3xl my-8 p-8 relative max-h-[90vh] overflow-y-auto">
      <h2 className="text-2xl font-bold text-[#B30000] text-center mb-6">Finalized Invoice Details</h2>

      {/* Invoice Header */}
      <div className="grid grid-cols-2 gap-4 text-sm text-[#2C2C2C] mb-6">
        <div>
          <p><strong>Invoice No:</strong> {selectedInvoice.invoiceNo}</p>
          <p><strong>Date:</strong> {new Date(selectedInvoice.finalizedAt).toLocaleDateString()}</p>
        </div>
        <div className="text-right">
          <p><strong>Advance:</strong> Rs. {selectedInvoice.advance.toFixed(2)}</p>
          <p><strong>Balance:</strong> Rs. {selectedInvoice.balance.toFixed(2)}</p>
        </div>
      </div>

      {/* Customer Info */}
      <div className="bg-[#F5F5F5] rounded-md p-4 mb-6">
        <h3 className="text-lg font-semibold text-[#B30000] mb-2">Customer Information</h3>
        <p><strong>Name:</strong> {selectedInvoice.serviceInvoiceId?.customerName}</p>
        <p><strong>Vehicle No:</strong> {selectedInvoice.serviceInvoiceId?.vehicleNumber}</p>
        <p><strong>Service ID:</strong> {selectedInvoice.serviceInvoiceId?.serviceID}</p>
        <p><strong>Date:</strong> {new Date(selectedInvoice.serviceInvoiceId?.serviceDate).toLocaleDateString()}</p>
        <p><strong>Present Meter:</strong> {selectedInvoice.serviceInvoiceId?.presentMeter} km</p>
      </div>

      {/* Repair Packages */}
      {selectedInvoice.serviceInvoiceId?.repairs?.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-[#B30000] mb-2">Repair Packages</h3>
          {selectedInvoice.serviceInvoiceId.repairs.map((pkg, index) => (
            <div key={index} className="border rounded p-3 mb-4">
              <p className="font-semibold text-[#2C2C2C] mb-2">Package: {pkg.package}</p>
              <table className="w-full text-sm border">
                <thead className="bg-[#B30000] text-white">
                  <tr>
                    <th className="p-2">Repair</th>
                    <th className="p-2">Cost (Rs.)</th>
                  </tr>
                </thead>
                <tbody>
                  {pkg.repairs.map((repair, i) => (
                    <tr key={i} className="text-center border-t">
                      <td className="p-2">{repair.label}</td>
                      <td className="p-2">Rs. {repair.price.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="text-right text-sm mt-2 font-semibold">
                Package Total: Rs. {pkg.price.toFixed(2)}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Used Parts */}
      {selectedInvoice.serviceInvoiceId?.items?.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-[#B30000] mb-2">Used Parts</h3>
          <table className="w-full text-sm border">
            <thead className="bg-[#2C2C2C] text-white">
              <tr>
                <th className="p-2">Item</th>
                <th className="p-2">Qty</th>
                <th className="p-2">Unit Price (Rs.)</th>
                <th className="p-2">Total (Rs.)</th>
              </tr>
            </thead>
            <tbody>
              {selectedInvoice.serviceInvoiceId.items.map((item, i) => (
                <tr key={i} className="text-center border-t">
                  <td className="p-2">{item.itemName}</td>
                  <td className="p-2">{item.qty}</td>
                  <td className="p-2">{item.price.toFixed(2)}</td>
                  <td className="p-2">{(item.qty * item.price).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Total Summary */}
      <div className="text-right text-base font-semibold text-[#000000] mb-4">
        Total Cost: Rs. {selectedInvoice.serviceInvoiceId?.totalCost?.toFixed(2)}
      </div>

      {/* Close Button in Footer */}
      <div className="flex justify-end mt-6">
        <button
          onClick={() => setShowModal(false)}
          className="bg-[#2C2C2C] text-white px-5 py-2 rounded hover:bg-[#5A5A5A]"
        >
          Close
        </button>
      </div>
    </div>
  </div>
)}


      </main>
    </div>
  );
};

export default AccountantDashboard;
