import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState("");
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // 👁️ toggle

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
      setMessage(message);

      const mustChangePassword = user.mustChangePassword ?? false;

      if (mustChangePassword) {
        navigate("/change-password", { state: { userId: user.userId } });
      } else {
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
      console.error("Login failed:", error.response?.data?.message || error.message);
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
      className="flex flex-col min-h-screen relative"
      style={{
        fontFamily: "'Roboto', sans-serif",
        backgroundImage: `url("/bgimage.jpg")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Background image overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center brightness-75 z-0"
        style={{ backgroundImage: `url("/newbg.png")` }}
      ></div>

      <div className="relative z-10">
        <NavBar />
      </div>

      {/* Main Content */}
      <div className="flex-grow flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 relative z-10">
        <div className="bg-white/90 p-8 rounded-xl shadow-lg w-full max-w-md">
          <h2 className="text-3xl font-bold text-center text-red-800 mb-6">
            Login
          </h2>

          {message && (
            <p
              className={`text-center mb-4 ${
                message.includes("successful")
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {message}
            </p>
          )}

          {isForgotPassword ? (
            <form onSubmit={handleForgotPasswordSubmit}>
              <div className="mb-4">
                <label className="block mb-1 text-gray-800">
                  Enter your email:
                </label>
                <input
                  type="email"
                  value={forgotPasswordEmail}
                  onChange={(e) => setForgotPasswordEmail(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-400"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
              >
                Send Reset Link
              </button>

              <div className="mt-4 text-center">
                <p
                  onClick={() => setIsForgotPassword(false)}
                  className="text-sm text-blue-600 hover:underline cursor-pointer"
                >
                  Back to Login
                </p>
              </div>
            </form>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block mb-1 text-gray-800">Email:</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-400"
                  required
                />
                {errors.email && (
                  <p className="text-sm text-red-500">{errors.email}</p>
                )}
              </div>

              <div className="mb-4 relative">
                <label className="block mb-1 text-gray-800">Password:</label>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-400"
                  required
                />
                {/* Toggle eye icon */}
                <span
                  className="absolute right-3 top-9 cursor-pointer text-xl"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "🙈" : "👁️"}
                </span>
                {errors.password && (
                  <p className="text-sm text-red-500">{errors.password}</p>
                )}
                <div className="text-right mt-1">
                  <span
                    onClick={() => setIsForgotPassword(true)}
                    className="text-sm text-blue-600 hover:underline cursor-pointer"
                  >
                    Forgot Password?
                  </span>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700"
              >
                Login
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Footer fixed and visible */}
      <div className="relative z-10">
        <Footer />
      </div>
    </div>
  );
}
