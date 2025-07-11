// // import React, { useState, useEffect } from "react";
// // import axios from "axios";

// // const PremiumServiceForm = ({ onSubmit }) => {
// //   const [formData, setFormData] = useState({
// //     premiumID: "",
// //     fullName: "",
// //     phoneNumber: "",
// //     email: "",
// //     vehicleModel: "",
// //     preferredDate: "",
// //     serviceType: "Full Service",
// //     notes: "",
// //   });

// //   const [errors, setErrors] = useState({});
// //   const [user, setUser] = useState(null);

// //   useEffect(() => {
// //     const token = localStorage.getItem("token");
// //     console.log("TOKEN:", token);

// //     if (!token) {
// //       console.warn("No token found!");
// //       return;
// //     }

// //     axios
// //       .get("http://localhost:5001/api/user/profile/basic", {
// //         headers: {
// //           Authorization: `Bearer ${token}`,
// //         },
// //       })
// //       .then((res) => {
// //         console.log("User profile:", res.data);
// //         setUser(res.data.user); // Store the user object
// //         setFormData((prev) => ({
// //           ...prev,
// //           fullName: res.data.user.fullName || "",
// //           email: res.data.user.email || "",
// //           phoneNumber: res.data.user.phoneNumber || "",
// //         }));
// //       })
// //       .catch((err) => {
// //         console.error("Failed to fetch user profile:", err.response?.status, err.response?.data, err.message);
// //       });
// //   }, []);

// //   const validate = () => {
// //     const newErrors = {};
// //     if (!formData.premiumID.trim()) newErrors.premiumID = "Premium ID is required.";
// //     if (!formData.fullName.trim()) newErrors.fullName = "Full name is required.";
// //     if (!formData.vehicleModel.trim()) newErrors.vehicleModel = "Vehicle model is required.";
// //     if (!formData.preferredDate) newErrors.preferredDate = "Preferred date is required.";
// //     if (!formData.phoneNumber.trim()) newErrors.phoneNumber = "Phone number is required.";
// //     if (formData.phoneNumber && !/^\d{10}$/.test(formData.phoneNumber)) {
// //       newErrors.phoneNumber = "Phone number must be 10 digits.";
// //     }
// //     return newErrors;
// //   };

// //   const handleChange = (e) => {
// //     const { name, value } = e.target;
// //     setFormData((prev) => ({ ...prev, [name]: value }));
// //   };

// //   const handleSubmit = (e) => {
// //     e.preventDefault();
// //     const validationErrors = validate();
// //     if (Object.keys(validationErrors).length > 0) {
// //       setErrors(validationErrors);
// //     } else {
// //       onSubmit(formData);
// //       alert("Request submitted successfully! ✅");
// //       setFormData({
// //         premiumID: "",
// //         fullName: user?.fullName || "",
// //         phoneNumber: user?.phoneNumber || "",
// //         email: user?.email || "",
// //         vehicleModel: "",
// //         preferredDate: "",
// //         serviceType: "Full Service",
// //         notes: "",
// //       });
// //       setErrors({});
// //     }
// //   };

// //   // ... rest of the component (form JSX) remains unchanged

// //   return (
// //     <div className="max-w-xl mx-auto p-6 bg-white rounded-2xl shadow-md">
// //       <h2 className="text-2xl font-bold mb-4 text-center">Premium Service Request</h2>
// //       <form onSubmit={handleSubmit} className="space-y-4">
// //         {/* Premium ID */}
// //         <div>
// //           <label className="block mb-1 font-medium">Premium ID</label>
// //           <input
// //             type="text"
// //             name="premiumID"
// //             value={formData.premiumID}
// //             onChange={handleChange}
// //             className="w-full p-2 border rounded-lg"
// //           />
// //           {errors.premiumID && <p className="text-red-500 text-sm">{errors.premiumID}</p>}
// //         </div>

// //         {/* Full Name */}
// //         <div>
// //           <label className="block mb-1 font-medium">Full Name</label>
// //           <input
// //             type="text"
// //             name="fullName"
// //             value={formData.fullName}
// //             onChange={handleChange}
// //             className="w-full p-2 border rounded-lg"
// //           />
// //           {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName}</p>}
// //         </div>

// //         {/* Phone Number */}
// //         <div>
// //           <label className="block mb-1 font-medium">Phone Number</label>
// //           <input
// //             type="text"
// //             name="phoneNumber"
// //             value={formData.phoneNumber}
// //             onChange={handleChange}
// //             className="w-full p-2 border rounded-lg"
// //           />
// //           {errors.phoneNumber && <p className="text-red-500 text-sm">{errors.phoneNumber}</p>}
// //         </div>

// //         {/* Email */}
// //         <div>
// //           <label className="block mb-1 font-medium">Email (Optional)</label>
// //           <input
// //             type="email"
// //             name="email"
// //             value={formData.email}
// //             onChange={handleChange}
// //             className="w-full p-2 border rounded-lg"
// //           />
// //         </div>

// //         {/* Vehicle Model */}
// //         <div>
// //           <label className="block mb-1 font-medium">Vehicle Model</label>
// //           <input
// //             type="text"
// //             name="vehicleModel"
// //             value={formData.vehicleModel}
// //             onChange={handleChange}
// //             className="w-full p-2 border rounded-lg"
// //           />
// //           {errors.vehicleModel && <p className="text-red-500 text-sm">{errors.vehicleModel}</p>}
// //         </div>

// //         {/* Preferred Date */}
// //         <div>
// //           <label className="block mb-1 font-medium">Preferred Date</label>
// //           <input
// //             type="date"
// //             name="preferredDate"
// //             value={formData.preferredDate}
// //             onChange={handleChange}
// //             className="w-full p-2 border rounded-lg"
// //           />
// //           {errors.preferredDate && <p className="text-red-500 text-sm">{errors.preferredDate}</p>}
// //         </div>

// //         {/* Service Type */}
// //         <div>
// //           <label className="block mb-1 font-medium">Service Type</label>
// //           <select
// //             name="serviceType"
// //             value={formData.serviceType}
// //             onChange={handleChange}
// //             className="w-full p-2 border rounded-lg"
// //           >
// //             <option value="Full Service">Full Service</option>
// //             <option value="Body Inspection">Body Inspection</option>
// //             <option value="Engine Tune-Up">Engine Tune-Up</option>
// //             <option value="Custom Request">Custom Request</option>
// //           </select>
// //         </div>

// //         {/* Notes */}
// //         <div>
// //           <label className="block mb-1 font-medium">Additional Notes</label>
// //           <textarea
// //             name="notes"
// //             value={formData.notes}
// //             onChange={handleChange}
// //             className="w-full p-2 border rounded-lg"
// //             placeholder="Any extra info you want us to know"
// //           />
// //         </div>

// //         <button
// //           type="submit"
// //           className="w-full bg-indigo-600 text-white p-2 rounded-lg hover:bg-indigo-700 transition"
// //         >
// //           Submit Request
// //         </button>
// //       </form>
// //     </div>
// //   );
// // };

// // export default PremiumServiceForm;

// //Add Customer Details in mechanical, Electrical, and bodyshop

// import React, { useState, useEffect } from "react";

// const PremiumServiceForm= ({ onSubmit, existingBooking, isEditMode, onDelete }) => {
//   const [formData, setFormData] = useState({
//     serviceID: "",
//     customerName: "",
//     vehicleType: "",
//     vehicleNumber: "",
//     serviceDate: "",
//     presentMeter: 10000,
//     status: "Pending",
//     contact: {
//       phone: "",
//       email: "",
//     },
//   });

//   const [errors, setErrors] = useState({});

//   useEffect(() => {
//     if (isEditMode && existingBooking) {
//       setFormData({
//         serviceID: existingBooking.serviceID,
//         customerName: existingBooking.customerName,
//         vehicleType: existingBooking.vehicleType || "",
//         vehicleNumber: existingBooking.vehicleNumber,
//         serviceDate: existingBooking.serviceDate,
//         presentMeter: existingBooking.presentMeter || 10000,
//         status: existingBooking.status,
//         contact: {
//           phone: existingBooking.contact?.phone || "",
//           email: existingBooking.contact?.email || "",
//         },
//       });
//     }
//   }, [isEditMode, existingBooking]);

//   const validate = () => {
//     const newErrors = {};
//     if (!formData.customerName.trim()) newErrors.customerName = "Customer name is required.";
//     if (!formData.vehicleType.trim()) newErrors.vehicleType = "Vehicle type is required.";
//     if (!formData.vehicleNumber.trim()) newErrors.vehicleNumber = "Vehicle number is required.";
//     if (!formData.serviceDate) newErrors.serviceDate = "Service date is required.";
//     else if (new Date(formData.serviceDate) < new Date().setHours(0, 0, 0, 0))
//       newErrors.serviceDate = "Service date cannot be in the past.";
//     if (!formData.presentMeter) newErrors.presentMeter = "Present meter value is required.";
//     else if (formData.presentMeter < 0) newErrors.presentMeter = "Present meter must be positive.";
//     if (!formData.contact.phone.trim()) newErrors.contactPhone = "Phone number is required.";
//     return newErrors;
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     if (name.startsWith("contact.")) {
//       const field = name.split(".")[1];
//       setFormData((prevData) => ({
//         ...prevData,
//         contact: {
//           ...prevData.contact,
//           [field]: value,
//         },
//       }));
//     } else {
//       setFormData((prevData) => ({
//         ...prevData,
//         [name]: value,
//       }));
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const validationErrors = validate();
//     if (Object.keys(validationErrors).length > 0) {
//       setErrors(validationErrors);
//     } else {
//       onSubmit(formData);
//       setFormData({
//         serviceID: "",
//         customerName: "",
//         vehicleType: "",
//         vehicleNumber: "",
//         serviceDate: "",
//         presentMeter: 10000,
//         status: "Pending",
//         contact: {
//           phone: "",
//           email: "",
//         },
//       });
//       setErrors({});
//       alert("Service booked successfully! ✅");
//     }
//   };

//   const handleDelete = () => {
//     if (window.confirm("Are you sure you want to delete this service?")) {
//       onDelete(existingBooking.serviceID);
//     }
//   };

//   return (
//     <div className="max-w-xl mx-auto p-6 bg-white rounded-2xl shadow-md">
//       <h2 className="text-2xl font-bold mb-4 text-center">
//         {isEditMode ? "Update Appointment" : "Add Customer Details"}
//       </h2>
//       <form onSubmit={handleSubmit} className="space-y-4">

//         {/* Service ID */}
//         {isEditMode && (
//           <div>
//             <label className="block mb-1 font-medium">Service ID</label>
//             <input
//               type="text"
//               name="serviceID"
//               value={formData.serviceID}
//               disabled
//               className="w-full p-2 border rounded-lg bg-gray-100"
//             />
//           </div>
//         )}

//         {/* Customer Name */}
//         <div>
//           <label className="block mb-1 font-medium">Customer Name</label>
//           <input
//             type="text"
//             name="customerName"
//             value={formData.customerName}
//             onChange={handleChange}
//             className="w-full p-2 border rounded-lg"
//           />
//           {errors.customerName && <p className="text-red-500 text-sm">{errors.customerName}</p>}
//         </div>

//         {/* Vehicle Type Dropdown */}
//         <div>
//           <label className="block mb-1 font-medium">Vehicle Type</label>
//           <select
//             name="vehicleType"
//             value={formData.vehicleType}
//             onChange={handleChange}
//             className="w-full p-2 border rounded-lg"
//           >
//             <option value="">-- Select Vehicle Type --</option>
//             <option value="Car">Car</option>
//             <option value="Van">Van</option>
//           </select>
//           {errors.vehicleType && <p className="text-red-500 text-sm">{errors.vehicleType}</p>}
//         </div>

//         {/* Vehicle Number */}
//         <div>
//           <label className="block mb-1 font-medium">Vehicle Number</label>
//           <input
//             type="text"
//             name="vehicleNumber"
//             value={formData.vehicleNumber}
//             onChange={handleChange}
//             className="w-full p-2 border rounded-lg"
//           />
//           {errors.vehicleNumber && <p className="text-red-500 text-sm">{errors.vehicleNumber}</p>}
//         </div>

//         {/* Service Date */}
//         <div>
//           <label className="block mb-1 font-medium">Service Date</label>
//           <input
//             type="date"
//             name="serviceDate"
//             value={formData.serviceDate}
//             onChange={handleChange}
//             className="w-full p-2 border rounded-lg"
//           />
//           {errors.serviceDate && <p className="text-red-500 text-sm">{errors.serviceDate}</p>}
//         </div>

//         {/* Present Meter */}
//         <div>
//           <label className="block mb-1 font-medium">Present Meter</label>
//           <input
//             type="number"
//             name="presentMeter"
//             value={formData.presentMeter}
//             onChange={handleChange}
//             className="w-full p-2 border rounded-lg"
//             min="10000"
//             max="999999"
//             step="100"
//           />
//           {errors.presentMeter && <p className="text-red-500 text-sm">{errors.presentMeter}</p>}
//         </div>

//         {/* Phone */}
//         <div>
//           <label className="block mb-1 font-medium">Phone Number</label>
//           <input
//             type="text"
//             name="contact.phone"
//             value={formData.contact.phone}
//             onChange={handleChange}
//             className="w-full p-2 border rounded-lg"
//           />
//           {errors.contactPhone && <p className="text-red-500 text-sm">{errors.contactPhone}</p>}
//         </div>

//         {/* Email */}
//         <div>
//           <label className="block mb-1 font-medium">Email Address (optional)</label>
//           <input
//             type="email"
//             name="contact.email"
//             value={formData.contact.email}
//             onChange={handleChange}
//             className="w-full p-2 border rounded-lg"
//           />
//         </div>

//         {/* Status */}
//         <div>
//           <label className="block mb-1 font-medium">Status</label>
//           <select
//             name="status"
//             value={formData.status}
//             onChange={handleChange}
//             className="w-full p-2 border rounded-lg"
//           >
//             <option value="Pending">Pending</option>
//             <option value="In Progress">In Progress</option>
//             <option value="Completed">Completed</option>
//           </select>
//         </div>

//         {/* Submit */}
//         <button
//           type="submit"
//           className="w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition"
//         >
//           {isEditMode ? "Update Appointment" : "Submit"}
//         </button>

//         {/* Delete */}
//         {isEditMode && (
//           <button
//             type="button"
//             onClick={handleDelete}
//             className="w-full bg-red-600 text-white p-2 rounded-lg hover:bg-red-700 transition mt-4"
//           >
//             Delete Appointment
//           </button>
//         )}
//       </form>
//     </div>
//   );
// };

// export default PremiumServiceForm;

import React, { useState, useEffect } from "react";
import axios from "axios";

const PremiumServiceForm = ({ onSubmit, existingBooking, isEditMode, onDelete }) => {
  const [formData, setFormData] = useState({
    serviceID: null, // Use null for new services
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
    userId: null, // Include for schema compatibility
  });

  const [errors, setErrors] = useState({});
  const [user, setUser] = useState(null);

  // Fetch logged-in user info and set form fields
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.warn("No token found! Please log in as a premium customer or supervisor.");
      alert("Please log in to submit a service request.");
      return;
    }

    axios
      .get("http://localhost:5001/api/user/profile/basic", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const loggedInUser = res.data.user;
        console.log("User profile:", JSON.stringify(loggedInUser, null, 2));
        if (!loggedInUser.role) {
          console.warn("User role missing. Expected 'premium_customer' or 'supervisor'.");
        }
        setUser(loggedInUser);
        setFormData((prev) => ({
          ...prev,
          customerName: loggedInUser.fullName || "",
          contact: {
            phone: loggedInUser.phoneNumber || "",
            email: loggedInUser.email || "",
          },
          userId: loggedInUser._id || null,
        }));
      })
      .catch((err) => {
        console.error("Failed to fetch user profile:", err.response?.data || err.message);
        alert("Failed to fetch user profile. Please log in again.");
      });
  }, []);

  // Populate form for edit mode
  useEffect(() => {
    if (isEditMode && existingBooking) {
      setFormData({
        serviceID: existingBooking.serviceID || null,
        customerName: existingBooking.customerName || user?.fullName || "",
        vehicleType: existingBooking.vehicleType || "",
        vehicleNumber: existingBooking.vehicleNumber || "",
        serviceDate: existingBooking.serviceDate || "",
        presentMeter: existingBooking.presentMeter || 10000,
        status: existingBooking.status || "Pending",
        contact: {
          phone: existingBooking.contact?.phone || user?.phoneNumber || "",
          email: existingBooking.contact?.email || user?.email || "",
        },
        userId: existingBooking.userId || user?._id || null,
      });
    }
  }, [isEditMode, existingBooking, user]);

  const validate = () => {
    const newErrors = {};
    if (!formData.customerName.trim()) newErrors.customerName = "Customer name is required.";
    if (!formData.vehicleType.trim()) newErrors.vehicleType = "Vehicle type is required.";
    if (!formData.vehicleNumber.trim()) newErrors.vehicleNumber = "Vehicle number is required.";
    if (!formData.serviceDate) newErrors.serviceDate = "Service date is required.";
    else if (new Date(formData.serviceDate) < new Date().setHours(0, 0, 0, 0))
      newErrors.serviceDate = "Service date cannot be in the past.";
    if (!formData.presentMeter) newErrors.presentMeter = "Present meter value is required.";
    else if (formData.presentMeter < 0) newErrors.presentMeter = "Present meter must be positive.";
    if (!formData.contact.phone.trim()) newErrors.contactPhone = "Phone number is required.";
    return newErrors;
  };

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Prepare submission data
    const submissionData = { ...formData };
    if (!isEditMode) {
      delete submissionData.serviceID; // Backend should generate serviceID
      if (!submissionData.userId) {
        console.warn("userId missing in submissionData");
      }
    }

    try {
      console.log(
        "Submitting to /api/electrical with data:",
        JSON.stringify(submissionData, null, 2),
        "User role:",
        user?.role || "unknown"
      );
      await onSubmit(submissionData);
      console.log("Submission successful, service should be in database");
      alert("Service request submitted successfully ✅");
      setFormData({
        serviceID: null,
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
        userId: user?._id || null,
      });
      setErrors({});
    } catch (error) {
      console.error("Submission error:", error.response?.status, error.response?.data || error.message);
      let errorMessage = "Unknown error. Check console for details.";
      if (error.response?.status === 404) {
        errorMessage = "Service endpoint not found. Contact support to ensure the endpoint is /api/electrical.";
      } else if (error.response?.status === 403) {
        errorMessage =
          "Access denied. Ensure you are logged in as a premium customer or supervisor and that the backend allows premium_customer role.";
      } else if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      }
      alert(`Failed to submit service: ${errorMessage}`);
    }
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this service?")) {
      onDelete(existingBooking.serviceID);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-2xl shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">
        {isEditMode ? "Update Electrical Service" : "Add Electrical Service"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* User Role Info */}
        <p className="text-sm text-gray-600">
          Logged in as: {user?.role || "unknown"} (
          {user?.role === "premium_customer"
            ? "You can add electrical services"
            : user?.role === "supervisor"
            ? "You can add, edit, and delete services"
            : "Please log in as a premium customer or supervisor to add services"})
        </p>

        {/* Service ID (Edit mode only) */}
        {isEditMode && (
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
        )}

        {/* Customer Name */}
        <div>
          <label className="block mb-1 font-medium">Customer Name</label>
          <input
            type="text"
            name="customerName"
            value={formData.customerName}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
            disabled
          />
          {errors.customerName && <p className="text-red-500 text-sm">{errors.customerName}</p>}
        </div>

        {/* Vehicle Type */}
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
          {errors.vehicleType && <p className="text-red-500 text-sm">{errors.vehicleType}</p>}
        </div>

        {/* Vehicle Number */}
        <div>
          <label className="block mb-1 font-medium">Vehicle Number</label>
          <input
            type="text"
            name="vehicleNumber"
            value={formData.vehicleNumber}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
          />
          {errors.vehicleNumber && <p className="text-red-500 text-sm">{errors.vehicleNumber}</p>}
        </div>

        {/* Service Date */}
        <div>
          <label className="block mb-1 font-medium">Service Date</label>
          <input
            type="date"
            name="serviceDate"
            value={formData.serviceDate}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
            min={new Date().toISOString().split("T")[0]}
          />
          {errors.serviceDate && <p className="text-red-500 text-sm">{errors.serviceDate}</p>}
        </div>

        {/* Present Meter */}
        <div>
          <label className="block mb-1 font-medium">Present Meter</label>
          <input
            type="number"
            name="presentMeter"
            value={formData.presentMeter}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
            min="10000"
            max="999999"
            step="100"
          />
          {errors.presentMeter && <p className="text-red-500 text-sm">{errors.presentMeter}</p>}
        </div>

        {/* Contact Phone */}
        <div>
          <label className="block mb-1 font-medium">Contact Phone</label>
          <input
            type="text"
            name="contact.phone"
            value={formData.contact.phone}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
            disabled
          />
          {errors.contactPhone && <p className="text-red-500 text-sm">{errors.contactPhone}</p>}
        </div>

        {/* Contact Email */}
        <div>
          <label className="block mb-1 font-medium">Contact Email (optional)</label>
          <input
            type="email"
            name="contact.email"
            value={formData.contact.email}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
            disabled
          />
        </div>

        {/* Status (only for supervisors) */}
        {user?.role === "supervisor" && (
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
        )}

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition"
          disabled={!user || !["premium_customer", "supervisor"].includes(user?.role)}
        >
          {isEditMode ? "Update Appointment" : "Submit Request"}
        </button>

        {/* Delete (only for supervisors) */}
        {isEditMode && user?.role === "supervisor" && (
          <button
            type="button"
            onClick={handleDelete}
            className="w-full bg-red-600 text-white p-2 rounded-lg hover:bg-red-700 transition mt-4"
          >
            Delete Appointment
          </button>
        )}
      </form>
      <p className="mt-4 text-sm text-gray-600">
        Note: Premium customers and supervisors can add electrical services via /api/electrical. If submission fails, contact support to ensure the backend uses /api/electrical and allows premium_customer role.
      </p>
    </div>
  );
};

export default PremiumServiceForm;