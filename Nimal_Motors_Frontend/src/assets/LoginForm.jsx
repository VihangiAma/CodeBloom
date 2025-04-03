// import { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// export default function LoginForm() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false); // Added loading state
//   const navigate = useNavigate(); // useNavigate hook

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError(""); // Clear previous errors

//     // Basic validation
//     if (!email || !password) {
//       setError("Both email and password are required.");
//       return;
//     }

//     // Email validation
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(email)) {
//       setError("Please enter a valid email address.");
//       return;
//     }

//     // Password length check
//     if (password.length < 6) {
//       setError("Password must be at least 6 characters long.");
//       return;
//     }

//     setLoading(true); // Show loading state

//     try {
//       const response = await axios.post(
//         "http://localhost:5000/api/user/login",
//         { email, password },
//         { withCredentials: true } // If your backend requires authentication cookies
//       );

//       console.log("Login Response:", response.data);

//       if (response.data.token) {
//         localStorage.setItem("token", response.data.token); // Store token
//         navigate("/accountant-profile"); // Redirect
//       } else {
//         setError("Login failed. Please check your credentials.");
//       }
//     } catch (error) {
//       console.error("Login Error:", error);
//       setError(error.response?.data?.message || "An error occurred during login.");
//     } finally {
//       setLoading(false); // Hide loading state
//     }
//   };


//   return (
//     <div className="flex items-center justify-center min-h-screen bg-white">
//       <form
//         onSubmit={handleSubmit}
//         className="p-10 rounded-3xl shadow-lg w-full sm:w-96 border border-gray-300"
//       >
//         <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">Login</h2>

//         {/* Error Message */}
//         {error && <div className="text-red-500 mb-4">{error}</div>}

//         <div className="flex items-center mb-6">
//           <label htmlFor="email" className="w-1/3 text-gray-700 font-semibold">
//             Email
//           </label>
//           <input
//             type="email"
//             id="email"
//             placeholder="Enter your email address"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             className="w-2/3 p-4 text-gray-800 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 transition duration-300"
//             required
//           />
//         </div>

//         <div className="flex items-center mb-8">
//           <label htmlFor="password" className="w-1/3 text-gray-700 font-semibold">
//             Password
//           </label>
//           <input
//             type="password"
//             id="password"
//             placeholder="Enter your password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             className="w-2/3 p-4 text-gray-800 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 transition duration-300"
//             required
//           />
//         </div>

//         <button
//           type="submit"
//           className={`w-full bg-pink-600 hover:bg-pink-700 text-white p-4 rounded-lg shadow-md transition duration-300 ${
//             loading ? "opacity-50 cursor-not-allowed" : ""
//           }`}
//           disabled={loading}
//         >
//           {loading ? "Logging in..." : "Login"}
//         </button>
//       </form>
//     </div>
//   );
// }










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
    setError(""); // Clear previous errors

    // Basic validation
    if (!email || !password) {
      setError("Both email and password are required.");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    // Password length check
    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    setLoading(true); // Show loading state

    try {
      const response = await axios.post(
        "http://localhost:5000/api/user/login", // Make sure this URL is correct
        { email, password },
        { withCredentials: true } // If your backend requires authentication cookies
      );

      console.log("Login Response:", response.data);

      if (response.data.token) {
        localStorage.setItem("token", response.data.token); // Store token
        navigate("/accountant-profile"); // Redirect
      } else {
        setError("Login failed. Please check your credentials.");
      }
    } catch (error) {
      console.error("Login Error:", error);
      
      // Improved error handling based on response type
      if (error.response) {
        // Server responded with a status outside the 2xx range
        setError(error.response?.data?.message || "An error occurred during login.");
      } else if (error.request) {
        // No response was received from the server
        setError("No response received from the server. Please try again later.");
      } else {
        // Any other errors, like invalid request setup
        setError("An unexpected error occurred. Please check your network or try again.");
      }
    } finally {
      setLoading(false); // Hide loading state
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <form
        onSubmit={handleSubmit}
        className="p-10 rounded-3xl shadow-lg w-full sm:w-96 border border-gray-300"
      >
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">Login</h2>

        {/* Display Error Message */}
        {error && <div className="text-red-500 mb-4">{error}</div>}

        {/* Email Input */}
        <div className="flex items-center mb-6">
          <label htmlFor="email" className="w-1/3 text-gray-700 font-semibold">
            Email
          </label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-2/3 p-4 text-gray-800 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 transition duration-300"
            required
          />
        </div>
        

        {/* Password Input */}
        <div className="flex items-center mb-8">
          <label htmlFor="password" className="w-1/3 text-gray-700 font-semibold">
            Password
          </label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-2/3 p-4 text-gray-800 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 transition duration-300"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className={`w-full bg-pink-600 hover:bg-pink-700 text-white p-4 rounded-lg shadow-md transition duration-300 ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}
