// import React, { useState, useEffect } from "react";

// const InvoiceForm = ({ userRole, initialData = {}, onCancel, onSubmit }) => {
//   const [section, setSection] = useState("mechanical");
//   const [services, setServices] = useState({
//     fullService: { selected: false, cost: 0 },
//     bodyWash: { selected: false, cost: 0 },
//     oilChange: { selected: false, cost: 0 },
//     underbodyWash: { selected: false, cost: 0 },
//     interiorVacuum: { selected: false, cost: 0 },
//   });
//   const [items, setItems] = useState([]);
//   const [stockData, setStockData] = useState([]);
//   const [totalCost, setTotalCost] = useState(0);
//   const [customer, setCustomer] = useState({
//     serviceID: initialData.displayID || "",
//     customerName: initialData.customerName || "",
//     vehicleNumber: initialData.vehicleNumber || "",
//     vehicleType: initialData.vehicleType || "",
//     contactNumber: initialData.contact?.phone || "",
//   });
//   const [description, setDescription] = useState("");
//   const [repairCost, setRepairCost] = useState(0);
//   const [adminRemarks, setAdminRemarks] = useState("");

//   useEffect(() => {
//     fetch("http://localhost:5001/api/stock/items")
//       .then((res) => res.json())
//       .then((data) => setStockData(data));
//   }, []);

//   useEffect(() => {
//     let serviceCost = Object.values(services).reduce(
//       (sum, svc) => (svc.selected ? sum + Number(svc.cost || 0) : sum),
//       0
//     );
//     let itemCost = items.reduce(
//       (sum, item) => sum + item.qty * item.pricePerUnit,
//       0
//     );
//     let total = serviceCost + itemCost + Number(repairCost || 0);
//     setTotalCost(total);
//   }, [services, items, repairCost]);

//   const handleItemChange = (index, field, value) => {
//     const updated = [...items];
//     const current = updated[index];

//     if (field === "item" && !current.custom) {
//       const selected = stockData.find((i) => i.itemName === value);
//       current.item = value;
//       current.pricePerUnit = selected ? selected.pricePerUnit : 0;
//     } else {
//       current[field] = value;
//     }

//     setItems(updated);
//   };

//   const addItemRow = () => {
//     setItems([
//       ...items,
//       {
//         section,
//         category: "",
//         item: "",
//         qty: 1,
//         pricePerUnit: 0,
//         custom: false,
//       },
//     ]);
//   };

//   const removeItemRow = (index) => {
//     const updated = [...items];
//     updated.splice(index, 1);
//     setItems(updated);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const payload = {
//       ...customer,
//       description,
//       services,
//       items,
//       repairCost: Number(repairCost || 0),
//       totalCost,
//       adminRemarks,
//       section,
//     };

//     fetch("http://localhost:5001/api/invoice", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(payload),
//     })
//       .then((res) => res.json())
//       .then(() => {
//         alert("Invoice submitted successfully");
//         if (onSubmit) onSubmit();
//       });
//   };

//   return (
//     <form
//       onSubmit={handleSubmit}
//       className="max-w-6xl mx-auto p-6 bg-white shadow-lg rounded-lg space-y-6 border border-red-600"
//     >
//       <h2 className="text-3xl font-bold text-center text-red-600">
//         Invoice Form
//       </h2>

//       {/* Customer Info */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-black">
//         <input
//           className="p-3 border rounded shadow-sm"
//           placeholder="Service ID"
//           value={customer.serviceID}
//           onChange={(e) =>
//             setCustomer({ ...customer, serviceID: e.target.value })
//           }
//           required
//         />
//         <input
//           className="p-3 border rounded shadow-sm"
//           placeholder="Customer Name"
//           value={customer.customerName}
//           onChange={(e) =>
//             setCustomer({ ...customer, customerName: e.target.value })
//           }
//           required
//         />
//         <input
//           className="p-3 border rounded shadow-sm"
//           placeholder="Vehicle Number"
//           value={customer.vehicleNumber}
//           onChange={(e) =>
//             setCustomer({ ...customer, vehicleNumber: e.target.value })
//           }
//           required
//         />
//         <input
//           className="p-3 border rounded shadow-sm"
//           placeholder="Vehicle Type"
//           value={customer.vehicleType}
//           onChange={(e) =>
//             setCustomer({ ...customer, vehicleType: e.target.value })
//           }
//           required
//         />
//         <input
//           className="p-3 border rounded shadow-sm"
//           placeholder="Contact Number"
//           value={customer.contactNumber || ""}
//           onChange={(e) =>
//             setCustomer({ ...customer, contactNumber: e.target.value })
//           }
//           required
//         />
//       </div>

//       <textarea
//         className="w-full p-3 border rounded shadow-sm text-black"
//         placeholder="Description"
//         value={description}
//         onChange={(e) => setDescription(e.target.value)}
//       />

//       {/* Service Selection */}
//       <h4 className="text-xl font-semibold text-gray-800">Service Selection</h4>
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
//         {Object.entries(services).map(([key, value]) => (
//           <div
//             key={key}
//             className="flex items-center bg-gray-100 p-3 rounded shadow-sm"
//           >
//             <input
//               type="checkbox"
//               checked={value.selected}
//               onChange={() =>
//                 setServices({
//                   ...services,
//                   [key]: { ...value, selected: !value.selected },
//                 })
//               }
//               className="mr-2"
//             />
//             <label className="flex-1 capitalize text-black">{key}</label>
//             <input
//               type="number"
//               value={value.cost}
//               onChange={(e) =>
//                 setServices({
//                   ...services,
//                   [key]: { ...value, cost: e.target.value },
//                 })
//               }
//               className="p-2 border rounded w-24 text-black"
//               placeholder="Rs."
//             />
//           </div>
//         ))}
//       </div>

//       <select
//         value={section}
//         onChange={(e) => setSection(e.target.value)}
//         className="p-2 border rounded text-lg font-medium text-black"
//       >
//         <option value="service">Service</option>
//         <option value="mechanical">Mechanical</option>
//         <option value="electrical">Electrical</option>
//         <option value="bodyshop">Bodyshop</option>
//       </select>

//       {/* Inventory Table */}
//       {section !== "service" && (
//         <>
//           <button
//             type="button"
//             onClick={addItemRow}
//             className="mt-4 px-4 py-2  bg-red-600 text-white rounded shadow hover:bg-red-700"
//           >
//             + Add Item
//           </button>
//           <table className="min-w-full mt-4 border text-sm text-black">
//             <thead className="bg-black text-white">
//               <tr>
//                 <th className="p-2 border">Section</th>
//                 <th className="p-2 border">Custom?</th>
//                 <th className="p-2 border">Category</th>
//                 <th className="p-2 border">Item</th>
//                 <th className="p-2 border">Qty</th>
//                 <th className="p-2 border">Unit Cost</th>
//                 <th className="p-2 border">Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {items.map((item, index) => (
//                 <tr key={index}>
//                   <td className="p-2 border">{item.section}</td>
//                   <td className="p-2 border text-center">
//                     <input
//                       type="checkbox"
//                       checked={item.custom}
//                       onChange={() => {
//                         const updated = [...items];
//                         updated[index].custom = !updated[index].custom;
//                         setItems(updated);
//                       }}
//                     />
//                   </td>
//                   <td className="p-2 border">
//                     {item.custom ? (
//                       <input
//                         type="text"
//                         value={item.category}
//                         onChange={(e) =>
//                           handleItemChange(index, "category", e.target.value)
//                         }
//                         className="p-1 border rounded w-24"
//                       />
//                     ) : (
//                       <select
//                         value={item.category}
//                         onChange={(e) =>
//                           handleItemChange(index, "category", e.target.value)
//                         }
//                         className="p-1 border rounded"
//                       >
//                         <option value="">Select</option>
//                         {[...new Set(stockData.map((i) => i.category))].map(
//                           (cat, i) => (
//                             <option key={i} value={cat}>
//                               {cat}
//                             </option>
//                           )
//                         )}
//                       </select>
//                     )}
//                   </td>
//                   <td className="p-2 border">
//                     {item.custom ? (
//                       <input
//                         type="text"
//                         value={item.item}
//                         onChange={(e) =>
//                           handleItemChange(index, "item", e.target.value)
//                         }
//                         className="p-1 border rounded"
//                       />
//                     ) : (
//                       <select
//                         value={item.item}
//                         onChange={(e) =>
//                           handleItemChange(index, "item", e.target.value)
//                         }
//                         className="p-1 border rounded"
//                       >
//                         <option value="">Select</option>
//                         {stockData
//                           .filter((i) => i.category === item.category)
//                           .map((i, k) => (
//                             <option key={k} value={i.itemName}>
//                               {i.itemName}
//                             </option>
//                           ))}
//                       </select>
//                     )}
//                   </td>
//                   <td className="p-2 border">
//                     <input
//                       type="number"
//                       min="1"
//                       value={item.qty}
//                       onChange={(e) =>
//                         handleItemChange(index, "qty", parseInt(e.target.value))
//                       }
//                       className="w-16 p-1 border rounded"
//                     />
//                   </td>
//                   <td className="p-2 border">
//                     <input
//                       type="number"
//                       value={item.pricePerUnit}
//                       onChange={(e) =>
//                         handleItemChange(
//                           index,
//                           "pricePerUnit",
//                           Number(e.target.value)
//                         )
//                       }
//                       className="w-24 p-1 border rounded"
//                     />
//                   </td>
//                   <td className="p-2 border">
//                     <button
//                       type="button"
//                       onClick={() => removeItemRow(index)}
//                       className="text-red-700 font-semibold"
//                     >
//                       Remove
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </>
//       )}

//       {userRole === "admin" && (
//         <input
//           placeholder="Admin Remarks"
//           value={adminRemarks}
//           onChange={(e) => setAdminRemarks(e.target.value)}
//           className="w-full p-3 border rounded shadow-sm text-black"
//         />
//       )}

//       {/* Repair Cost & Summary */}
//       <h5 className="text-lg text-black font-medium mt-6">Repair Cost</h5>
//       <input
//         type="number"
//         placeholder="Repair Cost"
//         value={repairCost}
//         onChange={(e) => setRepairCost(e.target.value)}
//         className="p-3 border rounded w-64 text-black"
//         required
//       />

//       <div className="mt-6">
//         <table className="w-full text-left border">
//           <thead className="bg-gray-200 text-black">
//             <tr>
//               <th className="p-2 border">Service Cost</th>
//               <th className="p-2 border">Inventory Cost</th>
//               <th className="p-2 border">Repair Cost</th>
//               <th className="p-2 border font-bold">Total</th>
//             </tr>
//           </thead>
//           <tbody>
//             <tr className="text-black font-medium">
//               <td className="p-2 border">
//                 Rs.{" "}
//                 {Object.values(services).reduce(
//                   (sum, svc) =>
//                     svc.selected ? sum + Number(svc.cost || 0) : sum,
//                   0
//                 )}
//               </td>
//               <td className="p-2 border">
//                 Rs.{" "}
//                 {items.reduce(
//                   (sum, item) => sum + item.qty * item.pricePerUnit,
//                   0
//                 )}
//               </td>
//               <td className="p-2 border">Rs. {Number(repairCost || 0)}</td>
//               <td className="p-2 border font-bold">Rs. {totalCost}</td>
//             </tr>
//           </tbody>
//         </table>
//       </div>

//       <div className="flex justify-end gap-4 mt-6">
//         <button
//           type="button"
//           onClick={onCancel}
//           className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-black"
//         >
//           Cancel
//         </button>
//         <button
//           type="submit"
//           className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
//         >
//           Submit Invoice
//         </button>
//       </div>
//     </form>
//   );
// };

// export default InvoiceForm;
import React, { useState, useEffect } from "react";

const InvoiceForm = ({ userRole, initialData = {}, onCancel, onSubmit }) => {
  const [repairs, setRepairs] = useState([]);
  const [availableRepairs, setAvailableRepairs] = useState([]);
  const [items, setItems] = useState([]);
  const [stockData, setStockData] = useState([]);
  const [totalCost, setTotalCost] = useState(0);

  const [formData, setFormData] = useState({
    serviceID: initialData.serviceID || "",
    customerName: initialData.customerName || "",
    vehicleNumber: initialData.vehicleNumber || "",
    presentMeter: initialData.presentMeter || "",
    serviceDate: initialData.serviceDate
      ? new Date(initialData.serviceDate).toISOString().split("T")[0]
      : "",
    description: initialData.description || "",
    isApproved: initialData.isApproved || false,
    adminRemarks: initialData.adminRemarks || "",
  });

  useEffect(() => {
    fetch("http://localhost:5001/api/repair-packages")
      .then((res) => res.json())
      .then((data) => setAvailableRepairs(data));

    fetch("http://localhost:5001/api/stock/items")
      .then((res) => res.json())
      .then((data) => setStockData(data));
  }, []);

  useEffect(() => {
    const repairTotal = repairs.reduce(
      (sum, r) => sum + Number(r.price || 0),
      0
    );
    const itemTotal = items.reduce((sum, i) => sum + i.qty * i.price, 0);
    setTotalCost(repairTotal + itemTotal);
  }, [repairs, items]);

  const handleRepairChange = (index, field, value) => {
    const updated = [...repairs];
    updated[index][field] = value;
    setRepairs(updated);
  };

  const addRepairRow = () => {
    setRepairs([...repairs, { package: "", price: 0 }]);
  };

  const removeRepairRow = (index) => {
    const updated = [...repairs];
    updated.splice(index, 1);
    setRepairs(updated);
  };

  const handleItemChange = (index, field, value) => {
    const updated = [...items];
    updated[index][field] = value;
    setItems(updated);
  };

  const addItemRow = () => {
    setItems([...items, { itemName: "", qty: 1, price: 0 }]);
  };

  const removeItemRow = (index) => {
    const updated = [...items];
    updated.splice(index, 1);
    setItems(updated);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      repairs,
      items,
      totalCost,
    };

    fetch("http://localhost:5001/api/invoice", {
      method: initialData._id ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then(() => {
        alert("Invoice saved successfully");
        if (onSubmit) onSubmit();
      });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 bg-white shadow rounded space-y-6 border border-red-600"
    >
      <h2 className="text-2xl font-bold text-center text-red-600">
        Service Invoice
      </h2>

      <div className="grid grid-cols-2 gap-4 text-black">
        <input
          placeholder="Service ID"
          value={formData.serviceID}
          onChange={(e) =>
            setFormData({ ...formData, serviceID: e.target.value })
          }
          className="p-2 border rounded"
          required
        />
        <input
          placeholder="Customer Name"
          value={formData.customerName}
          onChange={(e) =>
            setFormData({ ...formData, customerName: e.target.value })
          }
          className="p-2 border rounded"
          required
        />
        <input
          placeholder="Vehicle Number"
          value={formData.vehicleNumber}
          onChange={(e) =>
            setFormData({ ...formData, vehicleNumber: e.target.value })
          }
          className="p-2 border rounded"
          required
        />
        <input
          placeholder="Present Meter"
          value={formData.presentMeter}
          type="number"
          onChange={(e) =>
            setFormData({ ...formData, presentMeter: e.target.value })
          }
          className="p-2 border rounded"
          required
        />
        <input
          type="date"
          value={formData.serviceDate}
          onChange={(e) =>
            setFormData({ ...formData, serviceDate: e.target.value })
          }
          className="p-2 border rounded"
          required
        />
      </div>

      <textarea
        placeholder="Description"
        value={formData.description}
        onChange={(e) =>
          setFormData({ ...formData, description: e.target.value })
        }
        className="w-full p-2 border rounded text-black"
      />

      {/* Repairs Table */}
      <div>
        <h3 className="text-lg font-semibold">Repairs</h3>
        <button
          type="button"
          onClick={addRepairRow}
          className="text-sm text-red-600"
        >
          + Add Repair
        </button>
        {repairs.map((r, i) => (
          <div key={i} className="flex items-center gap-2 mt-2">
            <select
              value={r.package}
              onChange={(e) => handleRepairChange(i, "package", e.target.value)}
              className="p-2 border rounded"
            >
              <option value="">Select Package</option>
              {availableRepairs.map((pkg) => (
                <option key={pkg._id} value={pkg.packageName}>
                  {pkg.packageName}
                </option>
              ))}
            </select>
            <input
              type="number"
              value={r.price}
              onChange={(e) => handleRepairChange(i, "price", e.target.value)}
              className="p-2 border rounded w-32"
              placeholder="Price"
            />
            <button
              type="button"
              onClick={() => removeRepairRow(i)}
              className="text-red-500"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      {/* Items Table */}
      <div>
        <h3 className="text-lg font-semibold">Items</h3>
        <button
          type="button"
          onClick={addItemRow}
          className="text-sm text-red-600"
        >
          + Add Item
        </button>
        {items.map((item, i) => (
          <div key={i} className="flex items-center gap-2 mt-2">
            <select
              value={item.itemName}
              onChange={(e) => handleItemChange(i, "itemName", e.target.value)}
              className="p-2 border rounded"
            >
              <option value="">Select Item</option>
              {stockData.map((stock) => (
                <option key={stock._id} value={stock.itemName}>
                  {stock.itemName}
                </option>
              ))}
            </select>
            <input
              type="number"
              value={item.qty}
              onChange={(e) =>
                handleItemChange(i, "qty", Number(e.target.value))
              }
              className="p-2 border rounded w-24"
              placeholder="Qty"
            />
            <input
              type="number"
              value={item.price}
              onChange={(e) =>
                handleItemChange(i, "price", Number(e.target.value))
              }
              className="p-2 border rounded w-32"
              placeholder="Unit Price"
            />
            <button
              type="button"
              onClick={() => removeItemRow(i)}
              className="text-red-500"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      {userRole === "admin" && (
        <textarea
          placeholder="Admin Remarks"
          value={formData.adminRemarks}
          onChange={(e) =>
            setFormData({ ...formData, adminRemarks: e.target.value })
          }
          className="w-full p-2 border rounded text-black"
        />
      )}

      <div className="text-black font-medium">Total Cost: Rs. {totalCost}</div>

      <div className="flex justify-end gap-4 mt-4">
        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-400 text-white px-4 py-2 rounded"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="bg-red-600 text-white px-4 py-2 rounded"
        >
          Submit Invoice
        </button>
      </div>
    </form>
  );
};

export default InvoiceForm;
