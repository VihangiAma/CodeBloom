import React, { useState, useEffect } from "react";
import axios from "axios";

const PremiumServiceForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    premiumID: "",
    fullName: "",
    phoneNumber: "",
    email: "",
    vehicleModel: "",
    preferredDate: "",
    serviceType: "Full Service",
    notes: "",
  });

  const [errors, setErrors] = useState({});
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("TOKEN:", token);

    if (!token) {
      console.warn("No token found!");
      return;
    }

    axios
      .get("http://localhost:5001/api/user/profile/basic", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log("User profile:", res.data);
        setUser(res.data.user); // Store the user object
        setFormData((prev) => ({
          ...prev,
          fullName: res.data.user.fullName || "",
          email: res.data.user.email || "",
          phoneNumber: res.data.user.phoneNumber || "",
        }));
      })
      .catch((err) => {
        console.error("Failed to fetch user profile:", err.response?.status, err.response?.data, err.message);
      });
  }, []);

  const validate = () => {
    const newErrors = {};
    if (!formData.premiumID.trim()) newErrors.premiumID = "Premium ID is required.";
    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required.";
    if (!formData.vehicleModel.trim()) newErrors.vehicleModel = "Vehicle model is required.";
    if (!formData.preferredDate) newErrors.preferredDate = "Preferred date is required.";
    if (!formData.phoneNumber.trim()) newErrors.phoneNumber = "Phone number is required.";
    if (formData.phoneNumber && !/^\d{10}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = "Phone number must be 10 digits.";
    }
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      onSubmit(formData);
      alert("Request submitted successfully! ✅");
      setFormData({
        premiumID: "",
        fullName: user?.fullName || "",
        phoneNumber: user?.phoneNumber || "",
        email: user?.email || "",
        vehicleModel: "",
        preferredDate: "",
        serviceType: "Full Service",
        notes: "",
      });
      setErrors({});
    }
  };

  // ... rest of the component (form JSX) remains unchanged

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-2xl shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Premium Service Request</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Premium ID */}
        <div>
          <label className="block mb-1 font-medium">Premium ID</label>
          <input
            type="text"
            name="premiumID"
            value={formData.premiumID}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
          />
          {errors.premiumID && <p className="text-red-500 text-sm">{errors.premiumID}</p>}
        </div>

        {/* Full Name */}
        <div>
          <label className="block mb-1 font-medium">Full Name</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
          />
          {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName}</p>}
        </div>

        {/* Phone Number */}
        <div>
          <label className="block mb-1 font-medium">Phone Number</label>
          <input
            type="text"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
          />
          {errors.phoneNumber && <p className="text-red-500 text-sm">{errors.phoneNumber}</p>}
        </div>

        {/* Email */}
        <div>
          <label className="block mb-1 font-medium">Email (Optional)</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
          />
        </div>

        {/* Vehicle Model */}
        <div>
          <label className="block mb-1 font-medium">Vehicle Model</label>
          <input
            type="text"
            name="vehicleModel"
            value={formData.vehicleModel}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
          />
          {errors.vehicleModel && <p className="text-red-500 text-sm">{errors.vehicleModel}</p>}
        </div>

        {/* Preferred Date */}
        <div>
          <label className="block mb-1 font-medium">Preferred Date</label>
          <input
            type="date"
            name="preferredDate"
            value={formData.preferredDate}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
          />
          {errors.preferredDate && <p className="text-red-500 text-sm">{errors.preferredDate}</p>}
        </div>

        {/* Service Type */}
        <div>
          <label className="block mb-1 font-medium">Service Type</label>
          <select
            name="serviceType"
            value={formData.serviceType}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
          >
            <option value="Full Service">Full Service</option>
            <option value="Body Inspection">Body Inspection</option>
            <option value="Engine Tune-Up">Engine Tune-Up</option>
            <option value="Custom Request">Custom Request</option>
          </select>
        </div>

        {/* Notes */}
        <div>
          <label className="block mb-1 font-medium">Additional Notes</label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
            placeholder="Any extra info you want us to know"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white p-2 rounded-lg hover:bg-indigo-700 transition"
        >
          Submit Request
        </button>
      </form>
    </div>
  );
};

export default PremiumServiceForm;
