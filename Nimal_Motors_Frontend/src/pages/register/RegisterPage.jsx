import { useState } from "react";

export default function RegisterPage() {
  const [userId, setUserId] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [type, setType] = useState("premiumCustomer");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});

  const handleRegister = async (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Enter a valid email address.";
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    const userData = {
      userId,
      fullName,
      email,
      phoneNumber,
      username,
      password,
      type,
    };

    try {
      const response = await fetch("http://localhost:5001/api/user/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      const result = await response.json();

      if (response.ok) {
        setMessage("Registration successful!");
        setTimeout(() => {
          window.location.href = "/login";
        }, 1500);
      } else {
        setMessage(result.message || "Registration failed.");
      }
    } catch (err) {
      setMessage("An error occurred during registration.");
    }
  };

  return (
    <div className="relative h-screen w-screen">
      <div
        className="absolute inset-0 bg-cover bg-center brightness-75"
        style={{ backgroundImage: `url("/bgimage.jpg")` }}
      ></div>

      <div className="relative z-10 flex items-center justify-center h-full px-4">
        <div className="bg-white/30 backdrop-blur-sm p-6 rounded-lg shadow-2xl w-full max-w-md border border-white/20 text-white max-h-[90vh] overflow-y-auto scrollbar-thin scrollbar-thumb-white/40 scrollbar-track-white/10">
          <h2 className="text-2xl font-semibold mb-4 text-center">Register</h2>
          {message && <p className="text-green-200 mb-4 text-center">{message}</p>}

          <form onSubmit={handleRegister}>
            {[
              { label: "User ID", value: userId, setter: setUserId },
              { label: "Full Name", value: fullName, setter: setFullName },
              { label: "Email", value: email, setter: setEmail, type: "email" },
              { label: "Phone Number", value: phoneNumber, setter: setPhoneNumber },
              { label: "Username", value: username, setter: setUsername },
              { label: "Password", value: password, setter: setPassword, type: "password" },
              { label: "Confirm Password", value: confirmPassword, setter: setConfirmPassword, type: "password" },
            ].map(({ label, value, setter, type = "text" }, index) => (
              <div className="mb-4" key={index}>
                <label className="block mb-1">{label}:</label>
                <input
                  type={type}
                  value={value}
                  onChange={(e) => setter(e.target.value)}
                  className="w-full px-3 py-2 rounded text-black border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                {errors[label.toLowerCase().replace(" ", "")] && (
                  <p className="text-red-300 text-sm mt-1">
                    {errors[label.toLowerCase().replace(" ", "")]}
                  </p>
                )}
              </div>
            ))}

            <div className="mb-4">
              <label className="block mb-1">User Type:</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full px-3 py-2 rounded text-black border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="premiumCustomer">Premium Customer</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded font-semibold"
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
