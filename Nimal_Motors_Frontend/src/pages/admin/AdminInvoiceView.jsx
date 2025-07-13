// import React, { useState, useEffect } from "react";
// import RemarkAdd from "./RemarkAdd";
// import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

// const AdminInvoiceView = () => {
//   const [invoices, setInvoices] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [selectedInvoice, setSelectedInvoice] = useState(null);
//   const [isViewingInvoice, setIsViewingInvoice] = useState(false);
//   const [selectedSection, setSelectedSection] = useState("all");
//   const [availableSections] = useState([
//     { value: "MS", label: "Mechanical Section" },
//     { value: "BS", label: "Bodyshop Section" },
//     { value: "ES", label: "Electrical Section" },
//     { value: "SS", label: "Vehicle Service Section" },
//     { value: "INV", label: "Re-sent Invoices" }
//   ]);

//   useEffect(() => {
//     const fetchInvoices = async () => {
//       try {
//         const response = await fetch("http://localhost:5001/api/invoice");
//         const data = await response.json();

//         const formattedData = data.map(invoice => ({
//           ...invoice,
//           totalCost: invoice.totalCost || 0,
//           adminRemarks: invoice.adminRemarks || "N/A",
//           description: invoice.description || "N/A",
//           vehicleNumber: invoice.vehicleNumber || "N/A",
//           vehicleType: invoice.vehicleType || "N/A",
//           repairCost: invoice.repairCost || 0
//         }));

//         setInvoices(formattedData);
//         setLoading(false);
//       } catch (err) {
//         console.error("Error fetching invoices:", err);
//         setLoading(false);
//       }
//     };

//     fetchInvoices();
//   }, []);

//   const handleUpdateInvoice = (updatedInvoice) => {
//     setInvoices(invoices.map(inv =>
//       inv.serviceID === updatedInvoice.serviceID ? updatedInvoice : inv
//     ));
//     setIsViewingInvoice(false);
//   };

//   const handleViewInvoice = (invoice) => {
//     console.log("Viewing invoice:", invoice);
//     setSelectedInvoice(invoice);
//     setIsViewingInvoice(true);
//   };

//   const handleBackToList = () => {
//     setIsViewingInvoice(false);
//     setSelectedInvoice(null);
//   };

//   const handleSectionChange = (e) => {
//     setSelectedSection(e.target.value);
//   };

//   // Separate regular invoices and INV-type invoices
//   const regularInvoices = invoices.filter(invoice => !invoice.serviceID.startsWith("INV"));
//   const invInvoices = invoices.filter(invoice => invoice.serviceID.startsWith("INV"));

//   // Filter invoices based on selection
//   const filteredRegularInvoices = selectedSection === "all"
//     ? regularInvoices
//     : selectedSection === "INV"
//       ? []
//       : regularInvoices.filter(invoice => invoice.serviceID.startsWith(selectedSection));

//   const filteredInvInvoices = selectedSection === "all" || selectedSection === "INV"
//     ? invInvoices
//     : [];

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-64">
//         <div className="text-xl">Loading invoices...</div>
//       </div>
//     );
//   }

//   if (isViewingInvoice && selectedInvoice) {
//     return (
//       <div className="p-4">
//         <RemarkAdd
//           invoice={selectedInvoice}
//           onCancel={handleBackToList}
//           onSubmit={handleUpdateInvoice}
//         />
//       </div>
//     );
//   }

//   const renderInvoiceTable = (invoices, title = null) => (
//     <div className="mb-8">
//       {title && <h3 className="text-xl font-semibold mb-4">{title}</h3>}
//       <div className="overflow-x-auto">
//         <table className="min-w-full border-collapse border border-gray-600">
//           <thead className="bg-gray-700">
//             <tr>
//               <th className="p-3 border bg-red-500 border-gray-300 text-white">Service ID</th>
//               <th className="p-3 border bg-red-500 border-gray-300 text-white">Customer Name</th>
//               <th className="p-3 border bg-red-500 border-gray-300 text-white">Vehicle Number</th>
//               <th className="p-3 border bg-red-500 border-gray-300 text-white">Description</th>
//               <th className="p-3 border bg-red-500 border-gray-300 text-white">Total Cost</th>
//               <th className="p-3 border bg-red-500 border-gray-300 text-white">Admin Remarks</th>
//               <th className="p-3 border bg-red-500 border-gray-300 text-white">Status</th>
//               <th className="p-3 border bg-red-500 border-gray-300 text-white">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {invoices.map((invoice, index) => (
//               <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
//                 <td className="p-3 border border-gray-300">{invoice.serviceID}</td>
//                 <td className="p-3 border border-gray-300">{invoice.customerName}</td>
//                 <td className="p-3 border border-gray-300">{invoice.vehicleNumber}</td>
//                 <td className="p-3 border border-gray-300">{invoice.description}</td>
//                 <td className="p-3 border border-gray-300">Rs. {invoice.totalCost.toFixed(2)}</td>
//                 <td className="p-3 border border-gray-300">{invoice.adminRemarks}</td>
//                 <td className="p-3 border border-gray-300 text-center">
//                   {invoice.adminRemarks !== "N/A" ? (
//                     <FaCheckCircle className="text-green-500 text-xl" title="Admin remark added" />
//                   ) : (
//                     <FaTimesCircle className="text-red-500 text-xl" title="Admin remark not added" />
//                   )}
//                 </td>
//                 <td className="p-3 border border-gray-300">
//                   <button
//                     onClick={() => handleViewInvoice(invoice)}
//                     className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200"
//                   >
//                     View
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );

//   return (
//     <div className="p-4">
//       <div className="flex justify-between items-center mb-4">
//         <h2 className="text-2xl font-bold">All Invoices</h2>
//         <div className="flex items-center">
//           <label htmlFor="section-filter" className="mr-2 font-medium">Filter by Section:</label>
//           <select
//             id="section-filter"
//             value={selectedSection}
//             onChange={handleSectionChange}
//             className="border border-gray-300 rounded px-3 py-1"
//           >
//             <option value="all">All Sections</option>
//             {availableSections.map((section, index) => (
//               <option key={index} value={section.value}>{section.label}</option>
//             ))}
//           </select>
//         </div>
//       </div>

//       {filteredRegularInvoices.length === 0 && filteredInvInvoices.length === 0 ? (
//         <div className="text-center py-8">
//           <p className="text-gray-500 text-lg">No invoices found{selectedSection !== "all" ? ` for selected section` : ""}.</p>
//         </div>
//       ) : (
//         <>
//           {filteredRegularInvoices.length > 0 && renderInvoiceTable(filteredRegularInvoices)}
//           {filteredInvInvoices.length > 0 && renderInvoiceTable(filteredInvInvoices, "Re-sent Invoices")}
//         </>
//       )}
//     </div>
//   );
// };

// export default AdminInvoiceView;
// components/AdminInvoiceView.jsx
import React, { useState, useEffect, useMemo } from "react";
import InvoiceTable from "./InvoiceTable";
import RemarkAdd from "./RemarkAdd";

const AdminInvoiceView = () => {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const res = await fetch("http://localhost:5001/api/invoice");
        const data = await res.json();
        setInvoices(data);
      } catch (err) {
        console.error("Failed to fetch invoices:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchInvoices();
  }, []);

  const deleteMany = async (ids) => {
    try {
      await fetch("http://localhost:5001/api/invoice/bulk", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ids }),
      });

      setInvoices((prev) => prev.filter((inv) => !ids.includes(inv._id)));
    } catch (err) {
      console.error("Bulk delete failed:", err);
    }
  };

  const handleViewInvoice = (invoice) => setSelectedInvoice(invoice);
  const handleUpdateInvoice = (updated) => {
    setInvoices((prev) =>
      prev.map((inv) => (inv._id === updated._id ? updated : inv))
    );
    setSelectedInvoice(null);
  };

  const handleCancel = () => setSelectedInvoice(null);

  const pending = useMemo(
    () => invoices.filter((i) => i.status === "pending"),
    [invoices]
  );
  const approved = useMemo(
    () =>
      invoices.filter((i) => i.status === "approved" && i.adminRemarks === ""),
    [invoices]
  );
  const rejected = useMemo(
    () => invoices.filter((i) => i.status === "rejected"),
    [invoices]
  );
  const resubmitted = useMemo(
    () =>
      invoices.filter((i) => i.status === "approved" && i.adminRemarks !== ""),
    [invoices]
  );

  if (loading) {
    return (
      <div className="text-center p-10 text-xl font-semibold text-gray-600">
        Loading invoices...
      </div>
    );
  }

  if (selectedInvoice) {
    return (
      <RemarkAdd
        invoice={selectedInvoice}
        onCancel={handleCancel}
        onSubmit={handleUpdateInvoice}
      />
    );
  }

  return (
    <div className="p-6 max-w-screen-xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-700">
        Invoice Management
      </h1>

      <InvoiceTable
        title="1. Pending – waiting for Admin review"
        rows={pending}
        onView={handleViewInvoice}
        onDeleteSelected={deleteMany}
      />

      <InvoiceTable
        title="2. Approved for Accountant"
        rows={approved}
        onView={handleViewInvoice}
        onDeleteSelected={deleteMany}
      />

      <InvoiceTable
        title="3. Rejected – with Admin remarks"
        rows={rejected}
        onView={handleViewInvoice}
        onDeleteSelected={deleteMany}
      />

      <InvoiceTable
        title="4. Resubmitted – after fixes"
        rows={resubmitted}
        onView={handleViewInvoice}
        onDeleteSelected={deleteMany}
      />
    </div>
  );
};

export default AdminInvoiceView;
