import React from "react";

const InvoiceDocument = ({ invoice }) => {
  if (!invoice) return <p>No invoice data available.</p>;

  const formatDate = (dateStr) => {
    if (!dateStr) return "N/A";
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-GB", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatCurrency = (amount) =>
    `Rs. ${Number(amount || 0).toLocaleString("en-LK", {
      minimumFractionDigits: 2,
    })}`;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-7xl mx-auto">
      <h3 className="text-2xl font-semibold mb-6 text-gray-800 text-center">
        Invoice Document
      </h3>

      {/* Basic info table */}
      <table className="w-full mb-6 border-collapse">
        <tbody>
          <tr>
            <th className="border px-4 py-2 bg-blue-600 text-white text-center">
              Service ID
            </th>
            <th className="border px-4 py-2 bg-blue-600 text-white text-center">
              Customer Name
            </th>
            <th className="border px-4 py-2 bg-blue-600 text-white text-center">
              Vehicle Number
            </th>
            <th className="border px-4 py-2 bg-blue-600 text-white text-center">
              Description
            </th>
            <th className="border px-4 py-2 bg-blue-600 text-white text-center">
              Total Cost
            </th>
            <th className="border px-4 py-2 bg-blue-600 text-white text-center">
              Created At
            </th>
          </tr>
          <tr>
            <td className="border px-4 py-2 text-center">
              {invoice.serviceID}
            </td>
            <td className="border px-4 py-2 text-center">
              {invoice.customerName}
            </td>
            <td className="border px-4 py-2 text-center">
              {invoice.vehicleNumber}
            </td>
            <td className="border px-4 py-2">{invoice.description || "N/A"}</td>
            <td className="border px-4 py-2 text-center">
              {formatCurrency(invoice.totalCost)}
            </td>
            <td className="border px-4 py-2 text-center">
              {formatDate(invoice.createdAt)}
            </td>
          </tr>
        </tbody>
      </table>

      {/* Repairs table */}
      {invoice.repairs && invoice.repairs.length > 0 && (
        <div className="mb-6">
          <h4 className="font-semibold mb-2 text-gray-700">Repair Details</h4>
          <table className="min-w-full border border-gray-300 mb-4">
            <thead>
              <tr className="bg-red-500 text-white text-center">
                <th className="border px-3 py-2">Package</th>
                <th className="border px-3 py-2">Repairs</th>
                <th className="border px-3 py-2">Price</th>
              </tr>
            </thead>
            <tbody>
              {invoice.repairs.map((pkg, idx) => (
                <tr key={idx} className={idx % 2 === 0 ? "bg-gray-50" : ""}>
                  <td className="border px-3 py-2 text-center">
                    {pkg.package || "-"}
                  </td>
                  <td className="border px-3 py-2">
                    {pkg.repairs?.map((r, i) => (
                      <div key={i}>
                        {r.label} — {formatCurrency(r.price)}
                      </div>
                    )) || "-"}
                  </td>
                  <td className="border px-3 py-2 text-right">
                    {formatCurrency(pkg.price)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Inventory items table */}
      {invoice.items && invoice.items.length > 0 && (
        <div className="mb-6">
          <h4 className="font-semibold mb-2 text-gray-700">
            Inventory Items Used
          </h4>
          <table className="min-w-full border border-gray-300">
            <thead>
              <tr className="bg-red-500 text-white text-center">
                <th className="border px-3 py-2">Item Name</th>
                <th className="border px-3 py-2">Quantity</th>
                <th className="border px-3 py-2">Price</th>
                <th className="border px-3 py-2">Total</th>
              </tr>
            </thead>
            <tbody>
              {invoice.items.map((item, idx) => (
                <tr key={idx} className={idx % 2 === 0 ? "bg-gray-50" : ""}>
                  <td className="border px-3 py-2">{item.itemName || "-"}</td>
                  <td className="border px-3 py-2 text-center">
                    {item.qty || 0}
                  </td>
                  <td className="border px-3 py-2 text-right">
                    {formatCurrency(item.price)}
                  </td>
                  <td className="border px-3 py-2 text-right">
                    {formatCurrency((item.qty || 0) * (item.price || 0))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Approval & remarks */}
      <div>
        <p>
          <strong>Approved:</strong> {invoice.isApproved ? "Yes" : "No"}
        </p>
        <p>
          <strong>Admin Remarks:</strong> {invoice.adminRemarks || "None"}
        </p>
      </div>
    </div>
  );
};

export default InvoiceDocument;
