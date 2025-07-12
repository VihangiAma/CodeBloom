// import React, { useState } from "react";

// const RemarkAdd = ({ invoice, onCancel, onSubmit }) => {
//   const [remarks, setRemarks] = useState(invoice.adminRemarks || "");
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [error, setError] = useState("");

//   const handleSubmit = async () => {
//     setIsSubmitting(true);
//     setError("");

//     try {
//       const hasRemarks = remarks.trim().length > 0;
//       const isApproved = !hasRemarks;

//       const requestBody = {
//         isApproved: isApproved,
//         adminRemarks: remarks.trim()
//       };

//       const response = await fetch(`http://localhost:5001/api/invoice/${invoice._id}/approve`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(requestBody)
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.message || 'Failed to update invoice');
//       }

//       const updatedInvoice = await response.json();
//       onSubmit(updatedInvoice);

//     } catch (error) {
//       console.error('Error updating invoice:', error);
//       setError(error.message || 'Failed to update invoice. Please try again.');
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const handleCancel = () => {
//     if (onCancel) {
//       onCancel();
//     }
//   };

//   const formatDate = (dateString) => {
//     if (!dateString) return 'N/A';
//     const date = new Date(dateString);
//     return date.toLocaleDateString('en-US', {
//       year: 'numeric',
//       month: 'short',
//       day: 'numeric',
//       hour: '2-digit',
//       minute: '2-digit'
//     });
//   };

//   return (
//     <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-7xl mx-auto">
//       <h3 className="text-xl font-semibold mb-4 text-gray-800">Invoice Review</h3>

//       {error && (
//         <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
//           <p className="text-red-700 text-sm">{error}</p>
//         </div>
//       )}

//        <div className="mb-6 bg-gray-50 p-4 rounded-lg">
//         <table className="w-full border-collapse">
//           <tbody>
//             <tr>
//               <th className="py-2 px-4 border border-gray-300 font-medium  bg-blue-600  text-white text text-center">Service ID</th>
//               <th className="py-2 px-4 border border-gray-300 font-medium  bg-blue-600   text-white text text-center">Customer Name</th>
//               <th className="py-2 px-4 border border-gray-300 font-medium  bg-blue-600  text-white text text-center">Vehicle Number</th>
//               <th className="py-2 px-4 border border-gray-300 font-medium  bg-blue-600  text-white text text-center">Description</th>
//               <th className="py-2 px-4 border border-gray-300 font-medium  bg-blue-600 text-white text text-center">Total Cost</th>
//               <th className="py-2 px-4 border border-gray-300 font-medium  bg-blue-600  text-white text text-center">Submitted By</th>
//               <th className="py-2 px-4 border border-gray-300 font-medium  bg-blue-600  text-white text text-center">Created At</th>

//             </tr>
//             <tr>
//               <td className="py-2 px-4 border border-gray-300 ">{invoice.serviceID}</td>
//               <td className="py-2 px-4 border border-gray-300 ">{invoice.customerName}</td>
//               <td className="py-2 px-4 border border-gray-300 ">{invoice.vehicleNumber}</td>
//               <td className="py-2 px-4 border border-gray-300">{invoice.description || 'N/A'}</td>
//               <td className="py-2 px-4 border border-gray-300 ">Rs. {invoice.totalCost?.toFixed(2) || "0.00"}</td>
//               <td className="py-2 px-4 border border-gray-300">{invoice.submittedBy?.name || 'N/A'}</td>
//               <td className="py-2 px-4 border border-gray-300" colSpan="3">{formatDate(invoice.createdAt)}</td>
//             </tr>

//           </tbody>
//         </table>
//       </div>

//       {invoice.repairs && invoice.repairs.length > 0 && (
//         <div className="mb-6">
//           <h4 className="font-medium text-gray-700 mb-2">Repairs:</h4>
//           <div className="overflow-x-auto">
//             <table className="min-w-full bg-white border border-gray-300">
//               <thead>
//                 <tr>
//                   <th className="py-2 px-4 border border-gray-300 bg-red-500 text-white text-center">Package</th>
//                   <th className="py-2 px-4 border border-gray-300 bg-red-500 text-white text-center">Repairs</th>
//                   <th className="py-2 px-4 border border-gray-300 bg-red-500 text-white text-center">Price</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {invoice.repairs.map((repair, index) => (
//                   <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : ''}>
//                     <td className="py-2 px-4 border border-gray-300">{repair.package || '-'}</td>
//                     <td className="py-2 px-4 border border-gray-300">
//                       {repair.repairs?.map((r, i) => (
//                         <div key={i}>
//                           {r.label} - Rs. {r.price?.toFixed(2) || '0.00'}
//                         </div>
//                       )) || '-'}
//                     </td>
//                     <td className="py-2 px-4 border border-gray-300 text-right">Rs. {repair.price?.toFixed(2) || '0.00'}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       )}

//       {invoice.items && invoice.items.length > 0 && (
//         <div className="mb-6">
//           <h4 className="font-medium text-gray-700 mb-2">Items:</h4>
//           <div className="overflow-x-auto">
//             <table className="min-w-full bg-white border border-gray-300">
//               <thead>
//                 <tr>
//                   <th className="py-2 px-4 border border-gray-300 bg-red-500 text-white text-center">Item Name</th>
//                   <th className="py-2 px-4 border border-gray-300 bg-red-500 text-white text-center">Quantity</th>
//                   <th className="py-2 px-4 border border-gray-300 bg-red-500 text-white text-center">Price</th>
//                   <th className="py-2 px-4 border border-gray-300 bg-red-500 text-white text-center">Total</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {invoice.items.map((item, index) => (
//                   <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : ''}>
//                     <td className="py-2 px-4 border border-gray-300">{item.itemName || '-'}</td>
//                     <td className="py-2 px-4 border border-gray-300 text-right">{item.qty || '0'}</td>
//                     <td className="py-2 px-4 border border-gray-300 text-right">Rs. {item.price?.toFixed(2) || '0.00'}</td>
//                     <td className="py-2 px-4 border border-gray-300 text-right">Rs. {((item.qty || 0) * (item.price || 0)).toFixed(2)}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       )}

//       <div>
//         <div className="mb-6">
//           <label htmlFor="remarks" className="block mb-2 font-medium text-gray-700">
//             Admin Remarks:
//           </label>
//           <textarea
//             id="remarks"
//             className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-vertical min-h-[100px]"
//             rows="4"
//             value={remarks}
//             onChange={(e) => setRemarks(e.target.value)}
//             placeholder="Enter your remarks if there are any issues or deficiencies. Leave blank if invoice is approved without issues..."
//             maxLength={500}
//             disabled={isSubmitting}
//           />
//           <p className="text-sm text-gray-500 mt-1">
//             {remarks.length}/500 characters
//           </p>
//           <p className="text-sm text-blue-600 mt-1">
//             Note: If you enter remarks, the invoice will be marked as not approved and sent back to supervisor. If left blank, it will be approved and forwarded to accountant.
//           </p>
//         </div>

//         <div className="flex justify-end gap-4 pt-4 border-t border-gray-200">
//           <button
//             type="button"
//             onClick={handleCancel}
//             className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
//             disabled={isSubmitting}
//           >
//             Cancel
//           </button>
//           <button
//             type="button"
//             onClick={handleSubmit}
//             className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200 font-medium shadow-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
//             disabled={isSubmitting}
//           >
//             {isSubmitting && (
//               <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
//             )}
//             {isSubmitting ? 'Submitting...' : 'Submit Review'}
//           </button>
//         </div>
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

    // Only send body if remarks are present
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

  const handleCancel = () => {
    if (onCancel) onCancel();
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-7xl mx-auto">
      <h3 className="text-xl font-semibold mb-4 text-gray-800">
        Invoice Review
      </h3>

      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-700 text-sm">{error}</p>
        </div>
      )}

      {/* Invoice summary */}
      <div className="mb-6 bg-gray-50 p-4 rounded-lg">
        <table className="w-full border-collapse">
          <tbody>
            <tr>
              {[
                "Service ID",
                "Customer Name",
                "Vehicle Number",
                "Description",
                "Total Cost",
                "Submitted By",
                "Created At",
              ].map((header, i) => (
                <th
                  key={i}
                  className="py-2 px-4 border bg-blue-600 text-white text-center"
                >
                  {header}
                </th>
              ))}
            </tr>
            <tr>
              <td className="py-2 px-4 border">{invoice.serviceID}</td>
              <td className="py-2 px-4 border">{invoice.customerName}</td>
              <td className="py-2 px-4 border">{invoice.vehicleNumber}</td>
              <td className="py-2 px-4 border">
                {invoice.description || "N/A"}
              </td>
              <td className="py-2 px-4 border">
                Rs. {invoice.totalCost?.toFixed(2) || "0.00"}
              </td>
              <td className="py-2 px-4 border">
                {invoice.submittedBy?.name || "N/A"}
              </td>
              <td className="py-2 px-4 border">
                {formatDate(invoice.createdAt)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Repairs table */}
      {invoice.repairs?.length > 0 && (
        <div className="mb-6">
          <h4 className="font-medium text-gray-700 mb-2">Repairs:</h4>
          <table className="min-w-full border">
            <thead>
              <tr>
                <th className="py-2 px-4 border bg-red-500 text-white">
                  Package
                </th>
                <th className="py-2 px-4 border bg-red-500 text-white">
                  Repairs
                </th>
                <th className="py-2 px-4 border bg-red-500 text-white">
                  Price
                </th>
              </tr>
            </thead>
            <tbody>
              {invoice.repairs.map((repair, i) => (
                <tr key={i} className={i % 2 === 0 ? "bg-gray-50" : ""}>
                  <td className="py-2 px-4 border">{repair.package || "-"}</td>
                  <td className="py-2 px-4 border">
                    {repair.repairs?.map((r, j) => (
                      <div key={j}>
                        {r.label} - Rs. {r.price?.toFixed(2) || "0.00"}
                      </div>
                    )) || "-"}
                  </td>
                  <td className="py-2 px-4 border text-right">
                    Rs. {repair.price?.toFixed(2) || "0.00"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Items table */}
      {invoice.items?.length > 0 && (
        <div className="mb-6">
          <h4 className="font-medium text-gray-700 mb-2">Items:</h4>
          <table className="min-w-full border">
            <thead>
              <tr>
                <th className="py-2 px-4 border bg-red-500 text-white">
                  Item Name
                </th>
                <th className="py-2 px-4 border bg-red-500 text-white">Qty</th>
                <th className="py-2 px-4 border bg-red-500 text-white">
                  Price
                </th>
                <th className="py-2 px-4 border bg-red-500 text-white">
                  Total
                </th>
              </tr>
            </thead>
            <tbody>
              {invoice.items.map((item, i) => (
                <tr key={i} className={i % 2 === 0 ? "bg-gray-50" : ""}>
                  <td className="py-2 px-4 border">{item.itemName || "-"}</td>
                  <td className="py-2 px-4 border text-right">
                    {item.qty || 0}
                  </td>
                  <td className="py-2 px-4 border text-right">
                    Rs. {item.price?.toFixed(2) || "0.00"}
                  </td>
                  <td className="py-2 px-4 border text-right">
                    Rs. {((item.qty || 0) * (item.price || 0)).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Admin Remarks Input */}
      <div className="mb-6">
        <label
          htmlFor="remarks"
          className="block mb-2 font-medium text-gray-700"
        >
          Admin Remarks:
        </label>
        <textarea
          id="remarks"
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 resize-vertical min-h-[100px]"
          value={remarks}
          onChange={(e) => setRemarks(e.target.value)}
          placeholder="Leave blank to approve. Add remarks to reject invoice."
          maxLength={500}
          disabled={isSubmitting}
        />
        <p className="text-sm text-gray-500 mt-1">
          {remarks.length}/500 characters
        </p>
        <p className="text-sm text-blue-600 mt-1">
          ⚠️ If you enter remarks, the invoice will be rejected and sent back to
          the supervisor. Leave blank to approve.
        </p>
      </div>

      {/* Buttons */}
      <div className="flex justify-end gap-4 pt-4 border-t border-gray-200">
        <button
          type="button"
          onClick={handleCancel}
          className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
          disabled={isSubmitting}
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={handleSubmit}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
          disabled={isSubmitting}
        >
          {isSubmitting && (
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          )}
          {isSubmitting ? "Submitting..." : "Submit Review"}
        </button>
      </div>
    </div>
  );
};

export default RemarkAdd;
