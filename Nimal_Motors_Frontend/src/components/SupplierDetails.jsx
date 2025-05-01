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
  const [supplierItems, setSupplierItems] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5001/api/supplier/list")
      .then((res) => setSuppliers(res.data))
      .catch((err) => console.error("Failed to fetch suppliers:", err));
  }, []);

  const handleEditClick = (supplierId) => {
    alert(`Edit supplier functionality not yet implemented.\nSupplier ID: ${supplierId}`);
  };

  const fetchSupplierItems = async (companyName) => {
    try {
      const res = await axios.get(`http://localhost:5001/api/stock/by-supplier/${companyName}`);
      setSupplierItems(res.data);
      setSelectedSupplier(companyName);
      setShowModal(true);
    } catch (err) {
      console.error("Error fetching supplier items:", err);
    }
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
                <td className="px-4 py-2 text-center space-y-2">
                  <button
                    onClick={() => handleEditClick(supplier.supplierId)}
                    className="text-yellow-600 hover:text-yellow-800 block mb-2"
                  >
                    <FaEdit /> Edit
                  </button>
                  <button
                    onClick={() => fetchSupplierItems(supplier.companyName)}
                    className="text-blue-600 hover:underline text-sm"
                  >
                    View Items
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

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-2/3 max-h-[80vh] overflow-y-auto shadow-lg">
            <h3 className="text-xl font-bold mb-4 text-blue-700">
              Items from {selectedSupplier}
            </h3>

            {supplierItems.length > 0 ? (
              <table className="w-full border-collapse border text-sm">
                <thead className="bg-gray-200 text-gray-700">
                  <tr>
                    <th className="p-2 border">Item ID</th>
                    <th className="p-2 border">Item Name</th>
                    <th className="p-2 border">Category</th>
                    <th className="p-2 border">Stock</th>
                    <th className="p-2 border">Price</th>
                  </tr>
                </thead>
                <tbody>
                  {supplierItems.map((item, index) => (
                    <tr key={index} className="hover:bg-gray-100">
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
              <button
                onClick={() => setShowModal(false)}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
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
