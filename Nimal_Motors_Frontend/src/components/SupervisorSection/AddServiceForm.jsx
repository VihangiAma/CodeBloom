// import React, { useState, useEffect } from "react";
// import Swal from "sweetalert2";

// const AddServiceForm = ({
//   onSubmit,
//   existingBooking,
//   isEditMode,
//   onDelete,
// }) => {
//   const [formData, setFormData] = useState({
//     serviceID: "",
//     customerName: "",
//     vehicleType: "",
//     vehicleNumber: "",
//     serviceDate: "",
//     presentMeter: "",
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
//         presentMeter: existingBooking.presentMeter || "",
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
//     if (!formData.customerName.trim())
//       newErrors.customerName = "Customer name is required.";
//     if (!formData.vehicleType.trim())
//       newErrors.vehicleType = "Vehicle type is required.";
//     if (!formData.vehicleNumber.trim())
//       newErrors.vehicleNumber = "Vehicle number is required.";
//     if (!formData.serviceDate)
//       newErrors.serviceDate = "Service date is required.";
//     else if (new Date(formData.serviceDate) < new Date().setHours(0, 0, 0, 0))
//       newErrors.serviceDate = "Service date cannot be in the past.";
//     if (formData.presentMeter === "" || formData.presentMeter === null)
//       newErrors.presentMeter = "Present meter value is required.";
//     else if (formData.presentMeter < 0)
//       newErrors.presentMeter = "Present meter must be positive.";
//     if (!formData.contact.phone.trim())
//       newErrors.contactPhone = "Phone number is required.";
//     if (formData.contact.email && !/\S+@\S+\.\S+/.test(formData.contact.email))
//       newErrors.contactEmail = "Email address is invalid.";
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
//         presentMeter: "",
//         status: "Pending",
//         contact: {
//           phone: "",
//           email: "",
//         },
//       });
//       setErrors({});
//       Swal.fire({
//         icon: "success",
//         title: isEditMode ? "Appointment Updated!" : "Service Booked!",
//         text: isEditMode
//           ? "The appointment details have been updated successfully."
//           : "The new service has been booked successfully.",
//         confirmButtonColor: "#c53030", // red color for button
//       });
//     }
//   };

//   const handleDelete = () => {
//     if (window.confirm("Are you sure you want to delete this service?")) {
//       onDelete(existingBooking.serviceID);
//     }
//   };

//   return (
//     <div className="max-w-xl mx-auto p-6 bg-black rounded-2xl shadow-md border border-red-700">
//       <h2 className="text-3xl font-bold mb-6 text-red-500 text-center">
//         {isEditMode ? "Update Appointment" : "Add Customer Details"}
//       </h2>
//       <form onSubmit={handleSubmit} className="space-y-5">
//         {/* Service ID */}
//         {isEditMode && (
//           <div>
//             <label
//               htmlFor="serviceID"
//               className="block mb-1 font-semibold text-red-400"
//             >
//               Service ID
//             </label>
//             <input
//               id="serviceID"
//               type="text"
//               name="serviceID"
//               value={formData.serviceID}
//               disabled
//               className="w-full p-3 rounded-lg bg-gray-900 text-red-400 border border-red-600 cursor-not-allowed"
//             />
//           </div>
//         )}

//         {/* Customer Name */}
//         <div>
//           <label
//             htmlFor="customerName"
//             className="block mb-1 font-semibold text-red-400"
//           >
//             Customer Name
//           </label>
//           <input
//             id="customerName"
//             type="text"
//             name="customerName"
//             value={formData.customerName}
//             onChange={handleChange}
//             aria-invalid={errors.customerName ? "true" : "false"}
//             className={`w-full p-3 rounded-lg bg-gray-900 text-red-100 border ${
//               errors.customerName ? "border-red-600" : "border-transparent"
//             }`}
//           />
//           {errors.customerName && (
//             <p className="text-red-600 text-sm mt-1">{errors.customerName}</p>
//           )}
//         </div>

//         {/* Vehicle Type */}
//         <div>
//           <label
//             htmlFor="vehicleType"
//             className="block mb-1 font-semibold text-red-400"
//           >
//             Vehicle Type
//           </label>
//           <select
//             id="vehicleType"
//             name="vehicleType"
//             value={formData.vehicleType}
//             onChange={handleChange}
//             aria-invalid={errors.vehicleType ? "true" : "false"}
//             className={`w-full p-3 rounded-lg bg-gray-900 text-red-100 border ${
//               errors.vehicleType ? "border-red-600" : "border-transparent"
//             }`}
//           >
//             <option value="">-- Select Vehicle Type --</option>
//             <option value="Car">Car</option>
//             <option value="Van">Van</option>
//           </select>
//           {errors.vehicleType && (
//             <p className="text-red-600 text-sm mt-1">{errors.vehicleType}</p>
//           )}
//         </div>

//         {/* Vehicle Number */}
//         <div>
//           <label
//             htmlFor="vehicleNumber"
//             className="block mb-1 font-semibold text-red-400"
//           >
//             Vehicle Number
//           </label>
//           <input
//             id="vehicleNumber"
//             type="text"
//             name="vehicleNumber"
//             value={formData.vehicleNumber}
//             onChange={handleChange}
//             aria-invalid={errors.vehicleNumber ? "true" : "false"}
//             className={`w-full p-3 rounded-lg bg-gray-900 text-red-100 border ${
//               errors.vehicleNumber ? "border-red-600" : "border-transparent"
//             }`}
//           />
//           {errors.vehicleNumber && (
//             <p className="text-red-600 text-sm mt-1">{errors.vehicleNumber}</p>
//           )}
//         </div>

//         {/* Service Date */}
//         <div>
//           <label
//             htmlFor="serviceDate"
//             className="block mb-1 font-semibold text-red-400"
//           >
//             Service Date
//           </label>
//           <input
//             id="serviceDate"
//             type="date"
//             name="serviceDate"
//             value={formData.serviceDate}
//             onChange={handleChange}
//             aria-invalid={errors.serviceDate ? "true" : "false"}
//             className={`w-full p-3 rounded-lg bg-gray-900 text-red-100 border ${
//               errors.serviceDate ? "border-red-600" : "border-transparent"
//             }`}
//           />
//           {errors.serviceDate && (
//             <p className="text-red-600 text-sm mt-1">{errors.serviceDate}</p>
//           )}
//         </div>

//         {/* Present Meter */}
//         <div>
//           <label
//             htmlFor="presentMeter"
//             className="block mb-1 font-semibold text-red-400"
//           >
//             Present Meter
//           </label>
//           <input
//             id="presentMeter"
//             type="number"
//             name="presentMeter"
//             value={formData.presentMeter}
//             onChange={handleChange}
//             min="10000"
//             max="999999"
//             step="100"
//             aria-invalid={errors.presentMeter ? "true" : "false"}
//             className={`w-full p-3 rounded-lg bg-gray-900 text-red-100 border ${
//               errors.presentMeter ? "border-red-600" : "border-transparent"
//             }`}
//           />
//           {errors.presentMeter && (
//             <p className="text-red-600 text-sm mt-1">{errors.presentMeter}</p>
//           )}
//         </div>

//         {/* Phone */}
//         <div>
//           <label
//             htmlFor="contactPhone"
//             className="block mb-1 font-semibold text-red-400"
//           >
//             Phone Number
//           </label>
//           <input
//             id="contactPhone"
//             type="text"
//             name="contact.phone"
//             value={formData.contact.phone}
//             onChange={handleChange}
//             aria-invalid={errors.contactPhone ? "true" : "false"}
//             className={`w-full p-3 rounded-lg bg-gray-900 text-red-100 border ${
//               errors.contactPhone ? "border-red-600" : "border-transparent"
//             }`}
//           />
//           {errors.contactPhone && (
//             <p className="text-red-600 text-sm mt-1">{errors.contactPhone}</p>
//           )}
//         </div>

//         {/* Email */}
//         <div>
//           <label
//             htmlFor="contactEmail"
//             className="block mb-1 font-semibold text-red-400"
//           >
//             Email Address (optional)
//           </label>
//           <input
//             id="contactEmail"
//             type="email"
//             name="contact.email"
//             value={formData.contact.email}
//             onChange={handleChange}
//             aria-invalid={errors.contactEmail ? "true" : "false"}
//             className={`w-full p-3 rounded-lg bg-gray-900 text-red-100 border ${
//               errors.contactEmail ? "border-red-600" : "border-transparent"
//             }`}
//           />
//           {errors.contactEmail && (
//             <p className="text-red-600 text-sm mt-1">{errors.contactEmail}</p>
//           )}
//         </div>

//         {/* Status */}
//         <div>
//           <label
//             htmlFor="status"
//             className="block mb-1 font-semibold text-red-400"
//           >
//             Status
//           </label>
//           <select
//             id="status"
//             name="status"
//             value={formData.status}
//             onChange={handleChange}
//             className="w-full p-3 rounded-lg bg-gray-900 text-red-100 border border-transparent"
//           >
//             <option value="Pending">Pending</option>
//             <option value="In Progress">In Progress</option>
//             <option value="Completed">Completed</option>
//           </select>
//         </div>

//         {/* Submit */}
//         <button
//           type="submit"
//           className="w-full bg-red-700 hover:bg-red-800 text-white p-3 rounded-lg font-semibold transition"
//         >
//           {isEditMode ? "Update Appointment" : "Submit"}
//         </button>

//         {/* Delete */}
//         {isEditMode && (
//           <button
//             type="button"
//             onClick={handleDelete}
//             className="w-full bg-red-900 hover:bg-red-950 text-white p-3 rounded-lg font-semibold transition mt-4"
//           >
//             Delete Appointment
//           </button>
//         )}
//       </form>
//     </div>
//   );
// };

// export default AddServiceForm;

//Add Customer Details in mechanical, Electrical, and bodyshop

import React, { useState, useEffect } from "react";

const AddServiceForm = ({
  onSubmit,
  existingBooking,
  isEditMode,
  onDelete,
}) => {
  const [formData, setFormData] = useState({
    serviceID: "",
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

  useEffect(() => {
    if (isEditMode && existingBooking) {
      setFormData({
        serviceID: existingBooking.serviceID,
        customerName: existingBooking.customerName,
        vehicleType: existingBooking.vehicleType || "",
        vehicleNumber: existingBooking.vehicleNumber,
        serviceDate: existingBooking.serviceDate,
        presentMeter: existingBooking.presentMeter || 10000,
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
        {isEditMode ? "Update Appointment" : "Add Customer Details"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Service ID */}
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
          {errors.customerName && (
            <p className="text-red-500 text-sm">{errors.customerName}</p>
          )}
        </div>

        {/* Vehicle Type Dropdown */}
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
          {errors.vehicleNumber && (
            <p className="text-red-500 text-sm">{errors.vehicleNumber}</p>
          )}
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
          {errors.serviceDate && (
            <p className="text-red-500 text-sm">{errors.serviceDate}</p>
          )}
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
          {errors.presentMeter && (
            <p className="text-red-500 text-sm">{errors.presentMeter}</p>
          )}
        </div>

        {/* Phone */}
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

        {/* Email */}
        <div>
          <label className="block mb-1 font-medium">
            Email Address (optional)
          </label>
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

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition"
        >
          {isEditMode ? "Update Appointment" : "Submit"}
        </button>

        {/* Delete */}
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

export default AddServiceForm;
