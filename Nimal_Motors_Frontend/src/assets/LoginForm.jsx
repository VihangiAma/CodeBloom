import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Validation
    if (!email || !password) {
      setError("Both email and password are required.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
          "http://localhost:5000/api/user/login",
          { email, password },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
      );

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));

        // Redirect based on user type
        switch(response.data.user.type) {
          case "admin":
            navigate("/admin-profile");
            break;
          case "accountant":
            navigate("/accountant-profile");
            break;
          case "supervisor":
            navigate("/supervisor-profile");
            break;
            
          default:
            navigate("/");
        }
      } else {
        setError("Login failed. Please try again.");
      }
    } catch (error) {
      console.error("Login error:", error);
      if (error.response) {
        setError(error.response.data.message || "Login failed");
      } else if (error.request) {
        setError("No response from server. Please check your connection.");
      } else {
        setError("An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <form
            onSubmit={handleSubmit}
            className="p-10 rounded-3xl shadow-lg w-full sm:w-96 border border-gray-300 text-black" // Added text-black here
        >
          <h2 className="text-3xl font-bold mb-8 text-center">Login</h2> {/* Removed text-gray-800 as text-black is now set on parent */}

          {error && (
              <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                {error}
              </div>
          )}

          <div className="mb-6">
            <label htmlFor="email" className="block font-semibold mb-2"> {/* Removed text-gray-700 */}
              Email
            </label>
            <input
                type="email"
                id="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black" // Added text-black
                required
            />
          </div>

          <div className="mb-8">
            <label htmlFor="password" className="block font-semibold mb-2"> {/* Removed text-gray-700 */}
              Password
            </label>
            <input
                type="password"
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black" // Added text-black
                required
                minLength="6"
            />
          </div>

          <button
              type="submit"
              disabled={loading}
              className={`w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition ${
                  loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
  );
}