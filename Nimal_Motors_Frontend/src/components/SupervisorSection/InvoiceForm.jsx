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
                r.pricePerUnit = found ? found.pricePerUnit : 0;
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

    const payload = {
      serviceID: form.serviceID,
      customerName: form.customerName,
      vehicleNumber: form.vehicleNumber,
      presentMeter: num(form.presentMeter),
      serviceDate: new Date(form.serviceDate),
      description: form.description,
      repairs: mappedRepairs,
      items: mappedItems,
      totalCost: num(totalCost),
      adminRemarks: form.adminRemarks || "",
    };

    fetch("http://localhost:5001/api/invoice", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then((r) => {
        if (!r.ok) throw new Error("HTTP " + r.status);
        return r.json();
      })
      .then(() => {
        alert("Invoice saved");
        onSubmit();
      })
      .catch((err) => alert("Save failed: " + err));
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-6xl mx-auto p-6 bg-white shadow rounded space-y-6 border border-red-600"
    >
      <h2 className="text-3xl font-bold text-center text-red-600">Invoice</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-black">
        {[
          ["serviceID", "Service ID"],
          ["customerName", "Customer Name"],
          ["vehicleNumber", "Vehicle Number"],
          ["presentMeter", "Present Meter"],
          ["serviceDate", "Service Date", "date"],
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

        <table className="w-full text-sm border">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2">Package</th>
              <th className="border p-2">Custom?</th>
              <th className="border p-2">Repairs</th>
              <th className="border p-2">Remove</th>
            </tr>
          </thead>
          <tbody>
            {repairs.map((row, idx) => (
              <tr key={idx}>
                <td className="border p-1">
                  <select
                    value={row.package}
                    onChange={(e) =>
                      updateRepairRow(idx, "package", e.target.value)
                    }
                    className="w-full border p-1 rounded"
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
                <td className="border p-1 text-center">
                  <input
                    type="checkbox"
                    checked={row.custom}
                    onChange={() => updateRepairRow(idx, "custom", !row.custom)}
                  />
                </td>
                <td className="border p-1">
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
                      className="w-full border p-1 rounded"
                      rows={Math.max(3, row.repairs.length)}
                    />
                  ) : (
                    <div className="max-h-40 overflow-y-auto space-y-1 px-1">
                      {repairPackages
                        .filter((p) => p.packageName === row.package)
                        .flatMap((p) => p.repairs)
                        .map((repairLabel, i) => {
                          const selected = row.repairs.find(
                            (r) => r.label === repairLabel
                          );
                          return (
                            <div key={i} className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                checked={!!selected}
                                onChange={() =>
                                  toggleRepairCheckbox(idx, repairLabel)
                                }
                              />
                              <span className="w-32">{repairLabel}</span>
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
                                  className="w-20 border p-1 rounded"
                                  placeholder="Rs."
                                />
                              )}
                            </div>
                          );
                        })}
                    </div>
                  )}
                </td>
                <td className="border p-1 text-center">
                  <button
                    type="button"
                    onClick={() => removeRepair(idx)}
                    className="text-red-600"
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

        <table className="w-full text-sm border">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2">Category</th>
              <th className="border p-2">Custom?</th>
              <th className="border p-2">Item</th>
              <th className="border p-2">Qty</th>
              <th className="border p-2">Unit (Rs.)</th>
              <th className="border p-2"></th>
            </tr>
          </thead>
          <tbody>
            {items.map((row, idx) => (
              <tr key={idx}>
                <td className="border p-1">
                  {row.custom ? (
                    <input
                      value={row.category}
                      onChange={(e) =>
                        updateItem(idx, "category", e.target.value)
                      }
                      className="w-full border p-1 rounded"
                    />
                  ) : (
                    <select
                      value={row.category}
                      onChange={(e) =>
                        updateItem(idx, "category", e.target.value)
                      }
                      className="w-full border p-1 rounded"
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
                <td className="border p-1 text-center">
                  <input
                    type="checkbox"
                    checked={row.custom}
                    onChange={() => updateItem(idx, "custom", !row.custom)}
                  />
                </td>
                <td className="border p-1">
                  {row.custom ? (
                    <input
                      value={row.item}
                      onChange={(e) => updateItem(idx, "item", e.target.value)}
                      className="w-full border p-1 rounded"
                    />
                  ) : (
                    <select
                      value={row.item}
                      onChange={(e) => updateItem(idx, "item", e.target.value)}
                      className="w-full border p-1 rounded"
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
                <td className="border p-1">
                  <input
                    type="number"
                    min="1"
                    value={row.qty}
                    onChange={(e) =>
                      updateItem(idx, "qty", num(e.target.value))
                    }
                    className="w-20 border p-1 rounded"
                  />
                </td>
                <td className="border p-1">
                  <input
                    type="number"
                    value={row.pricePerUnit}
                    onChange={(e) =>
                      updateItem(idx, "pricePerUnit", num(e.target.value))
                    }
                    className="w-24 border p-1 rounded"
                  />
                </td>
                <td className="border p-1 text-center">
                  <button
                    type="button"
                    onClick={() => removeItem(idx)}
                    className="text-red-600"
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
