import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


const AddStockItemForm = ({ supplierList = [], categoryList = [], onClose, onItemAdded }) => {
    const navigate = useNavigate(); // ✅ Initialize navigate
  const [formData, setFormData] = useState({
    category: "",
    stockQuantity: 0,
    companyName: "",
    itemId: "",
    pricePerUnit: 0,
    itemName: "",
    barcode: "",
    threshold: 10,
  });

  const [isNewCategory, setIsNewCategory] = useState(false);
  const [customCategory, setCustomCategory] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "category") {
      if (value === "__new__") {
        setIsNewCategory(true);
        setFormData(prev => ({ ...prev, category: "" }));
      } else {
        setIsNewCategory(false);
        setFormData(prev => ({ ...prev, category: value }));
      }
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const finalCategory = isNewCategory ? customCategory.trim() : formData.category;

    if (!finalCategory) {
      toast.error("Please enter a valid category.");
      return;
    }

    try {
      const existing = await axios.get("http://localhost:5001/api/stock/items");
      const duplicate = existing.data.find(
        (item) =>
          item.itemId === formData.itemId ||
          (formData.barcode && item.barcode === formData.barcode)
      );

      if (duplicate) {
        return toast.error("Item with the same ID or Barcode already exists.");
      }

      await axios.post("http://localhost:5001/api/stock/add", {
        ...formData,
        category: finalCategory,
        stockQuantity: parseInt(formData.stockQuantity),
        pricePerUnit: parseFloat(formData.pricePerUnit),
        threshold: parseInt(formData.threshold),
      });

      toast.success("Item added successfully!");
      setFormData({
        category: "",
        stockQuantity: 0,
        companyName: "",
        itemId: "",
        pricePerUnit: 0,
        itemName: "",
        barcode: "",
        threshold: 10,
      });
      setCustomCategory("");
      setIsNewCategory(false);

      if (onItemAdded) onItemAdded();
      if (onClose) onClose();
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to add item");
    }
  };
return (
  <form onSubmit={handleSubmit} className="max-w-xl mx-auto p-6 bg-white shadow-md rounded border border-gray-300">
    <h2 className="text-2xl font-bold text-[#B30000] mb-6 text-center">Add New Stock Item</h2>

    {/* ItemId, Name, Barcode */}
    {["itemId", "itemName", "barcode"].map((field) => (
      <div key={field} className="mb-4">
        <label className="block text-black text-base font-medium capitalize mb-1">{field}</label>
        <input
          type="text"
          name={field}
          value={formData[field]}
          onChange={handleChange}
          required
          className="w-full p-2 border border-gray-400 rounded bg-gray-100 text-black focus:ring-[#B30000] focus:border-[#B30000]"
        />
      </div>
    ))}

    {/* Category Dropdown */}
    <div className="mb-4">
      <label className="block text-black text-base font-medium mb-1">Category</label>
      <select
        name="category"
        value={isNewCategory ? "__new__" : formData.category}
        onChange={handleChange}
        className="w-full p-2 border border-gray-400 rounded bg-gray-100 text-black focus:ring-[#B30000] focus:border-[#B30000]"
      >
        <option value="">Select Category</option>
        {categoryList.map((cat, index) => (
          <option key={index} value={cat}>{cat}</option>
        ))}
        <option value="__new__">+ Add New Category</option>
      </select>
    </div>

    {/* Custom Category */}
    {isNewCategory && (
      <div className="mb-4">
        <label className="block text-black text-base font-medium mb-1">New Category</label>
        <input
          type="text"
          value={customCategory}
          onChange={(e) => setCustomCategory(e.target.value)}
          placeholder="Enter new category"
          className="w-full p-2 border border-gray-400 rounded bg-gray-100 text-black focus:ring-[#B30000] focus:border-[#B30000]"
        />
      </div>
    )}

    {/* Company Dropdown */}
    <div className="mb-4">
      <label className="block text-black text-base font-medium mb-1">Company Name</label>
      <select
        name="companyName"
        value={formData.companyName}
        onChange={handleChange}
        required
        className="w-full p-2 border border-gray-400 rounded bg-gray-100 text-black focus:ring-[#B30000] focus:border-[#B30000]"
      >
        <option value="">Select Company</option>
        {supplierList.map((s) => (
          <option key={s._id} value={s.companyName}>
            {s.companyName}
          </option>
        ))}
      </select>
    </div>

    {/* Quantity, Price, Threshold */}
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
      <div>
        <label className="block text-black text-base font-medium mb-1">Stock Quantity</label>
        <input
          type="number"
          name="stockQuantity"
          value={formData.stockQuantity}
          onChange={handleChange}
          className="w-full p-2 border border-gray-400 rounded bg-gray-100 text-black"
          min={0}
          required
        />
      </div>
      <div>
        <label className="block text-black text-base font-medium mb-1">Price per Unit (Rs.)</label>
        <input
          type="number"
          name="pricePerUnit"
          value={formData.pricePerUnit}
          onChange={handleChange}
          className="w-full p-2 border border-gray-400 rounded bg-gray-100 text-black"
          step="0.01"
          required
        />
      </div>
      <div>
        <label className="block text-black text-base font-medium mb-1">Threshold Qty</label>
        <input
          type="number"
          name="threshold"
          value={formData.threshold}
          onChange={handleChange}
          className="w-full p-2 border border-gray-400 rounded bg-gray-100 text-black"
          min={0}
        />
      </div>
    </div>

    {/* Buttons */}
    <div className="flex justify-end mt-6 gap-4">
      <button
        type="button"
        onClick={() => {
          if (onClose) onClose();
          navigate("/inventory-dashboard");
        }}
        className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
      >
        Cancel
      </button>
      <button
        type="submit"
        className="bg-[#B30000] text-white px-4 py-2 rounded hover:bg-[#D63333]"
      >
        Add Item
      </button>
    </div>
  </form>
);

};

export default AddStockItemForm;
