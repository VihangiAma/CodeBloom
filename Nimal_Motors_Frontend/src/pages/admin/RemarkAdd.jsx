import React, { useState } from "react";

const RemarkAdd = ({ invoice, onCancel, onSubmit }) => {
  const [remarks, setRemarks] = useState(invoice.adminRemarks || "");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setError("");
    
    try {
      // Determine approval status based on whether remarks are entered
      const hasRemarks = remarks.trim().length > 0;
      const isApproved = !hasRemarks; // If no remarks, approved = true; if remarks exist, approved = false

      // Prepare the request body to match your backend API
      const requestBody = {
        isApproved: isApproved,
        adminRemarks: remarks.trim()
      };

      // Make API call to update invoice approval status
      const response = await fetch(`http://localhost:5001/api/invoice/${invoice._id}/approve`, {
        method: 'PUT', // or 'PATCH' depending on your route setup
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update invoice');
      }

      const updatedInvoice = await response.json();

      // Call the parent component's onSubmit function with the updated invoice
      onSubmit(updatedInvoice);
      
    } catch (error) {
      console.error('Error updating invoice:', error);
      setError(error.message || 'Failed to update invoice. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-2xl mx-auto">
      <h3 className="text-xl font-semibold mb-4 text-gray-800">Invoice Review</h3>
      
      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-700 text-sm">{error}</p>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 bg-gray-50 p-4 rounded-lg">
        <div>
          <p className="font-medium text-gray-700">Service ID:</p>
          <p className="text-gray-900">{invoice.serviceID}</p>
        </div>
        <div>
          <p className="font-medium text-gray-700">Customer Name:</p>
          <p className="text-gray-900">{invoice.customerName}</p>
        </div>
        <div>
          <p className="font-medium text-gray-700">Vehicle Number:</p>
          <p className="text-gray-900">{invoice.vehicleNumber}</p>
        </div>
        <div>
          <p className="font-medium text-gray-700">Section:</p>
          <p className="text-gray-900">{invoice.section}</p>
        </div>
        <div>
          <p className="font-medium text-gray-700">Total Cost:</p>
          <p className="text-gray-900 font-semibold">Rs. {invoice.totalCost?.toFixed(2) || "0.00"}</p>
        </div>
        <div>
          <p className="font-medium text-gray-700">Current Status:</p>
          <p className="text-gray-900 capitalize">{invoice.status?.replace(/_/g, ' ') || "Pending"}</p>
        </div>
      </div>
      
      <div>
        <div className="mb-6">
          <label htmlFor="remarks" className="block mb-2 font-medium text-gray-700">
            Admin Remarks:
          </label>
          <textarea
            id="remarks"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-vertical min-h-[100px]"
            rows="4"
            value={remarks}
            onChange={(e) => setRemarks(e.target.value)}
            placeholder="Enter your remarks if there are any issues or deficiencies. Leave blank if invoice is approved without issues..."
            maxLength={500}
            disabled={isSubmitting}
          />
          <p className="text-sm text-gray-500 mt-1">
            {remarks.length}/500 characters
          </p>
          <p className="text-sm text-blue-600 mt-1">
            Note: If you enter remarks, the invoice will be marked as not approved and sent back to supervisor. If left blank, it will be approved and forwarded to accountant.
          </p>
        </div>
        
        <div className="flex justify-end gap-4 pt-4 border-t border-gray-200">
          <button
            type="button"
            onClick={handleCancel}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isSubmitting}
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200 font-medium shadow-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            disabled={isSubmitting}
          >
            {isSubmitting && (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            )}
            {isSubmitting ? 'Submitting...' : 'Submit Review'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RemarkAdd;