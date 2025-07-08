// import React, { useEffect, useState } from "react";
// import { AiOutlinePlus, AiOutlineEye } from "react-icons/ai";
// import { FaTrash } from "react-icons/fa";

// import axios from "axios";
// import InvoiceForm from "./InvoiceForm";

// const CompletedServices = ({ sectionPrefix, section }) => {
//   const [completedAppointments, setCompletedAppointments] = useState([]);
//   const [selectedInvoice, setSelectedInvoice] = useState(null); // Store selected invoice
//   const [showInvoice, setShowInvoice] = useState(false); // Control display of InvoicePage

//   useEffect(() => {
//     fetchCompletedAppointments();
//   }, [section, sectionPrefix]);

//   const fetchCompletedAppointments = async () => {
//     try {
//       const response = await axios.get(`http://localhost:5001/api/${section}`);
//       const completed = response.data.filter(
//         (appointment) =>
//           appointment.status === "Completed" &&
//           appointment.displayID.startsWith(sectionPrefix)
//       );
//       setCompletedAppointments(completed);
//     } catch (error) {
//       console.error("Error fetching completed appointments", error);
//     }
//   };
//   //**
//   const handleViewInvoice = (appointment) => {
//     setSelectedInvoice(appointment);
//     setShowInvoice(true);
//   };
//   const handleSubmitInvoice = async (invoiceData) => {
//     try {
//       await axios.post(`http://localhost:5001/api/invoices`, invoiceData);
//       setShowInvoice(false);
//       setSelectedInvoice(null);
//       fetchCompletedAppointments(); // Refresh completed appointments
//     } catch (error) {
//       console.error("Error submitting invoice", error);
//     }
//   };
//   const handleCancelInvoice = () => {
//     setShowInvoice(false);
//     setSelectedInvoice(null);
//   };
//   const handleDelete = async (appointmentId) => {
//     try {
//       await axios.delete(
//         `http://localhost:5001/api/${section}/${appointmentId}`
//       );
//       setCompletedAppointments((prev) =>
//         prev.filter((appointment) => appointment._id !== appointmentId)
//       );
//     } catch (error) {
//       console.error("Error deleting appointment", error);
//     }
//   };

//   return (
//     <div className="p-4 bg-white shadow rounded-lg">
//       <h2 className="text-xl font-semibold mb-4 capitalize">
//         {section} - Completed Services
//       </h2>
//       {completedAppointments.length === 0 ? (
//         <p className="text-gray-500">No completed services found.</p>
//       ) : (
//         <div className="overflow-x-auto">
//           <table className="min-w-full text-sm border">
//             <thead className="bg-gray-100">
//               <tr>
//                 <th className="border px-3 py-2">Service ID</th>
//                 <th className="border px-3 py-2">Customer Name</th>
//                 <th className="border px-3 py-2">Vehicle No</th>
//                 <th className="border px-3 py-2">Contact</th>
//                 <th className="border px-3 py-2">Service Date</th>
//                 <th className="border px-3 py-2">Actions</th> {/* New Column */}
//               </tr>
//             </thead>
//             <tbody>
//               {completedAppointments.map((appointment) => (
//                 <tr key={appointment._id} className="hover:bg-gray-50">
//                   <td className="border px-3 py-2">{appointment.displayID}</td>
//                   <td className="border px-3 py-2">
//                     {appointment.customerName}
//                   </td>
//                   <td className="border px-3 py-2">
//                     {appointment.vehicleNumber}
//                   </td>
//                   <td className="border px-3 py-2">
//                     {appointment.contact?.phone}
//                   </td>
//                   <td className="border px-3 py-2">
//                     {new Date(appointment.serviceDate).toLocaleDateString()}
//                   </td>
//                   <td className="px-4 py-2 border space-x-2">
//                     <button
//                       onClick={() => handleViewInvoice(appointment)}
//                       className="bg-blue-500 text-white px-3 py-1 rounded "
//                     >
//                       <AiOutlinePlus />
//                     </button>

//                     <button
//                       onClick={() => handleDelete(appointment._id)}
//                       className="bg-red-500 text-white px-3 py-1 rounded"
//                     >
//                       <FaTrash />
//                     </button>

//                     {/* <button
//                       onClick={() => handleViewInvoice(appointment)}
//                       className="bg-green-500 text-white px-3 py-1 rounded "
//                     >
//                       <AiOutlineEye />
//                     </button> */}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>

//           {showInvoice && selectedInvoice && (
//             <div className="mt-6 border p-4 bg-gray-50 rounded">
//               <InvoiceForm
//                 initialData={selectedInvoice} // Pass selected invoice as data
//                 onSubmit={handleSubmitInvoice}
//                 onCancel={handleCancelInvoice}
//               />
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default CompletedServices;
import React, { useEffect, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { FaTrash } from "react-icons/fa";

import axios from "axios";
import InvoiceForm from "./InvoiceForm";

const CompletedServices = ({ sectionPrefix, section }) => {
  const [completedAppointments, setCompletedAppointments] = useState([]);
  const [pendingInvoices, setPendingInvoices] = useState([]);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [showInvoice, setShowInvoice] = useState(false);

  useEffect(() => {
    fetchCompletedAppointments();
    fetchPendingInvoices();
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

  const fetchPendingInvoices = async () => {
    try {
      const response = await axios.get(`http://localhost:5001/api/invoice`);
      const pending = response.data.filter(
        (invoice) => invoice.isApproved === false && invoice.section === section
      );
      setPendingInvoices(pending);
    } catch (error) {
      console.error("Error fetching pending invoices", error);
    }
  };

  const handleViewInvoice = (appointment) => {
    setSelectedInvoice(appointment);
    setShowInvoice(true);
  };

  const handleSubmitInvoice = async (invoiceData) => {
    try {
      await axios.post(`http://localhost:5001/api/invoices`, invoiceData);
      setShowInvoice(false);
      setSelectedInvoice(null);
      fetchCompletedAppointments();
      fetchPendingInvoices();
    } catch (error) {
      console.error("Error submitting invoice", error);
    }
  };

  const handleCancelInvoice = () => {
    setShowInvoice(false);
    setSelectedInvoice(null);
  };

  const handleDelete = async (appointmentId) => {
    try {
      await axios.delete(
        `http://localhost:5001/api/${section}/${appointmentId}`
      );
      setCompletedAppointments((prev) =>
        prev.filter((appointment) => appointment._id !== appointmentId)
      );
    } catch (error) {
      console.error("Error deleting appointment", error);
    }
  };

  return (
    <div className="p-4 bg-white shadow rounded-lg">
      {/* Top Table - Completed Appointments */}
      <h2 className="text-xl font-semibold mb-4 capitalize">
        {section} - Completed Services
      </h2>
      {completedAppointments.length === 0 ? (
        <p className="text-gray-500">No completed services found.</p>
      ) : (
        <div className="overflow-x-auto mb-8">
          <table className="min-w-full text-sm border">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-3 py-2">Service ID</th>
                <th className="border px-3 py-2">Customer Name</th>
                <th className="border px-3 py-2">Vehicle No</th>
                <th className="border px-3 py-2">Contact</th>
                <th className="border px-3 py-2">Service Date</th>
                <th className="border px-3 py-2">Actions</th>
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
                  <td className="px-4 py-2 border space-x-2">
                    <button
                      onClick={() => handleViewInvoice(appointment)}
                      className="bg-blue-500 text-white px-3 py-1 rounded"
                    >
                      <AiOutlinePlus />
                    </button>
                    <button
                      onClick={() => handleDelete(appointment._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded"
                    >
                      <FaTrash />
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
      )}

      {/* Bottom Table - Pending Invoices */}
      <h2 className="text-xl font-semibold mb-4 capitalize">
        {section} - Pending Invoices
      </h2>
      {pendingInvoices.length === 0 ? (
        <p className="text-gray-500">No pending invoices found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm border">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-3 py-2">Invoice ID</th>
                <th className="border px-3 py-2">Customer Name</th>
                <th className="border px-3 py-2">Vehicle No</th>
                <th className="border px-3 py-2">Admin Remark</th>
                <th className="border px-3 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {pendingInvoices.map((invoice) => (
                <tr key={invoice._id} className="hover:bg-gray-50">
                  <td className="border px-3 py-2">{invoice.serviceID}</td>
                  <td className="border px-3 py-2">{invoice.customerName}</td>
                  <td className="border px-3 py-2">{invoice.vehicleNumber}</td>
                  <td className="border px-3 py-2">
                    {invoice.adminRemarks || "N/A"}
                  </td>
                  <td className="border px-3 py-2 text-yellow-600 font-medium">
                    Not Approved
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

export default CompletedServices;
