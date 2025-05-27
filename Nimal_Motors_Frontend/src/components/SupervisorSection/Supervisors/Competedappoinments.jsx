//Can see invoices of completed appointments

import React, { useEffect, useState } from "react";
import axios from "axios";
import InvoiceForm from "../InvoiceForm";

const Completedappoinments = () => {
  const [invoices, setInvoices] = useState([]);
  const [showInvoice, setShowInvoice] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  useEffect(() => {
    fetchInvoices();
  }, []);

  const fetchInvoices = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5001/api/appointments/"
      );
      const completed = response.data.filter(
        (app) => app.status === "Complete"
      );
      setInvoices(completed);
    } catch (error) {
      console.error("Error fetching invoices:", error);
    }
  };

  const handleViewInvoice = (invoice) => {
    setSelectedInvoice(invoice);
    setShowInvoice(true);
  };

  const handleCancelInvoice = () => {
    setSelectedInvoice(null);
    setShowInvoice(false);
  };

  const handleSubmitInvoice = (invoiceData) => {
    console.log("Submitted invoice:", invoiceData);
    setShowInvoice(false);
  };

  const handleDelete = async (serviceID) => {
    if (window.confirm("Are you sure you want to delete this invoice?")) {
      try {
        await axios.delete(
          `http://localhost:5001/api/appointments/${serviceID}`
        );

        setInvoices((prev) =>
          prev.filter((inv) => inv.serviceID !== serviceID)
        );
      } catch (error) {
        console.error("Error deleting invoice:", error);
        alert("Failed to delete invoice.");
      }
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Invoices</h2>
      <table className="min-w-full table-auto border">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-3 py-2">Service ID</th>
            <th className="border px-3 py-2">Customer Name</th>
            <th className="border px-3 py-2">Vehicle No</th>
            <th className="border px-3 py-2">Contact No</th>
            <th className="border px-3 py-2">Service Date</th>
            <th className="border px-3 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {invoices.map((invoice) => (
            <tr key={invoice._id} className="text-center">
              <td className="px-4 py-2 border">{invoice.displayID}</td>
              <td className="px-4 py-2 border">{invoice.customerName}</td>
              <td className="px-4 py-2 border">{invoice.vehicleNumber}</td>
              <td className="px-4 py-2 border">{invoice.contact.phone}</td>
              <td className="px-4 py-2 border">
                {new Date(invoice.serviceDate).toLocaleDateString()}
              </td>
              <td className="px-4 py-2 border space-x-2">
                <button
                  onClick={() => handleViewInvoice(invoice)}
                  className="bg-blue-500 text-white px-3 py-1 rounded"
                >
                  View Invoice
                </button>
                <button
                  onClick={() => handleDelete(invoice.serviceID)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showInvoice && selectedInvoice && (
        <div className="mt-6 border p-4 bg-gray-50 rounded">
          <InvoiceForm
            initialData={selectedInvoice}
            onSubmit={handleSubmitInvoice}
            onCancel={handleCancelInvoice}
          />
        </div>
      )}
    </div>
  );
};

export default Completedappoinments;
