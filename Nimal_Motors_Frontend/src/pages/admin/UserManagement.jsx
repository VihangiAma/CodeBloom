import { useState, useEffect } from 'react';
import axios from 'axios';
import { FaUserEdit, FaTrashAlt, FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5001';

export default function UserManagement() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [user, setUser] = useState({
    userId: '',
    fullName: '',
    email: '',
    phoneNumber: '',
    username: '',
    type: 'customer', // Default type
  });
  const [message, setMessage] = useState('');

  // Fetch all users on component mount
  useEffect(() => {
    axios.get(`${API_URL}/users`)
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        setMessage('Error fetching users');
      });
  }, []);
// 
  // Handle user input
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  // Add or update user
  const handleSaveUser = () => {
    if (editMode) {
      axios.put(`${API_URL}/users/${user.userId}`, user)
        .then(() => {
          setMessage('User updated successfully');
          setEditMode(false);
          resetForm();
        })
        .catch(() => {
          setMessage('Error updating user');
        });
    } else {
      axios.post(`${API_URL}/users`, user)
        .then(() => {
          setMessage('User added successfully');
          resetForm();
        })
        .catch(() => {
          setMessage('Error adding user');
        });
    }
  };

  // Handle delete user
  const handleDeleteUser = (userId) => {
    axios.delete(`${API_URL}/users/${userId}`)
      .then(() => {
        setMessage('User deleted successfully');
        setUsers((prev) => prev.filter((user) => user.userId !== userId));
      })
      .catch(() => {
        setMessage('Error deleting user');
      });
  };

  // Search users
  const filteredUsers = users.filter((user) =>
    user.fullName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Reset form after save
  const resetForm = () => {
    setUser({
      userId: '',
      fullName: '',
      email: '',
      phoneNumber: '',
      username: '',
      type: 'customer',
    });
  };

  return (
    <div className="flex h-screen bg-gray-900 text-white font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 shadow-lg p-6 flex flex-col justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-300 mb-6">
            🚗 NIMAL MOTORS
          </h1>
          <nav className="space-y-2">
            <button
              onClick={() => navigate('/user-management')}
              className="flex items-center gap-3 px-3 py-2 w-full text-left rounded-md text-gray-300 hover:bg-gray-700 hover:text-white transition duration-150"
            >
              <FaUserEdit className="text-lg" />
              <span>Manage Users</span>
            </button>
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-auto">
        {/* Header */}
        <div className="rounded-xl h-48 bg-cover bg-center relative" style={{ backgroundImage: `url("/bgimage.jpg")` }}>
          <div className="absolute bottom-[-30px] left-8 flex items-center space-x-4">
            <img
              src="/accprofile.jpg"
              alt="profile"
              className="w-20 h-20 rounded-full border-4 border-white shadow-lg"
            />
            <div className="text-white drop-shadow-lg">
              <h2 className="text-2xl font-bold">User Management</h2>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="mt-16">
          <div className="bg-gray-700 rounded-xl shadow-md p-6 text-gray-200">
            {/* Search Bar */}
            <div className="flex items-center mb-6 space-x-2">
              <FaSearch className="text-gray-400" />
              <input
                type="text"
                placeholder="Search by name"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-gray-800 p-2 rounded text-white"
              />
            </div>

            {/* User Form */}
            <div className="space-y-4 mb-6">
              <h3 className="text-lg font-semibold mb-4">Add / Edit User</h3>
              <input
                name="fullName"
                value={user.fullName}
                onChange={handleInputChange}
                placeholder="Full Name"
                className="w-full bg-gray-800 border border-gray-500 p-2 rounded text-white"
              />
              <input
                name="email"
                value={user.email}
                onChange={handleInputChange}
                placeholder="Email"
                className="w-full bg-gray-800 border border-gray-500 p-2 rounded text-white"
              />
              <input
                name="phoneNumber"
                value={user.phoneNumber}
                onChange={handleInputChange}
                placeholder="Phone Number"
                className="w-full bg-gray-800 border border-gray-500 p-2 rounded text-white"
              />
              <input
                name="username"
                value={user.username}
                onChange={handleInputChange}
                placeholder="Username"
                className="w-full bg-gray-800 border border-gray-500 p-2 rounded text-white"
              />
              <select
                name="type"
                value={user.type}
                onChange={handleInputChange}
                className="w-full bg-gray-800 border border-gray-500 p-2 rounded text-white"
              >
                <option value="customer">Customer</option>
                <option value="admin">Admin</option>
              </select>
              <button
                onClick={handleSaveUser}
                className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700 transition"
              >
                {editMode ? 'Save Changes' : 'Add User'}
              </button>
            </div>

            {/* User List */}
            <h3 className="text-lg font-semibold mb-4">User List</h3>
            <ul className="space-y-3 text-sm">
              {filteredUsers.length === 0 ? (
                <p className="text-gray-300">No users found.</p>
              ) : (
                filteredUsers.map((u) => (
                  <li key={u.userId} className="flex items-center justify-between p-3 bg-gray-600 rounded">
                    <div>
                      <p className="font-semibold">{u.fullName}</p>
                      <p className="text-sm">{u.email}</p>
                    </div>
                    <div className="flex gap-3">
                      <button
                        onClick={() => {
                          setUser(u);
                          setEditMode(true);
                        }}
                        className="text-yellow-400"
                      >
                        <FaUserEdit />
                      </button>
                      <button
                        onClick={() => handleDeleteUser(u.userId)}
                        className="text-red-400"
                      >
                        <FaTrashAlt />
                      </button>
                    </div>
                  </li>
                ))
              )}
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}
