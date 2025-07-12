// CompletedServices.jsx
import React, { useEffect, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { FaTrash } from "react-icons/fa";
import { AiOutlineEdit } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import InvoiceForm from "./InvoiceForm";

const STORAGE_KEY = "completedCheckedIds";
const loadChecked = () => JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
const saveChecked = (ids) =>
  localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));

const CompletedServices = ({ sectionPrefix, section }) => {
  const [completedAppointments, setCompletedAppointments] = useState([]);
  const [pendingInvoices, setPendingInvoices] = useState([]);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [showInvoice, setShowInvoice] = useState(false);

  const [checkedIds, setCheckedIds] = useState(loadChecked);

  const navigate = useNavigate();

  /* ───────── Fetch whenever section changes ───────── */
  useEffect(() => {
    fetchCompletedAppointments();
    fetchPendingInvoices();
    // eslint‑disable‑next‑line react-hooks/exhaustive-deps
  }, [section, sectionPrefix]);

  /* ---- Completed appointments ---- */
  const fetchCompletedAppointments = async () => {
    try {
      const { data } = await axios.get(`http://localhost:5001/api/${section}`);
      setCompletedAppointments(
        data.filter(
          (a) =>
            a.status === "Completed" && a.displayID?.startsWith(sectionPrefix)
        )
      );
    } catch (err) {
      console.error("Error fetching completed appointments", err);
    }
  };

  /* ---- Pending invoices ---- */
  const fetchPendingInvoices = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:5001/api/invoice", // ← singular
        { params: { isApproved: false } } // server filters
      );
      setPendingInvoices(
        data.filter((inv) => inv.serviceID?.startsWith(sectionPrefix))
      );
    } catch (err) {
      console.error("Error fetching pending invoices", err);
    }
  };

  /* ---- Handle checkbox changes ---- */
  const toggleChecked = (id) => {
    setCheckedIds((prev) => {
      const updated = prev.includes(id)
        ? prev.filter((x) => x !== id)
        : [...prev, id];
      saveChecked(updated); // persist immediately
      return updated;
    });
  };

  /* ---- Create invoice ---- */
  const handleSubmitInvoice = async (invoiceData) => {
    try {
      if (invoiceData._id) {
        // Update existing invoice
        await axios.put(
          `http://localhost:5001/api/invoice/${invoiceData._id}`,
          invoiceData
        );
      } else {
        // Create new invoice
        await axios.post("http://localhost:5001/api/invoice", invoiceData);
      }

      setShowInvoice(false);
      setSelectedInvoice(null);
      fetchCompletedAppointments();
      fetchPendingInvoices();
    } catch (err) {
      console.error("Error submitting invoice", err);
    }
  };

  /* ---- Delete appointment ---- */
  const handleDeleteAppointment = async (id) => {
    try {
      await axios.delete(`http://localhost:5001/api/${section}/${id}`);
      setCompletedAppointments((prev) => prev.filter((a) => a._id !== id));
      fetchPendingInvoices(); // keep both tables in sync
    } catch (err) {
      console.error("Error deleting appointment", err);
    }
  };

  /* ---- Delete invoice ---- */
  const handleDeleteInvoice = async (id) => {
    try {
      await axios.delete(`http://localhost:5001/api/invoice/${id}`);
      setPendingInvoices((prev) => prev.filter((inv) => inv._id !== id));
    } catch (err) {
      console.error("Error deleting invoice", err);
    }
  };

  /* -------------------------------- Render -------------------------------- */
  return (
    <div className="p-4 bg-white shadow rounded-lg">
      {/* ───── Top: Completed services ───── */}
      <h2 className="text-xl font-semibold mb-4 capitalize">
        {section} – Completed Services
      </h2>

      {completedAppointments.length === 0 ? (
        <p className="text-gray-500">No completed services found.</p>
      ) : (
        <div className="overflow-x-auto mb-8">
          <table className="min-w-full text-sm border">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-3 py-2 w-8">✔</th>
                <th className="border px-3 py-2">Service ID</th>
                <th className="border px-3 py-2">Customer</th>
                <th className="border px-3 py-2">Vehicle No</th>
                <th className="border px-3 py-2">Contact</th>
                <th className="border px-3 py-2">Date</th>
                <th className="border px-3 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {completedAppointments.map((a) => (
                <tr key={a._id} className="hover:bg-gray-50">
                  <td className="border px-3 py-2">
                    <input
                      type="checkbox"
                      checked={checkedIds.includes(a._id)}
                      onChange={() => toggleChecked(a._id)}
                    />
                  </td>
                  <td className="border px-3 py-2">{a.displayID}</td>
                  <td className="border px-3 py-2">{a.customerName}</td>
                  <td className="border px-3 py-2">{a.vehicleNumber}</td>
                  <td className="border px-3 py-2">
                    {a.contact?.phone || a.contact?.email || "—"}
                  </td>
                  <td className="border px-3 py-2">
                    {new Date(a.serviceDate).toLocaleDateString("en-GB")}
                  </td>
                  <td className="px-4 py-2 border space-x-2">
                    {/* Build invoice */}
                    <button
                      onClick={() => {
                        setSelectedInvoice(a);
                        setShowInvoice(true);
                      }}
                      className="bg-blue-500 text-white px-3 py-1 rounded"
                    >
                      <AiOutlinePlus />
                    </button>
                    {/* Delete appointment */}
                    <button
                      onClick={() => handleDeleteAppointment(a._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Invoice form */}
          {showInvoice && selectedInvoice && (
            <div className="mt-6 border p-4 bg-gray-50 rounded">
              <InvoiceForm
                initialData={selectedInvoice}
                onSubmit={handleSubmitInvoice}
                onCancel={() => {
                  setShowInvoice(false);
                  setSelectedInvoice(null);
                }}
              />
            </div>
          )}
        </div>
      )}

      {/* ───── Bottom: Pending invoices ───── */}
      <h2 className="text-xl font-semibold mb-4 capitalize">
        {section} – Pending Invoices
      </h2>

      {pendingInvoices.length === 0 ? (
        <p className="text-gray-500">No pending invoices found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm border">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-3 py-2 w-8">✔</th>
                <th className="border px-3 py-2">ServiceID</th>
                <th className="border px-3 py-2">Customer</th>
                <th className="border px-3 py-2">Vehicle No</th>
                <th className="border px-3 py-2">Admin Remark</th>
                <th className="border px-3 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {pendingInvoices.map((inv) => (
                <tr key={inv._id} className="hover:bg-gray-50">
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
                    >
                      <AiOutlineEdit />
                    </button>
                    <button
                      onClick={() => handleDeleteInvoice(inv._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded"
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

export default CompletedServices;
