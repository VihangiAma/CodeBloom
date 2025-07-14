// BodyshopSupervisor.jsx
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

export default function BodyshopSupervisor() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState({
    userId: "",
    fullName: "",
    email: "",
    username: "",
    phoneNumber: "",
    type: "bodyshopsupervisor",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [changePassword, setChangePassword] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
    newPasswordVisible: false,
    oldPasswordVisible: false,
    confirmPasswordVisible: false,
  });

  const [passwordError, setPasswordError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;
      try {
        const res = await axios.get("http://localhost:5001/api/user/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProfile(res.data.user);
      } catch (err) {
        console.error("Error fetching profile data", err);
      }
    };
    fetchProfile();
  }, []);

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const saveProfile = async () => {
    setIsEditing(false);
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      await axios.put("http://localhost:5001/api/user/me", {
        fullName: profile.fullName,
        email: profile.email,
        username: profile.username,
        phoneNumber: profile.phoneNumber,
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Profile updated successfully!");
    } catch (err) {
      console.error("Error updating user data", err);
      alert("Failed to update profile.");
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
      await axios.post("http://localhost:5001/api/user/change-password", {
        userId: profile.userId,
        oldPassword: changePassword.oldPassword,
        newPassword: changePassword.newPassword,
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Password changed successfully!");
      setChangePassword({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
        oldPasswordVisible: false,
        newPasswordVisible: false,
        confirmPasswordVisible: false,
      });
    } catch (err) {
      console.error("Error changing password", err);
      setPasswordError("Failed to change password.");
    }
  };

  const handleSignOut = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const renderPasswordInput = (field, label) => (
    <div style={{ position: "relative" }}>
      <input
        type={changePassword[`${field}Visible`] ? "text" : "password"}
        placeholder={label}
        value={changePassword[field]}
        onChange={(e) => setChangePassword((prev) => ({ ...prev, [field]: e.target.value }))}
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
        onClick={() => setChangePassword((prev) => ({ ...prev, [`${field}Visible`]: !prev[`${field}Visible`] }))}
        style={{
          position: "absolute",
          right: "10px",
          top: "50%",
          transform: "translateY(-50%)",
          background: "none",
          border: "none",
          cursor: "pointer",
        }}
      >
        {changePassword[`${field}Visible`] ? <FaEyeSlash color="white" /> : <FaEye color="white" />}
      </button>
    </div>
  );

  return (
    <div style={{ display: "flex", minHeight: "100vh", backgroundColor: "#FAFAFA", fontFamily: "Roboto, sans-serif", color: "#212121" }}>
      <aside style={{ width: "260px", backgroundColor: "#212121", padding: "24px", display: "flex", flexDirection: "column", justifyContent: "space-between", color: "#CCCCCC", fontFamily: "Montserrat, sans-serif" }}>
        <h1 style={{ fontSize: "32px", fontWeight: "800", color: "#B00020", fontFamily: "Poppins, sans-serif", marginBottom: "32px" }}>🚗 NIMAL MOTORS</h1>
        <div style={{ flex: 1 }} />
        <div style={{ borderTop: "1px solid #555", paddingTop: "24px" }}>
          <button onClick={() => navigate("/body-shop-supervisor-dashboard")} style={{ display: "flex", alignItems: "center", gap: "12px", color: "#336699", fontSize: "16px", padding: "8px 0", background: "none", border: "none", cursor: "pointer", fontFamily: "Roboto, sans-serif" }}>
            <FaUserCircle /> Dashboard
          </button>
          <button onClick={handleSignOut} style={{ display: "flex", alignItems: "center", gap: "12px", color: "#B00020", fontSize: "16px", padding: "8px 0", background: "none", border: "none", cursor: "pointer", fontFamily: "Roboto, sans-serif" }}>
            <FaSignOutAlt /> Sign Out
          </button>
        </div>
      </aside>

      <main style={{ flex: 1, padding: "24px" }}>
        <div style={{ borderRadius: "12px", height: "192px", backgroundSize: "cover", backgroundPosition: "center", backgroundImage: "url('/bgimage.jpg')", position: "relative" }}>
          <div style={{ position: "absolute", bottom: "-30px", left: "32px", display: "flex", alignItems: "center", gap: "16px" }}>
            <img src="/accprofile.jpg" alt="profile" style={{ width: "80px", height: "80px", borderRadius: "50%", border: "4px solid white", boxShadow: "0 0 6px rgba(0,0,0,0.2)" }} />
            <div style={{ color: "white", textShadow: "0 0 4px rgba(0,0,0,0.5)" }}>
              <h2 style={{ fontSize: "28px", fontWeight: "700", fontFamily: "Poppins, sans-serif" }}>{profile.fullName}</h2>
              <p style={{ fontSize: "14px", fontFamily: "Roboto, sans-serif" }}>Bodyshop Supervisor – Nimal Motors</p>
            </div>
          </div>
        </div>

        <div style={{ marginTop: "48px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
          <section style={{ backgroundColor: "#F5F5F5", borderRadius: "12px", padding: "24px", color: "#212121", fontFamily: "Roboto, sans-serif", boxShadow: "0 0 8px rgba(0,0,0,0.1)" }}>
            <h3 style={{ fontSize: "20px", fontWeight: "600", fontFamily: "Montserrat, sans-serif", marginBottom: "16px", color: "#9B0A0A" }}>About Me</h3>
            <p style={{ fontSize: "16px", lineHeight: 1.6 }}>
              Hi, I’m {profile.fullName || "—"}. With years of hands-on experience in automotive refinishing, I manage the bodyshop operations at Nimal Motors. From damage assessment to final inspection, my role ensures top-quality vehicle restoration. I'm passionate about blending expert workmanship with great customer service.
            </p>
          </section>

          <section style={{ backgroundColor: "#F5F5F5", borderRadius: "12px", padding: "24px", color: "#212121", fontFamily: "Roboto, sans-serif", boxShadow: "0 0 8px rgba(0,0,0,0.1)", position: "relative" }}>
            <h3 style={{ fontSize: "20px", fontWeight: "600", fontFamily: "Montserrat, sans-serif", marginBottom: "16px", color: "#9B0A0A" }}>Profile Details</h3>
            {isEditing ? (
              <div style={{ display: "flex", flexDirection: "column", gap: "12px", fontSize: "16px" }}>
                {["fullName", "email", "username", "phoneNumber"].map((f) => (
                  <div key={f}>
                    <label style={{ fontWeight: "500", color: "#29527A", fontFamily: "Poppins, sans-serif", marginBottom: "4px", display: "block" }}>{f}:</label>
                    <input name={f} value={profile[f]} onChange={handleProfileChange} style={{ backgroundColor: "#212121", border: "1px solid #555", padding: "8px", borderRadius: "6px", color: "white", width: "100%", fontFamily: "Roboto, sans-serif", fontSize: "16px" }} />
                  </div>
                ))}
                <div>
                  <button onClick={saveProfile} style={{ color: "#4CAF50", fontSize: "14px", marginRight: "12px", fontFamily: "Roboto, sans-serif", cursor: "pointer", background: "none", border: "none" }}>Save</button>
                  <button onClick={() => setIsEditing(false)} style={{ color: "#F44336", fontSize: "14px", fontFamily: "Roboto, sans-serif", cursor: "pointer", background: "none", border: "none" }}>Cancel</button>
                </div>
              </div>
            ) : (
              <div style={{ fontSize: "16px", display: "flex", flexDirection: "column", gap: "8px" }}>
                <p><strong>Full Name:</strong> {profile.fullName || "—"}</p>
                <p><strong>Mobile:</strong> {profile.phoneNumber || "—"}</p>
                <p><strong>Email:</strong> {profile.email || "—"}</p>
                <p><strong>Username:</strong> {profile.username || "—"}</p>
                <div style={{ display: "flex", gap: "12px", marginTop: "12px", color: "#336699" }}>
                  <FaFacebook color="#1877F2" />
                  <FaTwitter color="#1DA1F2" />
                  <FaInstagram color="#E1306C" />
                </div>
              </div>
            )}
            {!isEditing && (
              <button onClick={() => setIsEditing(true)} style={{ position: "absolute", top: "24px", right: "24px", backgroundColor: "#B00020", color: "#F5F5F5", border: "none", padding: "6px 12px", borderRadius: "6px", fontSize: "14px", cursor: "pointer", fontFamily: "Roboto, sans-serif" }} aria-label="Edit profile">Edit</button>
            )}
          </section>
        </div>

        {isEditing && (
          <section style={{ marginTop: "32px", backgroundColor: "#F5F5F5", borderRadius: "12px", padding: "24px", color: "#212121", fontFamily: "Roboto, sans-serif", boxShadow: "0 0 8px rgba(0,0,0,0.1)" }}>
            <h3 style={{ fontSize: "20px", fontWeight: "600", fontFamily: "Montserrat, sans-serif", marginBottom: "16px", color: "#9B0A0A" }}>Change Password</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {renderPasswordInput("oldPassword", "Old Password")}
              {renderPasswordInput("newPassword", "New Password")}
              {renderPasswordInput("confirmPassword", "Confirm Password")}
              {passwordError && (<p style={{ color: "#B00020", fontSize: "14px" }}>{passwordError}</p>)}
              <button onClick={handleChangePassword} style={{ backgroundColor: "#336699", color: "#fff", padding: "10px 20px", borderRadius: "6px", fontSize: "14px", cursor: "pointer", alignSelf: "flex-start", fontFamily: "Roboto, sans-serif" }} aria-label="Update password">Update Password</button>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
