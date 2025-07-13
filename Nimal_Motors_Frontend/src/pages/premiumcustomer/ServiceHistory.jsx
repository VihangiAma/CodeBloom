import React, { useState, useEffect } from "react";
import axios from "axios";

const ServiceHistory = () => {
  const [completedTasks, setCompletedTasks] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCompletedTasks = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:5001/api/history/completed", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCompletedTasks(response.data);
      } catch (err) {
        console.error("Error fetching completed tasks:", err);
        setError("Failed to load history");
      }
    };
    fetchCompletedTasks();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Service History</h2>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      {completedTasks.length === 0 ? (
        <p className="text-center">No completed tasks found.</p>
      ) : (
        <ul className="space-y-4">
          {completedTasks.map((task) => (
            <li key={task._id} className="p-4 border rounded">
              <p><strong>Service Type:</strong> {task.serviceType}</p>
              <p><strong>Customer:</strong> {task.customerName}</p>
              <p><strong>Vehicle:</strong> {task.vehicleType} - {task.vehicleNumber}</p>
              <p><strong>Date:</strong> {new Date(task.serviceDate).toLocaleDateString()}</p>
              <p><strong>Meter Reading:</strong> {task.presentMeter} km</p>
              <p><strong>Contact:</strong> {task.contact.phone} {task.contact.email && `| ${task.contact.email}`}</p>
              <p><strong>Completed At:</strong> {new Date(task.completedAt).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ServiceHistory;