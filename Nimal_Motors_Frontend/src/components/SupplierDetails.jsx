import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaBuilding } from "react-icons/fa";

const SuppliersSection = () => {
  const [suppliers, setSuppliers] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5001/api/suppliers")
      .then(res => setSuppliers(res.data))
      .catch(err => console.error("Failed to fetch suppliers:", err));
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">All Suppliers</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {suppliers.map((supplier, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-4 hover:shadow-xl transition-all">
            <h3 className="text-lg font-semibold flex items-center gap-2 text-blue-700">
              <FaBuilding /> {supplier.companyName}
            </h3>
            <p className="text-sm text-gray-600 mt-2">Supplier ID: <strong>{supplier.supplierId}</strong></p>
            <p className="flex items-center gap-2 text-sm mt-2"><FaPhone className="text-green-600" /> {supplier.phoneNumber}</p>
            <p className="flex items-center gap-2 text-sm mt-1"><FaEnvelope className="text-yellow-600" /> {supplier.email}</p>
            <p className="flex items-center gap-2 text-sm mt-1"><FaMapMarkerAlt className="text-red-600" /> {supplier.address}</p>
            <p className="text-sm mt-2"><strong>Contact Person:</strong> {supplier.contactPerson}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SuppliersSection;
