// ✅ Full Updated SuppliersSection.jsx with Styled Add/Edit Forms and Confirmation
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  FaPhone, FaEnvelope, FaMapMarkerAlt, FaEdit, FaUserTie,
  FaIdCard, FaIndustry, FaEye, FaTrash, FaPlus
} from "react-icons/fa";
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';

const SuppliersSection = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [supplierItems, setSupplierItems] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [newSupplier, setNewSupplier] = useState({
    supplierId: "",
    companyName: "",
    contactPerson: "",
    phoneNumber: "",
    email: "",
    address: "",
  });

  const navigate = useNavigate();

  // Fetch suppliers
  useEffect(() => {
    fetchSuppliers();
  }, []);

  const fetchSuppliers = async () => {
    try {
      const res = await axios.get("http://localhost:5001/api/supplier/list");
      setSuppliers(res.data);
      const nextId = `SUP${(res.data.length + 1).toString().padStart(3, '0')}`;
      setNewSupplier((prev) => ({ ...prev, supplierId: nextId }));
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  // Edit & Update
  const handleEditClick = (supplier) => {
    setSelectedSupplier({ ...supplier });
    setEditModalOpen(true);
  };

  const handleSaveUpdate = async () => {
    try {
      const { contactPerson, phoneNumber, email, address, supplierId } = selectedSupplier;
      await axios.put(`http://localhost:5001/api/supplier/update/${supplierId}`, {
        contactPerson, phoneNumber, email, address
      });
      toast.success("Supplier updated!");
      setEditModalOpen(false);
      fetchSuppliers();
    } catch (err) {
      toast.error("Update failed");
    }
  };

  // Add Supplier
  const handleAddSupplier = async () => {
    try {
      await axios.post("http://localhost:5001/api/supplier/add", newSupplier);
      toast.success("Supplier added!");
      setAddModalOpen(false);
      setNewSupplier({
        supplierId: `SUP${(suppliers.length + 2).toString().padStart(3, '0')}`,
        companyName: "", contactPerson: "", phoneNumber: "", email: "", address: ""
      });
      fetchSuppliers();
    } catch (err) {
      toast.error("Failed to add supplier");
    }
  };

  const handleDeleteSupplier = async () => {
    try {
      await axios.delete(`http://localhost:5001/api/supplier/delete/${confirmDeleteId}`);
      toast.success("Deleted!");
      setConfirmDeleteId(null);
      fetchSuppliers();
    } catch (err) {
      toast.error("Failed to delete supplier");
    }
  };

  const fetchSupplierItems = async (companyName) => {
    try {
      const res = await axios.get(`http://localhost:5001/api/stock/by-supplier/${companyName}`);
      setSupplierItems(res.data);
      setSelectedSupplier(companyName);
      setShowModal(true);
    } catch (err) {
      console.error("Supplier items fetch error:", err);
    }
  };

  return (
    <div className="p-6 bg-[#F5F5F5] min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-[#2C2C2C]">Suppliers Directory</h2>
        <button onClick={() => setAddModalOpen(true)}
          className="bg-[#B30000] text-white px-4 py-2 rounded hover:bg-[#D63333] flex items-center gap-2">
          <FaPlus /> Add Supplier
        </button>
      </div>

      {/* Supplier Table */}
      <div className="overflow-x-auto bg-white rounded shadow-md">
        <table className="w-full table-auto text-sm">
          <thead className="bg-[#2C2C2C] text-white">
            <tr>
              <th className="p-3">ID</th>
              <th className="p-3">Company</th>
              <th className="p-3">Contact Person</th>
              <th className="p-3">Phone</th>
              <th className="p-3">Email</th>
              <th className="p-3">Address</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {suppliers.map((s, i) => (
              <tr key={i} className="border-t text-center hover:bg-[#F5F5F5]">
                <td className="p-2">{s.supplierId}</td>
                <td className="p-2 font-semibold text-[#B30000]">{s.companyName}</td>
                <td className="p-2">{s.contactPerson}</td>
                <td className="p-2">{s.phoneNumber}</td>
                <td className="p-2">{s.email}</td>
                <td className="p-2">{s.address}</td>
                <td className="p-2 flex justify-center gap-3">
                  <FaEdit className="text-yellow-600 cursor-pointer" onClick={() => handleEditClick(s)} />
                  <FaEye className="text-blue-600 cursor-pointer" onClick={() => fetchSupplierItems(s.companyName)} />
                  <FaTrash className="text-red-600 cursor-pointer" onClick={() => setConfirmDeleteId(s.supplierId)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ➤ Edit Modal */}
      {editModalOpen && selectedSupplier && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 w-full max-w-md rounded shadow-lg">
            <h3 className="text-xl font-bold mb-4 text-[#B30000]">Edit Supplier</h3>
            {["contactPerson", "phoneNumber", "email", "address"].map((field) => (
              <input key={field} placeholder={field}
                value={selectedSupplier[field] || ""}
                onChange={(e) => setSelectedSupplier({ ...selectedSupplier, [field]: e.target.value })}
                className="w-full p-2 border mb-3 rounded"
              />
            ))}
            <div className="flex justify-end gap-2">
              <button onClick={handleSaveUpdate} className="bg-[#B30000] text-white px-4 py-2 rounded">Save</button>
              <button onClick={() => setEditModalOpen(false)} className="bg-gray-400 px-4 py-2 rounded text-white">Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* ➤ Add Modal */}
      {addModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 w-full max-w-md rounded shadow-lg">
            <h3 className="text-xl font-bold mb-4 text-[#B30000]">Add New Supplier</h3>
            {Object.keys(newSupplier).map((key) => (
              <input key={key} type="text"
                value={newSupplier[key]}
                onChange={(e) => setNewSupplier({ ...newSupplier, [key]: e.target.value })}
                placeholder={key}
                disabled={key === "supplierId"}
                className={`w-full p-2 border mb-3 rounded ${key === "supplierId" ? "bg-gray-100 cursor-not-allowed" : ""}`}
              />
            ))}
            <div className="flex justify-end gap-2">
              <button onClick={handleAddSupplier} className="bg-[#B30000] text-white px-4 py-2 rounded">Add</button>
              <button onClick={() => setAddModalOpen(false)} className="bg-gray-400 px-4 py-2 rounded text-white">Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* ➤ Delete Confirmation Modal */}
      {confirmDeleteId && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow w-96 text-center">
            <h3 className="text-lg font-bold text-[#B30000] mb-4">Confirm Delete</h3>
            <p className="mb-6 text-[#2C2C2C]">Are you sure you want to delete this supplier?</p>
            <div className="flex justify-center gap-4">
              <button onClick={handleDeleteSupplier} className="bg-[#B30000] text-white px-4 py-2 rounded">Yes</button>
              <button onClick={() => setConfirmDeleteId(null)} className="bg-gray-400 text-white px-4 py-2 rounded">Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* View Items Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 w-3/4 max-h-[80vh] overflow-y-auto rounded shadow-lg">
            <h3 className="text-xl font-bold mb-4 text-[#B30000]">
              Items from {selectedSupplier}
            </h3>
            {supplierItems.length > 0 ? (
              <table className="w-full border text-sm">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="p-2 border">Item ID</th>
                    <th className="p-2 border">Item Name</th>
                    <th className="p-2 border">Category</th>
                    <th className="p-2 border">Stock</th>
                    <th className="p-2 border">Price</th>
                  </tr>
                </thead>
                <tbody>
                  {supplierItems.map((item, i) => (
                    <tr key={i}>
                      <td className="p-2 border">{item.itemId}</td>
                      <td className="p-2 border">{item.itemName}</td>
                      <td className="p-2 border">{item.category}</td>
                      <td className="p-2 border">{item.stockQuantity}</td>
                      <td className="p-2 border">Rs. {item.pricePerUnit}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="text-sm text-gray-500">No items found for this supplier.</p>
            )}
            <div className="mt-4 text-right">
              <button onClick={() => setShowModal(false)} className="bg-gray-600 text-white px-4 py-2 rounded">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SuppliersSection;
