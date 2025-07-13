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
      style={{ fontFamily: "'Roboto', sans-serif", backgroundColor: "#715555ff" }}
    >
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center brightness-75"
        style={{ backgroundImage: `url("/newbg.png")` }}
      ></div>
    <>
      {/* <NavBar /> */}
      <NavBar />
      <div className="relative h-screen w-screen">
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
        {/* Centered Form */}
        <div className="relative z-10 flex items-center justify-center h-full px-4">
          <div className="bg-white/30 backdrop-blur-sm p-8 rounded-lg shadow-2xl w-full max-w-md border border-white/20 text-red">
            <h2 className="text-2xl font-semibold mb-4 text-center">Login</h2>

            {message && (
              <p
                className={`mb-4 text-center ${message.includes("successful")
                    ? "text-green-200"
                    : "text-red-300"
                  }`}
              >
                {message}
              </p>
            )}


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
                  className="w-full bg-blue-600 hover:bg-blue-700 text-black py-2 rounded font-semibold"
                >
                  Login
                </button>
              </form>
            )}

          </div>
        </div>
      </div>
      {/* <Footer /> */}
      <Footer />
    </>
  );
}
