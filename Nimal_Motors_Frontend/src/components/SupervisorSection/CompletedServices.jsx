import React, { useEffect, useState } from "react";
import { AiOutlinePlus, AiOutlineEye } from "react-icons/ai";
import { FaTrash } from "react-icons/fa";

import axios from "axios";
import InvoiceForm from "./InvoiceForm";

const CompletedServices = ({ sectionPrefix, section }) => {
  const [completedAppointments, setCompletedAppointments] = useState([]);
  const [selectedInvoice, setSelectedInvoice] = useState(null); // Store selected invoice
  const [showInvoice, setShowInvoice] = useState(false); // Control display of InvoicePage

  useEffect(() => {
    fetchCompletedAppointments();
  }, [section, sectionPrefix]);

  const fetchCompletedAppointments = async () => {
    try {
      const response = await axios.get(`http://localhost:5001/api/${section}`);
      const completed = response.data.filter(
        (appointment) =>
          appointment.status === "Completed" &&
          appointment.displayID.startsWith(sectionPrefix)
      );
      setCompletedAppointments(completed);
    } catch (error) {
      console.error("Error fetching completed appointments", error);
    }
  };

  const handleViewInvoice = (appointment) => {
    setSelectedInvoice(appointment); // Set the selected appointment as the invoice
    setShowInvoice(true); // Show InvoicePage
  };

  const handleCancelInvoice = () => {
    setSelectedInvoice(null);
    setShowInvoice(false); // Close InvoicePage
  };

  const handleSubmitInvoice = (invoiceData) => {
    console.log("Submitted invoice:", invoiceData);
    setShowInvoice(false); // Close InvoicePage after submission
  };

  return (
    <div className="p-4 bg-white shadow rounded-lg">
      <h2 className="text-xl font-semibold mb-4 capitalize">
        {section} - Completed Services
      </h2>
      {completedAppointments.length === 0 ? (
        <p className="text-gray-500">No completed services found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm border">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-3 py-2">Service ID</th>
                <th className="border px-3 py-2">Customer Name</th>
                <th className="border px-3 py-2">Vehicle No</th>
                <th className="border px-3 py-2">Contact</th>
                <th className="border px-3 py-2">Service Date</th>
                <th className="border px-3 py-2">Actions</th> {/* New Column */}
              </tr>
            </thead>
            <tbody>
              {completedAppointments.map((appointment) => (
                <tr key={appointment._id} className="hover:bg-gray-50">
                  <td className="border px-3 py-2">{appointment.displayID}</td>
                  <td className="border px-3 py-2">
                    {appointment.customerName}
                  </td>
                  <td className="border px-3 py-2">
                    {appointment.vehicleNumber}
                  </td>
                  <td className="border px-3 py-2">
                    {appointment.contact?.phone}
                  </td>
                  <td className="border px-3 py-2">
                    {new Date(appointment.serviceDate).toLocaleDateString()}
                  </td>
                  <td className="border px-3 py-2">
                    {/* <button
                      onClick={() => handleViewInvoice(appointment)} // Pass appointment data
                      className="bg-blue-500 text-white px-3 py-1 rounded"
                    >
                      Invoice
                    </button> */}
                    <button
                      onClick={() => handleViewInvoice(appointment)}
                      className="bg-blue-500 text-white px-3 py-1 rounded "
                    >
                      <AiOutlinePlus />
                    </button>

                    <button
                      onClick={() => handleDelete(appointment.serviceID)}
                      className="bg-red-500 text-white px-3 py-1 rounded"
                    >
                      <FaTrash />
                    </button>

                    <button
                      onClick={() => handleViewInvoice()}
                      className="bg-green-500 text-white px-3 py-1 rounded "
                    >
                      <AiOutlineEye />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {showInvoice && selectedInvoice && (
            <div className="mt-6 border p-4 bg-gray-50 rounded">
              <InvoiceForm
                initialData={selectedInvoice} // Pass selected invoice as data
                onSubmit={handleSubmitInvoice}
                onCancel={handleCancelInvoice}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CompletedServices;
