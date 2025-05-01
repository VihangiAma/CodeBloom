// import React, { useState, useEffect } from "react";

// const ServiceForm = ({ onSubmit, existingBooking, isEditMode, onDelete }) => {
//   const [formData, setFormData] = useState({
//     serviceID: "",
//     customerName: "",
//     vehicleID: "",
//     serviceDate: "",
//     serviceTime: "",
//     description: "",
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
//         vehicleID: existingBooking.vehicleID,
//         serviceDate: existingBooking.serviceDate,
//         serviceTime: existingBooking.serviceTime,
//         description: existingBooking.description,
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

//     if (!formData.serviceID.trim()) newErrors.serviceID = "Service ID is required.";
//     if (!formData.customerName.trim()) newErrors.customerName = "Customer name is required.";
//     if (!formData.vehicleID.trim()) newErrors.vehicleID = "Vehicle ID is required.";
//     if (!formData.serviceDate) newErrors.serviceDate = "Service date is required.";
//     else if (new Date(formData.serviceDate) < new Date().setHours(0, 0, 0, 0))
//       newErrors.serviceDate = "Service date cannot be in the past.";
//     if (!formData.serviceTime) newErrors.serviceTime = "Service time is required.";
//     if (!formData.description.trim()) newErrors.description = "Description is required.";
//     if (formData.description.length > 100)
//       newErrors.description = "Description must be 100 characters or less.";

//     if (!formData.contact.phone.trim()) newErrors.contactPhone = "Phone number is required.";
//     // Email is optional, so no validation needed

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
//         vehicleID: "",
//         serviceDate: "",
//         serviceTime: "",
//         description: "",
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
//         {isEditMode ? "Update Service Appointment" : "Book a Service Appointment"}
//       </h2>
//       <form onSubmit={handleSubmit} className="space-y-4">

//         {/* Service ID */}
//         <div>
//           <label className="block mb-1 font-medium">
//             Service ID <span title="Unique identifier for the service.">🛈</span>
//           </label>
//           <input
//             type="text"
//             name="serviceID"
//             value={formData.serviceID}
//             onChange={handleChange}
//             className="w-full p-2 border rounded-lg"
//             disabled={isEditMode}
//           />
//           {errors.serviceID && <p className="text-red-500 text-sm">{errors.serviceID}</p>}
//         </div>

//         {/* Customer Name */}
//         <div>
//           <label className="block mb-1 font-medium">
//             Customer Name <span title="Enter full name of the customer.">🛈</span>
//           </label>
//           <input
//             type="text"
//             name="customerName"
//             value={formData.customerName}
//             onChange={handleChange}
//             className="w-full p-2 border rounded-lg"
//           />
//           {errors.customerName && <p className="text-red-500 text-sm">{errors.customerName}</p>}
//         </div>

//         {/* Vehicle ID */}
//         <div>
//           <label className="block mb-1 font-medium">
//             Vehicle ID <span title="Vehicle Registration Number.">🛈</span>
//           </label>
//           <input
//             type="text"
//             name="vehicleID"
//             value={formData.vehicleID}
//             onChange={handleChange}
//             className="w-full p-2 border rounded-lg"
//           />
//           {errors.vehicleID && <p className="text-red-500 text-sm">{errors.vehicleID}</p>}
//         </div>

//         {/* Service Date */}
//         <div>
//           <label className="block mb-1 font-medium">
//             Service Date <span title="Choose a future appointment date.">🛈</span>
//           </label>
//           <input
//             type="date"
//             name="serviceDate"
//             value={formData.serviceDate}
//             onChange={handleChange}
//             className="w-full p-2 border rounded-lg"
//           />
//           {errors.serviceDate && <p className="text-red-500 text-sm">{errors.serviceDate}</p>}
//         </div>

//         {/* Service Time */}
//         <div>
//           <label className="block mb-1 font-medium">
//             Service Time <span title="Select a preferred time slot.">🛈</span>
//           </label>
//           <input
//             type="time"
//             name="serviceTime"
//             value={formData.serviceTime}
//             onChange={handleChange}
//             className="w-full p-2 border rounded-lg"
//           />
//           {errors.serviceTime && <p className="text-red-500 text-sm">{errors.serviceTime}</p>}
//         </div>

//         {/* Phone Number */}
//         <div>
//           <label className="block mb-1 font-medium">
//             Phone Number <span title="Enter your contact phone number.">🛈</span>
//           </label>
//           <input
//             type="text"
//             name="contact.phone"
//             value={formData.contact.phone}
//             onChange={handleChange}
//             className="w-full p-2 border rounded-lg"
//           />
//           {errors.contactPhone && <p className="text-red-500 text-sm">{errors.contactPhone}</p>}
//         </div>

//         {/* Email Address */}
//         <div>
//           <label className="block mb-1 font-medium">
//             Email Address <span title="Optional: Enter your email.">🛈</span>
//           </label>
//           <input
//             type="email"
//             name="contact.email"
//             value={formData.contact.email}
//             onChange={handleChange}
//             className="w-full p-2 border rounded-lg"
//           />
//         </div>

//         {/* Description */}
//         <div>
//           <label className="block mb-1 font-medium">
//             Description (Max 100 characters) <span title="Brief description about the service.">🛈</span>
//           </label>
//           <textarea
//             name="description"
//             value={formData.description}
//             onChange={handleChange}
//             maxLength="100"
//             className="w-full p-2 border rounded-lg"
//           />
//           <div className="text-sm text-gray-500 mt-1">
//             {formData.description.length} / 100 characters
//           </div>
//           {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
//         </div>

//         {/* Status */}
//         <div>
//           <label className="block mb-1 font-medium">
//             Status <span title="Current status of the service.">🛈</span>
//           </label>
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

//         {/* Delete Button */}
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

// export default ServiceForm;

import React, { useState, useEffect } from "react";

const AddDetailsForm = ({ onSubmit, existingBooking, isEditMode, onDelete }) => {
  const [formData, setFormData] = useState({
    serviceID: "",
    customerName: "",
    vehicleNumber: "",
    serviceDate: "",
    presentMeter: 10000, // Set the default value to 10000 km
    status: "Pending",
    contact: {
      phone: "",
      email: "",
    },
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isEditMode && existingBooking) {
      setFormData({
        serviceID: existingBooking.serviceID,
        customerName: existingBooking.customerName,
        vehicleNumber: existingBooking.vehicleNumber,
        serviceDate: existingBooking.serviceDate,
        presentMeter: existingBooking.presentMeter || 10000, // Ensure default value if not provided
        status: existingBooking.status,
        contact: {
          phone: existingBooking.contact?.phone || "",
          email: existingBooking.contact?.email || "",
        },
      });
    }
  }, [isEditMode, existingBooking]);

  const validate = () => {
    const newErrors = {};

    if (!formData.customerName.trim()) newErrors.customerName = "Customer name is required.";
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      onSubmit(formData);
      setFormData({
        serviceID: "",
        customerName: "",
        vehicleNumber: "",
        serviceDate: "",
        presentMeter: 10000, // Reset to default value after submit
        status: "Pending",
        contact: {
          phone: "",
          email: "",
        },
      });
      setErrors({});
      alert("Service booked successfully! ✅");
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
        {isEditMode ? "Update Body Shop Appointment" : "Add Customer Details"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">

        {/* Service ID (display only) */}
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
          />
          {errors.customerName && <p className="text-red-500 text-sm">{errors.customerName}</p>}
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
            min="10000" // Set minimum value to 10000 km
            max="999999" // Set maximum value (you can adjust as needed)
            step="100"  // Adjust step value as needed (default is 1)
          />
          {errors.presentMeter && <p className="text-red-500 text-sm">{errors.presentMeter}</p>}
        </div>

        {/* Phone Number */}
        <div>
          <label className="block mb-1 font-medium">Phone Number</label>
          <input
            type="text"
            name="contact.phone"
            value={formData.contact.phone}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
          />
          {errors.contactPhone && <p className="text-red-500 text-sm">{errors.contactPhone}</p>}
        </div>

        {/* Email Address */}
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

        {/* Status */}
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

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition"
        >
          {isEditMode ? "Update Appointment" : "Submit"}
        </button>

        {/* Delete Button */}
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

export default AddDetailsForm;


