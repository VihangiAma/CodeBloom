import React, { useState, useEffect } from "react";

const InvoiceForm = ({ userRole, initialData = {}, onCancel, onSubmit }) => {
  const [section, setSection] = useState("mechanical");
  const [services, setServices] = useState({
    fullService: { selected: false, cost: 0 },
    bodyWash: { selected: false, cost: 0 },
    oilChange: { selected: false, cost: 0 },
    underbodyWash: { selected: false, cost: 0 },
    interiorVacuum: { selected: false, cost: 0 },
  });
  const [items, setItems] = useState([]);
  const [stockData, setStockData] = useState([]);
  const [totalCost, setTotalCost] = useState(0);
  const [customer, setCustomer] = useState({
    serviceID: initialData.displayID || "",
    customerName: initialData.customerName || "",
    vehicleNumber: initialData.vehicleNumber || "",
    vehicleType: initialData.vehicleType || "",
  });
  const [description, setDescription] = useState("");
  const [repairCost, setRepairCost] = useState(0);
  const [adminRemarks, setAdminRemarks] = useState("");

  useEffect(() => {
    fetch("http://localhost:5001/api/stock/items")
      .then((res) => res.json())
      .then((data) => setStockData(data));
  }, []);

  useEffect(() => {
    let serviceCost = Object.values(services).reduce(
      (sum, svc) => (svc.selected ? sum + Number(svc.cost || 0) : sum),
      0
    );
    let itemCost = items.reduce(
      (sum, item) => sum + item.qty * item.pricePerUnit,
      0
    );
    let total = serviceCost + itemCost + Number(repairCost || 0);
    setTotalCost(total);
  }, [services, items, repairCost]);

  const handleItemChange = (index, field, value) => {
    const updated = [...items];
    if (field === "item") {
      const selected = stockData.find((i) => i.itemName === value);
      updated[index][field] = value;
      updated[index].pricePerUnit = selected ? selected.pricePerUnit : 0;
    } else {
      updated[index][field] = value;
    }
    setItems(updated);
  };

  const addItemRow = () => {
    setItems([...items, { section, category: "", item: "", qty: 1, pricePerUnit: 0 }]);
  };

  const removeItemRow = (index) => {
    const updated = [...items];
    updated.splice(index, 1);
    setItems(updated);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      ...customer,
      description,
      services,
      items,
      repairCost: Number(repairCost || 0),
      totalCost,
      adminRemarks,
      section,
    };

    fetch("http://localhost:5001/api/invoice", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((_data) => {
        alert("Invoice submitted successfully");
        console.log(payload)
        if (onSubmit) onSubmit(); // optional callback
      });
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 space-y-4">
      <h2 className="text-xl font-bold text-center">Invoice</h2>

      <div className="grid grid-cols-2 gap-4">
        <input placeholder="Service ID" value={customer.serviceID} onChange={(e) => setCustomer({ ...customer, serviceID: e.target.value })} className="p-2 border" required />
        <input placeholder="Customer Name" value={customer.customerName} onChange={(e) => setCustomer({ ...customer, customerName: e.target.value })} className="p-2 border" required />
        <input placeholder="Vehicle Number" value={customer.vehicleNumber} onChange={(e) => setCustomer({ ...customer, vehicleNumber: e.target.value })} className="p-2 border" required />
        <input placeholder="Vehicle Type" value={customer.vehicleType} onChange={(e) => setCustomer({ ...customer, vehicleType: e.target.value })} className="p-2 border" required />
      </div>

      <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} className="w-full p-2 border" />

      <h4 className="text-xl font-bold">Services</h4>
      <div className="grid grid-cols-2 gap-4">
        {Object.entries(services).map(([key, value]) => (
          <div key={key} className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={value.selected}
              onChange={() => setServices({ ...services, [key]: { ...value, selected: !value.selected } })}
            />
            <label>{key}</label>
            <input
              type="number"
              value={value.cost}
              onChange={(e) => setServices({ ...services, [key]: { ...value, cost: e.target.value } })}
              className="p-1 border w-24"
              placeholder="Rs."
            />
          </div>
        ))}
      </div>

      <select value={section} onChange={(e) => setSection(e.target.value)} className="p-2 border text-xl font-bold">
        <option value="mechanical">Mechanical</option>
        <option value="electrical">Electrical</option>
        <option value="bodyshop">Bodyshop</option>
      </select>

      {section !== "service" && (
        <div>
          <button type="button" onClick={addItemRow} className="px-2 py-1 bg-blue-500 text-white rounded">+ Add Item</button>
          <div className="mt-4">
            <table className="min-w-full border-collapse">
              <thead>
                <tr>
                  <th className="p-2 border">Description</th>
                  <th className="p-2 border">Category</th>
                  <th className="p-2 border">Item</th>
                  <th className="p-2 border">Qty</th>
                  <th className="p-2 border">Cost</th>
                  <th className="p-2 border">Action</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, index) => (
                  <tr key={index}>
                    <td className="p-2 border">{item.section}</td>
                    <td className="p-2 border">
                      <select value={item.category} onChange={(e) => handleItemChange(index, "category", e.target.value)} className="p-1 border">
                        <option value="">Select Category</option>
                        {[...new Set(stockData.map((i) => i.category))].map((cat, i) => (
                          <option key={i} value={cat}>{cat}</option>
                        ))}
                      </select>
                    </td>
                    <td className="p-2 border">
                      <select value={item.item} onChange={(e) => handleItemChange(index, "item", e.target.value)} className="p-1 border">
                        <option value="">Select Item</option>
                        {stockData.filter((i) => i.category === item.category).map((i, k) => (
                          <option key={k} value={i.itemName}>{i.itemName}</option>
                        ))}
                      </select>
                    </td>
                    <td className="p-2 border">
                      <input
                        type="number"
                        value={item.qty}
                        min="1"
                        onChange={(e) => handleItemChange(index, "qty", parseInt(e.target.value))}
                        className="w-16 p-1 border"
                      />
                    </td>
                    <td className="p-2 border">Rs. {item.pricePerUnit}</td>
                    <td className="p-2 border">
                      <button type="button" onClick={() => removeItemRow(index)} className="text-red-600">Remove</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {userRole === "admin" && (
        <input placeholder="Admin Remarks" value={adminRemarks} onChange={(e) => setAdminRemarks(e.target.value)} className="w-full p-2 border" />
      )}

      <h5 className="text-xl">Repair Cost: Rs.</h5>
      <input
        type="number"
        placeholder="Repair Cost"
        value={repairCost}
        onChange={(e) => setRepairCost(e.target.value)}
        className="p-2 border"
        required
      />

      {/* Total cost breakdown */}
      <div className="mt-4">
        <table className="min-w-full border-collapse">
          <thead>
            <tr>
              <th className="p-2 border text-left">Service Cost</th>
              <th className="p-2 border text-left">Inventory Cost</th>
              <th className="p-2 border text-left">Repair Cost</th>
              <th className="p-2 border text-left font-bold">Total</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-2 border">
                Rs. {Object.values(services).reduce((sum, svc) => (svc.selected ? sum + Number(svc.cost || 0) : sum), 0)}
              </td>
              <td className="p-2 border">
                Rs. {items.reduce((sum, item) => sum + item.qty * item.pricePerUnit, 0)}
              </td>
              <td className="p-2 border">Rs. {Number(repairCost || 0)}</td>
              <td className="p-2 border font-bold">Rs. {totalCost}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Action buttons */}
      <div className="flex justify-end gap-4 mt-4">
        <button type="button" onClick={onCancel} className="px-4 py-2 bg-gray-400 text-white rounded">
          Cancel
        </button>
        <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded">
          Submit Invoice
        </button>
      </div>
    </form>
  );
};

export default InvoiceForm;

