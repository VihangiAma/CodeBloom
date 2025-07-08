// //Can see invoices of completed appointments

// import React, { useEffect, useState } from "react";
// import { AiOutlinePlus, AiOutlineEye } from "react-icons/ai";
// import { FaTrash } from "react-icons/fa";

// import axios from "axios";
// import InvoiceForm from "../InvoiceForm";

// const Completedappoinments = () => {
//   const [invoices, setInvoices] = useState([]);
//   const [showInvoice, setShowInvoice] = useState(false);
//   const [selectedInvoice, setSelectedInvoice] = useState(null);

//   useEffect(() => {
//     fetchInvoices();
//   }, []);

//   const fetchInvoices = async () => {
//     try {
//       const response = await axios.get(
//         "http://localhost:5001/api/appointments/"
//       );
//       const completed = response.data.filter(
//         (app) => app.status === "Complete"
//       );
//       setInvoices(completed);
//     } catch (error) {
//       console.error("Error fetching invoices:", error);
//     }
//   };

//   const handleViewInvoice = (invoice) => {
//     setSelectedInvoice(invoice);
//     setShowInvoice(true);
//   };

//   const handleCancelInvoice = () => {
//     setSelectedInvoice(null);
//     setShowInvoice(false);
//   };

//   const handleSubmitInvoice = (invoiceData) => {
//     console.log("Submitted invoice:", invoiceData);
//     setShowInvoice(false);
//   };

//   const handleDelete = async (serviceID) => {
//     if (window.confirm("Are you sure you want to delete this invoice?")) {
//       try {
//         await axios.delete(
//           `http://localhost:5001/api/appointments/${serviceID}`
//         );

//         setInvoices((prev) =>
//           prev.filter((inv) => inv.serviceID !== serviceID)
//         );
//       } catch (error) {
//         console.error("Error deleting invoice:", error);
//         alert("Failed to delete invoice.");
//       }
//     }
//   };

//   return (
//     <div className="p-6">
//       <h2 className="text-2xl font-bold mb-4">Invoices</h2>
//       <table className="min-w-full table-auto border">
//         <thead>
//           <tr className="bg-gray-200">
//             <th className="border px-3 py-2">Service ID</th>
//             <th className="border px-3 py-2">Customer Name</th>
//             <th className="border px-3 py-2">Vehicle No</th>
//             <th className="border px-3 py-2">Contact No</th>
//             <th className="border px-3 py-2">Service Date</th>
//             <th className="border px-3 py-2">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {invoices.map((invoice) => (
//             <tr key={invoice._id} className="text-center">
//               <td className="px-4 py-2 border">{invoice.displayID}</td>
//               <td className="px-4 py-2 border">{invoice.customerName}</td>
//               <td className="px-4 py-2 border">{invoice.vehicleNumber}</td>
//               <td className="px-4 py-2 border">{invoice.contact.phone}</td>
//               <td className="px-4 py-2 border">
//                 {new Date(invoice.serviceDate).toLocaleDateString()}
//               </td>
//               <td className="px-4 py-2 border space-x-2">
//                 <button
//                   onClick={() => handleViewInvoice(invoice)}
//                   className="bg-blue-500 text-white px-3 py-1 rounded "
//                 >
//                   <AiOutlinePlus />
//                 </button>

//                 <button
//                   onClick={() => handleDelete(invoice.serviceID)}
//                   className="bg-red-500 text-white px-3 py-1 rounded"
//                 >
//                   <FaTrash />
//                 </button>

//                 <button
//                   onClick={() => handleViewInvoice(invoice)}
//                   className="bg-green-500 text-white px-3 py-1 rounded "
//                 >
//                   <AiOutlineEye />
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {showInvoice && selectedInvoice && (
//         <div className="mt-6 border p-4 bg-gray-50 rounded">
//           <InvoiceForm
//             initialData={selectedInvoice}
//             onSubmit={handleSubmitInvoice}
//             onCancel={handleCancelInvoice}
//           />
//         </div>
//       )}
//     </div>
//   );
// };

// export default Completedappoinments;

import React, { useEffect, useState } from "react";
import { AiOutlinePlus, AiOutlineEye } from "react-icons/ai";
import { FaTrash } from "react-icons/fa";

import axios from "axios";
import InvoiceForm from "../InvoiceForm";

const Completedappoinments = () => {
  const [invoices, setInvoices] = useState([]);
  const [showInvoice, setShowInvoice] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [pendingInvoices, setPendingInvoices] = useState([]);
  const [section, setSection] = useState("service"); // ✅ adjust based on current user section if needed

  useEffect(() => {
    fetchInvoices();
    fetchPendingInvoices();
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
    fetchPendingInvoices(); // refresh after submitting
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

      <table className="min-w-full table-auto border mb-8">
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
                  className="bg-blue-500 text-white px-3 py-1 rounded "
                >
                  <AiOutlinePlus />
                </button>

                <button
                  onClick={() => handleDelete(invoice.serviceID)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  <FaTrash />
                </button>

                <button
                  onClick={() => handleViewInvoice(invoice)}
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
            initialData={selectedInvoice}
            onSubmit={handleSubmitInvoice}
            onCancel={handleCancelInvoice}
          />
        </div>
      )}

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
                <tr key={invoice._id} className="hover:bg-gray-50 text-center">
                  <td className="border px-3 py-2">{invoice.serviceID}</td>
                  <td className="border px-3 py-2">{invoice.customerName}</td>
                  <td className="border px-3 py-2">{invoice.vehicleNumber}</td>
                  <td className="border px-3 py-2">
                    {invoice.adminRemarks || "N/A"}
                  </td>
                  <td className="border px-3 py-2">
                    <button
                      // onClick={() => handleViewInvoice(appointment)}
                      className=" px-3 py-2 text-yellow-600 font-medium"
                    >
                      Not Approved
                    </button>
                    <button
                      onClick={() => handleDelete()}
                      className="bg-blue-500 text-white px-3 py-1 rounded"
                    >
                      <AiOutlinePlus />
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

export default Completedappoinments;
