// src/components/TaskTable.js
import React, { useState } from "react";
import UpdateForm from "./UpdateForm";  // Import the UpdateForm component

const TaskTable = () => {
  const [tasks, setTasks] = useState([
    { id: "#001", name: "John Doe", contact: "1234567890", vehicleType: "Sedan", vehicleId: "XYZ123", date: "01-Apr", time: "10:00 AM", status: "Pending" },
    { id: "#002", name: "Jane Smith", contact: "9876543210", vehicleType: "SUV", vehicleId: "ABC456", date: "02-Apr", time: "11:30 AM", status: "In Progress" },
    { id: "#003", name: "Alice Brown", contact: "5556667777", vehicleType: "Truck", vehicleId: "LMN789", date: "03-Apr", time: "02:15 PM", status: "Completed" },
  ]);

  const [selectedTask, setSelectedTask] = useState(null); // Store task for update modal

  const deleteTask = (id) => {
    if (window.confirm("Are you sure you want to delete this service?")) {
      setTasks(tasks.filter(task => task.id !== id));
    }
  };

  const openUpdateForm = (task) => {
    setSelectedTask(task);
  };

  const closeUpdateForm = () => {
    setSelectedTask(null);
  };

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

      {selectedTask && <UpdateForm task={selectedTask} onUpdate={handleUpdate} onClose={closeUpdateForm} />}
    </div>
  );
};

export default TaskTable;
