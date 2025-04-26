import { useEffect, useState } from "react";
import axios from "axios";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [editedUser, setEditedUser] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem("authToken");

      if (!token) {
        setMessage("Not authorized. Please log in.");
        setLoading(false);
        return;
      }

      try {
        const decoded = jwtDecode(token);
        if (decoded.type !== "admin") {
          setMessage("Access denied. Admins only.");
          setLoading(false);
          return;
        }

        const response = await axios.get("/api/admin/user", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const fetchedUsers = Array.isArray(response.data)
          ? response.data
          : response.data.users;

        setUsers(fetchedUsers);
      } catch (error) {
        console.error("Error fetching users:", error);
        setMessage("Error loading users.");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const openDeleteModal = (user) => {
    setSelectedUser(user);
    setShowDeleteModal(true);
  };

  const openEditModal = (user) => {
    setSelectedUser(user);
    setEditedUser({ ...user });
    setShowEditModal(true);
  };

  const handleDeleteConfirmed = async () => {
    try {
      await axios.delete(`/api/admin/delete-user/${selectedUser.userId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });
      setUsers((prev) => prev.filter((u) => u.userId !== selectedUser.userId));
      setMessage("User deleted successfully.");
    } catch (error) {
      console.error("Error deleting user:", error);
      setMessage("Error: Could not delete user.");
    } finally {
      setShowDeleteModal(false);
    }
  };

  const handleEditSubmit = async () => {
    try {
      await axios.put(
        `/api/admin/edit-user/${editedUser.userId}`,
        editedUser,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );
      setUsers((prev) =>
        prev.map((u) =>
          u.userId === editedUser.userId ? { ...u, ...editedUser } : u
        )
      );
      setMessage("User updated successfully.");
    } catch (error) {
      console.error("Error updating user:", error);
      setMessage("Error: Could not update user.");
    } finally {
      setShowEditModal(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-900 text-white">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid"></div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-900 text-white min-h-screen">
      <h1 className="text-3xl font-bold mb-6">All Users</h1>

      {message && (
        <div
          className={`mb-4 p-3 rounded text-center ${
            message.includes("successfully")
              ? "bg-green-600 text-white"
              : "bg-red-600 text-white"
          }`}
        >
          {message}
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-700 text-sm">
          <thead className="bg-gray-800">
            <tr>
              {[
                "User ID",
                "Full Name",
                "Type",
                "Username",
                "Phone",
                "Email",
                "Actions",
              ].map((header, idx) => (
                <th
                  key={idx}
                  className="p-3 border border-gray-700 text-left font-semibold"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.userId} className="hover:bg-gray-700">
                <td className="p-3 border border-gray-700">{user.userId}</td>
                <td className="p-3 border border-gray-700">{user.fullName}</td>
                <td className="p-3 border border-gray-700 capitalize">
                  {user.type}
                </td>
                <td className="p-3 border border-gray-700">{user.username}</td>
                <td className="p-3 border border-gray-700">{user.phoneNumber}</td>
                <td className="p-3 border border-gray-700">{user.email}</td>
                <td className="p-3 border border-gray-700 flex flex-wrap gap-2">
                  <button
                    onClick={() => openEditModal(user)}
                    className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded text-white transition-all"
                  >
                    <FaEdit /> Edit
                  </button>
                  <button
                    onClick={() => openDeleteModal(user)}
                    className="flex items-center gap-1 bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-white transition-all"
                  >
                    <FaTrash /> Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Delete Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white text-black rounded-lg p-6 w-full max-w-md shadow-lg">
            <h2 className="text-xl font-bold mb-4">Confirm Delete</h2>
            <p className="mb-4">
              Are you sure you want to delete{" "}
              <span className="font-semibold">{selectedUser?.fullName}</span>?
            </p>
            <div className="flex justify-end gap-4">
              <button
                className="bg-gray-400 hover:bg-gray-500 px-4 py-2 rounded"
                onClick={() => setShowDeleteModal(false)}
              >
                Cancel
              </button>
              <button
                className="bg-red-600 hover:bg-red-700 px-4 py-2 text-white rounded"
                onClick={handleDeleteConfirmed}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white text-black rounded-lg p-6 w-full max-w-md shadow-lg">
            <h2 className="text-xl font-bold mb-6">Edit User</h2>
            <div className="flex flex-col gap-4">
              <label className="flex flex-col">
                Full Name
                <input
                  className="p-2 border border-gray-300 rounded mt-1"
                  value={editedUser.fullName}
                  onChange={(e) =>
                    setEditedUser({ ...editedUser, fullName: e.target.value })
                  }
                />
              </label>
              <label className="flex flex-col">
                Phone Number
                <input
                  className="p-2 border border-gray-300 rounded mt-1"
                  value={editedUser.phoneNumber}
                  onChange={(e) =>
                    setEditedUser({
                      ...editedUser,
                      phoneNumber: e.target.value,
                    })
                  }
                />
              </label>
              <label className="flex flex-col">
                Email
                <input
                  className="p-2 border border-gray-300 rounded mt-1"
                  value={editedUser.email}
                  onChange={(e) =>
                    setEditedUser({ ...editedUser, email: e.target.value })
                  }
                />
              </label>
            </div>
            <div className="flex justify-end gap-4 mt-6">
              <button
                className="bg-gray-400 hover:bg-gray-500 px-4 py-2 rounded"
                onClick={() => setShowEditModal(false)}
              >
                Cancel
              </button>
              <button
                className="bg-blue-600 hover:bg-blue-700 px-4 py-2 text-white rounded"
                onClick={handleEditSubmit}
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
