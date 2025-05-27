import React, { useState, useEffect } from "react";

const AdminInvoicePage = () => {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5001/api/invoice")
      .then((res) => res.json())
      .then((data) => {
        // Transform data if needed to match table structure
        const formattedData = data.map(invoice => ({
          ...invoice,
          totalCost: invoice.totalCost || 0,
          adminRemarks: invoice.adminRemarks || "N/A"
        }));
        setInvoices(formattedData);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching invoices:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading invoices...</div>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">All Invoices</h2>
      {invoices.length === 0 ? (
        <p>No invoices found.</p>
      ) : (
        <table className="min-w-full border-collapse border">
          <thead>
            <tr>
              <th className="p-2 border">Service ID</th>
              <th className="p-2 border">Customer Name</th>
              <th className="p-2 border">Vehicle Number</th>
              <th className="p-2 border">Section</th>
              <th className="p-2 border">Total Cost</th>
              <th className="p-2 border">Admin Remarks</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((inv, idx) => (
              <tr key={idx}>
                <td className="p-2 border">{inv.serviceID}</td>
                <td className="p-2 border">{inv.customerName}</td>
                <td className="p-2 border">{inv.vehicleNumber}</td>
                <td className="p-2 border">{inv.section}</td>
                <td className="p-2 border">Rs. {inv.totalCost.toFixed(2)}</td>
                <td className="p-2 border">{inv.adminRemarks}</td>
                <td className="p-2 border">
                  <button 
                    className="text-blue-600"
                    onClick={() => {
                      // Add view details functionality
                      console.log('View invoice:', inv);
                    }}
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminInvoicePage;