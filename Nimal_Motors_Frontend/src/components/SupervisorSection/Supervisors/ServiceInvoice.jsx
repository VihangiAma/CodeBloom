import React, { useState, useEffect } from "react";

const InvoiceForm = ({ initialData = {}, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    serviceID: initialData.serviceID || "",
    customerName: initialData.customerName || "",
    vehicleNumber: initialData.vehicleNumber || "",
    vehicleType: initialData.vehicleType || "",
    contactPhone: initialData.contactPhone || "",
    services: {
      fullService: false,
      bodyWash: false,
      oilChange: false,
      underbodyWash: false,
      interiorVacuum: false,
    },
    totalCost: 0,
  });

  const servicePrices = {
    fullService: 5000,
    bodyWash: 1500,
    oilChange: 2500,
    underbodyWash: 1200,
    interiorVacuum: 1000,
  };

  // Calculate total cost whenever service checkboxes change
  useEffect(() => {
    const cost = Object.entries(formData.services).reduce((sum, [key, selected]) => {
      return selected ? sum + servicePrices[key] : sum;
    }, 0);
    setFormData((prev) => ({ ...prev, totalCost: cost }));
  }, [formData.services]);

  const handleServiceChange = (e) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      services: {
        ...prev.services,
        [name]: checked,
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
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-2xl shadow-md">
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
              <option value="Bike">Bike</option>
            </select>
          </div>
        </div>

        {/* Services */}
        <div>
          <label className="block mb-1 font-medium">Select Services</label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {Object.keys(formData.services).map((serviceKey) => (
              <label key={serviceKey} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name={serviceKey}
                  checked={formData.services[serviceKey]}
                  onChange={handleServiceChange}
                  className="accent-blue-600"
                />
                <span className="capitalize">{serviceKey.replace(/([A-Z])/g, ' $1')}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Total Cost */}
        <div>
          <label className="block mb-1 font-medium">Total Cost (LKR)</label>
          <input
            type="text"
            value={formData.totalCost}
            disabled
            className="w-full p-2 border rounded-lg bg-gray-100 font-semibold"
          />
        </div>

        {/* Buttons */}
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

export default InvoiceForm;
