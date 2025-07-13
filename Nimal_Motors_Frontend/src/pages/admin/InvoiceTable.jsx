// components/InvoiceTable.jsx
import React, { useState } from "react";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const InvoiceTable = ({ rows, title, onView, onDeleteSelected }) => {
  const [checked, setChecked] = useState({});

  const toggle = (id) => setChecked((prev) => ({ ...prev, [id]: !prev[id] }));

  const allIds = rows.map((r) => r._id);
  const allChecked = allIds.every((id) => checked[id]);
  const someChecked = allIds.some((id) => checked[id]);

  const toggleAll = () => {
    if (allChecked) {
      setChecked({});
    } else {
      const newChecks = {};
      allIds.forEach((id) => (newChecks[id] = true));
      setChecked(newChecks);
    }
  };

  const handleBulkDelete = () => {
    const idsToDelete = allIds.filter((id) => checked[id]);
    if (idsToDelete.length === 0) return;
    if (window.confirm(`Delete ${idsToDelete.length} invoice(s)?`)) {
      onDeleteSelected(idsToDelete);
    }
  };

  return (
    <div className="mb-10">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-xl font-semibold">{title}</h3>
        <button
          onClick={handleBulkDelete}
          disabled={!someChecked}
          className="px-4 py-1 bg-red-600 text-white rounded disabled:opacity-50"
        >
          Delete Selected
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300">
          <thead className="bg-gray-700 text-white">
            <tr>
              <th className="p-2 border">
                <input
                  type="checkbox"
                  checked={allChecked}
                  onChange={toggleAll}
                />
              </th>
              <th className="p-2 border">Service ID</th>
              <th className="p-2 border">Customer</th>
              <th className="p-2 border">Vehicle No</th>
              <th className="p-2 border">Description</th>
              <th className="p-2 border">Total</th>
              <th className="p-2 border">Remarks</th>
              {/* <th className="p-2 border">Status</th> */}
              <th className="p-2 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td colSpan="9" className="p-4 text-center text-gray-500">
                  No invoices
                </td>
              </tr>
            ) : (
              rows.map((inv) => (
                <tr key={inv._id} className="odd:bg-gray-50">
                  <td className="p-2 border text-center">
                    <input
                      type="checkbox"
                      checked={!!checked[inv._id]}
                      onChange={() => toggle(inv._id)}
                    />
                  </td>
                  <td className="p-2 border">{inv.serviceID}</td>
                  <td className="p-2 border">{inv.customerName}</td>
                  <td className="p-2 border">{inv.vehicleNumber}</td>
                  <td className="p-2 border">{inv.description}</td>
                  <td className="p-2 border">
                    Rs. {inv.totalCost?.toFixed(2)}
                  </td>
                  <td className="p-2 border">{inv.adminRemarks || "—"}</td>
                  {/* <td className="p-2 border text-center">
                    {inv.adminRemarks ? (
                      <FaCheckCircle className="text-green-500" />
                    ) : (
                      <FaTimesCircle className="text-red-500" />
                    )}
                  </td> */}
                  <td className="p-2 border text-center">
                    <button
                      className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                      onClick={() => onView(inv)}
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InvoiceTable;
