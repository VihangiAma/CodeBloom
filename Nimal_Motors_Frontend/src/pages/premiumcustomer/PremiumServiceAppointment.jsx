import React, { useState, useEffect } from "react";
import axios from "axios";

const PremiumServiceAppointment = ({ existingBooking, isEditMode, onDelete }) => {
  const [formData, setFormData] = useState({
    customerName: "",
    address: "",
    contact: {
      phone: "",
      email: "",
    },
    vehicleNumber: "",
    vehicleType: "",
    date: "",
    time: "",
  });

  const [errors, setErrors] = useState({});
  const [user, setUser] = useState(null);

  const timeSlots = [
    "8.00 am-10.00 am",
    "10.00 am-12.00 pm",
    "1.00 pm-3.00 pm",
    "3.00 pm-5.00 pm",
  ];
  const vehicleTypes = ["Car", "Van"];

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

        if (!isEditMode) {
          setFormData((prev) => ({
            ...prev,
            customerName: u.fullName || "",
            contact: {
              phone: u.phoneNumber || "",
              email: u.email || "",
            },
          }));
        }
      })
      .catch((err) => {
        console.error("Failed to fetch user profile:", err);
        alert("Authorization failed. Please log in again.");
      });
  }, [isEditMode]);

  useEffect(() => {
    if (isEditMode && existingBooking) {
      setFormData({
        customerName: existingBooking.customerName || "",
        address: existingBooking.address || "",
        contact: {
          phone: existingBooking.contact?.phone || "",
          email: existingBooking.contact?.email || "",
        },
        vehicleNumber: existingBooking.vehicleNumber || "",
        vehicleType: existingBooking.vehicleType || "",
        date: existingBooking.date
          ? new Date(existingBooking.date).toISOString().split("T")[0]
          : "",
        time: existingBooking.time || "",
      });
    }
  }, [isEditMode, existingBooking]);

  const validate = () => {
    const newErrors = {};
    const nameRegex = /^[A-Za-z\s]+$/;
    const phoneRegex = /^[0-9]{10}$/;
    const vehicleNumberRegex = /^[A-Z]{2,3}-\d{3,4}$/i;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.customerName.trim()) newErrors.customerName = "Customer name is required";
    else if (!nameRegex.test(formData.customerName.trim()))
      newErrors.customerName = "Only letters and spaces allowed";

    if (!formData.address.trim()) newErrors.address = "Address is required";
    else if (formData.address.trim().length < 5)
      newErrors.address = "Address must be at least 5 characters";

    if (!formData.contact.phone.trim()) newErrors.phone = "Phone is required";
    else if (!phoneRegex.test(formData.contact.phone.trim()))
      newErrors.phone = "Phone must be a valid 10-digit number";

    if (formData.contact.email && !emailRegex.test(formData.contact.email.trim()))
      newErrors.email = "Invalid email format";

    if (!formData.vehicleNumber.trim())
      newErrors.vehicleNumber = "Vehicle number is required";
    else if (!vehicleNumberRegex.test(formData.vehicleNumber.trim()))
      newErrors.vehicleNumber = "Vehicle number must be like ABC-1234";

    if (!formData.vehicleType) newErrors.vehicleType = "Vehicle type is required";

    if (!formData.date) newErrors.date = "Date is required";

    if (!formData.time) newErrors.time = "Time slot is required";

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "phone" || name === "email") {
      setFormData((prev) => ({
        ...prev,
        contact: {
          ...prev.contact,
          [name]: value,
        },
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
    setErrors({});

    const token = localStorage.getItem("token");
    if (!token) return alert("Authentication token missing");

    const config = { headers: { Authorization: `Bearer ${token}` } };
    const payload = { ...formData };

    try {
      if (isEditMode) {
        await axios.put(
          `http://localhost:5001/api/premiumappointment/${existingBooking._id || existingBooking.appointmentId}`,
          payload,
          config
        );
        alert("Appointment updated ✅");
      } else {
        await axios.post("http://localhost:5001/api/premiumappointment", payload, config);
        alert("Appointment booked ✅");

        setFormData({
          customerName: user?.fullName || "",
          address: "",
          contact: {
            phone: user?.phoneNumber || "",
            email: user?.email || "",
          },
          vehicleNumber: "",
          vehicleType: "",
          date: "",
          time: "",
        });
      }
    } catch (err) {
      console.error("Submit failed:", err);
      let msg = "Booking submission failed. Please try again.";
      if (err.response?.data?.error) {
        if (err.response.data.error.toLowerCase().includes("already booked")) {
          msg = "This time slot is already booked. Please choose another time.";
        } else {
          msg = err.response.data.error;
        }
      }
      alert(msg);
    }
  };

  const handleDelete = () => {
    if (onDelete && window.confirm("Delete this appointment?")) {
      onDelete(existingBooking._id || existingBooking.appointmentId);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">
        {isEditMode ? "Update Appointment" : "Book an Appointment"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {isEditMode && (
          <div>
            <label className="block mb-1 font-semibold">Appointment ID</label>
            <input
              value={existingBooking._id || existingBooking.appointmentId}
              disabled
              className="w-full bg-gray-100 p-2 border rounded-md"
            />
          </div>
        )}
        <div>
          <label className="block font-semibold">Customer Name</label>
          <input
            name="customerName"
            value={formData.customerName}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          {errors.customerName && (
            <p className="text-red-500 text-sm">{errors.customerName}</p>
          )}
        </div>
        <div>
          <label className="block font-semibold">Address</label>
          <input
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}
        </div>
        <div>
          <label className="block font-semibold">Phone (10 digits)</label>
          <input
            name="phone"
            value={formData.contact.phone}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
        </div>
        <div>
          <label className="block font-semibold">Email (optional)</label>
          <input
            type="email"
            name="email"
            value={formData.contact.email}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
        </div>
        <div>
          <label className="block font-semibold">Vehicle Number (ABC-1234)</label>
          <input
            name="vehicleNumber"
            value={formData.vehicleNumber}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          {errors.vehicleNumber && (
            <p className="text-red-500 text-sm">{errors.vehicleNumber}</p>
          )}
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
            {vehicleTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          {errors.vehicleType && (
            <p className="text-red-500 text-sm">{errors.vehicleType}</p>
          )}
        </div>
        <div>
          <label className="block font-semibold">Date</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          {errors.date && <p className="text-red-500 text-sm">{errors.date}</p>}
        </div>
        <div>
          <label className="block font-semibold">Time Slot</label>
          <select
            name="time"
            value={formData.time}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option value="">-- Select --</option>
            {timeSlots.map((slot) => (
              <option key={slot} value={slot}>
                {slot}
              </option>
            ))}
          </select>
          {errors.time && <p className="text-red-500 text-sm">{errors.time}</p>}
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          {isEditMode ? "Update Appointment" : "Book Appointment"}
        </button>
        {isEditMode && (
          <button
            type="button"
            onClick={handleDelete}
            className="w-full bg-red-600 text-white py-2 mt-2 rounded hover:bg-red-700"
          >
            Delete Appointment
          </button>
        )}
      </form>
    </div>
  );
};

export default PremiumServiceAppointment;
