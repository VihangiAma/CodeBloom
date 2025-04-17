// import { useState } from "react";


// export default function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [errors, setErrors] = useState({});
//   const [message, setMessage] = useState("");

//   const validate = () => {
//     const newErrors = {};
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

//     if (!emailRegex.test(email)) {
//       newErrors.email = "Please enter a valid email address.";
//     }

//     if (password.length < 6) {
//       newErrors.password = "Password must be at least 6 characters.";
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (validate()) {
//       setMessage("Login successful!");
//     } else {
//       setMessage("");
//     }
//   };

//   return (
//     <div className="relative h-screen w-screen">
//       {/* Background image */}
//       <div
//         className="absolute inset-0 bg-cover bg-center brightness-75"
//         style={{ backgroundImage: `url("/bgimage.jpg")` }}
//       ></div>

//       {/* Centered Form */}
//       <div className="relative z-10 flex items-center justify-center h-full px-4">
//         <div className="bg-white/30 backdrop-blur-sm p-8 rounded-lg shadow-2xl w-full max-w-md border border-white/20 text-white">
//           <h2 className="text-2xl font-semibold mb-4 text-center">Login</h2>

//           {message && <p className="text-green-200 mb-4 text-center">{message}</p>}

//           <form onSubmit={handleSubmit}>
//             <div className="mb-4">
//               <label className="block mb-1">Email:</label>
//               <input
//                 type="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 className="w-full px-3 py-2 rounded text-black border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 required
//               />
//               {errors.email && <p className="text-red-300 text-sm mt-1">{errors.email}</p>}
//             </div>

//             <div className="mb-4">
//               <label className="block mb-1">Password:</label>
//               <input
//                 type="password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 className="w-full px-3 py-2 rounded text-black border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 required
//               />
//               {errors.password && <p className="text-red-300 text-sm mt-1">{errors.password}</p>}
//             </div>

//             <button
//               type="submit"
//               className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded font-semibold"
//             >
//               Login
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }


import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");

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
        'http://localhost:5000/api/user/login',
        { email, password }
      );
      
      const { token, user } = response.data;

      localStorage.setItem("token", token); // Save token in local storage

      setMessage("Login successful!");

      // Redirect based on user role
      switch (user.type) {
        case "admin":
          navigate("/admin-profile");
          break;
          // case "admin-profile":
          // navigate("/admin-profile");
          // break;
        case "accountant":
          navigate("/accountant");
          break;
       
        case "premiumCustomer":
          navigate("/premium-customer");
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


        default:
          navigate("/notfound");
      }
    } catch (error) {
      console.error("Login failed:", error.response?.data?.message || error.message);
      setMessage("Login failed: " + (error.response?.data?.message || "Server error"));
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
        <div className="bg-white/30 backdrop-blur-sm p-8 rounded-lg shadow-2xl w-full max-w-md border border-white/20 text-white">
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
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded font-semibold"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
