import React, { useEffect, useState } from "react";
import { Route, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.jpg"; // Adjust the path as necessary

// Sidebar Component
function Sidebar() {
  return (
    <aside className="w-64 h-screen bg-blue-600 text-white p-5">
     
      <img src={logo} alt="Logo" className="w-24 h-24 rounded-full mb-4" />
      <h1 className="text-xl font-bold mb-6">Nimal Motors</h1>
      <h3 className="text-xl font-bold mb-6">Supervisor Dashboard</h3>
      <nav className="space-y-4">
        <a
          href="#"
          className="flex items-center space-x-3 p-2 rounded-lg hover:bg-blue-500"
        >
          <span>📋 Tasks</span>
        </a>
        <a
          href="#"
          className="flex items-center space-x-3 p-2 rounded-lg hover:bg-blue-500"
        >
          <span>🔄 Progress</span>
        </a>
        <a
          href="#"
          className="flex items-center space-x-3 p-2 rounded-lg hover:bg-blue-500"
        >
          <span>📊 Reports</span>
        </a>
        {/* <a
          href="#"
          className="flex items-center space-x-3 p-2 rounded-lg hover:bg-blue-500"
        >
          <span>📅 Appointment</span>
        </a> */}
        <Link to="/appointments" className="block p-2 hover:bg-gray-100 rounded">
  📅  Manage Appointments
        </Link>
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
        <button className="p-2 bg-gray-100 rounded-full hover:bg-gray-200">
          🔔
        </button>
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

const TaskTable = () => {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);

  useEffect(() => {
    // Fetch data from your API using axios
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5001/api/service");
        setTasks(response.data); // Assuming the API returns an array of tasks
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // const deleteTask = (serviceId) => {
  //   if (window.confirm("Are you sure you want to delete this service?")) {
  //     setTasks(tasks.filter(task => task.serviceId !== serviceId));  // Ensure serviceId is used
  //   }
  // };

  const deleteTask = async (serviceID) => {
    if (window.confirm("Are you sure you want to delete this service?")) {
      try {
        // Send DELETE request to backend
        await axios.delete(`http://localhost:5001/api/service/${serviceID}`);
  
        // Remove the task from frontend state only after successful deletion
        setTasks((prevTasks) => prevTasks.filter((task) => task.serviceID !== serviceID));
      } catch (error) {
        console.error("Error deleting service:", error);
      }
    }
  };
  

  // const openUpdateForm = (task) => {
  //   setSelectedTask(task);
  // };

  const openUpdateForm = async (taskId) => {
    try {
      const response = await axios.get(
        `http://localhost:5001/api/service/${taskId}`
      );
      setSelectedTask(response.data);
    } catch (error) {
      console.error("Error fetching service details:", error);
    }
  };

  const closeUpdateForm = () => {
    setSelectedTask(null);
  };

  // const handleUpdate = (updatedTask) => {
  //   setTasks(tasks.map(task => (task.serviceId === updatedTask.serviceId ? updatedTask : task)));
  //   closeUpdateForm();
  // };
  const handleUpdate = (updatedTask) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.serviceID === updatedTask.serviceID ? updatedTask : task
      )
    );
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
            <tr key={task.serviceID} className="border-b hover:bg-gray-100">
              <td className="p-3">{task.serviceID}</td>{" "}
              {/* Make sure the correct field is being referenced */}
              <td className="p-3">{task.customerID}</td>
              <td className="p-3">{task.vehicleID}</td>
              <td className="p-3">
                {new Date(task.serviceDate).toLocaleDateString()}
              </td>
              <td
                className={`p-3 ${
                  task.status === "Pending"
                    ? "text-yellow-500"
                    : task.status === "Completed"
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {task.status}
              </td>
              <td className="p-3 flex space-x-2">
                <button
                  onClick={() => openUpdateForm(task.serviceID)}
                  className="px-3 py-1 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
                >
                  📝
                </button>
                <button
                  onClick={() => deleteTask(task.serviceID)}
                  className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
                >
                  🗑️
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedTask && (
        <UpdateForm
          task={selectedTask}
          onUpdate={handleUpdate}
          onClose={closeUpdateForm}
        />
      )}
    </div>
  );
};

// Update Form Component
const UpdateForm = ({ task, onUpdate, onClose }) => {
  const [formData, setFormData] = useState(task);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   onUpdate(formData);
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:5001/api/service/${formData.serviceID}`,
        formData
      );
      onUpdate(formData); // Refresh table with updated data
      onClose(); // Close modal
    } catch (error) {
      console.error("Error updating service:", error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-3/4 lg:w-2/3">
        <h2 className="text-lg font-bold mb-4">Update Service</h2>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        >
          <div>
            <label className="block mb-2">Service ID:</label>
            <input
              type="text"
              name="serviceId"
              value={formData.serviceID}
              // onChange={handleChange}
              className="w-full p-2 border rounded mb-3"
              disabled
            />
            <label className="block mb-2">Customer ID:</label>
            <input
              type="text"
              name="customerId"
              value={formData.customerID || ""}
              // onChange={handleChange}
              className="w-full p-2 border rounded mb-3"
              disabled
            />
          </div>
          <div>
            <label className="block mb-2">Vehicle ID:</label>
            <input
              type="text"
              name="vehicleId"
              value={formData.vehicleID || ""}
              // onChange={handleChange}
              className="w-full p-2 border rounded mb-3"
              disabled
            />
            <label className="block mb-2">Service Date:</label>
            <input
              type="date"
              name="serviceDate"
              // value={formData.serviceDate}
              value={
                formData.serviceDate
                  ? new Date(formData.serviceDate).toISOString().split("T")[0]
                  : ""
              }
              // onChange={handleChange}
              className="w-full p-2 border rounded mb-3"
              disabled
            />
            <label className="block mb-2">Status:</label>
            <select
              name="status"
              value={formData.status || "Pending"}
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
    axios
      .get("http://localhost:5001/api/service")
      .then((response) => setService(response.data)) // Use setService here
      .catch((error) => console.error("Error fetching data", error));
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
};

export default SupervisorDashboard;
