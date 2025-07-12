import React, { useState, useEffect } from "react";
import axios from "axios";

const PremiumServiceBodyshop = ({ existingBooking, isEditMode, onDelete }) => {
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

  // Fetch logged-in user info
  useEffect(() => {
    const token = localStorage.getItem("token");
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
        const loggedInUser = {
          ...res.data.user,
          type: res.data.user.type || "supervisor",
        };

        setUser(loggedInUser);

        if (!isEditMode) {
          setFormData({
            customerName: loggedInUser.fullName || "",
            vehicleType: "",
            vehicleNumber: "",
            serviceDate: "",
            presentMeter: 10000,
            status: "Pending",
            contact: {
              phone: loggedInUser.phoneNumber || "",
              email: loggedInUser.email || "",
            },
          });
        }
      })
      .catch((err) => {
        console.error("Failed to fetch user profile:", err);
      });
  }, [isEditMode]);

  // Load existing booking when editing
  useEffect(() => {
    if (isEditMode && existingBooking) {
      setFormData({
        customerName: existingBooking.customerName,
        vehicleType: existingBooking.vehicleType || "",
        vehicleNumber: existingBooking.vehicleNumber,
        serviceDate: existingBooking.serviceDate
          ? new Date(existingBooking.serviceDate).toISOString().split('T')[0]
          : "",
        presentMeter: existingBooking.presentMeter || 10000,
        status: existingBooking.status,
        contact: {
          phone: existingBooking.contact?.phone || "",
          email: existingBooking.contact?.email || "",
        },
      });
    }
  }, [isEditMode, existingBooking]);

  // Validation
  const validate = () => {
    const newErrors = {};
    if (!formData.customerName.trim())
      newErrors.customerName = "Customer name is required.";
    if (!formData.vehicleType.trim())
      newErrors.vehicleType = "Vehicle type is required.";
    if (!formData.vehicleNumber.trim())
      newErrors.vehicleNumber = "Vehicle number is required.";
    if (!formData.serviceDate)
      newErrors.serviceDate = "Service date is required.";
    else if (new Date(formData.serviceDate) < new Date().setHours(0, 0, 0, 0))
      newErrors.serviceDate = "Service date cannot be in the past.";
    if (!formData.presentMeter)
      newErrors.presentMeter = "Present meter value is required.";
    else if (formData.presentMeter < 0)
      newErrors.presentMeter = "Present meter must be positive.";
    if (!formData.contact.phone.trim())
      newErrors.contactPhone = "Phone number is required.";
    return newErrors;
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("contact.")) {
      const field = name.split(".")[1];
      setFormData((prevData) => ({
        ...prevData,
        contact: {
          ...prevData.contact,
          [field]: value,
        },
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("User not authenticated.");
        return;
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      if (isEditMode) {
        await axios.put(
          `http://localhost:5001/api/bodyshop/${existingBooking.serviceID}`,
          formData,
          config
        );
        alert("Appointment updated successfully ✅");
      } else {
        await axios.post(
          "http://localhost:5001/api/bodyshop/",
          formData,
          config
        );
        alert("Appointment created successfully ✅");
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
      }

      setErrors({});
    } catch (error) {
      console.error("Error submitting appointment:", error);
      alert(`Failed to submit appointment: ${error.response?.data?.message || error.message}`);
    }
  };

  // Delete handler
  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this service?")) {
      if (onDelete) {
        onDelete(existingBooking.serviceID);
      }
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-2xl shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">
        {isEditMode ? "Update Appointment" : "Add Customer Details"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {isEditMode && (
          <div>
            <label className="block mb-1 font-medium">Service ID</label>
            <input
              type="text"
              value={existingBooking?.serviceID}
              disabled
              className="w-full p-2 border rounded-lg bg-gray-100"
            />
          </div>
        )}

        <div>
          <label className="block mb-1 font-medium">Customer Name</label>
          <input
            type="text"
            name="customerName"
            value={formData.customerName}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
          />
          {errors.customerName && (
            <p className="text-red-500 text-sm">{errors.customerName}</p>
          )}
        </div>

        <div>
          <label className="block mb-1 font-medium">Vehicle Type</label>
          <select
            name="vehicleType"
            value={formData.vehicleType}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
          >
            <option value="">-- Select Vehicle Type --</option>
            <option value="Car">Car</option>
            <option value="Van">Van</option>
          </select>
          {errors.vehicleType && (
            <p className="text-red-500 text-sm">{errors.vehicleType}</p>
          )}
        </div>

        <div>
          <label className="block mb-1 font-medium">Vehicle Number</label>
          <input
            type="text"
            name="vehicleNumber"
            value={formData.vehicleNumber}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
          />
          {errors.vehicleNumber && (
            <p className="text-red-500 text-sm">{errors.vehicleNumber}</p>
          )}
        </div>

        <div>
          <label className="block mb-1 font-medium">Service Date</label>
          <input
            type="date"
            name="serviceDate"
            value={formData.serviceDate}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
          />
          {errors.serviceDate && (
            <p className="text-red-500 text-sm">{errors.serviceDate}</p>
          )}
        </div>

        <div>
          <label className="block mb-1 font-medium">Present Meter</label>
          <input
            type="number"
            name="presentMeter"
            value={formData.presentMeter}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
            min="0"
            max="999999"
            step="100"
          />
          {errors.presentMeter && (
            <p className="text-red-500 text-sm">{errors.presentMeter}</p>
          )}
        </div>

        <div>
          <label className="block mb-1 font-medium">Phone Number</label>
          <input
            type="text"
            name="contact.phone"
            value={formData.contact.phone}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
          />
          {errors.contactPhone && (
            <p className="text-red-500 text-sm">{errors.contactPhone}</p>
          )}
        </div>

        <div>
          <label className="block mb-1 font-medium">Email Address (optional)</label>
          <input
            type="email"
            name="contact.email"
            value={formData.contact.email}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
          >
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition"
        >
          {isEditMode ? "Update Appointment" : "Submit"}
        </button>

        {isEditMode && (
          <button
            type="button"
            onClick={handleDelete}
            className="w-full bg-red-600 text-white p-2 rounded-lg hover:bg-red-700 transition mt-4"
          >
            Delete Appointment
          </button>
        )}
      </form>
    </div>
  );
};

export default PremiumServiceBodyshop;