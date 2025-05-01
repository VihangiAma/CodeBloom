import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState("");  // For Forgot Password
  const [isForgotPassword, setIsForgotPassword] = useState(false);  // To toggle the forgot password view

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
        'http://localhost:5001/api/user/login',
        { email, password }
      );

      const { token, user } = response.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      setMessage("Login successful!");

      // Navigation based on role
      if (user.type === "admin") {
        navigate("/admin-profile");
      } else if (user.type === "accountant") {
        navigate("/accountant");
      } else if (user.type === "electricalsupervisor") {
        navigate("/electrical-supervisor");
      } else if (user.type === "servicesupervisor") {
        navigate("/service-supervisor");
      } else if (user.type === "mechanicalsupervisor") {
        navigate("/mechanical-supervisor");
      } else if (user.type === "bodyshopsupervisor") {
        navigate("/bodyshop-supervisor");
      } else if (user.type === "premiumCustomer") {
        navigate("/premium-customer");
      } else {
        navigate("/not-found");
      }
    } catch (error) {
      console.error("Login failed:", error.response?.data?.message || error.message);
      setMessage("Login failed: " + (error.response?.data?.message || "Server error"));
    }
  };

  const handleForgotPasswordSubmit = async (e) => {
    e.preventDefault();

    if (!forgotPasswordEmail) {
      setMessage("Please enter your email to reset the password.");
      return;
    }

    try {
      const response = await axios.post(
        'http://localhost:5001/api/user/forgot-password',
        { email: forgotPasswordEmail }
      );
      setMessage("Password reset email sent! Check your inbox.");
      setIsForgotPassword(false);  // Hide the forgot password form after successful request
    } catch (error) {
      console.error("Forgot password failed:", error.response?.data?.message || error.message);
      setMessage("Error: " + (error.response?.data?.message || "Server error"));
    }
  };

  return (
    <div className="relative h-screen w-screen">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center brightness-75"
        style={{ backgroundImage: `url("/bgimage.jpg")` }}
      ></div>

      {/* Centered Form */}
      <div className="relative z-10 flex items-center justify-center h-full px-4">
        <div className="bg-white/30 backdrop-blur-sm p-8 rounded-lg shadow-2xl w-full max-w-md border border-white/20 text-red">
          <h2 className="text-2xl font-semibold mb-4 text-center">Login</h2>

          {message && (
            <p
              className={`mb-4 text-center ${
                message.includes("successful") ? "text-green-200" : "text-red-300"
              }`}
            >
              {message}
            </p>
          )}


          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block mb-1">Email:</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 rounded text-black border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              {errors.email && (
                <p className="text-red-300 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            <div className="mb-4">
              <label className="block mb-1">Password:</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 rounded text-black border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              {errors.password && (
                <p className="text-red-300 text-sm mt-1">{errors.password}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-red py-2 rounded font-semibold"
            >
              Login
            </button>
          </form>

          {isForgotPassword ? (
            <form onSubmit={handleForgotPasswordSubmit}>
              <div className="mb-4">
                <label className="block mb-1">Enter your email:</label>
                <input
                  type="email"
                  value={forgotPasswordEmail}
                  onChange={(e) => setForgotPasswordEmail(e.target.value)}
                  className="w-full px-3 py-2 rounded text-black border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded font-semibold"
              >
                Send Reset Link
              </button>

              <div className="mt-4 text-center">
                <p
                  onClick={() => setIsForgotPassword(false)}
                  className="text-sm text-blue-300 hover:text-blue-500 underline cursor-pointer"
                >
                  Back to Login
                </p>
              </div>
            </form>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block mb-1">Email:</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 rounded text-black border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                {errors.email && (
                  <p className="text-red-300 text-sm mt-1">{errors.email}</p>
                )}
              </div>

              <div className="mb-4">
                <label className="block mb-1">Password:</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 rounded text-black border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                {errors.password && (
                  <p className="text-red-300 text-sm mt-1">{errors.password}</p>
                )}

                {/* Forgot Password Link */}
                <div className="text-right mt-1">
                  <span
                    onClick={() => setIsForgotPassword(true)}
                    className="text-sm text-blue-300 hover:text-blue-500 underline cursor-pointer"
                  >
                    Forgot Password?
                  </span>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded font-semibold"
              >
                Login
              </button>
            </form>
          )}


          {/* Create Account Link */}
          {/* <div className="mt-4 text-center">
            <p className="text-white text-sm">
              Don't have an account?(Only for premium Customers)
              {" "}
              <span
                onClick={() => navigate("/register")}
                className="text-blue-300 hover:text-blue-500 underline cursor-pointer"
              >
                
                Create one
              </span>
            </p>
          </div> */}
        </div>
      </div>
    </div>
  );
}
