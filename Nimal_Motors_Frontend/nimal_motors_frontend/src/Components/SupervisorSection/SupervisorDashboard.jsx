

import React, { useEffect, useState } from "react";
import { Route, useNavigate, useParams } from "react-router-dom";
//import NotificationBar from "./Notification";
import axios from "axios";

// Sidebar Component
function Sidebar() {
  return (
    <aside className="w-64 h-screen bg-blue-600 text-white p-5">
       <h2 className="text-xl font-bold mb-6">Nimal Motors</h2>
      <h3 className="text-xl font-bold mb-6">Supervisor Dashboard</h3>
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
        <a href="#" className="flex items-center space-x-3 p-2 rounded-lg hover:bg-blue-500">
          <span>📅 Appointment</span>
        </a>
      </nav>
    </aside>
  );
}

// Header Component
const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  return (
    <header className="flex justify-between items-center p-4 bg-white shadow-md">
      <h1 className="text-lg font-semibold">Service Supervisor</h1>
      <div className="flex items-center space-x-4">
        <button className="p-2 bg-gray-100 rounded-full hover:bg-gray-200">🔔</button>
        <button
          className="p-2 bg-gray-100 rounded-full hover:bg-gray-200"
          onClick={() => navigate("/profile")}
        >
          👤
        </button>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
        >
          Logout
        </button>
      </div>
    </header>
  );
};

// Task Table Component
// Task Table Component
const TaskTable = () => {
  const [tasks, setTasks] = useState([
    { serviceId: "2025#1", customerID: "001", vehicleId: "XYZ123", serviceDateate: "01-Apr-2025", status: "Pending" },
    { serviceId: "2025#2", customerID: "002", vehicleId: "ABC123", serviceDateate: "03-Aug-2025", status: "Complete" },
    { serviceId: "2025#3", customerID: "003", vehicleId: "SQR123", serviceDateate: "25-Apr-2025", status: "Pending" },
    { serviceId: "2025#4", customerID: "004", vehicleId: "PMV123", serviceDateate: "08-Aug-2025", status: "Complete" },
    { serviceId: "2025#5", customerID: "005", vehicleId: "SQR567", serviceDateate: "25-Apr-2025", status: "Pending" },
    { serviceId: "2025#6", customerID: "006", vehicleId: "PMV879", serviceDateate: "08-Aug-2025", status: "Complete" }
  ]);
  const [selectedTask, setSelectedTask] = useState(null);

  const deleteTask = (serviceId) => {
    if (window.confirm("Are you sure you want to delete this service?")) {
      setTasks(tasks.filter(task => task.serviceId !== serviceId));  // Ensure serviceId is used
    }
  };

  const openUpdateForm = (task) => {
    setSelectedTask(task);
  };

  const closeUpdateForm = () => {
    setSelectedTask(null);
  };

  const handleUpdate = (updatedTask) => {
    setTasks(tasks.map(task => (task.serviceId === updatedTask.serviceId ? updatedTask : task)));
    closeUpdateForm();
  };

  return (
    <div className="p-4">
      <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-3 text-left">Service ID</th>
            <th className="p-3 text-left">Customer ID</th>
            <th className="p-3 text-left">Vehicle ID</th>
            <th className="p-3 text-left">Service Date</th>
            <th className="p-3 text-left">Status</th>
            <th className="p-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.serviceId} className="border-b hover:bg-gray-100">
              <td className="p-3">{task.serviceId}</td>
              <td className="p-3">{task.customerID}</td>
              <td className="p-3">{task.vehicleId}</td>
              <td className="p-3">{new Date(task.serviceDateate).toLocaleDateString()}</td>
              <td className={`p-3 ${task.status === "Pending" ? "text-yellow-500" : task.status === "Completed" ? "text-green-500" : "text-red-500"}`}>
                {task.status}
              </td>
              <td className="p-3 flex space-x-2">
                <button onClick={() => openUpdateForm(task)} className="px-3 py-1 bg-yellow-500 text-white rounded-md hover:bg-yellow-600">📝</button>
                <button onClick={() => deleteTask(task.serviceId)} className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600">🗑️</button>  {/* Use serviceId here */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

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
      <div className="bg-white p-6 rounded-lg shadow-lg w-3/4 lg:w-2/3">
        <h2 className="text-lg font-bold mb-4">Update Service</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <label className="block mb-2">Service ID:</label>
            <input
              type="text"
              name="serviceId"
              value={formData.serviceId}
              onChange={handleChange}
              className="w-full p-2 border rounded mb-3"
              disabled
            />
            <label className="block mb-2">Customer ID:</label>
            <input
              type="text"
              name="customerId"
              value={formData.customerId}
              onChange={handleChange}
              className="w-full p-2 border rounded mb-3"
            />
          </div>
          <div>
            <label className="block mb-2">Vehicle ID:</label>
            <input
              type="text"
              name="vehicleId"
              value={formData.vehicleId}
              onChange={handleChange}
              className="w-full p-2 border rounded mb-3"
            />
            <label className="block mb-2">Service Date:</label>
            <input
              type="date"
              name="serviceDate"
              value={formData.serviceDate}
              onChange={handleChange}
              className="w-full p-2 border rounded mb-3"
            />
            <label className="block mb-2">Status:</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full p-2 border rounded mb-3"
            >
              <option>Pending</option>
              <option>In Progress</option>
              <option>Completed</option>
            </select>
          </div>
          <div className="col-span-2 flex justify-end space-x-4 mt-4">
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Update
            </button>
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const SupervisorDashboard = () => {
  const [service, setService] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5001/api/service")
      .then(response => setService(response.data))  // Use setService here
      .catch(error => console.error("Error fetching data", error));
  }, []);

  const { section } = useParams();

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header section={section} />
        {/* <NotificationBar /> */}
        <TaskTable />
      </div>
    </div>
  );
}

export default SupervisorDashboard;
