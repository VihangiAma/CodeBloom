import React, { useState } from 'react';

const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleRegister = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage('Passwords do not match.');
      return;
    }

    // Simulate register API
    console.log('Registering:', { email, password });

    setMessage('Registered successfully!');
  };

  const handleChangePassword = () => {
    // Simulate change password logic
    if (newPassword.trim() === '') {
      setMessage('New password cannot be empty.');
      return;
    }

    setPassword(newPassword);
    setConfirmPassword(newPassword);
    setNewPassword('');
    setShowChangePassword(false);
    setMessage('Password changed successfully!');
  };

  return (
    <div style={{ maxWidth: '400px', margin: '40px auto', padding: '20px', border: '1px solid #ccc' }}>
      <h2>Register</h2>

      {message && <p style={{ color: 'green' }}>{message}</p>}

      <form onSubmit={handleRegister}>
        <div>
          <label>Email:</label><br />
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>

        <div>
          <label>Password:</label><br />
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>

        <div>
          <label>Confirm Password:</label><br />
          <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
        </div>

        <button type="submit" style={{ marginTop: '10px' }}>Register</button>
      </form>

      <hr />

      <button onClick={() => setShowChangePassword(!showChangePassword)}>
        {showChangePassword ? 'Cancel Change Password' : 'Change Password'}
      </button>

      {showChangePassword && (
        <div style={{ marginTop: '10px' }}>
          <label>New Password:</label><br />
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <br />
          <button onClick={handleChangePassword} style={{ marginTop: '5px' }}>
            Update Password
          </button>
        </div>
      )}
    </div>
  );
};

export default RegisterPage;
