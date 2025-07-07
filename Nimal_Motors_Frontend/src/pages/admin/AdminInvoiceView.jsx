import React, { useState, useEffect } from "react";
import RemarkAdd from "./RemarkAdd";

const AdminInvoiceView = () => {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [isViewingInvoice, setIsViewingInvoice] = useState(false);

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const response = await fetch("http://localhost:5001/api/invoice");
        const data = await response.json();
        
        const formattedData = data.map(invoice => ({
          ...invoice,
          totalCost: invoice.totalCost || 0,
          adminRemarks: invoice.adminRemarks || "N/A",
          description: invoice.description || "N/A" // Added description field
        }));
        
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
        <button 
          onClick={handleBackToList}
          className="mb-4 px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
        >
          ← Back to Invoices
        </button>
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
      <h2 className="text-2xl font-bold mb-4">All Invoices</h2>
      
      {invoices.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500 text-lg">No invoices found.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 border border-gray-300">Service ID</th>
                <th className="p-3 border border-gray-300">Customer Name</th>
                <th className="p-3 border border-gray-300">Section</th>
                <th className="p-3 border border-gray-300">Description</th>
                <th className="p-3 border border-gray-300">Total Cost</th>
                <th className="p-3 border border-gray-300">Admin Remarks</th>
                <th className="p-3 border border-gray-300">Actions</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((invoice, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="p-3 border border-gray-300">{invoice.serviceID}</td>
                  <td className="p-3 border border-gray-300">{invoice.customerName}</td>
                  <td className="p-3 border border-gray-300">{invoice.section}</td>
                  <td className="p-3 border border-gray-300">{invoice.description}</td>
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