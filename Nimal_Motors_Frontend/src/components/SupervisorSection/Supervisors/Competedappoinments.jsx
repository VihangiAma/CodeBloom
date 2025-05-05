import React, { useEffect, useState } from "react";
import axios from "axios";
import ServiceInvoice from "./ServiceInvoice";

const Completedappoinments = () => {
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const response = await axios.get("http://localhost:5001/api/appointments/");
        const completed = response.data.filter(app => app.status === "Complete");
        setInvoices(completed);
      } catch (error) {
        console.error("Error fetching invoices:", error);
      }
    };

    fetchInvoices();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Invoices</h2>
      <table className="min-w-full table-auto border">
        <thead>
          <tr className="bg-gray-200">
          <th className="border px-3 py-2">Service ID</th>
                <th className="border px-3 py-2">Customer Name</th>
                <th className="border px-3 py-2">Vehicle No</th>
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
              <td className="px-4 py-2 border">{new Date(invoice.date).toLocaleDateString()}</td>
                <td className="px-4 py-2 border">
                    <button
                    onClick={() => {
                      // Open the ServiceInvoice component with the selected invoice
                      <ServiceInvoice invoice={invoice} />;
                    }}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                    >
                    View Invoice
                    </button>
                </td>
            </tr>
              
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Completedappoinments;
