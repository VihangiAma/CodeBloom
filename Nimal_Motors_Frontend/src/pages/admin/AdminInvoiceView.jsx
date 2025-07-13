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
