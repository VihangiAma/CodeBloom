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
