import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaUser, FaTrash, FaArrowLeft, FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      const res = await axios.get("http://localhost:5000/api/user/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Ensure res.data.users is an array before setting it to the state
      setUsers(Array.isArray(res.data.data) ? res.data.data : []);
    } catch (err) {
      console.error("Error fetching users", err);
    }
  };

  const deleteUser = async (userId) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/api/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUsers(users.filter((user) => user.userId !== userId));
    } catch (err) {
      console.error("Error deleting user", err);
    }
  };

  const updateUser = (userId) => {
    // Navigate to the user update page (you may want to create a separate page for updating user details)
    navigate(`/update-user/${userId}`);
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
        <button
          onClick={() => navigate("/admin-profile")}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded text-sm"
        >
          <FaArrowLeft /> Back to Profile
        </button>
      </div>

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
  onClick={() => updateUser(user.userId)}
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
    </div>
  );
}
