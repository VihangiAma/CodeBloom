import React, { useState, useEffect } from "react";
import RemarkAdd from "./RemarkAdd";

const AdminInvoiceView = () => {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [isViewingInvoice, setIsViewingInvoice] = useState(false);
  const [selectedSection, setSelectedSection] = useState("all");
  const [availableSections, setAvailableSections] = useState([]);

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const response = await fetch("http://localhost:5001/api/invoice");
        const data = await response.json();
        
        const formattedData = data.map(invoice => ({
          ...invoice,
          totalCost: invoice.totalCost || 0,
          adminRemarks: invoice.adminRemarks || "N/A",
          description: invoice.description || "N/A",
          vehicleNumber: invoice.vehicleNumber || "N/A",
          vehicleType: invoice.vehicleType || "N/A",
          repairCost: invoice.repairCost || 0,
          section: invoice.section || "N/A"
        }));

        // Extract unique sections for filter dropdown
        const sections = [...new Set(data.map(inv => inv.section || "N/A"))];
        setAvailableSections(sections);
        
        setInvoices(formattedData);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching invoices:", err);
        setLoading(false);
      }
    };

    fetchInvoices();
  }, []);

  const handleUpdateInvoice = (updatedInvoice) => {
    setInvoices(invoices.map(inv => 
      inv.serviceID === updatedInvoice.serviceID ? updatedInvoice : inv
    ));
    setIsViewingInvoice(false);
  };

  const handleViewInvoice = (invoice) => {
    console.log("Viewing invoice:", invoice);
    setSelectedInvoice(invoice);
    setIsViewingInvoice(true);
  };

  const handleBackToList = () => {
    setIsViewingInvoice(false);
    setSelectedInvoice(null);
  };

  const handleSectionChange = (e) => {
    setSelectedSection(e.target.value);
  };

  // Filter invoices by selected section
  const filteredInvoices = selectedSection === "all" 
    ? invoices 
    : invoices.filter(invoice => invoice.section === selectedSection);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-xl">Loading invoices...</div>
      </div>
    );
  }

  if (isViewingInvoice && selectedInvoice) {
    return (
      <div className="p-4">
        <RemarkAdd 
          invoice={selectedInvoice}
          onCancel={handleBackToList}
          onSubmit={handleUpdateInvoice}
        />
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">All Invoices</h2>
        <div className="flex items-center">
          <label htmlFor="section-filter" className="mr-2 font-medium">Filter by Section:</label>
          <select
            id="section-filter"
            value={selectedSection}
            onChange={handleSectionChange}
            className="border border-gray-300 rounded px-3 py-1"
          >
            <option value="all">All Sections</option>
            {availableSections.map((section, index) => (
              <option key={index} value={section}>{section}</option>
            ))}
          </select>
        </div>
      </div>
      
      {filteredInvoices.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500 text-lg">No invoices found{selectedSection !== "all" ? ` for section ${selectedSection}` : ""}.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 border border-gray-300">Service ID</th>
                <th className="p-3 border border-gray-300">Customer Name</th>
                <th className="p-3 border border-gray-300">Vehicle Number</th>
                <th className="p-3 border border-gray-300">Vehicle Type</th>
                <th className="p-3 border border-gray-300">Section</th>
                <th className="p-3 border border-gray-300">Description</th>
                <th className="p-3 border border-gray-300">Repair Cost</th>
                <th className="p-3 border border-gray-300">Total Cost</th>
                <th className="p-3 border border-gray-300">Admin Remarks</th>
                <th className="p-3 border border-gray-300">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredInvoices.map((invoice, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="p-3 border border-gray-300">{invoice.serviceID}</td>
                  <td className="p-3 border border-gray-300">{invoice.customerName}</td>
                  <td className="p-3 border border-gray-300">{invoice.vehicleNumber}</td>
                  <td className="p-3 border border-gray-300">{invoice.vehicleType}</td>
                  <td className="p-3 border border-gray-300">{invoice.section}</td>
                  <td className="p-3 border border-gray-300">{invoice.description}</td>
                  <td className="p-3 border border-gray-300">Rs. {invoice.repairCost.toFixed(2)}</td>
                  <td className="p-3 border border-gray-300">Rs. {invoice.totalCost.toFixed(2)}</td>
                  <td className="p-3 border border-gray-300">{invoice.adminRemarks}</td>
                  <td className="p-3 border border-gray-300">
                    <button
                      onClick={() => handleViewInvoice(invoice)}
                      className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminInvoiceView;