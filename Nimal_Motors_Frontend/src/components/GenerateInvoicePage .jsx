import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaPrint, FaSave } from "react-icons/fa";

const GenerateInvoicePage = () => {
  const { repairId } = useParams(); // assuming route like /generate-invoice/:repairId
  const navigate = useNavigate();

  const [repair, setRepair] = useState(null);
  const [advance, setAdvance] = useState(0);
  const [invoiceNo, setInvoiceNo] = useState("");
  const [presentMeter, setPresentMeter] = useState("");

  useEffect(() => {
    axios.get(`http://localhost:5001/api/repairs/${repairId}`)
      .then(res => setRepair(res.data))
      .catch(err => console.error("Failed to fetch repair:", err));
  }, [repairId]);

  if (!repair) return <div className="p-6">Loading repair data...</div>;

  const totalAmount = repair.items.reduce((sum, item) => sum + (item.cost * item.qty), 0);
  const balance = totalAmount - advance;

  const handleSaveInvoice = async () => {
    try {
      const payload = {
        invoiceNo,
        customerName: repair.customerName,
        vehicleNo: repair.vehicleNo,
        presentMeter,
        invoiceDate: new Date(),
        items: repair.items.map(item => ({
          section: repair.section,
          description: item.description,
          qty: item.qty,
          amount: item.cost,
        })),
        totalAmount,
        advance,
        balance,
        relatedRepairId: repair._id
      };

      await axios.post("http://localhost:5001/api/invoices", payload);
      alert("Invoice saved successfully!");
      navigate("/accountant-dashboard");
    } catch (err) {
      console.error("Error saving invoice:", err);
      alert("Failed to save invoice.");
    }
  };

  return (
    <div className="p-8 bg-white max-w-4xl mx-auto shadow rounded">
      <h1 className="text-2xl font-bold mb-6 text-red-600">Generate Invoice</h1>

      {/* Header */}
      <div className="flex justify-between mb-4">
        <div>
          <p><strong>Customer:</strong> {repair.customerName}</p>
          <p><strong>Vehicle No:</strong> {repair.vehicleNo}</p>
        </div>
        <div>
          <label className="block mb-1 font-medium">Invoice No</label>
          <input
            type="text"
            className="border px-2 py-1 rounded"
            value={invoiceNo}
            onChange={(e) => setInvoiceNo(e.target.value)}
            required
          />
        </div>
      </div>

      {/* Meter Reading */}
      <div className="mb-4">
        <label className="block mb-1 font-medium">Present Meter Reading</label>
        <input
          type="text"
          className="border px-2 py-1 rounded w-full"
          value={presentMeter}
          onChange={(e) => setPresentMeter(e.target.value)}
        />
      </div>

      {/* Items Table */}
      <table className="w-full table-auto mb-6 border">
        <thead className="bg-gray-100 border-b">
          <tr>
            <th className="p-2 text-left">Description</th>
            <th className="p-2 text-right">Qty</th>
            <th className="p-2 text-right">Rate</th>
            <th className="p-2 text-right">Total</th>
          </tr>
        </thead>
        <tbody>
          {repair.items.map((item, idx) => (
            <tr key={idx} className="border-b">
              <td className="p-2">{item.description}</td>
              <td className="p-2 text-right">{item.qty}</td>
              <td className="p-2 text-right">Rs. {item.cost}</td>
              <td className="p-2 text-right">Rs. {item.qty * item.cost}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Totals */}
      <div className="text-right mb-6">
        <p><strong>Total: </strong>Rs. {totalAmount.toFixed(2)}</p>
        <div className="mt-2">
          <label className="mr-2 font-medium">Advance:</label>
          <input
            type="number"
            className="border px-2 py-1 rounded w-40"
            value={advance}
            onChange={(e) => setAdvance(Number(e.target.value))}
          />
        </div>
        <p className="mt-2 text-lg font-bold text-red-600">Balance: Rs. {balance.toFixed(2)}</p>
      </div>

      {/* Actions */}
      <div className="flex gap-4 justify-end">
        <button
          className="bg-green-600 text-white px-4 py-2 rounded flex items-center gap-2"
          onClick={handleSaveInvoice}
        >
          <FaSave /> Save Invoice
        </button>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-2"
          onClick={() => window.print()}
        >
          <FaPrint /> Print
        </button>
      </div>
    </div>
  );
};

export default GenerateInvoicePage;
