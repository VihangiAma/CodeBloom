import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaFileInvoice, FaArrowLeft, FaDownload } from "react-icons/fa";
import { jsPDF } from "jspdf";
//import InvoiceTemplate from "./InvoiceTemplate";
import logoImage from "../assets/logo.jpg";
import carImage from "../assets/car.jpeg";

const GenerateInvoicePage = () => {
  const { repairId } = useParams();
  const navigate = useNavigate();
  const [repairDetails, setRepairDetails] = useState(null);
  const [invoiceData, setInvoiceData] = useState({
    invoiceNo: `INVOICE-${Date.now()}`,
    customerName: "",
    vehicleNo: "",
    presentMeter: "",
    invoiceDate: new Date().toISOString().slice(0, 10),
    dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10),
    items: [{ description: "", qty: 1, amount: 0 }],
    advanceAmount: 0,
    totalAmount: 0,
    notes: "The above cost are calculated according to the workshop cost accumulation and labor charges",
  });

  useEffect(() => {
    axios.get(`http://localhost:5001/api/repairs/${repairId}`)
      .then((res) => {
        const repair = res.data;
        const calculatedTotal = repair.items?.reduce((acc, item) => acc + (parseFloat(item.amount) || 0) * (parseInt(item.qty) || 1), 0) || 0;
        setRepairDetails(repair);
        setInvoiceData((prev) => ({
          ...prev,
          customerName: repair.customerName || "",
          vehicleNo: repair.vehicleNo || "",
          presentMeter: repair.presentMeter || "",
          items: repair.items || [{ description: "", qty: 1, amount: 0 }],
          totalAmount: calculatedTotal,
        }));
      })
      .catch((err) => {
        console.error("Error loading repair", err);
        toast.error("Failed to load repair details.");
      });
  }, [repairId]);

  useEffect(() => {
    const total = invoiceData.items.reduce((sum, item) => sum + (parseFloat(item.amount) || 0) * (parseInt(item.qty) || 1), 0) - (parseFloat(invoiceData.advanceAmount) || 0);
    setInvoiceData((prev) => ({ ...prev, totalAmount: total.toFixed(2) }));
  }, [invoiceData.items, invoiceData.advanceAmount]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInvoiceData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLineItemChange = (index, field, value) => {
    const newItems = [...invoiceData.items];
    newItems[index][field] = value;
    setInvoiceData((prev) => ({ ...prev, items: newItems }));
  };

  const addLineItem = () => {
    setInvoiceData((prev) => ({
      ...prev,
      items: [...prev.items, { description: "", qty: 1, amount: 0 }],
    }));
  };

  const removeLineItem = (index) => {
    const newItems = invoiceData.items.filter((_, i) => i !== index);
    setInvoiceData((prev) => ({ ...prev, items: newItems }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5001/api/invoices/create", {
        repairId,
        ...invoiceData,
      });
      toast.success("Invoice saved successfully!");
    } catch (err) {
      console.error("Failed to save invoice", err);
      toast.error("Failed to save invoice.");
    }
  };

  const generatePDF = () => {
    const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
    doc.addImage(logoImage, "PNG", 10, 10, 20, 20);
    doc.setFontSize(18);
    doc.setTextColor("#B30000");
    doc.text("Nimal Motors", 105, 20, { align: "center" });
    doc.setFontSize(10);
    doc.setTextColor("#000000");
    doc.text("No 52/2, Galle Road, Aluthgama", 105, 30, { align: "center" });
    doc.text("Tel: 034-2238057/7777738057", 105, 35, { align: "center" });
    doc.text("Email: nimalmotors@gmail.com", 105, 40, { align: "center" });
    doc.text("Repairs, Cut & Polish Service Center", 105, 45, { align: "center" });
    doc.addImage(carImage, "JPEG", 170, 10, 20, 20);

    doc.setFontSize(16);
    doc.setTextColor("#B30000");
    doc.text("INVOICE", 180, 20, { align: "right" });
    doc.setFontSize(10);
    doc.setTextColor("#000000");
    doc.text(`Invoice No: ${invoiceData.invoiceNo}`, 180, 30, { align: "right" });
    doc.text(`Date: ${invoiceData.invoiceDate}`, 180, 35, { align: "right" });
    doc.text(`Month: ${new Date(invoiceData.invoiceDate).toLocaleString('default', { month: 'long' })} ${new Date(invoiceData.invoiceDate).getFullYear()}`, 180, 40, { align: "right" });

    doc.setFontSize(12);
    doc.setTextColor("#B30000");
    doc.text("Bill To:", 10, 60);
    doc.setTextColor("#000000");
    doc.text(invoiceData.customerName, 10, 70);
    doc.text(`Vehicle Number: ${invoiceData.vehicleNo}`, 10, 75);
    doc.text(`Present Meter: ${invoiceData.presentMeter}km`, 10, 80);

    const startY = 90;
    doc.setFillColor("#B30000");
    doc.rect(10, startY - 5, 190, 10, "F");
    doc.setTextColor("#FFFFFF");
    doc.text("Sr No", 12, startY);
    doc.text("Description", 30, startY);
    doc.text("Qty", 120, startY);
    doc.text("Amount", 160, startY);

    let yPos = startY + 5;
    invoiceData.items.forEach((item, index) => {
      doc.setTextColor("#000000");
      doc.text((index + 1).toString(), 12, yPos + 5);
      doc.text(item.description || "N/A", 30, yPos + 5, { maxWidth: 90 });
      doc.text(item.qty.toString(), 120, yPos + 5);
      doc.text((parseFloat(item.amount) * parseInt(item.qty)).toFixed(2), 160, yPos + 5, { align: "right" });
      yPos += 10;
    });

    doc.setFont("helvetica", "bold");
    doc.text("Total Amount", 120, yPos + 5);
    doc.text(`Rs. ${invoiceData.totalAmount}`, 160, yPos + 5, { align: "right" });
    doc.text("Advance Amount", 120, yPos + 15);
    doc.text(`Rs. ${invoiceData.advanceAmount}`, 160, yPos + 15, { align: "right" });
    doc.text("Balance", 120, yPos + 25);
    doc.text(`Rs. ${(invoiceData.totalAmount - invoiceData.advanceAmount).toFixed(2)}`, 160, yPos + 25, { align: "right" });

    doc.setFont("helvetica", "normal");
    doc.setTextColor("#000000");
    doc.text(invoiceData.notes, 10, yPos + 40, { maxWidth: 190 });
    doc.text("Thank you for your Business", 10, yPos + 50, { maxWidth: 190, align: "center" });

    doc.save(`Invoice_${invoiceData.invoiceNo}.pdf`);
  };

  return (
    <div className="min-h-screen bg-[#F5F5F5] p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-[#B30000]">Generate Invoice</h1>
        <button
          onClick={() => navigate("/accountant-dashboard")}
          className="bg-[#2C2C2C] text-white px-4 py-2 rounded hover:bg-[#5A5A5A] shadow-sm flex items-center gap-2"
        >
          <FaArrowLeft /> Back to Dashboard
        </button>
      </div>
      {repairDetails ? (
        <div className="bg-[#FFFFFF] p-6 rounded shadow-md max-w-2xl mx-auto">
          <h2 className="text-xl font-semibold mb-4 text-[#000000] flex items-center gap-2">
            <FaFileInvoice /> Invoice Details
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-[#000000] mb-1">Invoice Number</label>
              <input
                type="text"
                name="invoiceNo"
                value={invoiceData.invoiceNo}
                onChange={handleChange}
                className="w-full p-2 border border-[#2C2C2C] rounded text-[#000000] focus:ring-[#B30000] focus:border-[#B30000]"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-[#000000] mb-1">Customer Name</label>
              <input
                type="text"
                name="customerName"
                value={invoiceData.customerName}
                onChange={handleChange}
                className="w-full p-2 border border-[#2C2C2C] rounded text-[#000000] focus:ring-[#B30000] focus:border-[#B30000]"
                disabled
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-[#000000] mb-1">Vehicle Number</label>
              <input
                type="text"
                name="vehicleNo"
                value={invoiceData.vehicleNo}
                onChange={handleChange}
                className="w-full p-2 border border-[#2C2C2C] rounded text-[#000000] focus:ring-[#B30000] focus:border-[#B30000]"
                disabled
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-[#000000] mb-1">Present Meter (km)</label>
              <input
                type="text"
                name="presentMeter"
                value={invoiceData.presentMeter}
                onChange={handleChange}
                className="w-full p-2 border border-[#2C2C2C] rounded text-[#000000] focus:ring-[#B30000] focus:border-[#B30000]"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-[#000000] mb-1">Invoice Date</label>
              <input
                type="date"
                name="invoiceDate"
                value={invoiceData.invoiceDate}
                onChange={handleChange}
                className="w-full p-2 border border-[#2C2C2C] rounded text-[#000000] focus:ring-[#B30000] focus:border-[#B30000]"
                max={new Date().toISOString().slice(0, 10)}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-[#000000] mb-1">Due Date</label>
              <input
                type="date"
                name="dueDate"
                value={invoiceData.dueDate}
                onChange={handleChange}
                className="w-full p-2 border border-[#2C2C2C] rounded text-[#000000] focus:ring-[#B30000] focus:border-[#B30000]"
                min={invoiceData.invoiceDate}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-[#000000] mb-1">Advance Amount (Rs.)</label>
              <input
                type="number"
                name="advanceAmount"
                value={invoiceData.advanceAmount}
                onChange={handleChange}
                className="w-full p-2 border border-[#2C2C2C] rounded text-[#000000] focus:ring-[#B30000] focus:border-[#B30000]"
                min="0"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-[#000000] mb-1">Line Items</label>
              {invoiceData.items.map((item, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <input
                    type="text"
                    placeholder="Description"
                    value={item.description}
                    onChange={(e) => handleLineItemChange(index, "description", e.target.value)}
                    className="w-1/2 p-2 border border-[#2C2C2C] rounded text-[#000000] focus:ring-[#B30000] focus:border-[#B30000]"
                  />
                  <input
                    type="number"
                    placeholder="Qty"
                    value={item.qty}
                    onChange={(e) => handleLineItemChange(index, "qty", e.target.value)}
                    className="w-1/4 p-2 border border-[#2C2C2C] rounded text-[#000000] focus:ring-[#B30000] focus:border-[#B30000]"
                    min="1"
                  />
                  <input
                    type="number"
                    placeholder="Amount (Rs.)"
                    value={item.amount}
                    onChange={(e) => handleLineItemChange(index, "amount", e.target.value)}
                    className="w-1/4 p-2 border border-[#2C2C2C] rounded text-[#000000] focus:ring-[#B30000] focus:border-[#B30000]"
                    min="0"
                  />
                  <button
                    type="button"
                    onClick={() => removeLineItem(index)}
                    className="bg-[#B30000] text-white px-2 py-1 rounded hover:bg-[#D63333] shadow-sm"
                    disabled={invoiceData.items.length === 1}
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={addLineItem}
                className="bg-[#B30000] text-white px-4 py-2 rounded hover:bg-[#D63333] shadow-sm"
              >
                Add Line Item
              </button>
            </div>
            <div>
              <label className="block text-sm font-semibold text-[#000000] mb-1">Total Amount (Rs.)</label>
              <input
                type="text"
                name="totalAmount"
                value={invoiceData.totalAmount}
                className="w-full p-2 border border-[#2C2C2C] rounded text-[#000000] bg-[#F5F5F5]"
                disabled
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-[#000000] mb-1">Notes</label>
              <textarea
                name="notes"
                value={invoiceData.notes}
                onChange={handleChange}
                className="w-full p-2 border border-[#2C2C2C] rounded text-[#000000] focus:ring-[#B30000] focus:border-[#B30000]"
                rows="2"
              ></textarea>
            </div>
            <div className="flex justify-end gap-3">
              <button
                type="submit"
                className="bg-[#B30000] text-white px-4 py-2 rounded hover:bg-[#D63333] shadow-sm"
              >
                Save Invoice
              </button>
              <button
                type="button"
                onClick={generatePDF}
                className="bg-[#B30000] text-white px-4 py-2 rounded hover:bg-[#D63333] shadow-sm flex items-center gap-2"
              >
                <FaDownload /> Generate PDF
              </button>
              <button
                type="button"
                onClick={() => navigate("/accountant-dashboard")}
                className="bg-[#2C2C2C] text-white px-4 py-2 rounded hover:bg-[#5A5A5A] shadow-sm"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      ) : (
        <p className="text-[#2C2C2C] text-sm">Loading repair details...</p>
      )}
    </div>
  );
};

export default GenerateInvoicePage;