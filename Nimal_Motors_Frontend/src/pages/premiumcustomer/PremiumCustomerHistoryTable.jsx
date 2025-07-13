import React, { useEffect, useState } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const PremiumCustomerHistoryTable = ({ customerName }) => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5001/api/premium-customer/history/${customerName}`)
      .then(res => res.json())
      .then(data => {
        if (data.success) setHistory(data.data);
      })
      .catch(err => console.error('Failed to fetch history:', err));
  }, [customerName]);

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.text('Premium Customer Service History', 20, 10);
    const tableData = history.map(h => [
      h.customerName,
      h.displayID,
      h.contact,
      h.vehicleNumber,
      h.serviceDate?.slice(0, 10),
      h.section,
    ]);
    doc.autoTable({
      head: [['Customer', 'Display ID', 'Contact', 'Vehicle No', 'Service Date', 'Section']],
      body: tableData,
    });
    doc.save('service-history.pdf');
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-lg">
      <h2 className="text-xl font-semibold mb-4">Service History for {customerName}</h2>
      <button
        onClick={handleDownloadPDF}
        className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Download as PDF
      </button>
      <div className="overflow-x-auto">
        <table className="w-full table-auto border">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2">Customer</th>
              <th className="border px-4 py-2">Display ID</th>
              <th className="border px-4 py-2">Contact</th>
              <th className="border px-4 py-2">Vehicle No</th>
              <th className="border px-4 py-2">Service Date</th>
              <th className="border px-4 py-2">Section</th>
            </tr>
          </thead>
          <tbody>
            {history.length > 0 ? (
              history.map((h, i) => (
                <tr key={i} className="hover:bg-gray-50">
                  <td className="border px-4 py-2">{h.customerName}</td>
                  <td className="border px-4 py-2">{h.displayID}</td>
                  <td className="border px-4 py-2">{h.contact}</td>
                  <td className="border px-4 py-2">{h.vehicleNumber}</td>
                  <td className="border px-4 py-2">{h.serviceDate?.slice(0, 10)}</td>
                  <td className="border px-4 py-2">{h.section}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-4 text-gray-500">
                  No history found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PremiumCustomerHistoryTable;
