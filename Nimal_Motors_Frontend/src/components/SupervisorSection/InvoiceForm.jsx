import React, { useEffect, useState } from "react";

/* ---------- utils ---------- */
const num = (v) => (isNaN(+v) ? 0 : +v);

/* ---------- component ---------- */
const InvoiceForm = ({
  userRole = "staff",
  initialData = {},
  onCancel = () => {},
  onSubmit = () => {},
}) => {
  const [form, setForm] = useState({
    serviceID: initialData.displayID || "",
    customerName: initialData.customerName || "",
    vehicleNumber: initialData.vehicleNumber || "",
    presentMeter: initialData.presentMeter || "",
    serviceDate: initialData.serviceDate
      ? new Date(initialData.serviceDate).toISOString().split("T")[0]
      : "",
    submittedBy: initialData.submittedBy || "",
    description: initialData.description || "",
    adminRemarks: initialData.adminRemarks || "",
  });

  const [repairPackages, setRepairPackages] = useState([]);
  const [stock, setStock] = useState([]);
  const [repairs, setRepairs] = useState(
    initialData.repairs?.length ? initialData.repairs : []
  );
  const [items, setItems] = useState(
    initialData.items?.length ? initialData.items : []
  );
  const [section, setSection] = useState(initialData.section || "");

  useEffect(() => {
    fetch("http://localhost:5001/api/repair-packages")
      .then((r) => r.json())
      .then(setRepairPackages)
      .catch(() => setRepairPackages([]));

    fetch("http://localhost:5001/api/stock/items")
      .then((r) => r.json())
      .then(setStock)
      .catch(() => setStock([]));
  }, []);

  const calcPackagePrice = (repairList) =>
    repairList.reduce((sum, r) => sum + num(r.price), 0);

  const repairsCost = repairs.reduce(
    (sum, r) => sum + calcPackagePrice(r.repairs),
    0
  );
  const inventoryCost = items.reduce(
    (sum, i) => sum + i.qty * num(i.pricePerUnit),
    0
  );
  const totalCost = repairsCost + inventoryCost;

  const patchForm = (k, v) => setForm((p) => ({ ...p, [k]: v }));

  const addItem = () =>
    setItems((p) => [
      ...p,
      {
        category: "",
        item: "",
        qty: 1,
        pricePerUnit: 0,
        custom: false,
      },
    ]);

  const updateItem = (idx, field, value) =>
  setItems((prev) =>
    prev.map((row, i) =>
      i === idx
        ? (() => {
            const r = { ...row, [field]: value };
            if (field === "item" && !r.custom) {
              const found = stock.find((st) => st.itemName === value);
              if (found) {
                r.pricePerUnit = found.pricePerUnit;
                r.currentStockQty = found.stockQuantity; // 🔴 Add this
              }
            }
            return r;
          })()
        : row
    )
  );


  const removeItem = (idx) => setItems((p) => p.filter((_, i) => i !== idx));

  const addRepair = () =>
    setRepairs((p) => [
      ...p,
      {
        package: "",
        repairs: [],
        custom: false,
      },
    ]);

  const updateRepairRow = (idx, field, value) =>
    setRepairs((prev) =>
      prev.map((row, i) => (i === idx ? { ...row, [field]: value } : row))
    );

  const toggleRepairCheckbox = (idx, repairLabel) => {
    setRepairs((prev) =>
      prev.map((row, i) =>
        i === idx
          ? (() => {
              const exists = row.repairs.find((r) => r.label === repairLabel);
              const next = exists
                ? row.repairs.filter((r) => r.label !== repairLabel)
                : [...row.repairs, { label: repairLabel, price: 0 }];
              return { ...row, repairs: next };
            })()
          : row
      )
    );
  };

  const updateRepairPrice = (idx, repairLabel, newPrice) => {
    setRepairs((prev) =>
      prev.map((row, i) =>
        i === idx
          ? {
              ...row,
              repairs: row.repairs.map((r) =>
                r.label === repairLabel ? { ...r, price: num(newPrice) } : r
              ),
            }
          : row
      )
    );
  };

  const removeRepair = (idx) =>
    setRepairs((p) => p.filter((_, i) => i !== idx));

  const handleSubmit = (e) => {
    e.preventDefault();



    const mappedRepairs = repairs.map((r) => ({
      package: r.package || "Custom",
      repairs: r.repairs.map((rep) => ({
        label: rep.label,
        price: num(rep.price),
      })),
      price: calcPackagePrice(r.repairs),
    }));

    const mappedItems = items.map((it) => ({
      itemName: it.item,
      qty: num(it.qty),
      price: num(it.pricePerUnit),
    }));

    // ✅ Generate serviceID if it's missing (especially on new form)
    const generate4DigitID = () => {
      const randomNum = Math.floor(1000 + Math.random() * 9000); // always 4 digits
      return `SS${randomNum}`;
    };

    const payload = {
      serviceID: generate4DigitID(),
      customerName: form.customerName,
      vehicleNumber: form.vehicleNumber,
      presentMeter: num(form.presentMeter),
      serviceDate: new Date(form.serviceDate),
      description: form.description,
      repairs: mappedRepairs,
      items: mappedItems,
      totalCost: num(totalCost),
      adminRemarks: form.adminRemarks || "",
      section,
    };

    if (form.submittedBy?.trim()) {
      payload.submittedBy = form.submittedBy;
    }
    console.log("Submitting invoice payload:", payload);
    fetch("http://localhost:5001/api/invoice", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then((r) => {
        // if (!r.ok) throw new Error("HTTP " + r.status);
        return r.json();
      })
      .then(() => {
        alert("Invoice saved");
        onSubmit();
      })
      .catch((err) => alert("Save failed: " + err));

      const hasQuantityIssue = items.some(
  (i) => !i.custom && i.qty > (i.currentStockQty || 0)
);

if (hasQuantityIssue) {
  alert("One or more items exceed available stock quantity!");
  return;
}

  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-6xl mx-auto p-6 bg-white shadow rounded space-y-6 border border-red-600"
    >
      <h2 className="text-3xl font-bold text-center text-red-600">Invoice</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-black">
        {[
          // ["serviceID", "Service ID"],
          ["customerName", "Customer Name"],
          ["vehicleNumber", "Vehicle Number"],
          ["presentMeter", "Present Meter"],
          ["serviceDate", "Service Date", "date"],
          ["submittedBy", "Submitted By"],
        ].map(([k, pl, type = "text"]) => (
          <input
            key={k}
            type={type}
            placeholder={pl}
            value={form[k]}
            onChange={(e) => patchForm(k, e.target.value)}
            className="p-2 border rounded"
            required
          />
        ))}
        <select
          value={section}
          onChange={(e) => setSection(e.target.value)}
          className="p-2 border rounded text-black"
          required
        >
          <option value="" disabled>
            Select Section
          </option>
          <option value="mechanical">Mechanical</option>
          <option value="electrical">Electrical</option>
          <option value="bodyshop">Bodyshop</option>
          <option value="service">Service</option>
        </select>
      </div>

      <textarea
        placeholder="Description"
        value={form.description}
        onChange={(e) => patchForm("description", e.target.value)}
        className="w-full p-2 border rounded text-black"
      />

      {/* Repairs */}
      <div className="space-y-2">
        <div className="flex justify-between items-end">
          <h3 className="text-lg font-semibold">Repairs (Packages)</h3>
          <button
            type="button"
            onClick={addRepair}
            className="text-sm text-red-600"
          >
            + Add Repair
          </button>
        </div>

        <table className="w-full text-sm border border-gray-300 shadow-md rounded-md overflow-hidden">
          <thead className="bg-gradient-to-r from-red-400 to-red-500 text-white">
            <tr className="text-sm text-left">
              <th className="p-3 border-r border-red-200">Package</th>
              <th className="p-3 border-r border-red-200">Repairs</th>
              <th className="p-3 text-center">Remove</th>
            </tr>
          </thead>
          <tbody>
            {repairs.map((row, idx) => (
              <tr key={idx} className="hover:bg-gray-50">
                {/* Package Dropdown */}
                <td className="border-t p-2 w-70">
                  <select
                    value={row.package}
                    onChange={(e) =>
                      updateRepairRow(idx, "package", e.target.value)
                    }
                    className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-red-400"
                  >
                    <option value="">Select</option>
                    {[...new Set(repairPackages.map((p) => p.packageName))].map(
                      (pkg) => (
                        <option key={pkg} value={pkg}>
                          {pkg}
                        </option>
                      )
                    )}
                  </select>
                </td>

                {/* Repairs Column */}
                <td className="border-t p-2">
                  {row.custom ? (
                    <textarea
                      value={row.repairs.map((r) => r.label).join("\n")}
                      onChange={(e) =>
                        updateRepairRow(
                          idx,
                          "repairs",
                          e.target.value
                            .split("\n")
                            .filter((line) => line.trim().length > 0)
                            .map((label) => ({ label: label.trim(), price: 0 }))
                        )
                      }
                      className="w-full border border-gray-300 p-2 rounded resize-none focus:outline-none focus:ring-2 focus:ring-red-400"
                      rows={Math.max(3, row.repairs.length)}
                    />
                  ) : (
                    <div className="max-h-40 overflow-y-auto space-y-2 pr-2">
                      {repairPackages
                        .filter((p) => p.packageName === row.package)
                        .flatMap((p) => p.repairs)
                        .map((repairLabel, i) => {
                          const selected = row.repairs.find(
                            (r) => r.label === repairLabel
                          );
                          return (
                            <div
                              key={i}
                              className="flex items-center justify-between gap-3"
                            >
                              <div className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  checked={!!selected}
                                  onChange={() =>
                                    toggleRepairCheckbox(idx, repairLabel)
                                  }
                                  className="accent-red-500"
                                />
                                <span className="truncate w-80">
                                  {repairLabel}
                                </span>
                              </div>
                              {selected && (
                                <input
                                  type="number"
                                  value={selected.price}
                                  onChange={(e) =>
                                    updateRepairPrice(
                                      idx,
                                      repairLabel,
                                      e.target.value
                                    )
                                  }
                                  className="w-24 border border-gray-300 p-1 rounded focus:outline-none focus:ring-2 focus:ring-red-400 text-right"
                                  placeholder="Rs."
                                />
                              )}
                            </div>
                          );
                        })}
                    </div>
                  )}
                </td>

                {/* Remove Button */}
                <td className="border-t p-2 text-center">
                  <button
                    type="button"
                    onClick={() => removeRepair(idx)}
                    className="text-red-600 hover:text-red-800 text-lg"
                    title="Remove row"
                  >
                    ✕
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Items */}
      <div className="space-y-2">
        <div className="flex justify-between items-end">
          <h3 className="text-lg font-semibold">Inventory / Parts</h3>
          <button
            type="button"
            onClick={addItem}
            className="text-sm text-red-600"
          >
            + Add Item
          </button>
        </div>

        <table className="w-full text-sm border border-gray-300 shadow-md rounded-md overflow-hidden">
          <thead className="bg-gradient-to-r from-red-400 to-red-500 text-white">
            <tr className="text-left">
              <th className="p-3 border-r border-red-300">Category</th>
              <th className="p-3 border-r border-red-300">Item</th>
              <th className="p-3 border-r border-red-300 text-center">Qty</th>
              <th className="p-3 border-r border-red-300 text-center">
                Unit (Rs.)
              </th>
              <th className="p-3 text-center">Remove</th>
            </tr>
          </thead>
          <tbody>
            {items.map((row, idx) => (
              <tr key={idx} className="hover:bg-gray-50">
                {/* Category */}
                <td className="border-t p-2">
                  {row.custom ? (
                    <input
                      value={row.category}
                      onChange={(e) =>
                        updateItem(idx, "category", e.target.value)
                      }
                      className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-red-400"
                      placeholder="Enter category"
                    />
                  ) : (
                    <select
                      value={row.category}
                      onChange={(e) =>
                        updateItem(idx, "category", e.target.value)
                      }
                      className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-red-400"
                    >
                      <option value="">Select</option>
                      {[...new Set(stock.map((s) => s.category))].map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  )}
                </td>

                {/* Item */}
                <td className="border-t p-2">
                  {row.custom ? (
                    <input
                      value={row.item}
                      onChange={(e) => updateItem(idx, "item", e.target.value)}
                      className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-red-400"
                      placeholder="Enter item"
                    />
                  ) : (
                    <select
                      value={row.item}
                      onChange={(e) => updateItem(idx, "item", e.target.value)}
                      className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-red-400"
                    >
                      <option value="">Select</option>
                      {stock
                        .filter((s) => s.category === row.category)
                        .map((s) => (
                          <option key={s._id} value={s.itemName}>
                            {s.itemName}
                          </option>
                        ))}
                    </select>
                  )}
</td>
{/* Quantity */}
<td className="border-t p-2 text-center">
  <input
    type="number"
    min="1"
    value={row.qty}
    onChange={(e) =>
      updateItem(idx, "qty", num(e.target.value))
    }
    className={`w-20 border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-red-400 text-center ${
      !row.custom && row.qty > row.currentStockQty
        ? "border-red-600"
        : ""
    }`}
  />
  {!row.custom && row.item && (
    <div className="text-xs text-gray-600 mt-1">
      Available: {row.currentStockQty ?? "?"}
    </div>
  )}
  {!row.custom && row.qty > row.currentStockQty && (
    <div className="text-xs text-red-600 mt-1">
      Quantity exceeds stock!
    </div>
  )}
</td>

{/* Price per unit */}
<td className="border-t p-2 text-center">
  <input
    type="number"
    value={row.pricePerUnit}
    onChange={(e) =>
      updateItem(idx, "pricePerUnit", num(e.target.value))
    }
    className="w-24 border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-red-400 text-center"
    placeholder="Rs."
  />
</td>

                {/* Remove */}
                <td className="border-t p-2 text-center">
                  <button
                    type="button"
                    onClick={() => removeItem(idx)}
                    className="text-red-600 hover:text-red-800 text-lg"
                    title="Remove item"
                  >
                    ✕
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {userRole === "admin" && (
        <textarea
          placeholder="Admin Remarks"
          value={form.adminRemarks}
          onChange={(e) => patchForm("adminRemarks", e.target.value)}
          className="w-full p-2 border rounded text-black"
        />
      )}

      <div className="text-right text-lg font-semibold text-black">
        Total: Rs. {totalCost.toFixed(2)}
      </div>

      <div className="flex justify-end gap-4">
        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-500 text-white px-4 py-2 rounded"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="bg-red-600 text-white px-4 py-2 rounded"
        >
          Send Invoice
        </button>
      </div>
    </form>
  );
};

export default InvoiceForm;
