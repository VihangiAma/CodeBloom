

import React, { useState } from "react";
import { useParams } from "react-router-dom";
import NotificationBar from "./Notification";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside className="w-64 h-screen bg-blue-600 text-white p-5">
      <h2 className="text-xl font-bold mb-6">Supervisor Dashboard</h2>
      <nav className="space-y-4">
        <a href="#" className="flex items-center space-x-3 p-2 rounded-lg hover:bg-blue-500">
          <span>📋 Tasks</span>
        </a>
        <a href="#" className="flex items-center space-x-3 p-2 rounded-lg hover:bg-blue-500">
          <span>🔄 Progress</span>
        </a>
        <a href="#" className="flex items-center space-x-3 p-2 rounded-lg hover:bg-blue-500">
          <span>📊 Reports</span>
        </a>
      </nav>
    </aside>
  );
};

const Header = () => {
  const navigate = useNavigate();


  return (
    <header className="flex justify-between items-center p-4 bg-white shadow-md">
      <h1 className="text-lg font-semibold">Service Supervisor</h1>
      
      <div className="flex items-center space-x-4">
        <button className="p-2 bg-gray-100 rounded-full hover:bg-gray-200">
          🔔 {/* Notification Icon */}
        </button>
        <button className="p-2 bg-gray-100 rounded-full hover:bg-gray-200">
          👤 {/* Profile Icon */}
        </button>
        <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
          Logout
        </button>
      </div>
    </header>
  );
};



const TaskTable = () => {
  const [tasks, setTasks] = useState([
    { id: "#001", name: "John Doe", contact: "1234567890", vehicleType: "Sedan", vehicleId: "XYZ123", date: "01-Apr", time: "10:00 AM", status: "Pending" },
    { id: "#002", name: "Jane Smith", contact: "9876543210", vehicleType: "SUV", vehicleId: "ABC456", date: "02-Apr", time: "11:30 AM", status: "In Progress" },
    { id: "#003", name: "Alice Brown", contact: "5556667777", vehicleType: "Truck", vehicleId: "LMN789", date: "03-Apr", time: "02:15 PM", status: "Completed" },
  ]);

  const [selectedTask, setSelectedTask] = useState(null); // Store task for update modal

  // Function to delete a task
  const deleteTask = (id) => {
    if (window.confirm("Are you sure you want to delete this service?")) {
      setTasks(tasks.filter(task => task.id !== id));
    }
  };

  // Open the Update Form
  const openUpdateForm = (task) => {
    setSelectedTask(task);
  };

  // Close the Update Form
  const closeUpdateForm = () => {
    setSelectedTask(null);
  };

  // Handle Update Form Submission
  const handleUpdate = (updatedTask) => {
    setTasks(tasks.map(task => (task.id === updatedTask.id ? updatedTask : task)));
    closeUpdateForm();
  };

  return (
    <div className="p-4">
      <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-200">
          <tr>
          <th className="p-3 text-left">ID</th>
            <th className="p-3 text-left">Customer</th>
            <th className="p-3 text-left">Contact</th>
            <th className="p-3 text-left">Vehicle Type</th>
            <th className="p-3 text-left">Vehicle ID</th>
            <th className="p-3 text-left">Date</th>
            <th className="p-3 text-left">Time</th>
            <th className="p-3 text-left">Status</th>
            <th className="p-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.id} className="border-b hover:bg-gray-100">
              <td className="p-3">{task.id}</td>
              <td className="p-3">{task.name}</td>
              <td className="p-3">{task.contact}</td>
              <td className="p-3">{task.vehicleType}</td>
              <td className="p-3">{task.vehicleId}</td>
              <td className="p-3">{task.date}</td>
              <td className="p-3">{task.time}</td>
              <td className={`p-3 ${task.status === "Pending" ? "text-yellow-500" : task.status === "In Progress" ? "text-blue-500" : "text-green-500"}`}>
                {task.status}
              </td>
              <td className="p-3 flex space-x-2">
                <button onClick={() => openUpdateForm(task)} className="px-3 py-1 bg-yellow-500 text-white rounded-md hover:bg-yellow-600">📝</button>
                <button onClick={() => deleteTask(task.id)} className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600">🗑️</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Show Update Form */}
      {selectedTask && <UpdateForm task={selectedTask} onUpdate={handleUpdate} onClose={closeUpdateForm} />}
    </div>
  );
};

// Update Form Component
const UpdateForm = ({ task, onUpdate, onClose }) => {
  const [formData, setFormData] = useState(task);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(formData);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-lg font-bold mb-4">Update Service</h2>
        <form onSubmit={handleSubmit}>
          <label className="block mb-2">Customer:</label>
          <input type="text" name="customer" value={formData.customer} onChange={handleChange} className="w-full p-2 border rounded mb-3" />

          <label className="block mb-2">Vehicle:</label>
          <input type="text" name="vehicle" value={formData.vehicle} onChange={handleChange} className="w-full p-2 border rounded mb-3" />

          <label className="block mb-2">Service:</label>
          <input type="text" name="service" value={formData.service} onChange={handleChange} className="w-full p-2 border rounded mb-3" />

          <label className="block mb-2">Status:</label>
          <select name="status" value={formData.status} onChange={handleChange} className="w-full p-2 border rounded mb-3">
            <option>Pending</option>
            <option>In Progress</option>
            <option>Completed</option>
          </select>

          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg mr-2">Save</button>
          <button type="button" onClick={onClose} className="bg-gray-400 text-white px-4 py-2 rounded-lg">Cancel</button>
        </form>
      </div>
    </div>
  );
};


const SupervisorDashboard = () => {
  const { section } = useParams(); // Get selected section from URL

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header section={section} />
        <NotificationBar />
        <TaskTable />
      </div>
    </div>
  );
};

export default SupervisorDashboard;

