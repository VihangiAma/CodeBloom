import React, { useEffect, useState } from "react";

/** Util – safe number */
const num = (v) => (isNaN(+v) ? 0 : +v);

const InvoiceForm = ({
  userRole = "staff", // "admin" gets the remarks box
  initialData = {}, // pass existing invoice to edit
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

  /* repairs & stock fetched from API */
  const [repairPackages, setRepairPackages] = useState([]); // GET /repair-packages
  const [stock, setStock] = useState([]); // GET /stock/items

  /* line-item state */
  const [repairs, setRepairs] = useState(initialData.repairs || []);
  const [items, setItems] = useState(initialData.items || []);

  /* section state */
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

  const inventoryCost = items.reduce(
    (s, i) => s + i.qty * num(i.pricePerUnit),
    0
  );
  const repairsCost = repairs.reduce((s, r) => s + num(r.price), 0);
  const totalCost = repairsCost + inventoryCost;

  const patchForm = (k, v) => setForm((p) => ({ ...p, [k]: v }));

  /** inventory row helpers */
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
    setItems((p) =>
      p.map((row, i) =>
        i === idx
          ? (() => {
              const r = { ...row, [field]: value };
              if (field === "item" && !r.custom) {
                const found = stock.find((s) => s.itemName === value);
                r.pricePerUnit = found ? found.pricePerUnit : 0;
              }
              return r;
            })()
          : row
      )
    );

  const removeItem = (idx) => setItems((p) => p.filter((_, i) => i !== idx));

  /** repair row helpers */
  const addRepair = () =>
    setRepairs((p) => [
      ...p,
      {
        package: "",
        repair: "",
        price: 0,
        custom: false,
      },
    ]);

  const updateRepair = (idx, field, value) =>
    setRepairs((p) =>
      p.map((row, i) =>
        i === idx
          ? (() => {
              const r = { ...row, [field]: value };
              if (field === "repairs" && !r.custom) {
                const found = repairPackages.find(
                  (pkg) =>
                    pkg.packageName === row.package && pkg.repairs === value
                );
                r.price = found ? found.price : 0;
              }
              return r;
            })()
          : row
      )
    );

  const removeRepair = (idx) =>
    setRepairs((p) => p.filter((_, i) => i !== idx));

  const handleSubmit = (e) => {
    e.preventDefault();

    const mappedRepairs = repairs.map((r) => ({
      package: r.package || "Custom", // fallback
      repair: r.repair,
      price: Number(r.price),
    }));

    const mappedItems = items.map((i) => ({
      itemName: i.item,
      qty: Number(i.qty),
      price: Number(i.pricePerUnit),
    }));

    const payload = {
      serviceID: form.serviceID,
      customerName: form.customerName,
      vehicleNumber: form.vehicleNumber,
      presentMeter: Number(form.presentMeter),
      serviceDate: new Date(form.serviceDate),
      description: form.description,
      repair: mappedRepairs,
      items: mappedItems,
      totalCost: Number(totalCost),
      adminRemarks: form.adminRemarks || "",
    };

    console.log("Submitting payload:", JSON.stringify(payload, null, 2));

    fetch("http://localhost:5001/api/invoice", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then((res) => {
        if (!res.ok) {
          return res.json().then((err) => {
            console.error("Server error response:", err);
            throw new Error(`HTTP ${res.status}`);
          });
        }
        return res.json();
      })
      .then(() => {
        alert("Invoice submitted successfully");
        if (onSubmit) onSubmit();
      })
      .catch((err) => {
        console.error("Error submitting invoice:", err);
        alert("Failed to submit invoice. Please check the data.");
      });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-6xl mx-auto p-6 bg-white shadow rounded space-y-6 border border-red-600"
    >
      <h2 className="text-3xl font-bold text-center text-red-600">Invoice</h2>

      {/* Customer & job info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-black">
        {[
          ["serviceID", "Service ID"],
          ["customerName", "Customer Name"],
          ["vehicleNumber", "Vehicle Number"],
          ["presentMeter", "Present Meter"],
          ["serviceDate", "Service Date", "date"],
        ].map(([key, label, type = "text"]) => (
          <input
            key={key}
            type={type}
            placeholder={label}
            value={form[key]}
            onChange={(e) => patchForm(key, e.target.value)}
            className="p-2 border rounded"
            required
          />
        ))}

        {/* Section selector */}
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

      {/* Description */}
      <textarea
        placeholder="Description"
        value={form.description}
        onChange={(e) => patchForm("description", e.target.value)}
        className="w-full p-2 border rounded text-black"
      />

      {/* Repairs Table */}
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
              <th className="border p-2">Repair</th>
              <th className="border p-2">Price (Rs.)</th>
              <th className="border p-2"></th>
            </tr>
          </thead>
          <tbody>
            {repairs.map((row, idx) => (
              <tr key={idx}>
                <td className="border p-1">
                  <select
                    value={row.package}
                    onChange={(e) =>
                      updateRepair(idx, "package", e.target.value)
                    }
                    className="w-full border p-1 rounded"
                  >
                    <option value="">Select</option>
                    {repairPackages.map((pkg) => (
                      <option key={pkg._id} value={pkg.packageName}>
                        {pkg.packageName}
                      </option>
                    ))}
                  </select>
                </td>

                <td className="border p-1 text-center">
                  <input
                    type="checkbox"
                    checked={row.custom}
                    onChange={() => updateRepair(idx, "custom", !row.custom)}
                  />
                </td>

                <td className="border p-1">
                  {row.custom ? (
                    <input
                      value={row.repairs}
                      onChange={(e) =>
                        updateRepair(idx, "repairs", e.target.value)
                      }
                      className="w-full border p-1 rounded"
                    />
                  ) : (
                    <select
                      value={row.repairs}
                      onChange={(e) =>
                        updateRepair(idx, "repairs", e.target.value)
                      }
                      className="w-full border p-1 rounded"
                    >
                      <option value="">Select repair</option>
                      {repairPackages
                        .filter((p) => p.packageName === row.package)
                        .map((p) => (
                          <option key={p._id} value={p.repairs}>
                            {p.repairs}
                          </option>
                        ))}
                    </select>
                  )}
                </td>

                <td className="border p-1">
                  <input
                    type="number"
                    value={row.price}
                    onChange={(e) =>
                      updateRepair(idx, "price", num(e.target.value))
                    }
                    className="w-full border p-1 rounded"
                  />
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

      {/* Inventory Table */}
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

      {/* Admin remarks */}
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

      {/* Actions */}
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
