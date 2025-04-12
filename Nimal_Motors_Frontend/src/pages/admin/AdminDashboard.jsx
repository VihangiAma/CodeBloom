// 
import React from 'react';

const AdminDashboard = () => {
  // Dummy data for testing
  const users = [
    { id: 1, name: 'Marge Simpson', email: 'marge@example.com', role: 'Admin' },
    { id: 2, name: 'John Doe', email: 'john@example.com', role: 'User' },
    { id: 3, name: 'Lisa Smith', email: 'lisa@example.com', role: 'Premium Customer' },
  ];

  return (
    <div style={{ maxWidth: '600px', margin: '40px auto', padding: '20px', border: '1px solid #ccc' }}>
      <h2>Admin Dashboard</h2>
      <p>Welcome, Admin!</p>

      <h3>User List</h3>
      <table border="1" cellPadding="8" cellSpacing="0" width="100%">
        <thead>
          <tr style={{ background: '#f0f0f0' }}>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
