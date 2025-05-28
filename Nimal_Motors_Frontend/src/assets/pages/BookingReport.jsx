import React, { useState } from 'react';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

const BookingReport = () => {
  const [reportName, setReportName] = useState('Booking Section Report');
  const [loading, setLoading] = useState(false);
  
  // Mock data - in a real app, you would fetch this from an API
  const [bookingData, setBookingData] = useState([]);

  const generateReport = () => {
    setLoading(true);
    
    // Simulate data loading
    setTimeout(() => {
      // In a real app, you would check actual data from API
      if (bookingData.length === 0) {
        alert('No booking data available to generate report');
        setLoading(false);
        return;
      }

      // Create PDF document
      const doc = new jsPDF();
      
      // Add header
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(16);
      doc.text(reportName, 105, 15, { align: 'center' });
      
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10);
      doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 105, 25, { align: 'center' });
      
      // Add table with booking data
      autoTable(doc, {
        startY: 35,
        head: [['Booking ID', 'Customer', 'Date', 'Service']],
        body: bookingData.map(item => [
          item.id,
          item.customer,
          item.date,
          item.service
        ]),
        headStyles: {
          fillColor: [220, 220, 220],
          textColor: [0, 0, 0],
          fontStyle: 'bold'
        },
        styles: {
          fontSize: 10,
          cellPadding: 5,
          halign: 'left'
        }
      });
      
      // Save the PDF
      doc.save(`${reportName.replace(/\s+/g, '_').toLowerCase()}.pdf`);
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="p-4 max-w-4xl mx-auto bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Booking Section Report</h2>
      
      <div className="mb-6">
        
        <input
          type="text"
          id="reportName"
          value={reportName}
          onChange={(e) => setReportName(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          placeholder="Enter report name"
        />
      </div>
      
      <button
        onClick={generateReport}
        disabled={loading}
        className={`px-4 py-2 rounded-md text-white ${loading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
      >
        {loading ? 'Generating Report...' : 'Generate Booking Report'}
      </button>
      
      <div className="mt-8 p-4 bg-gray-50 rounded-lg">
        <h3 className="text-lg font-semibold mb-2">Report Preview</h3>
        {bookingData.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No booking data available. The report will show booking information when data exists.
          </div>
        ) : (
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-2 text-left">Booking ID</th>
                <th className="border p-2 text-left">Customer</th>
                <th className="border p-2 text-left">Date</th>
                <th className="border p-2 text-left">Service</th>
              </tr>
            </thead>
            <tbody>
              {bookingData.map((item) => (
                <tr key={item.id} className="hover:bg-gray-100">
                  <td className="border p-2">{item.id}</td>
                  <td className="border p-2">{item.customer}</td>
                  <td className="border p-2">{item.date}</td>
                  <td className="border p-2">{item.service}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default BookingReport;