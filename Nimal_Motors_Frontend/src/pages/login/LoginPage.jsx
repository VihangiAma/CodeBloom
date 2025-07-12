import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState("");
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) {
      setMessage("");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5001/api/user/login",
        { email, password }
      );

      const { token, user, message } = response.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      setMessage(message); // Display backend message (e.g., "Please change your temporary password")

      const mustChangePassword = user.mustChangePassword ?? false;

      if (mustChangePassword) {
        navigate("/change-password", { state: { userId: user.userId } });
      } else {
        // Role-based navigation
        switch (user.type) {
          case "admin":
            navigate("/admin-profile");
            break;
          case "accountant":
            navigate("/accountant");
            break;
          case "electricalsupervisor":
            navigate("/electrical-supervisor");
            break;
          case "servicesupervisor":
            navigate("/service-supervisor");
            break;
          case "mechanicalsupervisor":
            navigate("/mechanical-supervisor");
            break;
          case "bodyshopsupervisor":
            navigate("/bodyshop-supervisor");
            break;
          case "premiumCustomer":
            navigate("/premium-customer");
            break;
          default:
            navigate("/not-found");
            break;
        }
      }
    } catch (error) {
      console.error(
        "Login failed:",
        error.response?.data?.message || error.message
      );
      setMessage(
        "Login failed: " + (error.response?.data?.message || "Server error")
      );
    }
  };

  const handleForgotPasswordSubmit = async (e) => {
    e.preventDefault();

    if (!forgotPasswordEmail) {
      setMessage("Please enter your email to reset the password.");
      return;
    }

    try {
      await axios.post("http://localhost:5001/api/user/forgot-password", {
        email: forgotPasswordEmail,
      });
      setMessage("Password reset email sent! Check your inbox.");
      setIsForgotPassword(false);
    } catch (error) {
      console.error(
        "Forgot password failed:",
        error.response?.data?.message || error.message
      );
      setMessage("Error: " + (error.response?.data?.message || "Server error"));
    }
  };

  return (
    <div
      className="relative h-screen w-screen"
      style={{ fontFamily: "'Roboto', sans-serif", backgroundColor: "#F5F5F5" }}
    >
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center brightness-75"
        style={{ backgroundImage: `url("/bgimage.jpg")` }}
      ></div>

      {/* Centered Form */}
      <div className="relative z-10 flex items-center justify-center h-full px-4">
        <div
          className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-md border border-gray-300"
          style={{ color: "#212121" }}
        >
          <h2
            className="text-center font-bold mb-6"
            style={{ fontFamily: "'Poppins', sans-serif", fontSize: "32px", color: "#9B0A0A" }}
          >
            Login
          </h2>

          {message && (
            <p
              className={`mb-4 text-center ${
                message.toLowerCase().includes("successful") ||
                message.toLowerCase().includes("sent")
                  ? "text-green-700"
                  : "text-red-700"
              }`}
              style={{ fontSize: "14px" }}
            >
              {message}
            </p>
          )}

          {isForgotPassword ? (
            <form onSubmit={handleForgotPasswordSubmit}>
              <div className="mb-5">
                <label
                  className="block mb-1 font-semibold"
                  style={{ fontSize: "16px" }}
                >
                  Enter your email:
                </label>
                <input
                  type="email"
                  value={forgotPasswordEmail}
                  onChange={(e) => setForgotPasswordEmail(e.target.value)}
                  className="w-full px-3 py-2 rounded border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  required
                  style={{ fontSize: "16px", fontFamily: "'Roboto', sans-serif" }}
                />
              </div>

              <button
                type="submit"
                className="w-full bg-red-700 hover:bg-red-800 text-white py-2 rounded font-semibold"
                style={{ fontSize: "16px" }}
              >
                Send Reset Link
              </button>

              <div className="mt-5 text-center">
                <p
                  onClick={() => setIsForgotPassword(false)}
                  className="text-sm text-blue-600 hover:text-blue-800 underline cursor-pointer"
                  style={{ fontFamily: "'Open Sans', sans-serif" }}
                >
                  Back to Login
                </p>
              </div>
            </form>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="mb-5">
                <label
                  className="block mb-1 font-semibold"
                  style={{ fontSize: "16px" }}
                >
                  Email:
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 rounded border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  required
                  style={{ fontSize: "16px", fontFamily: "'Roboto', sans-serif" }}
                />
                {errors.email && (
                  <p className="text-red-600 text-sm mt-1" style={{ fontFamily: "'Open Sans', sans-serif" }}>
                    {errors.email}
                  </p>
                )}
              </div>

              <div className="mb-5 relative">
                <label
                  className="block mb-1 font-semibold"
                  style={{ fontSize: "16px" }}
                >
                  Password:
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 rounded border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  required
                  style={{ fontSize: "16px", fontFamily: "'Roboto', sans-serif" }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  style={{
                    position: "absolute",
                    right: "10px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: "#336699",
                    padding: 0,
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  {showPassword ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="20"
                      width="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#336699"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M17.94 17.94A10.94 10.94 0 0 1 12 19c-4.477 0-8.268-2.943-9.542-7a10.94 10.94 0 0 1 1.96-3.3"/>
                      <line x1="1" y1="1" x2="23" y2="23" />
                      <path d="M9.88 9.88a3 3 0 0 0 4.24 4.24" />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="20"
                      width="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#336699"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </button>
                {errors.password && (
                  <p className="text-red-600 text-sm mt-1" style={{ fontFamily: "'Open Sans', sans-serif" }}>
                    {errors.password}
                  </p>
                )}

                <div className="text-right mt-1">
                  <span
                    onClick={() => setIsForgotPassword(true)}
                    className="text-sm text-blue-600 hover:text-blue-800 underline cursor-pointer"
                    style={{ fontFamily: "'Open Sans', sans-serif" }}
                  >
                    Forgot Password?
                  </span>
                </div>
              </div>

              <button
                type="submit"
                style={{
                  width: "100%",
                  backgroundColor: "#B00020",
                  color: "white",
                  padding: "12px",
                  fontSize: "16px",
                  fontWeight: "600",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                  transition: "background-color 0.3s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = "#9B0A0A")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = "#B00020")
                }
              >
                Login
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
