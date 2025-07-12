import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

export default function ResetPassword() {
  const location = useLocation();
  const navigate = useNavigate();
  const [userId, setUserId] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const id = params.get("userId");
    if (id) setUserId(id);
    else setMessage("Invalid or missing reset link.");
  }, [location]);

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5001/api/user/reset-password",
        {
          userId,
          newPassword,
        }
      );

      setMessage(response.data.message);
      setTimeout(() => navigate("/login"), 2000);
    } catch (error) {
      setMessage(error.response?.data?.message || "Error changing password.");
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: "url('/bgimage.jpg')",
        fontFamily: "'Roboto', sans-serif",
      }}
    >
      <form
        onSubmit={handleResetPassword}
        className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-md border border-gray-200"
        style={{ color: "#212121" }}
      >
        <h2
          className="text-center font-bold mb-6"
          style={{
            fontFamily: "'Poppins', sans-serif",
            fontSize: "28px",
            color: "#B00020",
          }}
        >
          Reset Your Password
        </h2>

        {message && (
          <p
            className="text-center text-sm mb-4"
            style={{
              color: message.toLowerCase().includes("success")
                ? "green"
                : "#B00020",
              fontFamily: "'Open Sans', sans-serif",
              fontSize: "14px",
            }}
          >
            {message}
          </p>
        )}

        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="w-full px-3 py-2 mb-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
          style={{ fontSize: "16px", fontFamily: "'Roboto', sans-serif" }}
          required
        />
        <input
          type="password"
          placeholder="Confirm New Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full px-3 py-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
          style={{ fontSize: "16px", fontFamily: "'Roboto', sans-serif" }}
          required
        />
        <button
          type="submit"
          className="w-full py-2 rounded font-semibold text-white"
          style={{
            backgroundColor: "#B00020",
            fontSize: "16px",
            fontFamily: "'Poppins', sans-serif",
          }}
        >
          Reset Password
        </button>
      </form>
    </div>
  );
}
