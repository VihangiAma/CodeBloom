// // src/components/UpdateForm.js
// import React, { useState } from "react";

// const UpdateForm = ({ task, onUpdate, onClose }) => {
//   const [formData, setFormData] = useState(task);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onUpdate(formData);
//   };

//   return (
//     <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
//       <div className="bg-white p-6 rounded-lg shadow-lg">
//         <h2 className="text-lg font-bold mb-4">Update Service</h2>
//         <form onSubmit={handleSubmit}>
//           <label className="block mb-2">Customer:</label>
//           <input
//             type="text"
//             name="name"
//             value={formData.name}
//             onChange={handleChange}
//             className="w-full p-2 border rounded mb-3"
//           />

//           <label className="block mb-2">Vehicle Type:</label>
//           <input
//             type="text"
//             name="vehicleType"
//             value={formData.vehicleType}
//             onChange={handleChange}
//             className="w-full p-2 border rounded mb-3"
//           />

//           <label className="block mb-2">Vehicle ID:</label>
//           <input
//             type="text"
//             name="vehicleId"
//             value={formData.vehicleId}
//             onChange={handleChange}
//             className="w-full p-2 border rounded mb-3"
//           />

//           <label className="block mb-2">Status:</label>
//           <select
//             name="status"
//             value={formData.status}
//             onChange={handleChange}
//             className="w-full p-2 border rounded mb-3"
//           >
//             <option>Pending</option>
//             <option>In Progress</option>
//             <option>Completed</option>
//           </select>

//           <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg mr-2">
//             Save
//           </button>
//           <button type="button" onClick={onClose} className="bg-gray-400 text-white px-4 py-2 rounded-lg">
//             Cancel
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default UpdateForm;
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const UpdateForm = () => {
  const { taskId } = useParams(); // Get task ID from the URL
  const navigate = useNavigate();
  const [task, setTask] = useState(null);

  useEffect(() => {
    // Simulate fetching the task data from an API or state
    // In real implementation, replace this with an API call
    const fetchedTask = {
      id: taskId,
      customer: "John Doe",
      vehicle: "Sedan",
      service: "Engine Check",
      status: "In Progress"
    };
    setTask(fetchedTask);
  }, [taskId]);

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updated Task:", task);
    // Update logic (e.g., send data to API)
    navigate("/dashboard"); // Navigate back to the dashboard after save
  };

  if (!task) return <div>Loading...</div>;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-lg font-bold mb-4">Update Service</h2>
        <form onSubmit={handleSubmit}>
          <label className="block mb-2">Customer:</label>
          <input type="text" name="customer" value={task.customer} onChange={handleChange} className="w-full p-2 border rounded mb-3" />

          <label className="block mb-2">Vehicle:</label>
          <input type="text" name="vehicle" value={task.vehicle} onChange={handleChange} className="w-full p-2 border rounded mb-3" />

          <label className="block mb-2">Service:</label>
          <input type="text" name="service" value={task.service} onChange={handleChange} className="w-full p-2 border rounded mb-3" />

          <label className="block mb-2">Status:</label>
          <select name="status" value={task.status} onChange={handleChange} className="w-full p-2 border rounded mb-3">
            <option>Pending</option>
            <option>In Progress</option>
            <option>Completed</option>
          </select>

          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg mr-2">Save</button>
          <button type="button" onClick={() => navigate("/dashboard")} className="bg-gray-400 text-white px-4 py-2 rounded-lg">Cancel</button>
        </form>
      </div>
    </div>
  );
};

export default UpdateForm;

