// components/ServiceHistory.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

const ServiceHistory = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [statusFilter, setStatusFilter] = useState("Completed");
  const [monthFilter, setMonthFilter] = useState("All");
  const [currentYear] = useState(new Date().getFullYear());

  const fetchHistory = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        Swal.fire({ icon: 'error', title: 'Authentication Error', text: 'User not authenticated' });
        return;
      }

      const response = await axios.get('http://localhost:5001/api/history/completed', {
        headers: { Authorization: `Bearer ${token}` },
      });

      setHistory(response.data);
    } catch (err) {
      console.error('Error fetching history:', err.response || err);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: err.response?.data?.message || 'Failed to fetch service history. Check server logs.',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const applyFilters = () => {
    let filtered = [...history];
    if (statusFilter !== "All") {
      filtered = filtered.filter((a) => a.status === statusFilter);
    }
    if (monthFilter !== "All") {
      const month = new Date(`${monthFilter}-01`).getMonth();
      filtered = filtered.filter(
        (a) => new Date(a.serviceDate).getMonth() === month
      );
    }
    return filtered;
  };

  const downloadPDF = () => {
    const filteredHistory = applyFilters();
    const doc = new jsPDF();
    doc.text('Premium Customer Completed Service History', 14, 20);

    const tableData = filteredHistory.map(item => [
      item.department,
      item.displayID,
      item.customerName,
      item.vehicleType,
      item.vehicleNumber,
      item.serviceDate.toLocaleDateString(),
      item.presentMeter || 'N/A',
      item.contact.phone,
      item.contact.email || 'N/A',
      item.createdAt.toLocaleDateString(),
    ]);

    doc.autoTable({
      head: [['Department', 'Display ID', 'Customer Name', 'Vehicle Type', 'Vehicle Number', 'Service Date', 'Meter', 'Phone', 'Email', 'Created At']],
      body: tableData,
      startY: 30,
      theme: 'grid',
      headStyles: { fillColor: [0, 102, 204], textColor: [255, 255, 255] },
      styles: { fontSize: 10 },
    });

    doc.save('premium_service_history.pdf');
  };

  const months = Array.from({ length: 12 }, (_, index) => {
    const date = new Date(currentYear, index, 1);
    return date.toLocaleString("default", { month: "long" });
  });

  const filteredHistory = applyFilters();

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Premium Customer Completed Service History</h2>
      <div className="mb-4 flex space-x-4">
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border border-gray-300 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="All">All Statuses</option>
          <option value="Completed">Completed</option>
        </select>
        <select
          value={monthFilter}
          onChange={(e) => setMonthFilter(e.target.value)}
          className="border border-gray-300 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="All">All Months</option>
          {months.map((month, index) => (
            <option key={index} value={`${currentYear}-${index + 1}`}>
              {month}
            </option>
          ))}
        </select>
      </div>
      <div className="flex space-x-4 mb-4">
        <button
          onClick={downloadPDF}
          disabled={loading || filteredHistory.length === 0}
          className={`px-4 py-2 rounded-lg text-white ${loading || filteredHistory.length === 0 ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'}`}
        >
          Download as PDF
        </button>
        <button
          onClick={fetchHistory}
          disabled={loading}
          className={`px-4 py-2 rounded-lg text-white ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
        >
          Refresh History
        </button>
      </div>
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : filteredHistory.length === 0 ? (
        <p className="text-center text-gray-500">No completed tasks found. Ensure tasks are marked complete by a supervisor.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-separate border-spacing-0">
            <thead className="bg-gray-200">
              <tr>
                <th className="border px-4 py-2">Department</th>
                <th className="border px-4 py-2">Display ID</th>
                <th className="border px-4 py-2">Customer Name</th>
                <th className="border px-4 py-2">Vehicle Number</th>
                <th className="border px-4 py-2">Service Date</th>
                <th className="border px-4 py-2">Meter</th>
                <th className="border px-4 py-2">Phone</th>
                <th className="border px-4 py-2">Created At</th>
              </tr>
            </thead>
            <tbody className="text-sm text-gray-700">
              {filteredHistory.map((item) => (
                <tr key={`${item.department}-${item.displayID}`} className="hover:bg-gray-100">
                  <td className="border px-4 py-2">{item.department}</td>
                  <td className="border px-4 py-2">{item.displayID}</td>
                  <td className="border px-4 py-2">{item.customerName}</td>
                  <td className="border px-4 py-2">{item.vehicleNumber}</td>
                  <td className="border px-4 py-2">{new Date(item.serviceDate).toLocaleDateString()}</td>
                  <td className="border px-4 py-2">{item.presentMeter || 'N/A'}</td>
                  <td className="border px-4 py-2">{item.contact.phone}</td>
                  <td className="border px-4 py-2">{new Date(item.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ServiceHistory;