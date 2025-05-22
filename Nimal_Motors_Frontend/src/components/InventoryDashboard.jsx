import React, { useState, useEffect } from "react";
import { FaBoxes, FaChartPie, FaCog, FaUser, FaExclamationTriangle, FaTruck, FaHistory, FaEdit, FaTrash,FaBarcode } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
//import { useHistory } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import logoImage from "../assets/logo.jpg"
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
  const[barcodeModalOpen,setBarcodeModalOpen] = useState(false);
  const[barcodeInput,setBarcodeInput] = useState("");
  //const [barcode, setBarcode] = useState("");
  const [foundItem, setFoundItem] = useState(null);
  const [quantityToAdd, setQuantityToAdd] = useState("");
  const [activeSection, setActiveSection] = useState("inventory");
  const [supplierList, setSupplierList] = useState([]);


  //const [lowStockItems, setLowStockItems] = useState([]);

  /*const history = useHistory();
history.push('/some-route');
 */
    const navigate = useNavigate();
    /*const fetchLowStockItems = async () => {
      try {
        const response = await axios.get("http://localhost:5001/api/stock/low-stock");
        setLowStockItems(response.data);
      } catch (error) {
        console.error("Error fetching low stock items:", error);
      }
    };*/

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
        
//fetchLowStockItems();
 // const interval = setInterval(fetchLowStockItems, 60000); // Refresh every minute
  //  return () => clearInterval(interval);

        // Prevent multiple warnings by checking previous alerts
       /*response.data.forEach(item => {
          if (item.stockQuantity < 50) {
            toast.warning(`Low Stock Alert: ${item.itemName} has only ${item.stockQuantity} left!`, {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
            });
          }
        });*/
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
        if (formData[key] !== editItem[key]) { // Only include changed fields
            updatedFields[key] = formData[key];
        }
    });

    // If no fields were changed, show a message and return
    if (Object.keys(updatedFields).length === 0) {
        toast.info("No changes detected.");
        return;
    }

    console.log("Sending update request with:", updatedFields); // Debugging

    axios.put(`http://localhost:5001/api/stock/update/${editItem.itemId}`, updatedFields)
      .then((response) => {
        console.log("Update Response:", response.data);

        // Refresh the inventory after the update
        axios.get("http://localhost:5001/api/stock/items")
          .then((res) => {
            setInventory(res.data); // Assuming setInventory updates your state
          })
          .catch(err => {
            console.error("Error fetching inventory:", err);
            toast.error("Failed to refresh inventory.");
          });

        toast.success("Stock item updated successfully!");
        setEditItem(null);  // Reset editItem after the update
      })
      .catch(error => {
        console.error("Error updating stock:", error);
        toast.error("Failed to update item!");
      });
};



  
    
  
 /* const handleDeleteClick = (id) => {
    console.log("Delete button clicked for ID:", id); // Debugging step
    setDeleteItemId(id);
  };*/
  
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
  /*const navigateToAccountantProfile = () => {
    history.push("/accountant"); // Navigating to the accountant's profile page
  };*/


  //handle barcode inputs
  const handleBarcodeSubmit = async () => {
    if (!barcodeInput.trim())  {
      toast.error("Please enter a barcode before submitting!");
      return;
    }
  
    try {
      const response = await axios.get(`http://localhost:5001/api/stock/barcode/${barcodeInput.trim()}`);
      const matchedItem = response.data;
  
      if (matchedItem) {
        setFoundItem(matchedItem); // set for Add stock
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
  
      // Clear modal and input
      setFoundItem(null);
      setQuantityToAdd("");
      setBarcodeInput("");
      setBarcodeModalOpen(false);
  
      // Refresh the inventory
      const updatedInventory = await axios.get("http://localhost:5001/api/stock/items");
      setInventory(updatedInventory.data);
  
    } catch (err) {
      console.error("Update error:", err);
      toast.error("Failed to update stock.");
    }
  };
  

  
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-red-500 text-white p-5 space-y-4 h-200">
      <img src={logoImage} alt="logo" className="w-25 h-20 mb-2" />

        <h2 className="text-2xl font-bold">Nimal Motors</h2>

        <nav>
          <ul className="space-y-2">  
      <li className="flex items-center gap-3 p-2 bg-red text-white rounded hover:bg-black" onClick={() => setActiveSection("inventory")} >
              <FaBoxes /> Inventory
            </li>
            <li
        className={`flex items-center gap-3 p-2 rounded cursor-pointer ${activeSection === "suppliers"? "bg-gray-500 text-black" : "hover:bg-black"}`}
        onClick={() => setActiveSection("suppliers") }
      >
        <FaTruck /> Suppliers
      </li>
            
      
         <button
         onClick={() => setBarcodeModalOpen(true)}
         className="bg-gray text-black px-4 py-2 rounded flex items-center gap-2 hover:bg-black"
       >
         <FaBarcode /> Add via Barcode
       </button>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-#7D0A0A p-6 w-300 h-300">
      {activeSection === "inventory" && (
    <>
        {/* Header and Filters */}
        <header className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-semibold">Inventory Management</h1>
          <div className="flex items-center gap-4">
            <input type="text" placeholder="Search..." className="p-2 border rounded" value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)} />
            <select
              className="p-2 border rounded"
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
  className="flex items-center gap-2 cursor-pointer text-gray-700 hover:text-red-600 transition"
  title="Go to Accountant Dashboard"
>
  <FaUser className="text-2xl" />
  <span className="hidden sm:inline font-medium">Accountant</span>
</div>

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
              <tr className="bg-red-500 text-white">

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
                <tr key={index} className="text-center border-t">
                   <td className="p-3">{item.itemId}</td>
                  <td className="p-3">{item.itemName}</td>
                  <td className="p-3">{item.category}</td>
                  <td className="p-3">{item.stockQuantity}</td>
                   <td className="p-3">{item.pricePerUnit}</td>
                   <td className="p-3">{item.companyName}</td>
                       <td className="p-3">
                    <button onClick={() => handleEditClick(item)} className="text-blue-600 p-1">
                      <FaEdit />
                    </button>
                    <button onClick={() => handleDeleteClick(item.itemId)} className="text-red-600 p-1 ml-3">
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
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Enter Barcode</h2>
            {!foundItem ? (
              <>
                <input
                  type="text"
                  placeholder="Scan or Enter Barcode"
                  value={barcodeInput}
                  onChange={(e) => setBarcodeInput(e.target.value)}
                  className="p-2 border w-full mb-4"
                />
                <div className="flex justify-end gap-4">
                  <button onClick={handleBarcodeSubmit} className="bg-blue-600 text-black px-4 py-2 rounded">OK</button>
                  <button onClick={() => setBarcodeModalOpen(false)} className="bg-gray-400 text-black px-4 py-2 rounded">Cancel</button>
                </div>
              </>
            ) : (
              <>
                <p className="mb-2">Item: <strong>{foundItem.itemName}</strong></p>
                <p className="mb-2">Current Stock: {foundItem.stockQuantity}</p>
                <input
                  type="number"
                  placeholder="Enter Quantity to Add"
                  value={quantityToAdd}
                  onChange={(e) => setQuantityToAdd(e.target.value)}
                  className="p-2 border w-full mb-4"
                />
                <div className="flex justify-end gap-4">
                  <button onClick={handleAddStockViaBarcode} className="bg-green-600 text-black px-4 py-2 rounded">Add</button>
                  <button onClick={() => { setFoundItem(null); setBarcodeInput(""); }} className="bg-gray-400 text-black px-4 py-2 rounded">Back</button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

{/* Edit Item Modal */}
        {editItem && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
      <h2 className="text-2xl font-bold mb-4 text-red-600 text-center">Edit Stock Item</h2>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
          <input 
            type="text" 
            value={formData.category} 
            onChange={e => setFormData({ ...formData, category: e.target.value })} 
            placeholder="Enter category" 
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-400"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Stock Quantity</label>
          <input 
            type="number" 
            value={formData.stockQuantity} 
            onChange={e => setFormData({ ...formData, stockQuantity: e.target.value })} 
            placeholder="Enter quantity" 
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-400"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
          <select
            value={formData.companyName}
            onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-400"
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
          <label className="block text-sm font-medium text-gray-700 mb-1">Price per Unit</label>
          <input 
            type="text" 
            value={formData.pricePerUnit} 
            onChange={e => setFormData({ ...formData, pricePerUnit: e.target.value })} 
            placeholder="Rs." 
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-400"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Item Name</label>
          <input 
            type="text" 
            value={formData.itemName} 
            onChange={e => setFormData({ ...formData, itemName: e.target.value })} 
            placeholder="Enter item name" 
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-400"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Barcode</label>
          <input 
            type="text" 
            value={formData.barcode} 
            onChange={e => setFormData({ ...formData, barcode: e.target.value })} 
            placeholder="Enter barcode" 
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-400"
          />
        </div>
      </div>

      <div className="mt-6 flex justify-end gap-3">
        <button
          onClick={handleUpdate}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
        >
          Update
        </button>
        <button
          onClick={() => setEditItem(null)}
          className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 transition"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
)}

{/* Delete Confirmation Modal */}
{deleteItemId && (  // Check if there's an item to delete
  <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
    <div className="bg-white p-5 rounded shadow-md w-1/3">
      <h2 className="text-xl font-bold mb-4">Confirm Delete?</h2>
      <button onClick={() => {
  console.log("Delete button clicked!");
  handleDeleteConfirm();
}}>Yes</button>

      <button onClick={() => setDeleteItemId(null)} className="ml-3 p-2">Cancel</button>
    </div>
  </div>
)}
 </main>
    </div>
  );
};

export default InventoryDashboard;
