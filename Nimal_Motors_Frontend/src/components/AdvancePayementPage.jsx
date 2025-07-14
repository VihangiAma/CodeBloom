import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { IoClose } from "react-icons/io5";

const SECTIONS = ["Mechanical", "Electrical", "BodyShop"];
const ITEMS_PER_PAGE = 15;

const AdvancePaymentsPage = () => {
  const [selectedSection, setSelectedSection] = useState(SECTIONS[0]);
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [savingId, setSavingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [bulkUpdates, setBulkUpdates] = useState({});
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    fetchCustomers(selectedSection);
  }, [selectedSection]);

  const fetchCustomers = async (section) => {
    setLoading(true);
    try {
      const res = await axios.get(`http://localhost:5001/api/${section.toLowerCase()}`);
      const dataWithEmptyAdvance = res.data.map((c) => ({
        ...c,
        advancePaid: c.advancePaid > 0 ? c.advancePaid : ""
      }));
      setCustomers(dataWithEmptyAdvance);
      setErrors({});
      setBulkUpdates({});
      setCurrentPage(1);
      setSearchTerm("");
    } catch (error) {
      console.error("Failed to fetch customers", error);
      alert("Failed to load customers");
    }
    setLoading(false);
  };

  const handleAdvanceChange = (id, value) => {
    setCustomers((prev) =>
      prev.map((cust) =>
        cust._id === id ? { ...cust, advancePaid: value } : cust
      )
    );

    setBulkUpdates((prev) => ({ ...prev, [id]: value }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [id]: "" // clear error on input
    }));
  };

  //import Swal from "sweetalert2";

// ...

const handleSave = async (id, advancePaid) => {
  if (advancePaid === "" || advancePaid === null || isNaN(advancePaid)) {
    setErrors((prev) => ({ ...prev, [id]: "Advance amount is required." }));
    return;
  }

  setSavingId(id);
  try {
    await axios.put(
      `http://localhost:5001/api/${selectedSection.toLowerCase()}/${id}/advance`,
      { advancePaid: Number(advancePaid) }
    );
    // Replace alert with SweetAlert2 success popup
    Swal.fire({
      icon: 'success',
      title: 'Success',
      text: 'Advance payment updated successfully',
      timer: 1500,
      showConfirmButton: false,
    });

    setBulkUpdates((prev) => {
      const copy = { ...prev };
      delete copy[id];
      return copy;
    });
  } catch (error) {
    console.error("Failed to update advance", error);
    alert("Failed to update advance payment");
  }
  setSavingId(null);
};


  const handleBulkSave = async () => {
    const updates = Object.entries(bulkUpdates);

    if (updates.length === 0) {
      Swal.fire("Info", "No changes to save", "info");
      return;
    }

    // Validate all advances before sending
    for (const [id, value] of updates) {
      if (value === "" || value === null || isNaN(value)) {
        setErrors((prev) => ({ ...prev, [id]: "Advance amount is required." }));
        Swal.fire("Error", "Please fill all advance amounts before saving.", "error");
        return;
      }
    }

    const confirm = await Swal.fire({
      title: "Confirm Bulk Update",
      text: `Update ${updates.length} customers?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, Update All",
    });

    if (!confirm.isConfirmed) return;

    try {
      await Promise.all(
        updates.map(([id, value]) =>
          axios.put(`http://localhost:5001/api/${selectedSection.toLowerCase()}/${id}/advance`, {
            advancePaid: Number(value),
          })
        )
      );
      Swal.fire("Success", "All updates completed", "success");
      setBulkUpdates({});
      fetchCustomers(selectedSection);
    } catch (error) {
      Swal.fire("Error", "Bulk update failed", "error");
    }
  };

  const filtered = customers.filter((c) =>
    c.vehicleNumber?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="p-6 bg-[#F5F5F5] min-h-screen max-w-6xl mx-auto relative">
      <button
        onClick={() => navigate("/accountant-dashboard")}
        className="absolute top-4 right-4 text-gray-600 hover:text-[#B30000] text-2xl"
        title="Close"
      >
        <IoClose />
      </button>

      <h2 className="text-2xl font-bold text-[#B30000] mb-6">Manage Advance Payments</h2>

      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-4">
        <div>
          <label className="mr-4 font-semibold">Select Section:</label>
          <select
            value={selectedSection}
            onChange={(e) => setSelectedSection(e.target.value)}
            className="border rounded px-3 py-1"
          >
            {SECTIONS.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Search by vehicle No..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-3 py-1 border rounded w-64"
          />
          <button
            onClick={handleBulkSave}
            className="bg-[#29527A] text-white px-4 py-1 rounded hover:bg-[#D63333]"
          >
            Save All Changes
          </button>
        </div>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : paginated.length === 0 ? (
        <p>No customers found.</p>
      ) : (
        <>
          <table className="w-full border-collapse border border-gray-300">
            <thead className="bg-[#B30000] text-white">
              <tr>
                <th className="border px-3 py-2">Customer Name</th>
                <th className="border px-3 py-2">Vehicle Number</th>
                <th className="border px-3 py-2">Advance Paid (Rs.)</th>
                <th className="border px-3 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {paginated.map(({ _id, customerName, vehicleNumber, advancePaid }) => (
                <tr key={_id} className="text-center">
                  <td className="border px-3 py-2">{customerName}</td>
                  <td className="border px-3 py-2">{vehicleNumber || "-"}</td>
                  <td className="border px-3 py-2">
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      placeholder="Enter amount"
                      value={advancePaid}
                      onChange={(e) => handleAdvanceChange(_id, e.target.value)}
                      className={`w-24 border rounded px-2 py-1 text-right ${errors[_id] ? "border-red-500" : ""}`}
                    />
                    {errors[_id] && (
                      <p className="text-red-500 text-xs mt-1">{errors[_id]}</p>
                    )}
                  </td>
                  <td className="border px-3 py-2">
                    <button
                      onClick={() => handleSave(_id, bulkUpdates[_id] ?? advancePaid)}
                      className="bg-[#29527A] text-white px-3 py-1 rounded hover:bg-[#D63333]"
                      disabled={savingId === _id}
                    >
                      {savingId === _id ? "Saving..." : "Save"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="flex justify-end items-center gap-3 mt-4">
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 border rounded"
            >
              Prev
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-3 py-1 border rounded"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default AdvancePaymentsPage;
