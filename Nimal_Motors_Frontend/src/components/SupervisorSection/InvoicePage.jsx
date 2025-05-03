import React, { useState } from "react";

const categoryOptions = {
  "Remove & Fixing, Repairing": [
    "Full Service",
    "EFI Tune Up & Tappet Cover R & F",
    "Front & Rear Brake System check",
  ],
  "Painting": ["Interior Parts", "Cut & Polish", "Rear Bumper"],
  "Parts": [
    "Engine Oil (Toyota 10W-30)",
    "Oil Filter",
    "A/C Filter",
    "Air Filter",
    "Android Player & CAM",
    "Tappet Cover Packing",
  ],
};

const InvoicePage = () => {
  const [entries, setEntries] = useState([]);
  const [category, setCategory] = useState("");
  const [item, setItem] = useState("");
  const [qty, setQty] = useState("");
  const [amount, setAmount] = useState("");

  const addEntry = () => {
    if (category && item && qty && amount) {
      const newEntry = { category, item, qty, amount };
      setEntries([...entries, newEntry]);
      setItem("");
      setQty("");
      setAmount("");
    }
  };

  const handleSend = () => {
    console.log("Invoice sent:", entries);
    // Send to backend here
  };

  const handleCancel = () => {
    setEntries([]);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">Create Invoice</h2>

      {/* Entry Form */}
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
          {Object.keys(categoryOptions).map((cat) => (
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
          {category &&
            categoryOptions[category].map((itm) => (
              <option key={itm} value={itm}>
                {itm}
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
        onClick={addEntry}
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

      {/* Buttons */}
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

export default InvoicePage;
