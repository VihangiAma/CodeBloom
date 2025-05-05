//Admin can view service invoice


import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminInvoiceView = () => {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/service-invoices'); // Adjust API URL if needed
        setInvoices(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch invoices');
        setLoading(false);
      }
    };

    fetchInvoices();
  }, []);

  // Highlight based on invoice status
  const highlightInvoice = (status) => {
    switch (status) {
      case 'approved':
        return 'green';
      case 'pending':
        return 'yellow';
      case 'rejected':
        return 'red';
      default:
        return 'white';
    }
  };

  return (
    <div className="admin-invoice-view">
      <h1>Admin Invoice Management</h1>

      {loading && <p>Loading invoices...</p>}
      {error && <p>{error}</p>}

      <div className="invoice-list">
        {invoices.map((invoice) => (
          <div
            key={invoice._id}
            className="invoice-card"
            style={{
              backgroundColor: highlightInvoice(invoice.status),
            }}
          >
            <h3>Invoice ID: {invoice.displayID}</h3>
            <p>Customer: {invoice.customerName}</p>
            <p>Status: {invoice.status}</p>
            <p>Total Amount: ${invoice.amount}</p>
            <button>View Details</button> {/* You can add more functionality */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminInvoiceView;
