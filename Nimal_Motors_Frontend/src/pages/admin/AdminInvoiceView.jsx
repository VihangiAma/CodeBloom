// //Admin can view service invoice

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const AdminInvoiceView = () => {
//   const [invoices, setInvoices] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     const fetchInvoices = async () => {
//       try {
//         const response = await axios.get('http://localhost:5001/api/service-invoices'); // Adjust API URL if needed
//         setInvoices(response.data);
//         setLoading(false);
//       } catch (err) {
//         setError('Failed to fetch invoices');
//         setLoading(false);
//       }
//     };

//     fetchInvoices();
//   }, []);

//   // Highlight based on invoice status
//   const highlightInvoice = (status) => {
//     switch (status) {
//       case 'approved':
//         return 'green';
//       case 'pending':
//         return 'yellow';
//       case 'rejected':
//         return 'red';
//       default:
//         return 'white';
//     }
//   };

//   return (
//     <div className="admin-invoice-view">
//       <h1>Admin Invoice Management</h1>

//       {loading && <p>Loading invoices...</p>}
//       {error && <p>{error}</p>}

//       <div className="invoice-list">
//         {invoices.map((invoice) => (
//           <div
//             key={invoice._id}
//             className="invoice-card"
//             style={{
//               backgroundColor: highlightInvoice(invoice.status),
//             }}
//           >
//             <h3>Invoice ID: {invoice.displayID}</h3>
//             <p>Customer: {invoice.customerName}</p>
//             <p>Status: {invoice.status}</p>
//             <p>Total Amount: ${invoice.amount}</p>
//             <button>View Details</button> {/* You can add more functionality */}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default AdminInvoiceView;

import React, { useState, useEffect } from "react";
import axios from "axios";

const AdminInvoiceView = () => {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5001/api/service-invoices"
        );
        setInvoices(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch invoices");
        setLoading(false);
      }
    };

    fetchInvoices();
  }, []);

  const highlightRow = (status) => {
    switch (status) {
      case "approved":
        return "bg-green-100";
      case "pending":
        return "bg-yellow-100";
      case "rejected":
        return "bg-red-100";
      default:
        return "";
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Invoice Management</h1>
      <h2 className="text-xl mb-4">Service Invoices</h2>

      {loading && <p>Loading invoices...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {!loading && invoices.length > 0 && (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr className="bg-gray-200 text-left">
                <th className="p-3 border">Invoice ID</th>
                <th className="p-3 border">Customer</th>
                <th className="p-3 border">Vehical No</th>
                <th className="p-3 border">Total Amount</th>
                <th className="p-3 border">Action</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((invoice) => (
                <tr
                  key={invoice._id}
                  className={`${highlightRow(invoice.status)} border-b`}
                >
                  <td className="p-3 border">{invoice.serviceID}</td>
                  <td className="p-3 border">{invoice.customerName}</td>
                  <td className="p-3 border capitalize">
                    {invoice.vehicleNumber}
                  </td>
                  <td className="p-3 border">${invoice.totalCost}</td>
                  <td className="p-3 border">
                    <button className="text-blue-600 hover:underline">
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {!loading && invoices.length === 0 && (
        <p className="text-gray-600">No invoices found.</p>
      )}

      <div className="mt-6">
        <h2 className="text-xl mb-4">Mechanical Invoice</h2>
        mechanical invoice comming soon..........
      </div>

      <div className="mt-6">
        <h2 className="text-xl mb-4">Electrical Invoice</h2>
        Electrical invoice comming soon............
      </div>

      <div className="mt-6">
        <h2 className="text-xl mb-4">Bodyshop Invoice</h2>
        Bodyshop invoice comming soon...........
      </div>
    </div>
  );
};

export default AdminInvoiceView;
