import React, { useState, useEffect } from "react";
import { FaBoxes, FaChartPie, FaCog, FaUser, FaExclamationTriangle, FaTruck, FaHistory, FaEdit, FaTrash, FaBarcode } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from 'react-router-dom';
import logoImage from "../assets/images/logo.jpg";
import SuppliersSection from "./SupplierDetails";

const InventoryDashboard = () => {
  // States for inventory, filters, supplier info, modals
  const [inventory, setInventory] = useState([]);
  const [totalStock, setTotalStock] = useState(0);
  const [lowStockCount, setLowStockCount] = useState(0);
  const [totalSuppliers, setTotalSuppliers] = useState(0);
  const [recentUpdates, setRecentUpdates] = useState([]);
  const [editItem, setEditItem] = useState(null);
  const [deleteItemId, setDeleteItemId] = useState(null);
  const [formData, setFormData] = useState({ category: "", stockQuantity: "", supplierId: "", id: "", pricePerUnit: "", itemName: "" });
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [categories, setCategories] = useState([]);
  const [barcodeModalOpen, setBarcodeModalOpen] = useState(false);
  const [barcodeInput, setBarcodeInput] = useState("");
  const [foundItem, setFoundItem] = useState(null);
  const [quantityToAdd, setQuantityToAdd] = useState("");
  const [activeSection, setActiveSection] = useState("inventory");
  const [supplierList, setSupplierList] = useState([]);

  const navigate = useNavigate();

  // Load all inventory items and calculate summaries
  useEffect(() => {
    axios.get("http://localhost:5001/api/stock/items")
      .then((response) => {
        setInventory(response.data);
        const uniqueCategories = [...new Set(response.data.map(item => item.category))];
        setCategories(uniqueCategories);
        setTotalStock(response.data.length);
        setLowStockCount(response.data.filter(item => item.stockQuantity < 50).length);
        setTotalSuppliers(new Set(response.data.map(item => item.companyName)).size);
        setRecentUpdates(response.data.slice(-3));
      })
      .catch(error => console.error("Error fetching inventory:", error));
  }, []);

  // Filter inventory table
  const filteredInventory = inventory.filter(item =>
    item.itemName.toLowerCase().includes(searchQuery.toLowerCase()) &&
    (categoryFilter === "" || item.category === categoryFilter)
  );
  

  // Load supplier list
  useEffect(() => {
    axios.get("http://localhost:5001/api/supplier/list")
      .then(res => setSupplierList(res.data))
      .catch(err => console.error("Failed to fetch supplier list", err));
  }, []);

  // Edit Item (opens modal and loads data)
  const handleEditClick = (item) => {
    setEditItem(item);
    setFormData(item);
  };

  // Delete item setup
  const handleDeleteClick = (id) => {
    setDeleteItemId(id);
  };

  // Save changes from Edit Modal
  const handleUpdate = () => {
    if (!editItem) {
      toast.error("No item to edit!");
      return;
    }

    const updatedFields = {};
    Object.keys(formData).forEach(key => {
      if (formData[key] !== editItem[key]) {
        updatedFields[key] = formData[key];
      }
    });

    if (Object.keys(updatedFields).length === 0) {
      toast.info("No changes detected.");
      return;
    }

    axios.put(`http://localhost:5001/api/stock/update/${editItem.itemId}`, updatedFields)
      .then(() => {
        axios.get("http://localhost:5001/api/stock/items")
          .then((res) => {
            setInventory(res.data);
          })
          .catch(err => {
            console.error("Error fetching inventory:", err);
            toast.error("Failed to refresh inventory.");
          });

        toast.success("Stock item updated successfully!");
        setEditItem(null);
      })
      .catch(error => {
        console.error("Error updating stock:", error);
        toast.error("Failed to update item!");
      });
  };

  // Confirm delete from modal
  const handleDeleteConfirm = () => {
    if (!deleteItemId) return;

    axios.delete(`http://localhost:5001/api/stock/delete/${deleteItemId}`)
      .then(() => {
        setInventory(prevInventory => prevInventory.filter(item => item.itemId !== deleteItemId));
        toast.success("Stock item deleted successfully!");
        setDeleteItemId(null);
      })
      .catch(error => {
        console.error("Error deleting stock:", error);
        toast.error("Failed to delete item!");
      });
  };

  // Handle barcode inputs
  const handleBarcodeSubmit = async () => {
    if (!barcodeInput.trim()) {
      toast.error("Please enter a barcode before submitting!");
      return;
    }

    try {
      const response = await axios.get(`http://localhost:5001/api/stock/barcode/${barcodeInput.trim()}`);
      const matchedItem = response.data;

      if (matchedItem) {
        setFoundItem(matchedItem);
      } else {
        alert("No item found for this barcode.");
        setFoundItem(null);
      }
    } catch (error) {
      console.error("Error checking barcode:", error);
      alert("Failed to check barcode. Please try again.");
    }
  };

  // Add stock from barcode modal
  const handleAddStockViaBarcode = async () => {
    if (!foundItem || !quantityToAdd) return;

    try {
      await axios.put(`http://localhost:5001/api/stock/barcode/${foundItem.barcodeInput}/add-stock`, {
        quantityToAdd: parseInt(quantityToAdd)
      });

      toast.success(`Successfully added ${quantityToAdd} units to ${foundItem.itemName}`);
      setFoundItem(null);
      setQuantityToAdd("");
      setBarcodeInput("");
      setBarcodeModalOpen(false);

      const updatedInventory = await axios.get("http://localhost:5001/api/stock/items");
      setInventory(updatedInventory.data);
    } catch (err) {
      console.error("Update error:", err);
      toast.error("Failed to update stock.");
    }
  };

  return (
    <div className="flex h-screen w-screen bg-[#F5F5F5] min-w-0">
      {/* Sidebar */}
      <aside className="w-64 bg-[#2C2C2C] text-white p-5 space-y-4">
        <div className="flex flex-col items-center">
          <img src={logoImage} alt="logo" className="w-20 h-20 mb-2 rounded" />
          <h2 className="text-2xl font-bold text-white">Nimal Motors</h2>
        </div>

        <nav>
          <ul className="space-y-2">
            <li
              className={`flex items-center gap-3 p-2 rounded cursor-pointer ${activeSection === "inventory" ? "bg-[#B30000] text-white" : "hover:bg-[#5A5A5A]"}`}
              onClick={() => setActiveSection("inventory")}
            >
              <FaBoxes /> Inventory
            </li>
            <li
              className={`flex items-center gap-3 p-2 rounded cursor-pointer ${activeSection === "suppliers" ? "bg-[#B30000] text-white" : "hover:bg-[#5A5A5A]"}`}
              onClick={() => setActiveSection("suppliers")}
            >
              <FaTruck /> Suppliers
            </li>
            <li>
              <button
                onClick={() => setBarcodeModalOpen(true)}
                className="w-full  text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-[#5A5A5A] shadow-sm"
              >
                <FaBarcode /> Add via Barcode
              </button>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-[#F5F5F5] p-6">
        {activeSection === "inventory" && (
          <>
            {/* Header and Filters */}
            <header className="flex justify-between items-center mb-6">
              <h1 className="text-3xl font-semibold text-[#B30000]">Inventory Management</h1>
              <div className="flex items-center gap-4">
                <input
                  type="text"
                  placeholder="Search..."
                  className="p-2 border border-[#2C2C2C] rounded text-[#000000] focus:ring-[#B30000] focus:border-[#B30000]"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <select
                  className="p-2 border border-[#2C2C2C] rounded text-[#000000] focus:ring-[#B30000] focus:border-[#B30000]"
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                >
                  <option value="">All Categories</option>
                  {categories.map((category, index) => (
                    <option key={index} value={category}>{category}</option>
                  ))}
                </select>
                <div
                  onClick={() => navigate("/accountant-dashboard")}
                  className="flex items-center gap-2 cursor-pointer text-[#000000] hover:text-[#B30000] transition"
                  title="Go to Accountant Dashboard"
                >
                  <FaUser className="text-2xl" />
                  <span className="hidden sm:inline font-medium">Accountant</span>
                </div>
              </div>
            </header>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div className="bg-[#FFFFFF] p-4 rounded shadow-md flex items-center gap-3">
                <FaBoxes className="text-[#B30000] text-2xl" />
                <div>
                  <h2 className="text-lg font-bold text-[#000000]">Total Stock</h2>
                  <p className="text-xl text-[#000000]">{totalStock}</p>
                </div>
              </div>
              <div className="bg-[#FFFFFF] p-4 rounded shadow-md flex items-center gap-3">
                <FaExclamationTriangle className="text-[#B30000] text-2xl" />
                <div>
                  <h2 className="text-lg font-bold text-[#000000]">Low Stock Alerts</h2>
                  <p className="text-xl text-[#000000]">{lowStockCount}</p>
                </div>
              </div>
              <div className="bg-[#FFFFFF] p-4 rounded shadow-md flex items-center gap-3">
                <FaTruck className="text-[#B30000] text-2xl" />
                <div>
                  <h2 className="text-lg font-bold text-[#000000]">Total Suppliers</h2>
                  <p className="text-xl text-[#000000]">{totalSuppliers}</p>
                </div>
              </div>
              <div className="bg-[#FFFFFF] p-4 rounded shadow-md flex items-center gap-3">
                <FaHistory className="text-[#B30000] text-2xl" />
                <div>
                  <h2 className="text-lg font-bold text-[#000000]">Recent Updates</h2>
                  <ul className="text-sm text-[#000000]">
                    {recentUpdates.map((item, index) => (
                      <li key={index}>{item.itemName} - {item.stockQuantity} pcs</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Inventory Table */}
            <div className="bg-[#FFFFFF] p-4 rounded shadow-md">
              <table className="w-full border-collapse border border-[#2C2C2C]">
                <thead>
                  <tr className="bg-[#B30000] text-white">
                    <th className="p-3">Item ID</th>
                    <th className="p-3">Item Name</th>
                    <th className="p-3">Category</th>
                    <th className="p-3">Quantity</th>
                    <th className="p-3">Price</th>
                    <th className="p-3">Company Name</th>
                    <th className="p-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredInventory.map((item, index) => (
                    <tr key={index} className="text-center border-t border-[#2C2C2C] hover:bg-[#F5F5F5]">
                      <td className="p-3 text-[#000000]">{item.itemId}</td>
                      <td className="p-3 text-[#000000]">{item.itemName}</td>
                      <td className="p-3 text-[#000000]">{item.category}</td>
                      <td className="p-3 text-[#000000]">{item.stockQuantity}</td>
                      <td className="p-3 text-[#000000]">{item.pricePerUnit}</td>
                      <td className="p-3 text-[#000000]">{item.companyName}</td>
                      <td className="p-3">
                        <button onClick={() => handleEditClick(item)} className="text-[#B30000] hover:text-[#D63333] p-1">
                          <FaEdit />
                        </button>
                        <button onClick={() => handleDeleteClick(item.itemId)} className="text-[#B30000] hover:text-[#D63333] p-1 ml-3">
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
        {activeSection === "suppliers" && (
          <SuppliersSection />
        )}

        {/* Barcode Modal */}
        {barcodeModalOpen && (
          <div className="fixed inset-0 bg-[#000000] bg-opacity-40 flex justify-center items-center z-50">
            <div className="bg-[#FFFFFF] p-6 rounded shadow-lg w-96">
              <h2 className="text-xl font-bold mb-4 text-[#B30000]">Enter Barcode</h2>
              {!foundItem ? (
                <>
                  <input
                    type="text"
                    placeholder="Scan or Enter Barcode"
                    value={barcodeInput}
                    onChange={(e) => setBarcodeInput(e.target.value)}
                    className="p-2 border border-[#2C2C2C] rounded text-[#000000] w-full mb-4 focus:ring-[#B30000] focus:border-[#B30000]"
                  />
                  <div className="flex justify-end gap-4">
                    <button onClick={handleBarcodeSubmit} className="bg-[#B30000] text-white px-4 py-2 rounded hover:bg-[#D63333] shadow-sm">OK</button>
                    <button onClick={() => setBarcodeModalOpen(false)} className="bg-[#2C2C2C] text-white px-4 py-2 rounded hover:bg-[#5A5A5A] shadow-sm">Cancel</button>
                  </div>
                </>
              ) : (
                <>
                  <p className="mb-2 text-[#000000]">Item: <strong>{foundItem.itemName}</strong></p>
                  <p className="mb-2 text-[#000000]">Current Stock: {foundItem.stockQuantity}</p>
                  <input
                    type="number"
                    placeholder="Enter Quantity to Add"
                    value={quantityToAdd}
                    onChange={(e) => setQuantityToAdd(e.target.value)}
                    className="p-2 border border-[#2C2C2C] rounded text-[#000000] w-full mb-4 focus:ring-[#B30000] focus:border-[#B30000]"
                  />
                  <div className="flex justify-end gap-4">
                    <button onClick={handleAddStockViaBarcode} className="bg-[#B30000] text-white px-4 py-2 rounded hover:bg-[#D63333] shadow-sm">Add</button>
                    <button onClick={() => { setFoundItem(null); setBarcodeInput(""); }} className="bg-[#2C2C2C] text-white px-4 py-2 rounded hover:bg-[#5A5A5A] shadow-sm">Back</button>
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        {/* Edit Item Modal */}
        {editItem && (
          <div className="fixed inset-0 flex items-center justify-center bg-[#000000] bg-opacity-50 z-50">
            <div className="bg-[#FFFFFF] p-6 rounded-lg shadow-lg w-full max-w-md">
              <h2 className="text-2xl font-bold mb-4 text-[#B30000] text-center">Edit Stock Item</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-[#000000] mb-1">Category</label>
                  <input
                    type="text"
                    value={formData.category}
                    onChange={e => setFormData({ ...formData, category: e.target.value })}
                    placeholder="Enter category"
                    className="w-full px-3 py-2 border border-[#2C2C2C] rounded text-[#000000] focus:outline-none focus:ring-2 focus:ring-[#B30000]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#000000] mb-1">Stock Quantity</label>
                  <input
                    type="number"
                    value={formData.stockQuantity}
                    onChange={e => setFormData({ ...formData, stockQuantity: e.target.value })}
                    placeholder="Enter quantity"
                    className="w-full px-3 py-2 border border-[#2C2C2C] rounded text-[#000000] focus:outline-none focus:ring-2 focus:ring-[#B30000]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#000000] mb-1">Company</label>
                  <select
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    className="w-full px-3 py-2 border border-[#2C2C2C] rounded text-[#000000] focus:outline-none focus:ring-2 focus:ring-[#B30000]"
                  >
                    <option value="">Select Company</option>
                    {supplierList.map((supplier) => (
                      <option key={supplier.supplierId} value={supplier.companyName}>
                        {supplier.companyName}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#000000] mb-1">Price per Unit</label>
                  <input
                    type="text"
                    value={formData.pricePerUnit}
                    onChange={e => setFormData({ ...formData, pricePerUnit: e.target.value })}
                    placeholder="Rs."
                    className="w-full px-3 py-2 border border-[#2C2C2C] rounded text-[#000000] focus:outline-none focus:ring-2 focus:ring-[#B30000]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#000000] mb-1">Item Name</label>
                  <input
                    type="text"
                    value={formData.itemName}
                    onChange={e => setFormData({ ...formData, itemName: e.target.value })}
                    placeholder="Enter item name"
                    className="w-full px-3 py-2 border border-[#2C2C2C] rounded text-[#000000] focus:outline-none focus:ring-2 focus:ring-[#B30000]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#000000] mb-1">Barcode</label>
                  <input
                    type="text"
                    value={formData.barcode}
                    onChange={e => setFormData({ ...formData, barcode: e.target.value })}
                    placeholder="Enter barcode"
                    className="w-full px-3 py-2 border border-[#2C2C2C] rounded text-[#000000] focus:outline-none focus:ring-2 focus:ring-[#B30000]"
                  />
                </div>
              </div>
              <div className="mt-6 flex justify-end gap-3">
                <button
                  onClick={handleUpdate}
                  className="bg-[#B30000] text-white px-4 py-2 rounded hover:bg-[#D63333] shadow-sm"
                >
                  Update
                </button>
                <button
                  onClick={() => setEditItem(null)}
                  className="bg-[#2C2C2C] text-white px-4 py-2 rounded hover:bg-[#5A5A5A] shadow-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {deleteItemId && (
          <div className="fixed inset-0 flex items-center justify-center bg-[#000000] bg-opacity-50">
            <div className="bg-[#FFFFFF] p-5 rounded shadow-md w-1/3">
              <h2 className="text-xl font-bold mb-4 text-[#B30000]">Confirm Delete?</h2>
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => {
                    console.log("Delete button clicked!");
                    handleDeleteConfirm();
                  }}
                  className="bg-[#B30000] text-white px-4 py-2 rounded hover:bg-[#D63333] shadow-sm"
                >
                  Yes
                </button>
                <button
                  onClick={() => setDeleteItemId(null)}
                  className="bg-[#2C2C2C] text-white px-4 py-2 rounded hover:bg-[#5A5A5A] shadow-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default InventoryDashboard;