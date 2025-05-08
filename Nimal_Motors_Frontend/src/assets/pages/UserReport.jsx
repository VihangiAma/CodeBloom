import React, { useEffect, useState } from 'react';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pdfError, setPdfError] = useState('');
  const [selectedSection, setSelectedSection] = useState('all');
  const [userCounts, setUserCounts] = useState({
    total: 0,
    mechanical: 0,
    bodyShop: 0,
    electrical: 0,
    appointments: 0
  });

  useEffect(() => {
    const fetchAllSections = async () => {
      try {
        setLoading(true);
        const [mechRes, bodyRes, elecRes, appRes] = await Promise.all([
          fetch('http://localhost:5001/api/mechanical'),
          fetch('http://localhost:5001/api/bodyshop'),
          fetch('http://localhost:5001/api/electrical'),
          fetch('http://localhost:5001/api/appointments'),
        ]);

        const [mechData, bodyData, elecData, appData] = await Promise.all([
          mechRes.json(),
          bodyRes.json(),
          elecRes.json(),
          appRes.json(),
        ]);

        const formatData = (data, section) =>
          data.map((item) => ({
            customerName: item.customerName || 'N/A',
            displayID: item.displayID || 'N/A',
            contact: item.contact?.phone || item.contact || 'N/A',
            vehicleNumber: item.vehicleNumber || 'N/A',
            serviceDate: item.serviceDate ? item.serviceDate.slice(0, 10) : 'N/A',
            section,
          }));

        const allUsers = [
          ...formatData(mechData, 'Mechanical'),
          ...formatData(bodyData, 'BodyShop'),
          ...formatData(elecData, 'Electrical'),
          ...formatData(appData, 'Appointments'),
        ];

        setUsers(allUsers);
        setFilteredUsers(allUsers);
        
        // Calculate user counts for PDF only
        setUserCounts({
          total: allUsers.length,
          mechanical: mechData.length,
          bodyShop: bodyData.length,
          electrical: elecData.length,
          appointments: appData.length
        });
        
        setLoading(false);
      } catch (err) {
        console.error('Error fetching section data:', err);
        setLoading(false);
      }
    };

    fetchAllSections();
  }, []);

  useEffect(() => {
    if (selectedSection === 'all') {
      setFilteredUsers(users);
    } else {
      setFilteredUsers(users.filter(user => user.section === selectedSection));
    }
  }, [selectedSection, users]);

  const handleDownloadPDF = () => {
    try {
      setPdfError('');
      
      const dataToExport = selectedSection === 'all' ? users : filteredUsers;
      
      if (!dataToExport || dataToExport.length === 0) {
        throw new Error("No user data available to generate PDF");
      }

      const doc = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4"
      });

      // Add header
      doc.setFont("helvetica", "bold");
      doc.setFontSize(16);
      doc.text("NIMAL MOTORS", 105, 15, { align: "center" });
      
      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      doc.text("No:321/2A, Galle Road, Aluthgama", 105, 20, { align: "center" });
      doc.text("Tel: 055-2298868 / 077-8888888", 105, 25, { align: "center" });
      doc.text("Email: nimalmotors.nm@gmail.com", 105, 30, { align: "center" });
      doc.text("All Vehicle Repairs, Cut & Polish & Service Center", 105, 35, { align: "center" });
      doc.text(`Reg No: 168507`, 105, 40, { align: "center" });
      
      // Add separator line
      doc.setDrawColor(200);
      doc.setLineWidth(0.5);
      doc.line(20, 45, 190, 45);

      // Report title with section filter info
      doc.setFont("helvetica", "bold");
      doc.setFontSize(18);
      const reportTitle = selectedSection === 'all' 
        ? "Customer Service Report (All Sections)" 
        : `Customer Service Report (${selectedSection})`;
      doc.text(reportTitle, 105, 55, { align: "center" });

      doc.setFontSize(10);
      doc.setTextColor(100);
      doc.text(`Generated on ${new Date().toLocaleString()}`, 105, 65, { align: "center" });

      const headers = [
        ["Customer Name", "ID", "Contact", "Vehicle No", "Service Date", "Section"]
      ];

      const data = dataToExport.map(user => [
        user.customerName,
        user.displayID,
        user.contact,
        user.vehicleNumber,
        user.serviceDate,
        user.section
      ]);

      autoTable(doc, {
        startY: 70,
        head: headers,
        body: data,
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
          0: { cellWidth: 40 },
          1: { cellWidth: 20 },
          2: { cellWidth: 30 },
          3: { cellWidth: 30 },
          4: { cellWidth: 30 },
          5: { cellWidth: 30 }
        },
        didDrawPage: (data) => {
          // Footer with page number and user counts (only on last page)
          if (data.pageNumber === doc.internal.getNumberOfPages()) {
            // Add separator line above footer
            doc.setDrawColor(200);
            doc.setLineWidth(0.5);
            doc.line(20, doc.internal.pageSize.height - 30, 190, doc.internal.pageSize.height - 30);
            
            // Add user counts summary at the bottom
            doc.setFontSize(12);
            doc.setTextColor(100);
            doc.text(`Total Users: ${userCounts.total}`, 20, doc.internal.pageSize.height - 25);
            doc.text(`Mechanical: ${userCounts.mechanical}`, 60, doc.internal.pageSize.height - 25);
            doc.text(`BodyShop: ${userCounts.bodyShop}`, 100, doc.internal.pageSize.height - 25);
            doc.text(`Electrical: ${userCounts.electrical}`, 140, doc.internal.pageSize.height - 25);
            doc.text(`Appointments: ${userCounts.appointments}`, 20, doc.internal.pageSize.height - 20);
          }
          
          // Page number for all pages
          doc.setFontSize(10);
          doc.setTextColor(150);
          doc.text(
            `Page ${data.pageNumber} of ${doc.internal.getNumberOfPages()}`,
            data.settings.margin.left,
            doc.internal.pageSize.height - 10
          );
        }
      });

      doc.save(`customer_report_${selectedSection === 'all' ? 'all' : selectedSection.toLowerCase()}_${new Date().toISOString().slice(0, 10)}.pdf`);
    } catch (error) {
      console.error("PDF Generation Failure:", error);
      setPdfError(`PDF generation failed: ${error.message}`);
    }
  };

  const handleSectionChange = (e) => {
    setSelectedSection(e.target.value);
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-xl">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800">All Customers Summary</h2>
        <div className="flex items-center space-x-4">
          {pdfError && (
            <span className="text-red-500 text-sm">{pdfError}</span>
          )}
          <select
            value={selectedSection}
            onChange={handleSectionChange}
            className="px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Sections</option>
            <option value="Mechanical">Mechanical</option>
            <option value="BodyShop">BodyShop</option>
            <option value="Electrical">Electrical</option>
            <option value="Appointments">Appointments</option>
          </select>
          <button
            onClick={handleDownloadPDF}
            disabled={filteredUsers.length === 0 || loading}
            className={`px-4 py-2 rounded-lg shadow transition-colors ${
              filteredUsers.length === 0 || loading
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
          >
            Download PDF
          </button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border border-gray-300">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="border px-4 py-2 text-left">Customer Name</th>
              <th className="border px-4 py-2 text-left">Display ID</th>
              <th className="border px-4 py-2 text-left">Contact</th>
              <th className="border px-4 py-2 text-left">Vehicle Number</th>
              <th className="border px-4 py-2 text-left">Service Date</th>
              <th className="border px-4 py-2 text-left">Section</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="6" className="text-center py-4 text-gray-500">
                  Loading data...
                </td>
              </tr>
            ) : filteredUsers.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-4 text-gray-500">
                  No data found {selectedSection !== 'all' ? `for ${selectedSection}` : ''}
                </td>
              </tr>
            ) : (
              filteredUsers.map((user, idx) => (
                <tr key={idx} className="hover:bg-gray-50">
                  <td className="border px-4 py-2">{user.customerName}</td>
                  <td className="border px-4 py-2">{user.displayID}</td>
                  <td className="border px-4 py-2">{user.contact}</td>
                  <td className="border px-4 py-2">{user.vehicleNumber}</td>
                  <td className="border px-4 py-2">{user.serviceDate}</td>
                  <td className="border px-4 py-2">{user.section}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserTable;