import { useEffect, useState } from "react";
import axios from "axios";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function AdminUsers() {
  const [users, setUsers] = useState([]); // ✅ Initialize as empty array
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("/api/admin/user", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        });

        // ✅ Check if data is an array or inside a `users` field
        const fetchedUsers = Array.isArray(response.data)
          ? response.data
          : response.data.users;

        setUsers(fetchedUsers);
      } catch (error) {
        console.error("Error fetching users:", error);
        setMessage("Error loading users.");
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async (userId) => {
    try {
      await axios.delete(`/api/admin/delete-user/${userId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });
      setUsers((prev) => prev.filter((user) => user.userId !== userId));
      setMessage("User deleted successfully.");
    } catch (error) {
      console.error("Error deleting user:", error);
      setMessage("Error: Could not delete user.");
    }
  };

  return (
    <div className="p-6 bg-gray-900 text-white min-h-screen">
      <h1 className="text-2xl font-bold mb-4">All Users</h1>

      {message && (
        <div
          className={`mb-4 p-2 rounded ${
            message.includes("successfully")
              ? "bg-green-500"
              : "bg-red-500"
          }`}
        >
          {message}
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-600 text-sm">
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
                  className="p-3 border border-gray-700 text-left"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.isArray(users) &&
              users.map((user) => (
                <tr key={user.userId} className="hover:bg-gray-700">
                  <td className="p-3 border border-gray-700">{user.userId}</td>
                  <td className="p-3 border border-gray-700">
                    {user.fullName}
                  </td>
                  <td className="p-3 border border-gray-700">{user.type}</td>
                  <td className="p-3 border border-gray-700">
                    {user.username}
                  </td>
                  <td className="p-3 border border-gray-700">
                    {user.phoneNumber}
                  </td>
                  <td className="p-3 border border-gray-700">{user.email}</td>
                  <td className="p-3 border border-gray-700 flex gap-2">
                    <button
                      onClick={() =>
                        navigate(`/admin/edit-user/${user.userId}`)
                      }
                      className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded flex items-center gap-1"
                    >
                      <FaEdit /> Edit
                    </button>
                    <button
                      onClick={() => handleDelete(user.userId)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded flex items-center gap-1"
                    >
                      <FaTrash /> Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
