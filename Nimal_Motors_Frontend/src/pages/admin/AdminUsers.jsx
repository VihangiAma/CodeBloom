import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaUser, FaTrash, FaArrowLeft, FaEdit, FaUserPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [editUser, setEditUser] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [showAddUserForm, setShowAddUserForm] = useState(false);
  const [newUser, setNewUser] = useState({
    fullName: "",
    email: "",
    username: "",
    phoneNumber: "",
    type: "",
    password: "",
  });
  
  const navigate = useNavigate();

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      const res = await axios.get("http://localhost:5001/api/user/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUsers(Array.isArray(res.data.data) ? res.data.data : []);
    } catch (err) {
      console.error("Error fetching users", err);
    }
  };

  const deleteUser = async (userId) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5001/api/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUsers(users.filter((user) => user.userId !== userId));
    } catch (err) {
      console.error("Error deleting user", err);
    }
  };

  const openUpdateModal = (user) => {
    setEditUser({ ...user });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const saveUpdatedUser = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(`http://localhost:5001/api/user/${editUser.userId}`, editUser, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUsers((prevUsers) =>
        prevUsers.map((u) => (u.userId === editUser.userId ? editUser : u))
      );

      setSuccessMessage("Information Saved!");
      setTimeout(() => setSuccessMessage(""), 3000);
      setEditUser(null);
    } catch (err) {
      console.error("Error updating user", err);
    }
  };

  const toggleAddUserForm = () => {
    setShowAddUserForm(!showAddUserForm);
  };

  const handleNewUserChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddUser = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
  
      const { password, ...userData } = newUser;
  
      const res = await axios.post("http://localhost:5001/api/user/admin/add-user", userData, {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      if (res.status === 200 || res.status === 201) {
        alert(`User added successfully! Temporary Password: ${res.data.tempPassword}`);
        setNewUser({
          fullName: "",
          email: "",
          username: "",
          phoneNumber: "",
          type: "",
          password: "",
        });
        setShowAddUserForm(false);
        fetchUsers(); // Refresh the user list
      } else {
        alert("Failed to add user");
      }
    } catch (err) {
      console.error("Error adding new user", err.response ? err.response.data : err.message);
      alert("Failed to add user");
    }
  };
  
  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="p-6 bg-gray-900 text-white min-h-screen">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white flex items-center">
          👥 All Registered Users
        </h2>
        <div className="flex gap-4">
          <button
            onClick={toggleAddUserForm}
            className="flex items-center gap-2 text-green-400 hover:text-white"
          >
            <FaUserPlus /> Add User
          </button>
          <button
            onClick={() => navigate("/admin-dashboard")}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded text-sm"
          >
            <FaArrowLeft /> Back to Profile
          </button>
        </div>
      </div>

      {successMessage && (
        <div className="bg-green-600 text-white p-2 rounded mb-4 text-center">
          {successMessage}
        </div>
      )}

      {/* Add User Form */}
      {showAddUserForm && (
  <div className="bg-gray-800 p-6 rounded-lg mb-6">
    <h3 className="text-lg font-bold mb-4">Add New User</h3>
    <div className="flex flex-col gap-4">
      <input
        type="text"
        name="fullName"
        value={newUser.fullName}
        onChange={handleNewUserChange}
        placeholder="Full Name"
        className="px-3 py-2 rounded bg-gray-700 text-white"
      />
      <input
        type="email"
        name="email"
        value={newUser.email}
        onChange={handleNewUserChange}
        placeholder="Email"
        className="px-3 py-2 rounded bg-gray-700 text-white"
      />
      <input
        type="text"
        name="username"
        value={newUser.username}
        onChange={handleNewUserChange}
        placeholder="Username"
        className="px-3 py-2 rounded bg-gray-700 text-white"
      />
      <input
        type="text"
        name="phoneNumber"
        value={newUser.phoneNumber}
        onChange={handleNewUserChange}
        placeholder="Phone Number"
        className="px-3 py-2 rounded bg-gray-700 text-white"
      />
      <select
        name="type"
        value={newUser.type}
        onChange={handleNewUserChange}
        className="px-3 py-2 rounded bg-gray-700 text-white"
      >
        <option value="">Select Role</option>
        <option value="admin">Admin</option>
        <option value="mechanicalsupervisor">Mechanical Supervisor</option>
        <option value="electricalsupervisor">Electrical Supervisor</option>
        <option value="bodyshopsupervisor">Bodyshop Supervisor</option>
        <option value="servicesupervisor">Service Supervisor</option>
        <option value="accountant">Accountant</option>
        <option value="premiumCustomer">Premium Customer</option>
      </select>
    </div>

    <div className="flex justify-end gap-3 mt-6">
      <button
        onClick={toggleAddUserForm}
        className="px-4 py-2 rounded bg-gray-600 hover:bg-gray-500 text-white"
      >
        Cancel
      </button>
      <button
        onClick={handleAddUser}
        className="px-4 py-2 rounded bg-green-600 hover:bg-green-500 text-white"
      >
        Add User
      </button>
    </div>
  </div>
)}

      {/* Users Table */}
      <div className="overflow-auto rounded-lg shadow border border-gray-700">
        <table className="min-w-full divide-y divide-gray-700">
          <thead className="bg-gray-800">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-300">User ID</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-300">Full Name</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-300">Email</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-300">Phone</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-300">Username</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-300">Role</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-300">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700 bg-gray-900">
            {users.length > 0 ? (
              users.map((user) => (
                <tr key={user.userId} className="hover:bg-gray-800">
                  <td className="px-6 py-4 text-sm">{user.userId}</td>
                  <td className="px-6 py-4 text-sm">{user.fullName}</td>
                  <td className="px-6 py-4 text-sm">{user.email}</td>
                  <td className="px-6 py-4 text-sm">{user.phoneNumber}</td>
                  <td className="px-6 py-4 text-sm">{user.username}</td>
                  <td className="px-6 py-4 text-sm capitalize">{user.type}</td>
                  <td className="px-6 py-4 flex gap-3">
                    <button
                      className="bg-green-600 hover:bg-green-500 text-white px-3 py-1 rounded text-xs flex items-center gap-1"
                      onClick={() => openUpdateModal(user)}
                    >
                      <FaEdit /> Update
                    </button>
                    <button
                      className="bg-red-600 hover:bg-red-500 text-white px-3 py-1 rounded text-xs flex items-center gap-1"
                      onClick={() => deleteUser(user.userId)}
                    >
                      <FaTrash /> Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center text-sm py-6 text-gray-400">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      {editUser && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
          <div className="bg-gray-800 p-8 rounded-lg w-96">
            <h3 className="text-lg font-bold mb-4">Edit User</h3>
            <div className="flex flex-col gap-4">
              <input
                type="text"
                name="fullName"
                value={editUser.fullName}
                onChange={handleEditChange}
                placeholder="Full Name"
                className="px-3 py-2 rounded bg-gray-700 text-white"
              />
              <input
                type="email"
                name="email"
                value={editUser.email}
                onChange={handleEditChange}
                placeholder="Email"
                className="px-3 py-2 rounded bg-gray-700 text-white"
              />
              <input
                type="text"
                name="phoneNumber"
                value={editUser.phoneNumber}
                onChange={handleEditChange}
                placeholder="Phone Number"
                className="px-3 py-2 rounded bg-gray-700 text-white"
              />
              <input
                type="text"
                name="username"
                value={editUser.username}
                onChange={handleEditChange}
                placeholder="Username"
                className="px-3 py-2 rounded bg-gray-700 text-white"
              />
              <input
                type="text"
                name="type"
                value={editUser.type}
                onChange={handleEditChange}
                placeholder="Role"
                className="px-3 py-2 rounded bg-gray-700 text-white"
              />
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setEditUser(null)}
                className="px-4 py-2 rounded bg-gray-600 hover:bg-gray-500 text-white"
              >
                Cancel
              </button>
              <button
                onClick={saveUpdatedUser}
                className="px-4 py-2 rounded bg-green-600 hover:bg-green-500 text-white"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
