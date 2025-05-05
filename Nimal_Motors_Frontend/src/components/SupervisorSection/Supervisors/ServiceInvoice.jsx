// Service invoice see all costs and details

import React, { useState, useEffect } from "react";

const ServiceInvoice = ({ initialData = {}, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    serviceID: initialData.serviceID || "",
    customerName: initialData.customerName || "",
    vehicleNumber: initialData.vehicleNumber || "",
    vehicleType: initialData.vehicleType || "",
    contactPhone: initialData.contactPhone || "",
    description: initialData.description || "",
    services: {
      fullService: { selected: false, cost: 0 },
      bodyWash: { selected: false, cost: 0 },
      oilChange: { selected: false, cost: 0 },
      underbodyWash: { selected: false, cost: 0 },
      interiorVacuum: { selected: false, cost: 0 },
    },
    totalCost: 0,
  });

  useEffect(() => {
    const cost = Object.values(formData.services).reduce(
      (sum, service) => (service.selected ? sum + Number(service.cost) : sum),
      0
    );
    setFormData((prev) => ({ ...prev, totalCost: cost }));
  }, [formData.services]);

  const handleServiceToggle = (name) => {
    setFormData((prev) => ({
      ...prev,
      services: {
        ...prev.services,
        [name]: {
          ...prev.services[name],
          selected: !prev.services[name].selected,
        },
      },
    }));
  };

  const handleServiceCostChange = (name, cost) => {
    setFormData((prev) => ({
      ...prev,
      services: {
        ...prev.services,
        [name]: {
          ...prev.services[name],
          cost: Math.max(0, Number(cost)),
        },
      },
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    alert("Invoice sent to Admin ✅");
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-2xl shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Create Invoice</h2>
      <form onSubmit={handleSubmit} className="space-y-4">

        {/* Service ID */}
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

        {/* Customer Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-medium">Customer Name</label>
            <input
              type="text"
              name="customerName"
              value={formData.customerName}
              onChange={handleInputChange}
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
              onChange={handleInputChange}
              className="w-full p-2 border rounded-lg"
              required
            />
          </div>
        </div>

        {/* Vehicle Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-medium">Vehicle Number</label>
            <input
              type="text"
              name="vehicleNumber"
              value={formData.vehicleNumber}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-lg"
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Vehicle Type</label>
            <select
              name="vehicleType"
              value={formData.vehicleType}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-lg"
              required
            >
              <option value="">-- Select Type --</option>
              <option value="Car">Car</option>
              <option value="Van">Van</option>
            </select>
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block mb-1 font-medium">Description / Notes</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-lg"
            rows="3"
            placeholder="Special instructions or comments..."
          />
        </div>

        {/* Services Selection */}
        <div>
          <label className="block mb-2 font-medium">Select Services</label>
          <div className="space-y-2">
            {Object.entries(formData.services).map(([key, service]) => (
              <label key={key} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={service.selected}
                  onChange={() => handleServiceToggle(key)}
                  className="accent-blue-600"
                />
                <span className="capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Selected Services Table with Cost Inputs */}
        {Object.values(formData.services).some(service => service.selected) && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2">Selected Services Summary</h3>
            <table className="w-full table-auto border border-gray-300 rounded-lg">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border px-4 py-2 text-left">Service Name</th>
                  <th className="border px-4 py-2 text-center">Cost (LKR)</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(formData.services).map(([key, service]) =>
                  service.selected ? (
                    <tr key={key}>
                      <td className="border px-4 py-2 capitalize">
                        {key.replace(/([A-Z])/g, ' $1')}
                      </td>
                      <td className="border px-4 py-2 text-center">
                        <div className="flex items-center justify-center space-x-2">
                          <button
                            type="button"
                            onClick={() => handleServiceCostChange(key, service.cost - 100)}
                            className="px-2 py-1 bg-red-500 text-white rounded"
                          >
                          </button>
                          <input
                            type="number"
                            value={service.cost}
                            onChange={(e) => handleServiceCostChange(key, e.target.value)}
                            className="p-1 border rounded w-20 text-center"
                            min="0"
                            step="100"
                          />
                          <button
                            type="button"
                            onClick={() => handleServiceCostChange(key, service.cost + 100)}
                            className="px-2 py-1 bg-green-500 text-white rounded"
                          >
                          </button>
                        </div>
                      </td>
                    </tr>
                  ) : null
                )}
              </tbody>
              <tfoot>
                <tr className="font-bold">
                  <td className="border px-4 py-2 text-right">Total</td>
                  <td className="border px-4 py-2 text-center">{formData.totalCost}</td>
                </tr>
              </tfoot>
            </table>
          </div>
        )}

        {/* Total Cost Display */}
        <div>
          <label className="block mb-1 font-medium">Total Cost (LKR)</label>
          <input
            type="text"
            value={formData.totalCost}
            disabled
            className="w-full p-2 border rounded-lg bg-gray-100 font-semibold"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between mt-6">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Send to Admin
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-400 text-white px-6 py-2 rounded-lg hover:bg-gray-500 transition"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default ServiceInvoice;
