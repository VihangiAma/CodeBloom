import React, { useState } from "react";

const SupervisorProfile = () => {
  // Sample supervisor data
  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "johndoe@example.com",
    phone: "+1234567890",
    department: "Mechanical",
    role: "Senior Supervisor",
    profilePic: "https://via.placeholder.com/150", // Placeholder image
  });

  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState(profile);
  const [password, setPassword] = useState(""); // For password change
  const [confirmPassword, setConfirmPassword] = useState("");

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle profile picture upload
  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, profilePic: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  // Save updated profile
  const handleSave = () => {
    setProfile(formData);
    setEditMode(false);
  };

  // Handle password update
  const handleChangePassword = () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    alert("Password updated successfully!");
    setPassword("");
    setConfirmPassword("");
  };

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-md p-6 rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Supervisor Profile</h2>

      {/* Profile Picture */}
      <div className="flex flex-col items-center mb-4">
        <img src={formData.profilePic} alt="Profile" className="w-24 h-24 rounded-full" />
        {editMode && (
          <input type="file" accept="image/*" onChange={handleProfilePicChange} className="mt-2" />
        )}
      </div>

      {/* Profile Info */}
      <div className="space-y-3">
        <div>
          <label className="font-semibold">Name:</label>
          {editMode ? (
            <input type="text" name="name" value={formData.name} onChange={handleChange} className="border p-2 rounded w-full" />
          ) : (
            <p>{profile.name}</p>
          )}
        </div>

        <div>
          <label className="font-semibold">Email:</label>
          {editMode ? (
            <input type="email" name="email" value={formData.email} onChange={handleChange} className="border p-2 rounded w-full" />
          ) : (
            <p>{profile.email}</p>
          )}
        </div>

        <div>
          <label className="font-semibold">Phone:</label>
          {editMode ? (
            <input type="text" name="phone" value={formData.phone} onChange={handleChange} className="border p-2 rounded w-full" />
          ) : (
            <p>{profile.phone}</p>
          )}
        </div>

        <div>
          <label className="font-semibold">Department:</label>
          {editMode ? (
            <select name="department" value={formData.department} onChange={handleChange} className="border p-2 rounded w-full">
              <option>Mechanical</option>
              <option>Electrical</option>
              <option>Bodyshop</option>
              <option>Service</option>
            </select>
          ) : (
            <p>{profile.department}</p>
          )}
        </div>

        <div>
          <label className="font-semibold">Role:</label>
          {editMode ? (
            <input type="text" name="role" value={formData.role} onChange={handleChange} className="border p-2 rounded w-full" />
          ) : (
            <p>{profile.role}</p>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-4 flex space-x-2">
        {editMode ? (
          <>
            <button onClick={handleSave} className="bg-blue-600 text-white px-4 py-2 rounded">Save</button>
            <button onClick={() => setEditMode(false)} className="bg-gray-400 text-white px-4 py-2 rounded">Cancel</button>
          </>
        ) : (
          <button onClick={() => setEditMode(true)} className="bg-green-600 text-white px-4 py-2 rounded">Edit Profile</button>
        )}
      </div>

      {/* Change Password Section */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-2">Change Password</h3>
        <input
          type="password"
          placeholder="New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 rounded w-full mb-2"
        />
        <input
          type="password"
          placeholder="Confirm New Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="border p-2 rounded w-full mb-2"
        />
        <button onClick={handleChangePassword} className="bg-red-600 text-white px-4 py-2 rounded">Update Password</button>
      </div>
    </div>
  );
};

export default SupervisorProfile;
