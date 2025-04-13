import { useState } from "react";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login state
  const [isPasswordChanged, setIsPasswordChanged] = useState(false); // Track if password is changed

  // Temporary credentials for first login
  const tempPassword = "temporary123"; // Replace with actual temporary password

  const handleLogin = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Enter a valid email address.";
    }

    if (password !== tempPassword) {
      newErrors.password = "Incorrect password. Please use your temporary password.";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setIsLoggedIn(true); // Set login state to true on successful login
      setMessage("Logged in successfully!");
    } else {
      setMessage("");
    }
  };

  const handleChangePassword = () => {
    if (newPassword.trim() === "") {
      setMessage("New password cannot be empty.");
      return;
    }

    setPassword(newPassword);
    setConfirmPassword(newPassword);
    setNewPassword("");
    setShowChangePassword(false); // Hide change password section after updating
    setIsPasswordChanged(true); // Mark password as changed
    setMessage("Password changed successfully!");
  };

  return (
    <div className="relative h-screen w-screen">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center brightness-75"
        style={{ backgroundImage: `url("/bgimage.jpg")` }}
      ></div>

      {/* Centered Register/Login Form */}
      <div className="relative z-10 flex items-center justify-center h-full px-4">
        <div className="bg-white/30 backdrop-blur-sm p-8 rounded-lg shadow-2xl w-full max-w-md border border-white/20 text-white">
          <h2 className="text-2xl font-semibold mb-4 text-center">
            {isLoggedIn ? "Change Your Password" : "Register"}
          </h2>

          {message && <p className="text-green-200 mb-4 text-center">{message}</p>}

          {!isLoggedIn ? (
            <form onSubmit={handleLogin}>
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
          ) : (
            <>
              {/* Show Change Password Section */}
              {isPasswordChanged ? (
                <p className="text-green-200 mb-4 text-center">
                  Password has been successfully changed. You can now use your new password.
                </p>
              ) : (
                <>
                  <button
                    onClick={() => setShowChangePassword(!showChangePassword)}
                    className="text-blue-200 hover:text-white underline text-sm mb-2"
                  >
                    {showChangePassword
                      ? "Cancel Change Password"
                      : "Change Password"}
                  </button>

                  {/* Toggle visibility of password change form */}
                  {showChangePassword && (
                    <div className="mt-4">
                      <label className="block mb-1">New Password:</label>
                      <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="w-full px-3 py-2 rounded text-black border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <button
                        onClick={handleChangePassword}
                        className="mt-3 w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded font-semibold"
                      >
                        Update Password
                      </button>
                    </div>
                  )}
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
