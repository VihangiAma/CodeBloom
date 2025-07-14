import React, { useState, useEffect } from "react";
import axios from "axios";

const PremiumServiceMechanical = () => {
  const [formData, setFormData] = useState({
    customerName: "",
    vehicleType: "",
    vehicleNumber: "",
    serviceDate: "",
    presentMeter: 10000,
    status: "Pending",
    contact: {
      phone: "",
      email: "",
    },
  });

  const [errors, setErrors] = useState({});
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    axios
      .get("http://localhost:5001/api/user/profile/basic", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const u = res.data.user;
        setUser(u);
        setFormData((prev) => ({
          ...prev,
          customerName: u.fullName || "",
          contact: {
            phone: u.phoneNumber || "",
            email: u.email || "",
          },
        }));
      })
      .catch((err) => {
        console.error("Failed to fetch user profile:", err);
        alert("Authorization failed. Please log in again.");
      });
  }, []);

  const validate = () => {
    const newErrors = {};
    if (!formData.customerName.trim()) newErrors.customerName = "Required";
    if (!formData.vehicleType.trim()) newErrors.vehicleType = "Required";
    if (!formData.vehicleNumber.trim()) newErrors.vehicleNumber = "Required";
    if (!formData.serviceDate) newErrors.serviceDate = "Required";
    if (new Date(formData.serviceDate) < new Date().setHours(0, 0, 0, 0))
      newErrors.serviceDate = "Date cannot be in the past";
    if (formData.presentMeter <= 0) newErrors.presentMeter = "Invalid value";
    if (!formData.contact.phone.trim()) newErrors.contactPhone = "Required";
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("contact.")) {
      const key = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        contact: { ...prev.contact, [key]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) return alert("Authentication token missing");

    const config = { headers: { Authorization: `Bearer ${token}` } };
    const payload = {
      ...formData,
      section: "mechanical",
    };

    try {
      const res = await axios.post(
        "http://localhost:5001/api/mechanical",
        payload,
        config
      );
      alert(`Booking submitted ✅: ${res.data?.booking?.serviceID || "Success"}`);
      setFormData({
        customerName: user?.fullName || "",
        vehicleType: "",
        vehicleNumber: "",
        serviceDate: "",
        presentMeter: 10000,
        status: "Pending",
        contact: {
          phone: user?.phoneNumber || "",
          email: user?.email || "",
        },
      });
    } catch (err) {
      console.error("Submit failed:", err);
      alert("Booking submission failed. Check console for details.");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">New Mechanical Booking</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-semibold">Customer Name</label>
          <input
            name="customerName"
            value={formData.customerName}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          {errors.customerName && <p className="text-red-500 text-sm">{errors.customerName}</p>}
        </div>
        <div>
          <label className="block font-semibold">Vehicle Type</label>
          <select
            name="vehicleType"
            value={formData.vehicleType}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option value="">-- Select --</option>
            <option value="Car">Car</option>
            <option value="Van">Van</option>
            <option value="SUV">SUV</option>
          </select>
          {errors.vehicleType && <p className="text-red-500 text-sm">{errors.vehicleType}</p>}
        </div>
        <div>
          <label className="block font-semibold">Vehicle Number</label>
          <input
            name="vehicleNumber"
            value={formData.vehicleNumber}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          {errors.vehicleNumber && <p className="text-red-500 text-sm">{errors.vehicleNumber}</p>}
        </div>
        <div>
          <label className="block font-semibold">Service Date</label>
          <input
            type="date"
            name="serviceDate"
            value={formData.serviceDate}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          {errors.serviceDate && <p className="text-red-500 text-sm">{errors.serviceDate}</p>}
        </div>
        <div>
          <label className="block font-semibold">Present Meter</label>
          <input
            type="number"
            name="presentMeter"
            value={formData.presentMeter}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            min={0}
            step={100}
          />
          {errors.presentMeter && <p className="text-red-500 text-sm">{errors.presentMeter}</p>}
        </div>
        <div>
          <label className="block font-semibold">Phone Number</label>
          <input
            name="contact.phone"
            value={formData.contact.phone}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          {errors.contactPhone && <p className="text-red-500 text-sm">{errors.contactPhone}</p>}
        </div>
        <div>
          <label className="block font-semibold">Email (optional)</label>
          <input
            type="email"
            name="contact.email"
            value={formData.contact.email}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block font-semibold">Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full bg-yellow-600 text-white py-2 rounded hover:bg-yellow-700"
        >
          Submit Booking
        </button>
      </form>
    </div>
  );
};

export default PremiumServiceMechanical;
