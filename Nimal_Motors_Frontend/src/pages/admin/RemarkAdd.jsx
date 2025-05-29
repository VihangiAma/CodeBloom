import React, { useState } from "react";


const RemarkAdd = ({ invoice, onCancel, onSubmit }) => {
  const [remarks, setRemarks] = useState(invoice.adminRemarks || "");
  const [action, setAction] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!action) return;

    const updatedInvoice = {
      ...invoice,
      adminRemarks: remarks,
      status: action === "deficiency" ? "sent_back_to_supervisor" : "forwarded_to_accountant"
    };

    onSubmit(updatedInvoice);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-2xl mx-auto">
      <h3 className="text-xl font-semibold mb-4">Invoice Review</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <p className="font-medium">Service ID:</p>
          <p>{invoice.serviceID}</p>
        </div>
        <div>
          <p className="font-medium">Customer Name:</p>
          <p>{invoice.customerName}</p>
        </div>
        <div>
          <p className="font-medium">Vehicle Number:</p>
          <p>{invoice.vehicleNumber}</p>
        </div>
        <div>
          <p className="font-medium">Section:</p>
          <p>{invoice.section}</p>
        </div>
        <div>
          <p className="font-medium">Total Cost:</p>
          <p>Rs. {invoice.totalCost?.toFixed(2) || "0.00"}</p>
        </div>
        <div>
          <p className="font-medium">Current Status:</p>
          <p className={`inline-block px-2 py-1 rounded-full text-xs ${
            invoice.status === "sent_back_to_supervisor" ? "bg-yellow-100 text-yellow-800" :
            invoice.status === "forwarded_to_accountant" ? "bg-green-100 text-green-800" :
            "bg-blue-100 text-blue-800"
          }`}>
            {invoice.status === "sent_back_to_supervisor" ? "Sent Back" :
             invoice.status === "forwarded_to_accountant" ? "With Accountant" :
             "Under Review"}
          </p>
        </div>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="remarks" className="block mb-2 font-medium">
            Admin Remarks:
          </label>
          <textarea
            id="remarks"
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            rows="4"
            value={remarks}
            onChange={(e) => setRemarks(e.target.value)}
            placeholder="Enter your remarks or note any deficiencies..."
            required
          />
        </div>
        
        <div className="mb-6">
          <fieldset>
            <legend className="block mb-2 font-medium">Action Required:</legend>
            <div className="space-y-3">
              <div className="flex items-center">
                <input
                  id="deficiency"
                  name="action"
                  type="radio"
                  value="deficiency"
                  checked={action === "deficiency"}
                  onChange={() => setAction("deficiency")}
                  className="h-4 w-4 text-yellow-600 focus:ring-yellow-500"
                />
                <label htmlFor="deficiency" className="ml-2 block">
                  <span className="font-medium">Deficiency Found</span>
                  <span className="text-sm text-gray-500 ml-1">(Send back to supervisor)</span>
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="approve"
                  name="action"
                  type="radio"
                  value="approve"
                  checked={action === "approve"}
                  onChange={() => setAction("approve")}
                  className="h-4 w-4 text-green-600 focus:ring-green-500"
                />
                <label htmlFor="approve" className="ml-2 block">
                  <span className="font-medium">No Deficiency</span>
                  <span className="text-sm text-gray-500 ml-1">(Forward to accountant Yawanna)</span>
                </label>
              </div>
            </div>
          </fieldset>
        </div>
        
        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={!action}
            className={`px-4 py-2 rounded text-white focus:outline-none focus:ring-2 ${
              !action 
                ? "bg-gray-400 cursor-not-allowed" 
                : action === "deficiency" 
                  ? "bg-yellow-500 hover:bg-yellow-600 focus:ring-yellow-500" 
                  : "bg-green-500 hover:bg-green-600 focus:ring-green-500"
            }`}
          >
            {action === "deficiency" ? "Send Back to Supervisor" : "Forward to Accountant"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default RemarkAdd;