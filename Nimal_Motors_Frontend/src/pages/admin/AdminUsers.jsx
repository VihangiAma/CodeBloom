import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaUser, FaTrash, FaArrowLeft, FaEdit, FaUserPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [editUser, setEditUser] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [showAddUserForm, setShowAddUserForm] = useState(false);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [newUser, setNewUser] = useState({
    fullName: "",
    email: "",
    username: "",
    phoneNumber: "",
    type: "",
    password: ""
  });

  const navigate = useNavigate();

  // Set current user ID from JWT token
  const setCurrentUserFromToken = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.warn("No token found, redirecting to login");
      navigate("/login");
      return;
    }

    try {
      const decoded = jwtDecode(token);
      if (decoded.userId) {
        setCurrentUserId(decoded.userId);
      } else {
        console.warn("No userId in token, redirecting to login");
        navigate("/login");
      }
    } catch (err) {
      console.error("Error decoding token", err);
      navigate("/login");
    }
  };

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
      alert("Failed to fetch users: " + (err.response?.data?.message || "Unknown error"));
    }
  };

  const deleteUser = async (userId) => {
    if (userId === currentUserId) {
      alert("You cannot delete your own account. Please contact another admin for assistance.");
      return;
    }

    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5001/api/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUsers(users.filter((user) => user.userId !== userId));
      setSuccessMessage("User deleted successfully!");
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (err) {
      console.error("Error deleting user", err);
      alert("Failed to delete user: " + (err.response?.data?.message || "Unknown error"));
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
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{10}$/;

    if (!editUser.fullName || editUser.fullName.length < 2 || editUser.fullName.length > 50) {
      alert("Full Name is required and must be between 2 and 50 characters.");
      return;
    }
    if (!editUser.email || !emailRegex.test(editUser.email)) {
      alert("A valid email is required.");
      return;
    }
    if (!editUser.username || editUser.username.length < 3 || editUser.username.length > 30) {
      alert("Username is required and must be between 3 and 30 characters.");
      return;
    }
    if (editUser.phoneNumber && !phoneRegex.test(editUser.phoneNumber)) {
      alert("Phone number must be exactly 10 digits if provided.");
      return;
    }
    if (!editUser.type) {
      alert("Role is required.");
      return;
    }

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
      alert("Failed to update user: " + (err.response?.data?.message || "Unknown error"));
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
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{10}$/;

    if (!newUser.fullName || newUser.fullName.length < 2) {
      alert("Full Name is required and must be at least 2 characters.");
      return;
    }
    if (newUser.fullName.length > 50) {
      alert("Full Name must not exceed 50 characters.");
      return;
    }
    if (!newUser.email || !emailRegex.test(newUser.email)) {
      alert("A valid email is required (e.g., user@example.com).");
      return;
    }
    if (!newUser.username || newUser.username.length < 3) {
      alert("Username is required and must be at least 3 characters.");
      return;
    }
    if (newUser.username.length > 30) {
      alert("Username must not exceed 30 characters.");
      return;
    }
    if (!newUser.phoneNumber || !phoneRegex.test(newUser.phoneNumber)) {
      alert("Phone number is required and must be exactly 10 digits (e.g., 1234567890).");
      return;
    }
    if (!newUser.type) {
      alert("Role is required.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Authentication token missing. Please log in again.");
        return;
      }

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
          password: ""
        });
        setShowAddUserForm(false);
        fetchUsers();
      }
    } catch (err) {
      console.error("Error adding new user", err.response ? err.response.data : err.message);
      const errorMessage = err.response?.data?.message || "Failed to add user due to an unknown error.";
      alert(`Failed to add user: ${errorMessage}`);
    }
  };

  useEffect(() => {
    setCurrentUserFromToken();
    fetchUsers();
  }, []);

  return (
    <div style={{ padding: '24px', backgroundColor: '#212121', color: '#F5F5F5', minHeight: '100vh', fontFamily: 'sans-serif' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#F5F5F5', display: 'flex', alignItems: 'center' }}>
          👥 All Registered Users
        </h2>
        <div style={{ display: 'flex', gap: '16px' }}>
          <button
            onClick={toggleAddUserForm}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              backgroundColor: '#336699',
              color: '#F5F5F5',
              padding: '8px 16px',
              borderRadius: '4px',
              fontSize: '14px',
              cursor: 'pointer',
              transition: 'background-color 0.2s'
            }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#29527A'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#336699'}
          >
            <FaUserPlus /> Add User
          </button>
          <button
            onClick={() => navigate("/admin-dashboard")}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              backgroundColor: '#336699',
              color: '#F5F5F5',
              padding: '8px 16px',
              borderRadius: '4px',
              fontSize: '14px',
              cursor: 'pointer',
              transition: 'background-color 0.2s'
            }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#29527A'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#336699'}
          >
            <FaArrowLeft /> Back to Dashboard
          </button>
        </div>
      </div>

      {successMessage && (
        <div style={{ backgroundColor: '#336699', color: '#F5F5F5', padding: '8px', borderRadius: '4px', marginBottom: '16px', textAlign: 'center', fontSize: '14px' }}>
          {successMessage}
        </div>
      )}

      {showAddUserForm && (
        <div style={{ backgroundColor: '#212121', padding: '24px', borderRadius: '8px', marginBottom: '24px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '16px', color: '#F5F5F5' }}>Add New User</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <input
              type="text"
              name="fullName"
              value={newUser.fullName}
              onChange={handleNewUserChange}
              placeholder="Full Name"
              style={{
                padding: '8px 12px',
                borderRadius: '4px',
                backgroundColor: '#F5F5F5',
                color: '#212121',
                fontSize: '14px',
                border: '1px solid #212121'
              }}
            />
            <input
              type="email"
              name="email"
              value={newUser.email}
              onChange={handleNewUserChange}
              placeholder="Email"
              style={{
                padding: '8px 12px',
                borderRadius: '4px',
                backgroundColor: '#F5F5F5',
                color: '#212121',
                fontSize: '14px',
                border: '1px solid #212121'
              }}
            />
            <input
              type="text"
              name="username"
              value={newUser.username}
              onChange={handleNewUserChange}
              placeholder="Username"
              style={{
                padding: '8px 12px',
                borderRadius: '4px',
                backgroundColor: '#F5F5F5',
                color: '#212121',
                fontSize: '14px',
                border: '1px solid #212121'
              }}
            />
            <input
              type="text"
              name="phoneNumber"
              value={newUser.phoneNumber}
              onChange={handleNewUserChange}
              placeholder="Phone Number"
              style={{
                padding: '8px 12px',
                borderRadius: '4px',
                backgroundColor: '#F5F5F5',
                color: '#212121',
                fontSize: '14px',
                border: '1px solid #212121'
              }}
            />
            <select
              name="type"
              value={newUser.type}
              onChange={handleNewUserChange}
              style={{
                padding: '8px 12px',
                borderRadius: '4px',
                backgroundColor: '#F5F5F5',
                color: '#212121',
                fontSize: '14px',
                border: '1px solid #212121'
              }}
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

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '24px' }}>
            <button
              onClick={toggleAddUserForm}
              style={{
                padding: '8px 16px',
                borderRadius: '4px',
                backgroundColor: '#212121',
                color: '#F5F5F5',
                fontSize: '14px',
                cursor: 'pointer',
                transition: 'background-color 0.2s'
              }}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#29527A'}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#212121'}
            >
              Cancel
            </button>
            <button
              onClick={handleAddUser}
              style={{
                padding: '8px 16px',
                borderRadius: '4px',
                backgroundColor: '#336699',
                color: '#F5F5F5',
                fontSize: '14px',
                cursor: 'pointer',
                transition: 'background-color 0.2s'
              }}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#29527A'}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#336699'}
            >
              Add User
            </button>
          </div>
        </div>
      )}

      <div style={{ overflow: 'auto', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', border: '1px solid #212121' }}>
        <table style={{ minWidth: '100%', borderCollapse: 'collapse' }}>
          <thead style={{ backgroundColor: '#212121' }}>
            <tr>
              <th style={{ padding: '12px 24px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#F5F5F5' }}>User ID</th>
              <th style={{ padding: '12px 24px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#F5F5F5' }}>Full Name</th>
              <th style={{ padding: '12px 24px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#F5F5F5' }}>Email</th>
              <th style={{ padding: '12px 24px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#F5F5F5' }}>Phone</th>
              <th style={{ padding: '12px 24px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#F5F5F5' }}>Username</th>
              <th style={{ padding: '12px 24px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#F5F5F5' }}>Role</th>
              <th style={{ padding: '12px 24px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#F5F5F5' }}>Actions</th>
            </tr>
          </thead>
          <tbody style={{ backgroundColor: '#212121', borderTop: '1px solid #212121' }}>
            {users.length > 0 ? (
              users.map((user) => (
                <tr
                  key={user.userId}
                  style={{ transition: 'background-color 0.2s' }}
                  onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#29527A'}
                  onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#212121'}
                >
                  <td style={{ padding: '16px 24px', fontSize: '14px', color: '#F5F5F5' }}>{user.userId}</td>
                  <td style={{ padding: '16px 24px', fontSize: '14px', color: '#F5F5F5' }}>{user.fullName}</td>
                  <td style={{ padding: '16px 24px', fontSize: '14px', color: '#F5F5F5' }}>{user.email}</td>
                  <td style={{ padding: '16px 24px', fontSize: '14px', color: '#F5F5F5' }}>{user.phoneNumber}</td>
                  <td style={{ padding: '16px 24px', fontSize: '14px', color: '#F5F5F5' }}>{user.username}</td>
                  <td style={{ padding: '16px 24px', fontSize: '14px', color: '#F5F5F5', textTransform: 'capitalize' }}>{user.type}</td>
                  <td style={{ padding: '16px 24px', display: 'flex', gap: '12px' }}>
                    <button
                      style={{
                        backgroundColor: '#336699',
                        color: '#F5F5F5',
                        padding: '4px 12px',
                        borderRadius: '4px',
                        fontSize: '12px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        cursor: 'pointer',
                        transition: 'background-color 0.2s'
                      }}
                      onClick={() => openUpdateModal(user)}
                      onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#29527A'}
                      onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#336699'}
                    >
                      <FaEdit /> Update
                    </button>
                    <button
                      style={{
                        backgroundColor: '#B00020',
                        color: '#F5F5F5',
                        padding: '4px 12px',
                        borderRadius: '4px',
                        fontSize: '12px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        cursor: user.userId === currentUserId ? 'not-allowed' : 'pointer',
                        opacity: user.userId === currentUserId ? '0.5' : '1',
                        transition: 'background-color 0.2s'
                      }}
                      onClick={() => deleteUser(user.userId)}
                      disabled={user.userId === currentUserId}
                      title={user.userId === currentUserId ? "Cannot delete your own account" : "Delete user"}
                      onMouseOver={(e) => {
                        if (user.userId !== currentUserId) e.currentTarget.style.backgroundColor = '#9B0A0A';
                      }}
                      onMouseOut={(e) => {
                        if (user.userId !== currentUserId) e.currentTarget.style.backgroundColor = '#B00020';
                      }}
                    >
                      <FaTrash /> Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td style={{ textAlign: 'center', fontSize: '14px', padding: '24px', color: '#F5F5F5' }} colSpan="7">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {editUser && (
        <div style={{ position: 'fixed', top: '0', left: '0', right: '0', bottom: '0', backgroundColor: 'rgba(0, 0, 0, 0.6)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: '50' }}>
          <div style={{ backgroundColor: '#212121', padding: '32px', borderRadius: '8px', width: '500px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '16px', color: '#F5F5F5' }}>Edit User</h3>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', alignItems: 'center' }}>
              <label style={{ color: '#F5F5F5', fontSize: '14px' }}>Full Name</label>
              <input
                type="text"
                name="fullName"
                value={editUser.fullName}
                onChange={handleEditChange}
                style={{
                  padding: '8px 12px',
                  borderRadius: '4px',
                  backgroundColor: '#F5F5F5',
                  color: '#212121',
                  fontSize: '14px',
                  border: '1px solid #212121'
                }}
              />

              <label style={{ color: '#F5F5F5', fontSize: '14px' }}>Email</label>
              <input
                type="email"
                name="email"
                value={editUser.email}
                onChange={handleEditChange}
                style={{
                  padding: '8px 12px',
                  borderRadius: '4px',
                  backgroundColor: '#F5F5F5',
                  color: '#212121',
                  fontSize: '14px',
                  border: '1px solid #212121'
                }}
              />

              <label style={{ color: '#F5F5F5', fontSize: '14px' }}>Phone Number</label>
              <input
                type="text"
                name="phoneNumber"
                value={editUser.phoneNumber}
                onChange={handleEditChange}
                style={{
                  padding: '8px 12px',
                  borderRadius: '4px',
                  backgroundColor: '#F5F5F5',
                  color: '#212121',
                  fontSize: '14px',
                  border: '1px solid #212121'
                }}
              />

              <label style={{ color: '#F5F5F5', fontSize: '14px' }}>Username</label>
              <input
                type="text"
                name="username"
                value={editUser.username}
                onChange={handleEditChange}
                style={{
                  padding: '8px 12px',
                  borderRadius: '4px',
                  backgroundColor: '#F5F5F5',
                  color: '#212121',
                  fontSize: '14px',
                  border: '1px solid #212121'
                }}
              />

              <label style={{ color: '#F5F5F5', fontSize: '14px' }}>Role</label>
              <select
                name="type"
                value={editUser.type}
                onChange={handleEditChange}
                style={{
                  padding: '8px 12px',
                  borderRadius: '4px',
                  backgroundColor: '#F5F5F5',
                  color: '#212121',
                  fontSize: '14px',
                  border: '1px solid #212121'
                }}
              >
                <option value="">Select Role</option>
                <option value="mechanicalsupervisor">Mechanical Supervisor</option>
                <option value="electricalsupervisor">Electrical Supervisor</option>
                <option value="bodyshopsupervisor">Bodyshop Supervisor</option>
                <option value="servicesupervisor">Service Supervisor</option>
                <option value="accountant">Accountant</option>
                <option value="premiumCustomer">Premium Customer</option>
              </select>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '24px' }}>
              <button
                onClick={() => setEditUser(null)}
                style={{
                  padding: '8px 16px',
                  borderRadius: '4px',
                  backgroundColor: '#212121',
                  color: '#F5F5F5',
                  fontSize: '14px',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s'
                }}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#29527A'}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#212121'}
              >
                Cancel
              </button>
              <button
                onClick={saveUpdatedUser}
                style={{
                  padding: '8px 16px',
                  borderRadius: '4px',
                  backgroundColor: '#336699',
                  color: '#F5F5F5',
                  fontSize: '14px',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s'
                }}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#29527A'}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#336699'}
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