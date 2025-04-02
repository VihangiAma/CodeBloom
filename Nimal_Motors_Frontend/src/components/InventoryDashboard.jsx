import React, { useState, useEffect } from "react";
import { FaBoxes, FaChartPie, FaCog, FaUser, FaExclamationTriangle, FaTruck, FaHistory, FaEdit, FaTrash } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const InventoryDashboard = () => {
  const [inventory, setInventory] = useState([]);
  const [totalStock, setTotalStock] = useState(0);
  const [lowStockCount, setLowStockCount] = useState(0);
  const [totalSuppliers, setTotalSuppliers] = useState(0);
  const [recentUpdates, setRecentUpdates] = useState([]);
  const [editItem, setEditItem] = useState(null);
  const [deleteItemId, setDeleteItemId] = useState(null);
  const [formData, setFormData] = useState({ category: "", stock: "", supplier: "", id: "", price: "", name: "" });

  useEffect(() => {
    axios.get("http://localhost:5000/api/stock/items")
      .then((response) => {
        setInventory(response.data);
        setTotalStock(response.data.length);
        setLowStockCount(response.data.filter(item => item.stockQuantity < 50).length);
        setTotalSuppliers(new Set(response.data.map(item => item.supplierId)).size);
        setRecentUpdates(response.data.slice(-3));

        response.data.forEach(item => {
          if (item.stock < 50) {
            toast.warning(`Low Stock Alert: ${item.itemName} has only ${item.stockQuantity} left!`, {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
            });
          }
        });
      })
      .catch(error => console.error("Error fetching inventory:", error));
  }, []);

  const handleEditClick = (item) => {
    setEditItem(item);
    setFormData(item);
  };

  const handleDeleteClick = (id) => {
    setDeleteItemId(id);
  };

  const handleUpdate = () => {
    axios.put(`http://localhost:5000/api/stock/items/${editItem.id}`, formData)
      .then(() => {
        setInventory(inventory.map(item => (item.id === editItem.id ? formData : item)));
        toast.success("Stock item updated successfully!");
        setEditItem(null);
      })
      .catch(error => console.error("Error updating stock:", error));
  };

  const handleDeleteConfirm = () => {
    axios.delete(`http://localhost:5000/api/stock/items/${deleteItemId}`)
      .then(() => {
        setInventory(inventory.filter(item => item.id !== deleteItemId));
        toast.success("Stock item deleted successfully!");
        setDeleteItemId(null);
      })
      .catch(error => console.error("Error deleting stock:", error));
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-blue-700 text-white p-5 space-y-4">
        <h2 className="text-2xl font-bold">Nimal Motors</h2>
        <nav>
          <ul className="space-y-2">
            <li className="flex items-center gap-3 p-2 hover:bg-blue-600 rounded">
              <FaChartPie /> Dashboard
            </li>
            <li className="flex items-center gap-3 p-2 bg-white text-blue-700 rounded">
              <FaBoxes /> Inventory
            </li>
            <li className="flex items-center gap-3 p-2 hover:bg-blue-600 rounded">
              <FaCog /> Settings
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-gray-100 p-6">
        <header className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-semibold">Inventory Management</h1>
          <div className="flex items-center gap-4">
            <input type="text" placeholder="Search..." className="p-2 border rounded" />
            <FaUser className="text-2xl" />
          </div>
        </header>
         {/* Stats Cards */}
         <div className="grid grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded shadow-md flex items-center gap-3">
            <FaBoxes className="text-blue-600 text-2xl" />
            <div>
              <h2 className="text-lg font-bold">Total Stock</h2>
              <p className="text-xl">{totalStock}</p>
            </div>
          </div>
          <div className="bg-white p-4 rounded shadow-md flex items-center gap-3">
            <FaExclamationTriangle className="text-red-600 text-2xl" />
            <div>
              <h2 className="text-lg font-bold">Low Stock Alerts</h2>
              <p className="text-xl">{lowStockCount}</p>
            </div>
          </div>
          <div className="bg-white p-4 rounded shadow-md flex items-center gap-3">
            <FaTruck className="text-green-600 text-2xl" />
            <div>
              <h2 className="text-lg font-bold">Total Suppliers</h2>
              <p className="text-xl">{totalSuppliers}</p>
            </div>
          </div>
          <div className="bg-white p-4 rounded shadow-md flex items-center gap-3">
            <FaHistory className="text-purple-600 text-2xl" />
            <div>
              <h2 className="text-lg font-bold">Recent Updates</h2>
              <ul className="text-sm">
                {recentUpdates.map((item, index) => (
                  <li key={index}>{item.itemName} - {item.stockQuantity} pcs</li>
                ))}
                </ul>
              </div>
            </div>
          </div>

        {/* Inventory Table */}
        <div className="bg-white p-4 rounded shadow-md">
          <table className="w-full border-collapse border">
            <thead>
              <tr className="bg-blue-600 text-white">
                <th className="p-3">Category</th>
                <th className="p-3">Quantity</th>
                <th className="p-3">Supplier</th>
                <th className="p-3">ID</th>
                <th className="p-3">Price</th>
                <th className="p-3">Item Name</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {inventory.map((item, index) => (
                <tr key={index} className="text-center border-t">
                  <td className="p-3">{item.category}</td>
                  <td className="p-3">{item.stockQuantity}</td>
                  <td className="p-3">{item.supplierId}</td>
                  <td className="p-3">{item.itemId}</td>
                  <td className="p-3">{item.pricePerUnit}</td>
                  <td className="p-3">{item.itemName}</td>
                  <td className="p-3">
                    <button onClick={() => handleEditClick(item)} className="text-blue-600 p-1">
                      <FaEdit />
                    </button>
                    <button onClick={() => handleDeleteClick(item.id)} className="text-red-600 p-1 ml-3">
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Edit Stock Modal */}
        {editItem && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
            <div className="bg-white p-5 rounded shadow-md w-1/3">
              <h2 className="text-xl font-bold mb-4">Edit Stock Item</h2>
              <input type="text" value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value })} placeholder="Category" className="p-2 border w-full mb-2" />
              <input type="number" value={formData.quantity} onChange={e => setFormData({ ...formData, stock: e.target.value })} placeholder="Stock" className="p-2 border w-full mb-2" />
              <input type="text" value={formData.supplier} onChange={e => setFormData({ ...formData, supplier: e.target.value })} placeholder="Supplier" className="p-2 border w-full mb-2" />
              <input type="text" value={formData.id} disabled className="p-2 border w-full mb-2" />
              <input type="text" value={formData.price} onChange={e => setFormData({ ...formData, price: e.target.value })} placeholder="Price" className="p-2 border w-full mb-2" />
              <input type="text" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} placeholder="Item Name" className="p-2 border w-full mb-4" />
              <button onClick={handleUpdate} className="bg-blue-600 text-white p-2 rounded">Update</button>
              <button onClick={() => setEditItem(null)} className="ml-3 p-2">Cancel</button>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {deleteItemId && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
            <div className="bg-white p-5 rounded shadow-md w-1/3">
              <h2 className="text-xl font-bold mb-4">Confirm Delete?</h2>
              <button onClick={handleDeleteConfirm} className="bg-red-600 text-white p-2 rounded">Delete</button>
              <button onClick={() => setDeleteItemId(null)} className="ml-3 p-2">Cancel</button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default InventoryDashboard;
