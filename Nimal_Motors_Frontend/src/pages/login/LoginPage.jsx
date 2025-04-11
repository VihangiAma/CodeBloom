import React, { useState } from "react";
import "./login.css";
import axios from "axios";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleLogin = (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    axios
      .post("http://localhost:5000/api/users/login", {
        email: email,
        password: password,
      })
      .then((response) => {
        console.log("Login successful:", response.data);
        // Save token or redirect if needed
        // localStorage.setItem("token", response.data.token);
        // navigate("/premium-customer"); <-- if using react-router
      })
      .catch((error) => {
        console.error("Login failed:", error.response?.data || error.message);
        // Show error message to user if needed
      });
  };

  return (
    <div className="w-full h-screen flex justify-center items-center relative">
      {/* Background image */}
      <div className="pic-Bg"></div>

      {/* Login form */}
      <div className="w-[400px] h-[400px] bg-blur bg-opacity-30 backdrop-blur-lg rounded-xl shadow-lg p-6 flex flex-col items-center justify-center z-10">
        <h1 className="text-3xl font-bold text-white mb-6">LOGIN</h1>

        <form className="w-full flex flex-col gap-4" onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={handleEmailChange}
            className="px-4 py-2 rounded-md bg-gray-700 bg-opacity-40 text-white placeholder-white focus:outline-none"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
            className="px-4 py-2 rounded-md bg-gray-700 bg-opacity-40 text-white placeholder-white focus:outline-none"
          />
          <button
            type="submit"
            className="bg-white text-blue-900 font-semibold py-2 rounded-md hover:bg-blue-200 transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
