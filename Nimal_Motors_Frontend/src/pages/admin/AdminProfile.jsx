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
    oldPasswordVisible: false,
    newPasswordVisible: false,
    confirmPasswordVisible: false,
  });
  const [passwordError, setPasswordError] = useState("");
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
    setPasswordError("");
    if (changePassword.newPassword !== changePassword.confirmPassword) {
      setPasswordError("New passwords do not match.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      await axios.post(
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
        oldPasswordVisible: false,
        newPasswordVisible: false,
        confirmPasswordVisible: false,
      });
      setPasswordError("");
    } catch (err) {
      console.error("Error changing password", err);
      setPasswordError("Failed to change password.");
    }
  };

  const renderPasswordInput = (field, label) => (
    <div style={{ position: "relative" }}>
      <input
        type={changePassword[`${field}Visible`] ? "text" : "password"}
        placeholder={label}
        value={changePassword[field]}
        onChange={(e) =>
          setChangePassword((prev) => ({
            ...prev,
            [field]: e.target.value,
          }))
        }
        style={{
          width: "100%",
          padding: "10px",
          borderRadius: "6px",
          backgroundColor: "#212121",
          color: "white",
          border: "1px solid #444",
          fontFamily: "Roboto, sans-serif",
          fontSize: "16px",
          paddingRight: "40px",
        }}
      />
      <button
        type="button"
        onClick={() =>
          setChangePassword((prev) => ({
            ...prev,
            [`${field}Visible`]: !prev[`${field}Visible`],
          }))
        }
        style={{
          position: "absolute",
          right: "10px",
          top: "50%",
          transform: "translateY(-50%)",
          background: "none",
          border: "none",
          cursor: "pointer",
        }}
        aria-label={`Toggle ${label} visibility`}
      >
        {changePassword[`${field}Visible`] ? (
          <FaEyeSlash color="white" />
        ) : (
          <FaEye color="white" />
        )}
      </button>
    </div>
  );

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
  }, [navigate]);

  // ------------------ UI Components ------------------
  const ProfileField = ({ label, value, name, onChange, error }) => (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <label
        style={{
          fontWeight: "500",
          marginBottom: "4px",
          display: "block",
          color: "#29527A",
          fontFamily: "Poppins, sans-serif",
        }}
      >
        {label}:
      </label>
      <input
        name={name}
        value={value}
        onChange={onChange}
        style={{
          backgroundColor: "#212121",
          border: error ? "1px solid #B00020" : "1px solid #555",
          padding: "8px",
          borderRadius: "6px",
          color: "white",
          width: "100%",
          fontFamily: "Roboto, sans-serif",
          fontSize: "16px",
        }}
      />
      {error && (
        <p style={{ color: "#B00020", fontSize: "14px", marginTop: "4px" }}>
          {error}
        </p>
      )}
    </div>
  );

  const ReadOnlyField = ({ label, value }) => (
    <p style={{ fontSize: "16px" }}>
      <strong style={{ color: "#212121" }}>{label}:</strong> {value || "—"}
    </p>
  );

  // ------------------ Main Render ------------------
  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        backgroundColor: "#FAFAFA",
        fontFamily: "Roboto, sans-serif",
        color: "#212121",
      }}
    >
      {/* Sidebar */}
      <aside
        style={{
          width: "260px",
          backgroundColor: "#212121",
          padding: "24px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          color: "#CCCCCC",
          fontFamily: "Montserrat, sans-serif",
        }}
      >
        <h1
          style={{
            fontSize: "32px",
            fontWeight: "800",
            color: "#B00020",
            fontFamily: "Poppins, sans-serif",
            marginBottom: "32px",
          }}
        >
          🚗 NIMAL MOTORS
        </h1>
        <div style={{ flex: 1 }} />
        <div style={{ borderTop: "1px solid #555", paddingTop: "24px" }}>
          <button
            onClick={() => navigate("/admin-dashboard")}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              color: "#336699",
              fontSize: "16px",
              padding: "8px 0",
              background: "none",
              border: "none",
              cursor: "pointer",
              fontFamily: "Roboto, sans-serif",
            }}
          >
            <FaUserCircle /> Dashboard
          </button>
          <button
            onClick={handleSignOut}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              color: "#B00020",
              fontSize: "16px",
              padding: "8px 0",
              background: "none",
              border: "none",
              cursor: "pointer",
              fontFamily: "Roboto, sans-serif",
            }}
          >
            <FaSignOutAlt /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main */}
      <main style={{ flex: 1, padding: "24px", overflow: "auto" }}>
        {/* Profile Header */}
        <div
          style={{
            borderRadius: "12px",
            height: "192px",
            backgroundImage: `url("/bgimage.jpg")`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            position: "relative",
          }}
        >
          <div
            style={{
              position: "absolute",
              bottom: "-30px",
              left: "32px",
              display: "flex",
              alignItems: "center",
              gap: "16px",
            }}
          >
            <img
              src="/accprofile.jpg"
              alt="profile"
              style={{
                width: "80px",
                height: "80px",
                borderRadius: "50%",
                border: "4px solid #FFFFFF",
                boxShadow: "0 0 8px rgba(0,0,0,0.1)",
              }}
            />
            <div style={{ textShadow: "0 2px 4px rgba(0,0,0,0.2)" }}>
              <h2
                style={{
                  fontSize: "24px",
                  fontWeight: "700",
                  color: "#FFFFFF",
                  fontFamily: "Poppins, sans-serif",
                }}
              >
                {profile.fullName}
              </h2>
              <p
                style={{
                  fontSize: "14px",
                  color: "#FFFFFF",
                  fontFamily: "Roboto, sans-serif",
                }}
              >
                Admin – Nimal Motors
              </p>
            </div>
          </div>
        </div>

        {/* Sections */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "24px",
            marginTop: "48px",
          }}
        >
          {/* About Me */}
          <section
            style={{
              backgroundColor: "#F5F5F5",
              borderRadius: "12px",
              padding: "24px",
              color: "#212121",
              fontFamily: "Roboto, sans-serif",
              boxShadow: "0 0 8px rgba(0,0,0,0.1)",
            }}
          >
            <h3
              style={{
                fontSize: "20px",
                fontWeight: "600",
                fontFamily: "Montserrat, sans-serif",
                marginBottom: "16px",
                color: "#9B0A0A",
              }}
            >
              About Me
            </h3>
            <p
              style={{
                fontSize: "16px",
                lineHeight: 1.6,
                margin: 0,
              }}
            >
              Hi, I’m {profile.fullName || "—"}. As the Admin at Nimal Motors I
              oversee the company’s key support functions—from user management
              and system access control to compliance reporting and process
              optimisation...
            </p>
          </section>

          {/* Profile Details */}
          <section
            style={{
              backgroundColor: "#F5F5F5",
              borderRadius: "12px",
              padding: "24px",
              position: "relative",
              color: "#212121",
              fontFamily: "Roboto, sans-serif",
              boxShadow: "0 0 8px rgba(0,0,0,0.1)",
            }}
          >
            <h3
              style={{
                fontSize: "20px",
                fontWeight: "600",
                fontFamily: "Montserrat, sans-serif",
                marginBottom: "16px",
                color: "#9B0A0A",
              }}
            >
              Admin Profile
            </h3>
            {isEditing ? (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                  fontSize: "16px",
                }}
              >
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
                <div style={{ display: "flex", gap: "12px" }}>
                  <button
                    onClick={saveProfile}
                    style={{
                      color: "#4CAF50",
                      fontSize: "14px",
                      fontFamily: "Roboto, sans-serif",
                      cursor: "pointer",
                      background: "none",
                      border: "none",
                      padding: "6px 12px",
                    }}
                  >
                    Save
                  </button>
                  <button
                    onClick={() => {
                      setIsEditing(false);
                      setFormErrors({});
                    }}
                    style={{
                      color: "#F44336",
                      fontSize: "14px",
                      fontFamily: "Roboto, sans-serif",
                      cursor: "pointer",
                      background: "none",
                      border: "none",
                      padding: "6px 12px",
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div
                style={{
                  fontSize: "16px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "8px",
                }}
              >
                <ReadOnlyField label="Full Name" value={profile.fullName} />
                <ReadOnlyField label="Mobile" value={profile.phoneNumber} />
                <ReadOnlyField label="Email" value={profile.email} />
                <ReadOnlyField label="Username" value={profile.username} />
                <div
                  style={{
                    display: "flex",
                    gap: "12px",
                    marginTop: "12px",
                    color: "#336699",
                  }}
                >
                  <FaFacebook color="#1877F2" />
                  <FaTwitter color="#1DA1F2" />
                  <FaInstagram color="#E1306C" />
                </div>
              </div>
            )}
            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                style={{
                  position: "absolute",
                  top: "24px",
                  right: "24px",
                  backgroundColor: "#B00020",
                  color: "#F5F5F5",
                  border: "none",
                  padding: "6px 12px",
                  borderRadius: "6px",
                  fontSize: "14px",
                  cursor: "pointer",
                  fontFamily: "Roboto, sans-serif",
                }}
                aria-label="Edit profile"
              >
                Edit
              </button>
            )}

            {/* Change Password Form */}
            {isEditing && (
              <section
                style={{
                  marginTop: "32px",
                  backgroundColor: "#F5F5F5",
                  borderRadius: "12px",
                  padding: "24px",
                  color: "#212121",
                  fontFamily: "Roboto, sans-serif",
                  boxShadow: "0 0 8px rgba(0,0,0,0.1)",
                }}
              >
                <h3
                  style={{
                    fontSize: "20px",
                    fontWeight: "600",
                    fontFamily: "Montserrat, sans-serif",
                    marginBottom: "16px",
                    color: "#9B0A0A",
                  }}
                >
                  Change Password
                </h3>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "16px",
                  }}
                >
                  {renderPasswordInput("oldPassword", "Old Password")}
                  {renderPasswordInput("newPassword", "New Password")}
                  {renderPasswordInput("confirmPassword", "Confirm Password")}
                  {passwordError && (
                    <p style={{ color: "#B00020", fontSize: "14px" }}>
                      {passwordError}
                    </p>
                  )}
                  <button
                    onClick={handleChangePassword}
                    style={{
                      backgroundColor: "#336699",
                      color: "#fff",
                      padding: "10px 20px",
                      borderRadius: "6px",
                      fontSize: "14px",
                      cursor: "pointer",
                      alignSelf: "flex-start",
                      fontFamily: "Roboto, sans-serif",
                    }}
                    aria-label="Update password"
                  >
                    Update Password
                  </button>
                </div>
              </section>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}