
import React, { useState, useEffect } from "react";
import axios from "axios";

const InvoicePage = () => {
  const [entries, setEntries] = useState([]);
  const [categories, setCategories] = useState([]);
  const [inventoryItems, setInventoryItems] = useState([]);
  const [category, setCategory] = useState("");
  const [item, setItem] = useState("");
  const [qty, setQty] = useState("");
  const [amount, setAmount] = useState("");

  const [formData, setFormData] = useState({
    serviceID: "",
    customerName: "",
    vehicleNumber: "",
    vehicleType: "",
    contactPhone: "",
    description: "",
    serviceCost: 0,
    totalCost: 0, // Initial total cost is 0
  });

  useEffect(() => {
    axios
      .get("http://localhost:5001/api/stock/items")
      .then((response) => {
        const items = response.data;
        setInventoryItems(items);
        const uniqueCategories = [
          ...new Set(items.map((item) => item.category)),
        ];
        setCategories(uniqueCategories);
      })
      .catch((error) =>
        console.error("Error fetching inventory items:", error)
      );
  }, []);

  const getItemsForCategory = (selectedCategory) => {
    return inventoryItems.filter((inv) => inv.category === selectedCategory);
  };

  const handleAddEntry = () => {
    if (category && item && qty && amount) {
      const newEntry = { category, item, qty, amount };
      setEntries([...entries, newEntry]);
      setItem("");
      setQty("");
      setAmount("");
    }
  };

  const calculateTotalAmount = () => {
    const itemTotalCost = entries.reduce(
      (total, entry) => total + entry.qty * entry.amount,
      0
    );
    return parseFloat(formData.serviceCost) + itemTotalCost;
  };

  const handleSend = () => {
    // Combine the invoice data with entries
    const invoiceData = {
      ...formData,
      items: entries,
      totalCost: calculateTotalAmount(),
    };

    // Send to backend here
    axios
      .post("http://localhost:5001/api/service-invoices", invoiceData)
      .then((response) => {
        console.log("Invoice sent:", response.data);
        alert("Invoice sent successfully!");
      })
      .catch((error) => {
        console.error("Error sending invoice:", error);
        alert("Failed to send invoice. Please try again.");
      });
  };

  const handleCancel = () => {
    setEntries([]);
    setFormData({
      serviceID: "",
      customerName: "",
      vehicleNumber: "",
      vehicleType: "",
      contactPhone: "",
      description: "",
      serviceCost: 0,
      totalCost: 0,
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">Create Invoice</h2>

      {/* Service Info */}
      <div>
        <label className="block mb-1 font-medium">Service ID</label>
        <input
          type="text"
          name="serviceID"
          value={formData.serviceID}
          disabled
          className="w-full p-2 border rounded-lg bg-gray-100"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block mb-1 font-medium">Customer Name</label>
          <input
            type="text"
            name="customerName"
            value={formData.customerName}
            onChange={(e) =>
              setFormData({ ...formData, customerName: e.target.value })
            }
            className="w-full p-2 border rounded-lg"
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Contact Number</label>
          <input
            type="text"
            name="contactPhone"
            value={formData.contactPhone}
            onChange={(e) =>
              setFormData({ ...formData, contactPhone: e.target.value })
            }
            className="w-full p-2 border rounded-lg"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block mb-1 font-medium">Vehicle Number</label>
          <input
            type="text"
            name="vehicleNumber"
            value={formData.vehicleNumber}
            onChange={(e) =>
              setFormData({ ...formData, vehicleNumber: e.target.value })
            }
            className="w-full p-2 border rounded-lg"
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Vehicle Type</label>
          <select
            name="vehicleType"
            value={formData.vehicleType}
            onChange={(e) =>
              setFormData({ ...formData, vehicleType: e.target.value })
            }
            className="w-full p-2 border rounded-lg"
            required
          >
            <option value="">-- Select Type --</option>
            <option value="Car">Car</option>
            <option value="Van">Van</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block mb-1 font-medium">Description / Notes</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            className="w-full p-2 border rounded-lg"
            rows="3"
            placeholder="Special instructions or comments..."
          />
        </div>
        <div>
          <label className="block mb-1 font-medium mt-4">Service cost(LKR)</label>
          <input
            type="number"
            name="serviceCost"
            value={formData.serviceCost}
            onChange={(e) =>
              setFormData({ ...formData, serviceCost: e.target.value })
            }
            className="w-full p-2 border rounded-lg"
            placeholder="Service cost of service"
            min="0"
            step="100"
          />
        </div>
      </div>

      {/* Entry Form for Items */}
      <div className="grid grid-cols-4 gap-4 mb-4">
        <select
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
            setItem("");
          }}
          className="border px-2 py-1 rounded"
        >
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <select
          value={item}
          onChange={(e) => setItem(e.target.value)}
          className="border px-2 py-1 rounded"
          disabled={!category}
        >
          <option value="">Select Item</option>
          {getItemsForCategory(category).map((itm) => (
            <option key={itm.itemId} value={itm.itemName}>
              {itm.itemName}
            </option>
          ))}
        </select>

        <input
          type="number"
          placeholder="Qty"
          value={qty}
          onChange={(e) => setQty(e.target.value)}
          className="border px-2 py-1 rounded"
        />

        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="border px-2 py-1 rounded"
        />
      </div>

      <button
        onClick={handleAddEntry}
        className="mb-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
      >
        Add Item
      </button>

      {/* Invoice Table */}
      <table className="w-full border text-sm mb-6">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-2 py-1">Sr No</th>
            <th className="border px-2 py-1">Description</th>
            <th className="border px-2 py-1">Qty</th>
            <th className="border px-2 py-1">Amount</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((entry, index) => (
            <tr key={index}>
              <td className="border px-2 py-1 text-center">{index + 1}</td>
              <td className="border px-2 py-1">
                <strong>{entry.category}</strong>
                <div>{entry.item}</div>
              </td>
              <td className="border px-2 py-1 text-center">{entry.qty}</td>
              <td className="border px-2 py-1 text-right">{entry.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Total Cost */}
      <div className="flex justify-between mb-4">
        <span className="font-semibold">Total Cost</span>
        <span className="font-semibold">
          {calculateTotalAmount()} LKR
        </span>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end space-x-4">
        <button
          onClick={handleCancel}
          className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400"
        >
          Cancel
        </button>
        <button
          onClick={handleSend}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default InvoicePage
