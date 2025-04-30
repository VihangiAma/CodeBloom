import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaEdit,
  FaUserTie,
  FaIdCard,
  FaIndustry,
} from "react-icons/fa";

const SuppliersSection = () => {
  const [suppliers, setSuppliers] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5001/api/supplier/list")
      .then((res) => setSuppliers(res.data))
      .catch((err) => console.error("Failed to fetch suppliers:", err));
  }, []);

  const handleEditClick = (supplierId) => {
    alert(`Edit supplier functionality not yet implemented.\nSupplier ID: ${supplierId}`);
    // You can open a modal here for editing later
  };

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6 text-blue-700">Suppliers Directory</h2>
      <div className="overflow-x-auto rounded shadow-md bg-white">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="px-4 py-3"><FaIdCard /> ID</th>
              <th className="px-4 py-3"><FaIndustry /> Company</th>
              <th className="px-4 py-3"><FaUserTie /> Contact Person</th>
              <th className="px-4 py-3"><FaPhone /> Phone</th>
              <th className="px-4 py-3"><FaEnvelope /> Email</th>
              <th className="px-4 py-3"><FaMapMarkerAlt /> Address</th>
              <th className="px-4 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {suppliers.map((supplier, index) => (
              <tr key={index} className="border-b hover:bg-gray-100">
                <td className="px-4 py-2">{supplier.supplierId}</td>
                <td className="px-4 py-2 font-semibold text-blue-800">{supplier.companyName}</td>
                <td className="px-4 py-2">{supplier.contactPerson}</td>
                <td className="px-4 py-2">{supplier.phoneNumber}</td>
                <td className="px-4 py-2">{supplier.email}</td>
                <td className="px-4 py-2">{supplier.address}</td>
                <td className="px-4 py-2 text-center">
                  <button
                    onClick={() => handleEditClick(supplier.supplierId)}
                    className="text-yellow-600 hover:text-yellow-800"
                  >
                    <FaEdit /> Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {suppliers.length === 0 && (
          <div className="text-center p-4 text-gray-500">No suppliers found.</div>
        )}
      </div>
    </div>
  );
};

export default SuppliersSection;
