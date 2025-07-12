import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  FaUserCircle,
  FaSignOutAlt,
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

// ------------------ JWT Decoding ------------------
const decodeJWT = (token) => {
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
      .join("")
  );
  return JSON.parse(jsonPayload);
};

// ------------------ Validation Functions ------------------
const validateForm = (profile) => {
  const errors = {};
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^\+?[\d\s-]{10,15}$/;

  if (!profile.fullName || profile.fullName.trim().length < 2) {
    errors.fullName = "Full Name is required and must be at least 2 characters.";
  }
  if (!profile.email || !emailRegex.test(profile.email)) {
    errors.email = "A valid email is required.";
  }
  if (!profile.username || profile.username.trim().length < 3) {
    errors.username = "Username is required and must be at least 3 characters.";
  }
  if (profile.phoneNumber && !phoneRegex.test(profile.phoneNumber)) {
    errors.phoneNumber = "Please enter a valid phone number (e.g., +1234567890 or 123-456-7890).";
  }

  return errors;
};

export default function AdminProfile() {
  const navigate = useNavigate();

  // ------------------ States ------------------
  const [profile, setProfile] = useState({
    userId: "",
    fullName: "",
    email: "",
    username: "",
    phoneNumber: "",
    type: "admin",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [showAddUserForm, setShowAddUserForm] = useState(false);
  const [newUser, setNewUser] = useState({
    userId: "",
    fullName: "",
    email: "",
    username: "",
    phoneNumber: "",
    type: "",
  });

  const [editUser, setEditUser] = useState(null);
  const [changePassword, setChangePassword] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [passwordError, setPasswordError] = useState("");
  const [showPasswords, setShowPasswords] = useState({
    oldPassword: false,
    newPassword: false,
    confirmPassword: false,
  });
  const [formErrors, setFormErrors] = useState({});

  // ------------------ Handlers ------------------
  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
    setFormErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditUser((prev) => ({ ...prev, [name]: value }));
  };

  const toggleAddUserForm = () => setShowAddUserForm((prev) => !prev);

  const handleSignOut = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const saveProfile = async () => {
    const errors = validateForm(profile);
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setIsEditing(false);
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      await axios.put(
        "http://localhost:5001/api/user/me",
        {
          fullName: profile.fullName,
          email: profile.email,
          username: profile.username,
          phoneNumber: profile.phoneNumber,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      alert("Profile updated successfully!");
      setFormErrors({});
    } catch (err) {
      console.error("Error updating user data", err);
      alert("Failed to update profile.");
    }
  };

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const res = await axios.get(
        "http://localhost:5001/api/user/admin/profile",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setProfile(res.data.user);
    } catch (err) {
      console.error("Error fetching profile data", err);
      navigate("/unauthorized");
    }
  };

  const handleChangePassword = async () => {
    if (changePassword.newPassword !== changePassword.confirmPassword) {
      setPasswordError("New passwords do not match.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const res = await axios.post(
        "http://localhost:5001/api/user/change-password",
        {
          userId: profile.userId,
          oldPassword: changePassword.oldPassword,
          newPassword: changePassword.newPassword,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      alert("Password changed successfully!");
      setChangePassword({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      setPasswordError("");
    } catch (err) {
      console.error("Error changing password", err);
      setPasswordError("Failed to change password.");
    }
  };

  const togglePasswordVisibility = (field) => {
    setShowPasswords((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  // ------------------ Effects ------------------
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const decoded = decodeJWT(token);
      if (decoded.type !== "admin") {
        navigate("/unauthorized");
      } else {
        fetchProfile();
      }
    } catch (err) {
      console.error("Token error", err);
      navigate("/login");
    }
  }, []);

  // ------------------ UI Components ------------------
  const ProfileField = ({ label, value, name, onChange, error }) => (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <label style={{ fontWeight: '500', textTransform: 'capitalize', color: '#212121' }}>{label}:</label>
      <input
        name={name}
        value={value}
        onChange={onChange}
        style={{
          backgroundColor: '#212121',
          border: error ? '1px solid #B00020' : '1px solid #F5F5F5',
          padding: '8px',
          borderRadius: '4px',
          color: '#F5F5F5'
        }}
      />
      {error && <p style={{ color: '#B00020', fontSize: '12px', marginTop: '4px' }}>{error}</p>}
    </div>
  );

  const ReadOnlyField = ({ label, value }) => (
    <p style={{ fontSize: '14px' }}>
      <strong style={{ color: '#212121' }}>{label}:</strong> {value || "—"}
    </p>
  );

  // ------------------ Main Render ------------------
  return (
    <div style={{ display: 'flex', height: '100vh', backgroundColor: '#212121', color: '#F5F5F5', fontFamily: 'sans-serif' }}>
      {/* Sidebar */}
      <aside style={{ width: '256px', backgroundColor: '#212121', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <h1 style={{ fontSize: '24px', fontWeight: '800', color: '#F5F5F5', marginBottom: '24px' }}>🚗 NIMAL MOTORS</h1>
        <nav style={{ flex: '1' }}></nav>
        <div style={{ marginTop: '8px', borderTop: '1px solid #F5F5F5', paddingTop: '24px' }}>
          <button
            onClick={() => navigate("/admin-dashboard")}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '8px 12px',
              width: '100%',
              textAlign: 'left',
              borderRadius: '6px',
              color: '#336699',
              backgroundColor: 'transparent',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'background-color 0.2s'
            }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#29527A'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
          >
            <FaUserCircle style={{ fontSize: '18px' }} /> Dashboard
          </button>
          <button
            onClick={handleSignOut}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '8px 12px',
              width: '100%',
              textAlign: 'left',
              borderRadius: '6px',
              color: '#B00020',
              backgroundColor: 'transparent',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'background-color 0.2s',
              marginTop: '8px'
            }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#9B0A0A'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
          >
            <FaSignOutAlt style={{ fontSize: '18px' }} /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main style={{ flex: '1', padding: '24px', overflow: 'auto' }}>
        {/* Cover */}
        <div
          style={{
            borderRadius: '12px',
            height: '192px',
            backgroundImage: `url("/bgimage.jpg")`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            position: 'relative'
          }}
        >
          <div style={{ position: 'absolute', bottom: '-30px', left: '32px', display: 'flex', alignItems: 'center', gap: '16px' }}>
            <img
              src="/accprofile.jpg"
              alt="profile"
              style={{
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                border: '4px solid #FAFAFA',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
              }}
            />
            <div>
              <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#F5F5F5' }}>
                {profile.fullName}
              </h2>
              <p style={{ fontSize: '14px', color: '#F5F5F5' }}>Admin – Nimal Motors</p>
            </div>
          </div>
        </div>

        {/* Content Sections */}
        <div style={{ marginTop: '32px', display: 'grid', gridTemplateColumns: '1fr', gap: '24px' }}>
          {/* About Me */}
          <section style={{ backgroundColor: '#F5F5F5', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', padding: '24px', color: '#212121' }}>
            <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px' }}>About Me</h3>
            <p style={{ fontSize: '14px', lineHeight: '1.5' }}>
              Hi, I’m {profile.fullName || "—"}. As the Admin at Nimal Motors I
              oversee the company’s key support functions—from user management
              and system access control to compliance reporting and process
              optimisation...
            </p>
          </section>

          {/* Profile Details */}
          <section style={{ position: 'relative', backgroundColor: '#F5F5F5', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', padding: '24px', color: '#212121' }}>
            <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px' }}>Admin Profile</h3>
            {isEditing ? (
              <div style={{ marginTop: '12px', fontSize: '14px' }}>
                {["fullName", "email", "username", "phoneNumber"].map((f) => (
                  <ProfileField
                    key={f}
                    label={f}
                    name={f}
                    value={profile[f]}
                    onChange={handleProfileChange}
                    error={formErrors[f]}
                  />
                ))}
                <div style={{ marginTop: '16px', display: 'flex', gap: '8px' }}>
                  <button
                    onClick={saveProfile}
                    style={{
                      padding: '8px 16px',
                      backgroundColor: '#B00020',
                      color: '#F5F5F5',
                      borderRadius: '4px',
                      fontSize: '14px',
                      cursor: 'pointer',
                      transition: 'background-color 0.2s'
                    }}
                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#9B0A0A'}
                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#B00020'}
                  >
                    Save Changes
                  </button>
                  <button
                    onClick={() => {
                      setIsEditing(false);
                      setFormErrors({});
                    }}
                    style={{
                      padding: '8px 16px',
                      backgroundColor: '#212121',
                      color: '#F5F5F5',
                      borderRadius: '4px',
                      fontSize: '14px',
                      cursor: 'pointer',
                      transition: 'background-color 0.2s'
                    }}
                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#29527A'}
                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#212121'}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div style={{ marginTop: '12px', fontSize: '14px' }}>
                <ReadOnlyField label="Full Name" value={profile.fullName} />
                <ReadOnlyField label="Email" value={profile.email} />
                <ReadOnlyField label="Username" value={profile.username} />
                <ReadOnlyField label="Phone Number" value={profile.phoneNumber} />
                <button
                  onClick={() => setIsEditing(true)}
                  style={{
                    marginTop: '16px',
                    padding: '8px 16px',
                    backgroundColor: '#336699',
                    color: '#F5F5F5',
                    borderRadius: '4px',
                    fontSize: '14px',
                    cursor: 'pointer',
                    transition: 'background-color 0.2s'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#29527A'}
                  onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#336699'}
                >
                  Edit Profile
                </button>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '8px' }}>
                  <FaFacebook style={{ color: '#336699', fontSize: '18px' }} />
                  <FaTwitter style={{ color: '#336699', fontSize: '18px' }} />
                  <FaInstagram style={{ color: '#336699', fontSize: '18px' }} />
                </div>
              </div>
            )}

            {/* Change Password Form */}
            {isEditing && (
              <section style={{ marginTop: '24px', backgroundColor: '#F5F5F5', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', padding: '24px', color: '#212121' }}>
                <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px' }}>Change Password</h3>
                <div style={{ marginTop: '16px', fontSize: '14px' }}>
                  <div style={{ position: 'relative' }}>
                    <input
                      type={showPasswords.oldPassword ? "text" : "password"}
                      placeholder="Old Password"
                      style={{
                        width: '100%',
                        padding: '8px',
                        backgroundColor: '#212121',
                        border: '1px solid #F5F5F5',
                        borderRadius: '4px',
                        color: '#F5F5F5',
                        fontSize: '14px'
                      }}
                      value={changePassword.oldPassword}
                      onChange={(e) =>
                        setChangePassword({
                          ...changePassword,
                          oldPassword: e.target.value,
                        })
                      }
                    />
                    <button
                      type="button"
                      onClick={() => togglePasswordVisibility("oldPassword")}
                      style={{
                        position: 'absolute',
                        right: '8px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        color: '#F5F5F5',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer'
                      }}
                    >
                      {showPasswords.oldPassword ? <FaEyeSlash style={{ fontSize: '18px' }} /> : <FaEye style={{ fontSize: '18px' }} />}
                    </button>
                  </div>
                  <div style={{ position: 'relative', marginTop: '16px' }}>
                    <input
                      type={showPasswords.newPassword ? "text" : "password"}
                      placeholder="New Password"
                      style={{
                        width: '100%',
                        padding: '8px',
                        backgroundColor: '#212121',
                        border: '1px solid #F5F5F5',
                        borderRadius: '4px',
                        color: '#F5F5F5',
                        fontSize: '14px'
                      }}
                      value={changePassword.newPassword}
                      onChange={(e) =>
                        setChangePassword({
                          ...changePassword,
                          newPassword: e.target.value,
                        })
                      }
                    />
                    <button
                      type="button"
                      onClick={() => togglePasswordVisibility("newPassword")}
                      style={{
                        position: 'absolute',
                        right: '8px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        color: '#F5F5F5',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer'
                      }}
                    >
                      {showPasswords.newPassword ? <FaEyeSlash style={{ fontSize: '18px' }} /> : <FaEye style={{ fontSize: '18px' }} />}
                    </button>
                  </div>
                  <div style={{ position: 'relative', marginTop: '16px' }}>
                    <input
                      type={showPasswords.confirmPassword ? "text" : "password"}
                      placeholder="Confirm New Password"
                      style={{
                        width: '100%',
                        padding: '8px',
                        backgroundColor: '#212121',
                        border: '1px solid #F5F5F5',
                        borderRadius: '4px',
                        color: '#F5F5F5',
                        fontSize: '14px'
                      }}
                      value={changePassword.confirmPassword}
                      onChange={(e) =>
                        setChangePassword({
                          ...changePassword,
                          confirmPassword: e.target.value,
                        })
                      }
                    />
                    <button
                      type="button"
                      onClick={() => togglePasswordVisibility("confirmPassword")}
                      style={{
                        position: 'absolute',
                        right: '8px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        color: '#F5F5F5',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer'
                      }}
                    >
                      {showPasswords.confirmPassword ? <FaEyeSlash style={{ fontSize: '18px' }} /> : <FaEye style={{ fontSize: '18px' }} />}
                    </button>
                  </div>
                  <button
                    onClick={handleChangePassword}
                    style={{
                      width: '100%',
                      padding: '8px 16px',
                      backgroundColor: '#336699',
                      color: '#F5F5F5',
                      borderRadius: '4px',
                      fontSize: '14px',
                      cursor: 'pointer',
                      marginTop: '16px',
                      transition: 'background-color 0.2s'
                    }}
                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#29527A'}
                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#336699'}
                  >
                    Change Password
                  </button>
                  {passwordError && (
                    <p style={{ color: '#B00020', fontSize: '12px', marginTop: '8px' }}>{passwordError}</p>
                  )}
                </div>
              </section>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}