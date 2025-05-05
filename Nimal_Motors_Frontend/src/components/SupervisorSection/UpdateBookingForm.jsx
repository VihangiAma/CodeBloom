// import React, { useState, useEffect } from "react";

// const UpdateBookingForm = ({ existingBooking, onSubmit, onCancel }) => {
//   const [formData, setFormData] = useState({
//     serviceID: "",
//     customerName: "",
//     vehicleNumber: "",
//     serviceDate: "",
//     description: "",
//     status: "Pending",
//     contact: {
//       phone: "",
//       email: "",
//     },
//   });

//   const [errors, setErrors] = useState({});

//   useEffect(() => {
//     if (existingBooking) {
//       setFormData({
//         serviceID: existingBooking.serviceID || "",
//         customerName: existingBooking.customerName || "",
//         vehicleNumber: existingBooking.vehicleNumber || "", 
//         serviceDate: existingBooking.serviceDate
//           ? existingBooking.serviceDate.slice(0, 10)
//           : "",
//         description: existingBooking.description || "",
//         status: existingBooking.status || "Pending",
//         contact: {
//           phone: existingBooking.contact?.phone || "",
//           email: existingBooking.contact?.email || "",
//         },
//       });
//     }
//   }, [existingBooking]);

//   const validate = () => {
//     const newErrors = {};

//     if (!formData.serviceID.trim())
//       newErrors.serviceID = "Service ID is required.";
//     if (!formData.customerName.trim())
//       newErrors.customerName = "Customer name is required.";
//     if (!formData.vehicleNumber.trim())
//       newErrors.vehicleNumber = "Vehicle Number is required.";
//     if (!formData.serviceDate)
//       newErrors.serviceDate = "Service date is required.";
//     else if (
//       new Date(formData.serviceDate) < new Date().setHours(0, 0, 0, 0)
//     )
//       newErrors.serviceDate = "Service date cannot be in the past.";
//     if (!formData.description.trim())
//       newErrors.description = "Description is required.";
//     if (formData.description.length > 100)
//       newErrors.description = "Description must be 100 characters or less.";
//     if (!formData.contact.phone.trim())
//       newErrors.contactPhone = "Phone number is required.";

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
//       console.log("Validation errors:", validationErrors);
//       setErrors(validationErrors);
//     } else {
//       console.log("Submitting:", formData);
//       onSubmit(formData); 
//       setErrors({});
//       alert("Booking updated successfully! ✅");
//     }
//   };

//   return (
//     <div className="max-w-5xl mx-auto p-8 bg-white rounded-lg shadow-xl">
//       <h2 className="text-3xl font-semibold text-center text-blue-600 mb-8">
//         Update Booking
//       </h2>
//       <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-6">

//         {/* Service ID */}
//         <div className="col-span-2">
//           <label className="block text-lg font-medium text-gray-700 mb-2">
//             Service ID
//           </label>
//           <input
//             type="text"
//             name="serviceID"
//             value={formData.serviceID}
//             onChange={handleChange}
//             className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
//             disabled
//           />
//           {errors.serviceID && (
//             <p className="text-red-500 text-sm mt-1">{errors.serviceID}</p>
//           )}
//         </div>

//         {/* Customer Name */}
//         <div>
//           <label className="block text-lg font-medium text-gray-700 mb-2">
//             Customer Name
//           </label>
//           <input
//             type="text"
//             name="customerName"
//             value={formData.customerName}
//             onChange={handleChange}
//             className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
//           />
//           {errors.customerName && (
//             <p className="text-red-500 text-sm mt-1">
//               {errors.customerName}
//             </p>
//           )}
//         </div>

//         {/* Vehicle Number */}
//         <div>
//           <label className="block text-lg font-medium text-gray-700 mb-2">
//             Vehicle Number
//           </label>
//           <input
//             type="text"
//             name="vehicleNumber"
//             value={formData.vehicleNumber}
//             onChange={handleChange}
//             className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
//           />
//           {errors.vehicleNumber && (
//             <p className="text-red-500 text-sm mt-1">
//               {errors.vehicleNumber}
//             </p>
//           )}
//         </div>

//         {/* Service Date */}
//         <div>
//           <label className="block text-lg font-medium text-gray-700 mb-2">
//             Service Date
//           </label>
//           <input
//             type="date"
//             name="serviceDate"
//             value={formData.serviceDate}
//             onChange={handleChange}
//             className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
//           />
//           {errors.serviceDate && (
//             <p className="text-red-500 text-sm mt-1">
//               {errors.serviceDate}
//             </p>
//           )}
//         </div>

//         {/* Phone Number */}
//         <div>
//           <label className="block text-lg font-medium text-gray-700 mb-2">
//             Phone Number
//           </label>
//           <input
//             type="text"
//             name="contact.phone"
//             value={formData.contact.phone}
//             onChange={handleChange}
//             className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
//           />
//           {errors.contactPhone && (
//             <p className="text-red-500 text-sm mt-1">
//               {errors.contactPhone}
//             </p>
//           )}
//         </div>

//         {/* Email Address */}
//         <div>
//           <label className="block text-lg font-medium text-gray-700 mb-2">
//             Email Address
//           </label>
//           <input
//             type="email"
//             name="contact.email"
//             value={formData.contact.email}
//             onChange={handleChange}
//             className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
//           />
//         </div>

//         {/* Description */}
//         <div className="col-span-2">
//           <label className="block text-lg font-medium text-gray-700 mb-2">
//             Description (Max 100 characters)
//           </label>
//           <textarea
//             name="description"
//             value={formData.description}
//             onChange={handleChange}
//             maxLength="100"
//             className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
//           />
//           <div className="text-sm text-gray-500 mt-1">
//             {formData.description.length} / 100 characters
//           </div>
//           {errors.description && (
//             <p className="text-red-500 text-sm mt-1">
//               {errors.description}
//             </p>
//           )}
//         </div>

//         {/* Status */}
//         <div>
//           <label className="block text-lg font-medium text-gray-700 mb-2">
//             Status
//           </label>
//           <select
//             name="status"
//             value={formData.status}
//             onChange={handleChange}
//             className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
//           >
//             <option value="Pending">Pending</option>
//             <option value="In Progress">In Progress</option>
//             <option value="Completed">Completed</option>
//           </select>
//         </div>

//         {/* Buttons */}
//         <div className="col-span-2 flex justify-between gap-4 mt-6">
//           <button
//             type="submit"
//             className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 transform hover:scale-105"
//           >
//             Update Booking
//           </button>
//           <button
//             type="button"
//             onClick={onCancel}
//             className="w-full py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition duration-300 transform hover:scale-105"
//           >
//             Cancel
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default UpdateBookingForm;


import React, { useState, useEffect } from "react";

const UpdateBookingForm = ({ existingBooking, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    serviceID: "",
    customerName: "",
    vehicleNumber: "",
    serviceDate: "",
    contact: {
      phone: "",
    },
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (existingBooking) {
      setFormData({
        serviceID: existingBooking.serviceID || "",
        customerName: existingBooking.customerName || "",
        vehicleNumber: existingBooking.vehicleNumber || "", 
        serviceDate: existingBooking.serviceDate
          ? existingBooking.serviceDate.slice(0, 10)
          : "",
        contact: {
          phone: existingBooking.contact?.phone || "",
        },
      });
    }
  }, [existingBooking]);
  const validate = () => {
    const newErrors = {};
  
    // Ensure serviceID is a string for validation
    if (!String(formData.serviceID).trim())
      newErrors.serviceID = "Service ID is required.";
    if (!formData.customerName.trim())
      newErrors.customerName = "Customer name is required.";
    if (!formData.vehicleNumber.trim())
      newErrors.vehicleNumber = "Vehicle Number is required.";
    if (!formData.serviceDate)
      newErrors.serviceDate = "Service date is required.";
    else if (
      new Date(formData.serviceDate) < new Date().setHours(0, 0, 0, 0)
    )
      newErrors.serviceDate = "Service date cannot be in the past.";
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
      console.log("Validation errors:", validationErrors);
      setErrors(validationErrors);
    } else {
      console.log("Submitting:", formData);
      onSubmit(formData); 
      setErrors({});
      alert("Booking updated successfully! ✅");
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-8 bg-white rounded-lg shadow-xl">
      <h2 className="text-3xl font-semibold text-center text-blue-600 mb-8">
        Update Booking
      </h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-6">

        {/* Service ID */}
        <div className="col-span-2">
          <label className="block text-lg font-medium text-gray-700 mb-2">
            Service ID
          </label>
          <input
            type="text"
            name="serviceID"
            value={formData.serviceID}
            onChange={handleChange}
            className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            disabled
          />
          {errors.serviceID && (
            <p className="text-red-500 text-sm mt-1">{errors.serviceID}</p>
          )}
        </div>

        {/* Customer Name */}
        <div>
          <label className="block text-lg font-medium text-gray-700 mb-2">
            Customer Name
          </label>
          <input
            type="text"
            name="customerName"
            value={formData.customerName}
            onChange={handleChange}
            className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          {errors.customerName && (
            <p className="text-red-500 text-sm mt-1">
              {errors.customerName}
            </p>
          )}
        </div>

        {/* Vehicle Number */}
        <div>
          <label className="block text-lg font-medium text-gray-700 mb-2">
            Vehicle Number
          </label>
          <input
            type="text"
            name="vehicleNumber"
            value={formData.vehicleNumber}
            onChange={handleChange}
            className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          {errors.vehicleNumber && (
            <p className="text-red-500 text-sm mt-1">
              {errors.vehicleNumber}
            </p>
          )}
        </div>

        {/* Service Date */}
        <div>
          <label className="block text-lg font-medium text-gray-700 mb-2">
            Service Date
          </label>
          <input
            type="date"
            name="serviceDate"
            value={formData.serviceDate}
            onChange={handleChange}
            className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          {errors.serviceDate && (
            <p className="text-red-500 text-sm mt-1">
              {errors.serviceDate}
            </p>
          )}
        </div>

        {/* Phone Number */}
        <div>
          <label className="block text-lg font-medium text-gray-700 mb-2">
            Phone Number
          </label>
          <input
            type="text"
            name="contact.phone"
            value={formData.contact.phone}
            onChange={handleChange}
            className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          {errors.contactPhone && (
            <p className="text-red-500 text-sm mt-1">
              {errors.contactPhone}
            </p>
          )}
        </div>

        {/* Buttons */}
        <div className="col-span-2 flex justify-between gap-4 mt-6">
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 transform hover:scale-105"
          >
            Update Booking
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="w-full py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition duration-300 transform hover:scale-105"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateBookingForm;
