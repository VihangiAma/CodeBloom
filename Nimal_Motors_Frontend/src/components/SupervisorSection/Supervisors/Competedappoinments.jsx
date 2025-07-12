// import React, { useState, useEffect } from "react";
// import { AiOutlinePlus } from "react-icons/ai";
// import { FaTrash } from "react-icons/fa";
// import axios from "axios";
// import InvoiceForm from "../InvoiceForm";

// const Completedappoinments = () => {
//   /* ---------- state ---------- */
//   const [completed, setCompleted] = useState([]); // completed “service” appointments
//   const [pendingInvoices, setPendingInvoices] = useState([]); // invoices waiting for approval
//   const [showInvoice, setShowInvoice] = useState(false);
//   const [selectedInvoice, setSelectedInvoice] = useState(null);

//   /* ---------- constants ---------- */
//   // If your service invoices use a different prefix, change it here.
//   const SERVICE_PREFIX = "S";

//   /* ---------- effects ---------- */
//   useEffect(() => {
//     fetchCompletedServiceAppointments();
//     fetchPendingInvoices();
//   }, []);

//   /* ---------- data loaders ---------- */
//   const fetchCompletedServiceAppointments = async () => {
//     try {
//       const res = await axios.get("http://localhost:5001/api/appointments/");
//       const completedAppointments = res.data.filter(
//         (app) => app.status === "Complete"
//       );
//       setCompleted(completedAppointments);
//     } catch (err) {
//       console.error("Error fetching completed appointments:", err);
//     }
//   };

//   const fetchPendingInvoices = async () => {
//     try {
//       const res = await axios.get("http://localhost:5001/api/invoice", {
//         params: { isApproved: false },
//       });
//       const filtered = res.data.filter((inv) =>
//         inv.serviceID?.startsWith(SERVICE_PREFIX)
//       );
//       setPendingInvoices(filtered);
//     } catch (err) {
//       console.error("Error fetching pending invoices:", err);
//     }
//   };

//   /* ---------- invoice create / update ---------- */
//   const handleSubmitInvoice = async (invoice) => {
//     try {
//       if (invoice._id) {
//         await axios.put(
//           `http://localhost:5001/api/invoice/${invoice._id}`,
//           invoice
//         );
//       } else {
//         await axios.post("http://localhost:5001/api/invoice", invoice);
//       }
//       setShowInvoice(false);
//       setSelectedInvoice(null);
//       fetchCompletedServiceAppointments();
//       fetchPendingInvoices();
//     } catch (err) {
//       console.error("Error submitting invoice:", err);
//       alert("Failed to submit invoice.");
//     }
//   };

//   /* ---------- deletions ---------- */
//   const handleDeleteInvoice = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this invoice?"))
//       return;
//     try {
//       await axios.delete(`http://localhost:5001/api/invoice/${id}`);
//       setPendingInvoices((prev) => prev.filter((inv) => inv._id !== id));
//     } catch (err) {
//       console.error("Error deleting invoice:", err);
//       alert("Failed to delete invoice.");
//     }
//   };

//   /* ---------- render ---------- */
//   return (
//     <div className="p-6 bg-white shadow rounded-lg">
//       {/* completed appointments (service section) */}
//       <h2 className="text-2xl font-bold mb-4">
//         Completed Service Appointments
//       </h2>

//       {completed.length === 0 ? (
//         <p className="text-gray-500">
//           No completed service appointments found.
//         </p>
//       ) : (
//         <div className="overflow-x-auto mb-8">
//           <table className="min-w-full table-auto border">
//             <thead className="bg-gray-100">
//               <tr className="bg-gray-200 text-sm">
//                 <th className="border px-3 py-2">Service&nbsp;ID</th>
//                 <th className="border px-3 py-2">Customer</th>
//                 <th className="border px-3 py-2">Vehicle&nbsp;No</th>
//                 <th className="border px-3 py-2">Contact</th>
//                 <th className="border px-3 py-2">Service&nbsp;Date</th>
//                 <th className="border px-3 py-2">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {completed.map((app) => (
//                 <tr key={app._id} className="text-center text-sm">
//                   <td className="border px-3 py-2">
//                     {app.displayID || app.serviceID}
//                   </td>
//                   <td className="border px-3 py-2">{app.customerName}</td>
//                   <td className="border px-3 py-2">{app.vehicleNumber}</td>
//                   <td className="border px-3 py-2">
//                     {app.contact?.phone || "N/A"}
//                   </td>
//                   <td className="border px-3 py-2">
//                     {new Date(app.serviceDate).toLocaleDateString()}
//                   </td>
//                   <td className="border px-3 py-2">
//                     <button
//                       onClick={() => {
//                         setSelectedInvoice(app);
//                         setShowInvoice(true);
//                       }}
//                       className="bg-blue-500 text-white px-3 py-1 rounded"
//                       title="Create / Edit Invoice"
//                     >
//                       <AiOutlinePlus />
//                     </button>
//                     <button
//                       onClick={() => handleDeleteInvoice(app._id)}
//                       className="bg-red-500 text-white px-3 py-1 rounded ml-2"
//                       title="Delete Appointment"
//                     >
//                       <FaTrash />
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}

//       {/* invoice form modal / inline */}
//       {showInvoice && selectedInvoice && (
//         <div className="mb-10 border p-4 bg-gray-50 rounded">
//           <InvoiceForm
//             initialData={selectedInvoice}
//             onSubmit={handleSubmitInvoice}
//             onCancel={() => {
//               setSelectedInvoice(null);
//               setShowInvoice(false);
//             }}
//           />
//         </div>
//       )}

//       {/* pending invoices (service section) */}
//       <h2 className="text-xl font-semibold mb-4">
//         Pending Invoices &ndash; Service Section
//       </h2>

//       {pendingInvoices.length === 0 ? (
//         <p className="text-gray-500">No pending invoices found.</p>
//       ) : (
//         <div className="overflow-x-auto">
//           <table className="min-w-full border text-sm">
//             <thead className="bg-gray-100">
//               <tr>
//                 <th className="border px-3 py-2">Service&nbsp;</th>
//                 <th className="border px-3 py-2">Customer</th>
//                 <th className="border px-3 py-2">Vehicle&nbsp;No</th>
//                 <th className="border px-3 py-2">Admin&nbsp;Remark</th>
//                 <th className="border px-3 py-2">Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {pendingInvoices.map((inv) => (
//                 <tr key={inv._id} className="hover:bg-gray-50 text-center">
//                   <td className="border px-3 py-2">{inv.serviceID}</td>
//                   <td className="border px-3 py-2">{inv.customerName}</td>
//                   <td className="border px-3 py-2">{inv.vehicleNumber}</td>
//                   <td className="border px-3 py-2">
//                     {inv.adminRemarks || "—"}
//                   </td>
//                   <td className="border px-3 py-2 space-x-2">
//                     <button
//                       onClick={() => {
//                         setSelectedInvoice(inv);
//                         setShowInvoice(true);
//                       }}
//                       className="bg-green-500 text-white px-3 py-1 rounded"
//                       title="Edit Invoice"
//                     >
//                       <AiOutlinePlus />
//                     </button>
//                     <button
//                       onClick={() => handleDeleteInvoice(inv._id)}
//                       className="bg-red-500 text-white px-3 py-1 rounded"
//                       title="Delete Invoice"
//                     >
//                       <FaTrash />
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Completedappoinments;
import React, { useState, useEffect } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { FaTrash } from "react-icons/fa";
import axios from "axios";
import InvoiceForm from "../InvoiceForm";

/* ---------- helpers ---------- */
const STORAGE_KEY = "completedCheckedIds";
const loadChecked = () => JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
const saveChecked = (ids) =>
  localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));

const Completedappoinments = () => {
  /* ---------- state ---------- */
  const [completed, setCompleted] = useState([]);
  const [pendingInvoices, setPendingInvoices] = useState([]);
  const [showInvoice, setShowInvoice] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  // NEW: ids of rows whose checkbox is ticked
  const [checkedIds, setCheckedIds] = useState(loadChecked);

  /* ---------- constants ---------- */
  const SERVICE_PREFIX = "S";

  /* ---------- effects ---------- */
  useEffect(() => {
    fetchCompletedServiceAppointments();
    fetchPendingInvoices();
  }, []);

  /* ---------- data loaders ---------- */
  const fetchCompletedServiceAppointments = async () => {
    try {
      const res = await axios.get("http://localhost:5001/api/appointments/");
      const completedAppointments = res.data.filter(
        (app) => app.status === "Complete"
      );
      setCompleted(completedAppointments);
    } catch (err) {
      console.error("Error fetching completed appointments:", err);
    }
  };

  const fetchPendingInvoices = async () => {
    try {
      const res = await axios.get("http://localhost:5001/api/invoice", {
        params: { isApproved: false },
      });
      setPendingInvoices(
        res.data.filter((inv) => inv.serviceID?.startsWith(SERVICE_PREFIX))
      );
    } catch (err) {
      console.error("Error fetching pending invoices:", err);
    }
  };

  /* ---------- checkbox handling ---------- */
  const toggleChecked = (id) => {
    setCheckedIds((prev) => {
      const updated = prev.includes(id)
        ? prev.filter((x) => x !== id)
        : [...prev, id];
      saveChecked(updated); // persist immediately
      return updated;
    });
  };

  /* ---------- invoice create / update ---------- */
  const handleSubmitInvoice = async (invoice) => {
    try {
      if (invoice._id) {
        await axios.put(
          `http://localhost:5001/api/invoice/${invoice._id}`,
          invoice
        );
      } else {
        await axios.post("http://localhost:5001/api/invoice", invoice);
      }
      setShowInvoice(false);
      setSelectedInvoice(null);
      fetchCompletedServiceAppointments();
      fetchPendingInvoices();
    } catch (err) {
      console.error("Error submitting invoice:", err);
      alert("Failed to submit invoice.");
    }
  };

  /* ---------- deletions ---------- */
  const handleDeleteInvoice = async (id) => {
    if (!window.confirm("Are you sure you want to delete this invoice?"))
      return;
    try {
      await axios.delete(`http://localhost:5001/api/invoice/${id}`);
      setPendingInvoices((prev) => prev.filter((inv) => inv._id !== id));
    } catch (err) {
      console.error("Error deleting invoice:", err);
      alert("Failed to delete invoice.");
    }
  };

  /* ---------- render ---------- */
  return (
    <div className="p-6 bg-white shadow rounded-lg">
      {/* completed appointments (service section) */}
      <h2 className="text-2xl font-bold mb-4">
        Completed Service Appointments
      </h2>

      {completed.length === 0 ? (
        <p className="text-gray-500">
          No completed service appointments found.
        </p>
      ) : (
        <div className="overflow-x-auto mb-8">
          <table className="min-w-full table-auto border">
            <thead className="bg-gray-100">
              <tr className="bg-gray-200 text-sm">
                {/* ✨ new column */}
                <th className="border px-3 py-2 w-8">✔</th>
                <th className="border px-3 py-2">Service&nbsp;ID</th>
                <th className="border px-3 py-2">Customer</th>
                <th className="border px-3 py-2">Vehicle&nbsp;No</th>
                <th className="border px-3 py-2">Contact</th>
                <th className="border px-3 py-2">Service&nbsp;Date</th>
                <th className="border px-3 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {completed.map((app) => (
                <tr key={app._id} className="text-center text-sm">
                  <td className="border px-3 py-2">
                    <input
                      type="checkbox"
                      checked={checkedIds.includes(app._id)}
                      onChange={() => toggleChecked(app._id)}
                    />
                  </td>
                  <td className="border px-3 py-2">
                    {app.displayID || app.serviceID}
                  </td>
                  <td className="border px-3 py-2">{app.customerName}</td>
                  <td className="border px-3 py-2">{app.vehicleNumber}</td>
                  <td className="border px-3 py-2">
                    {app.contact?.phone || "N/A"}
                  </td>
                  <td className="border px-3 py-2">
                    {new Date(app.serviceDate).toLocaleDateString()}
                  </td>
                  <td className="border px-3 py-2">
                    <button
                      onClick={() => {
                        setSelectedInvoice(app);
                        setShowInvoice(true);
                      }}
                      className="bg-blue-500 text-white px-3 py-1 rounded"
                      title="Create / Edit Invoice"
                    >
                      <AiOutlinePlus />
                    </button>
                    <button
                      onClick={() => handleDeleteInvoice(app._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded ml-2"
                      title="Delete Appointment"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* invoice form modal / inline */}
      {showInvoice && selectedInvoice && (
        <div className="mb-10 border p-4 bg-gray-50 rounded">
          <InvoiceForm
            initialData={selectedInvoice}
            onSubmit={handleSubmitInvoice}
            onCancel={() => {
              setSelectedInvoice(null);
              setShowInvoice(false);
            }}
          />
        </div>
      )}

      {/* pending invoices (service section) */}
      <h2 className="text-xl font-semibold mb-4">
        Pending Invoices &ndash; Service Section
      </h2>

      {pendingInvoices.length === 0 ? (
        <p className="text-gray-500">No pending invoices found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-3 py-2 w-8">✔</th>
                <th className="border px-3 py-2">Service&nbsp;</th>
                <th className="border px-3 py-2">Customer</th>
                <th className="border px-3 py-2">Vehicle&nbsp;No</th>
                <th className="border px-3 py-2">Admin&nbsp;Remark</th>
                <th className="border px-3 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {pendingInvoices.map((inv) => (
                <tr key={inv._id} className="hover:bg-gray-50 text-center">
                  <td className="border px-3 py-2">
                    <input
                      type="checkbox"
                      checked={checkedIds.includes(inv._id)}
                      onChange={() => toggleChecked(inv._id)}
                    />
                  </td>
                  <td className="border px-3 py-2">{inv.serviceID}</td>
                  <td className="border px-3 py-2">{inv.customerName}</td>
                  <td className="border px-3 py-2">{inv.vehicleNumber}</td>
                  <td className="border px-3 py-2">
                    {inv.adminRemarks || "—"}
                  </td>
                  <td className="border px-3 py-2 space-x-2">
                    <button
                      onClick={() => {
                        setSelectedInvoice(inv);
                        setShowInvoice(true);
                      }}
                      className="bg-green-500 text-white px-3 py-1 rounded"
                      title="Edit Invoice"
                    >
                      <AiOutlinePlus />
                    </button>
                    <button
                      onClick={() => handleDeleteInvoice(inv._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded"
                      title="Delete Invoice"
                    >
                      <FaTrash />
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
