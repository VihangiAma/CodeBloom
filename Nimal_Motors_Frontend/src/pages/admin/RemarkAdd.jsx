// import React, { useState } from "react";

// const RemarkAdd = ({ invoice, onCancel, onSubmit }) => {
//   const [remarks, setRemarks] = useState(invoice.adminRemarks || "");
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [error, setError] = useState("");

//   const handleSubmit = async () => {
//     setIsSubmitting(true);
//     setError("");

//     if (!invoice?._id) {
//       setError("Invoice ID is missing. Cannot submit.");
//       setIsSubmitting(false);
//       return;
//     }

//     const hasRemarks = remarks.trim().length > 0;
//     const url = `http://localhost:5001/api/invoice/${invoice._id}/${
//       hasRemarks ? "reject" : "approve"
//     }`;
//     const method = "PATCH";

//     // Only send body if remarks are present
//     const fetchOptions = {
//       method,
//       headers: hasRemarks ? { "Content-Type": "application/json" } : {},
//       body: hasRemarks
//         ? JSON.stringify({ adminRemarks: remarks.trim() })
//         : undefined,
//     };

//     try {
//       const res = await fetch(url, fetchOptions);
//       const data = await res.json();

//       if (!res.ok) {
//         throw new Error(data?.message || "Failed to update invoice");
//       }

//       onSubmit(data); // Send updated invoice to parent
//     } catch (e) {
//       console.error("Error submitting review:", e);
//       setError(e.message || "Something went wrong.");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const handleCancel = () => {
//     if (onCancel) onCancel();
//   };

//   const formatDate = (dateString) => {
//     if (!dateString) return "N/A";
//     const date = new Date(dateString);
//     return date.toLocaleDateString("en-US", {
//       year: "numeric",
//       month: "short",
//       day: "numeric",
//       hour: "2-digit",
//       minute: "2-digit",
//     });
//   };

//   return (
//     <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-7xl mx-auto">
//       <h3 className="text-xl font-semibold mb-4 text-gray-800">
//         Invoice Review
//       </h3>

//       {error && (
//         <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
//           <p className="text-red-700 text-sm">{error}</p>
//         </div>
//       )}

//       {/* Invoice summary */}
//       <div className="mb-6 bg-gray-50 p-4 rounded-lg">
//         <table className="w-full border-collapse">
//           <tbody>
//             <tr>
//               {[
//                 "Service ID",
//                 "Customer Name",
//                 "Vehicle Number",
//                 "Description",
//                 "Total Cost",
//                 "Submitted By",
//                 "Created At",
//               ].map((header, i) => (
//                 <th
//                   key={i}
//                   className="py-2 px-4 border bg-blue-600 text-white text-center"
//                 >
//                   {header}
//                 </th>
//               ))}
//             </tr>
//             <tr>
//               <td className="py-2 px-4 border">{invoice.serviceID}</td>
//               <td className="py-2 px-4 border">{invoice.customerName}</td>
//               <td className="py-2 px-4 border">{invoice.vehicleNumber}</td>
//               <td className="py-2 px-4 border">
//                 {invoice.description || "N/A"}
//               </td>
//               <td className="py-2 px-4 border">
//                 Rs. {invoice.totalCost?.toFixed(2) || "0.00"}
//               </td>
//               <td className="py-2 px-4 border">
//                 {invoice.submittedBy?.name || "N/A"}
//               </td>
//               <td className="py-2 px-4 border">
//                 {formatDate(invoice.createdAt)}
//               </td>
//             </tr>
//           </tbody>
//         </table>
//       </div>

//       {/* Repairs table */}
//       {invoice.repairs?.length > 0 && (
//         <div className="mb-6">
//           <h4 className="font-medium text-gray-700 mb-2">Repairs:</h4>
//           <table className="min-w-full border">
//             <thead>
//               <tr>
//                 <th className="py-2 px-4 border bg-red-500 text-white">
//                   Package
//                 </th>
//                 <th className="py-2 px-4 border bg-red-500 text-white">
//                   Repairs
//                 </th>
//                 <th className="py-2 px-4 border bg-red-500 text-white">
//                   Price
//                 </th>
//               </tr>
//             </thead>
//             <tbody>
//               {invoice.repairs.map((repair, i) => (
//                 <tr key={i} className={i % 2 === 0 ? "bg-gray-50" : ""}>
//                   <td className="py-2 px-4 border">{repair.package || "-"}</td>
//                   <td className="py-2 px-4 border">
//                     {repair.repairs?.map((r, j) => (
//                       <div key={j}>
//                         {r.label} - Rs. {r.price?.toFixed(2) || "0.00"}
//                       </div>
//                     )) || "-"}
//                   </td>
//                   <td className="py-2 px-4 border text-right">
//                     Rs. {repair.price?.toFixed(2) || "0.00"}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}

//       {/* Items table */}
//       {invoice.items?.length > 0 && (
//         <div className="mb-6">
//           <h4 className="font-medium text-gray-700 mb-2">Items:</h4>
//           <table className="min-w-full border">
//             <thead>
//               <tr>
//                 <th className="py-2 px-4 border bg-red-500 text-white">
//                   Item Name
//                 </th>
//                 <th className="py-2 px-4 border bg-red-500 text-white">Qty</th>
//                 <th className="py-2 px-4 border bg-red-500 text-white">
//                   Price
//                 </th>
//                 <th className="py-2 px-4 border bg-red-500 text-white">
//                   Total
//                 </th>
//               </tr>
//             </thead>
//             <tbody>
//               {invoice.items.map((item, i) => (
//                 <tr key={i} className={i % 2 === 0 ? "bg-gray-50" : ""}>
//                   <td className="py-2 px-4 border">{item.itemName || "-"}</td>
//                   <td className="py-2 px-4 border text-right">
//                     {item.qty || 0}
//                   </td>
//                   <td className="py-2 px-4 border text-right">
//                     Rs. {item.price?.toFixed(2) || "0.00"}
//                   </td>
//                   <td className="py-2 px-4 border text-right">
//                     Rs. {((item.qty || 0) * (item.price || 0)).toFixed(2)}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}

//       {/* Admin Remarks Input */}
//       <div className="mb-6">
//         <label
//           htmlFor="remarks"
//           className="block mb-2 font-medium text-gray-700"
//         >
//           Admin Remarks:
//         </label>
//         <textarea
//           id="remarks"
//           className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 resize-vertical min-h-[100px]"
//           value={remarks}
//           onChange={(e) => setRemarks(e.target.value)}
//           placeholder="Leave blank to approve. Add remarks to reject invoice."
//           maxLength={500}
//           disabled={isSubmitting}
//         />
//         <p className="text-sm text-gray-500 mt-1">
//           {remarks.length}/500 characters
//         </p>
//         <p className="text-sm text-blue-600 mt-1">
//           ⚠️ If you enter remarks, the invoice will be rejected and sent back to
//           the supervisor. Leave blank to approve.
//         </p>
//       </div>

//       {/* Buttons */}
//       <div className="flex justify-end gap-4 pt-4 border-t border-gray-200">
//         <button
//           type="button"
//           onClick={handleCancel}
//           className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
//           disabled={isSubmitting}
//         >
//           Cancel
//         </button>
//         <button
//           type="button"
//           onClick={handleSubmit}
//           className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
//           disabled={isSubmitting}
//         >
//           {isSubmitting && (
//             <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
//           )}
//           {isSubmitting ? "Submitting..." : "Submit Review"}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default RemarkAdd;

import React, { useState } from "react";

const RemarkAdd = ({ invoice, onCancel, onSubmit }) => {
  const [remarks, setRemarks] = useState(invoice.adminRemarks || "");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setError("");

    if (!invoice?._id) {
      setError("Invoice ID is missing. Cannot submit.");
      setIsSubmitting(false);
      return;
    }

    const hasRemarks = remarks.trim().length > 0;
    const url = `http://localhost:5001/api/invoice/${invoice._id}/${
      hasRemarks ? "reject" : "approve"
    }`;
    const method = "PATCH";

    const fetchOptions = {
      method,
      headers: hasRemarks ? { "Content-Type": "application/json" } : {},
      body: hasRemarks
        ? JSON.stringify({ adminRemarks: remarks.trim() })
        : undefined,
    };

    try {
      const res = await fetch(url, fetchOptions);
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.message || "Failed to update invoice");
      }

      onSubmit(data); // Send updated invoice to parent
    } catch (e) {
      console.error("Error submitting review:", e);
      setError(e.message || "Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return " ";
    const date = new Date(dateString);
    return date.toLocaleString("en-US");
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-5xl mx-auto">
      <h3 className="text-xl font-semibold mb-4 text-gray-800">
        Review Invoice
      </h3>

      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-300 text-red-700 rounded">
          {error}
        </div>
      )}

      {/* Summary Table */}
      <div className="mb-4">
        <table className="w-full border text-sm">
          <thead className="bg-gray-200">
            <tr>
              {[
                "Service ID",
                "Customer",
                "Vehicle No",
                "Description",
                "Total",
                "Submitted By",
                "Created",
              ].map((h, i) => (
                <th key={i} className="p-2 border">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-2 border">{invoice.serviceID}</td>
              <td className="p-2 border">{invoice.customerName}</td>
              <td className="p-2 border">{invoice.vehicleNumber}</td>
              <td className="p-2 border">{invoice.description || "N/A"}</td>
              <td className="p-2 border">
                Rs. {invoice.totalCost?.toFixed(2)}
              </td>
              <td className="p-2 border">{invoice.submittedBy || "N/A"}</td>
              <td className="p-2 border">{formatDate(invoice.createdAt)}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Remarks */}
      <div className="mb-6">
        <label
          htmlFor="remarks"
          className="block text-gray-700 font-medium mb-2"
        >
          Admin Remarks:
        </label>
        <textarea
          id="remarks"
          className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={remarks}
          onChange={(e) => setRemarks(e.target.value)}
          placeholder="Leave blank to approve. Add remarks to reject."
          disabled={isSubmitting}
          maxLength={500}
          rows={4}
        />
        <p className="text-sm text-gray-500 mt-1">
          {remarks.length}/500 characters
        </p>
        <p className="text-xs text-blue-600 mt-1">
          ⚠️ If you enter remarks, the invoice will be rejected and sent back to
          the supervisor. Leave blank to approve.
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-4">
        <button
          onClick={onCancel}
          disabled={isSubmitting}
          className="px-4 py-2 border border-gray-400 rounded hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center gap-2"
        >
          {isSubmitting && (
            <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
          )}
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </div>
    </div>
  );
};

export default RemarkAdd;
