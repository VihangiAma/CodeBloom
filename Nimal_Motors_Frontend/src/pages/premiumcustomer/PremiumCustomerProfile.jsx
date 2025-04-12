// 
import React, { useState, useEffect } from "react";
//import { FaUser, FaPhone, FaEnvelope, FaMapMarkerAlt, FaHistory, FaCalendarCheck, FaSignOutAlt, FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const PremiumCustomerProfile = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "Amanda", lastName: "Perera", username: "amanda.perera", email: "amandaperera@gmail.com", phoneNumber: "0 702315077", address: "New Town, Kaduwela",
  });
  const [passwordData, setPasswordData] = useState({ currentPassword: "", newPassword: "", confirmPassword: "" });
  const [appointmentData, setAppointmentData] = useState({ service: "", date: "", time: "" });
  const [successMessage, setSuccessMessage] = useState("");
  const [errors, setErrors] = useState({});
  const [currentSection, setCurrentSection] = useState("profile");

  const [bookingHistory, setBookingHistory] = useState([
    { id: 1, service: "Oil Change", date: "2025-03-01", status: "Completed" },
    { id: 2, service: "Tire Rotation", date: "2025-03-15", status: "Upcoming" },
  ]);

  const handleSave = () => {
    // Save profile data (You can add backend functionality here if needed)
    setSuccessMessage("Profile details saved successfully! ✅");
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (currentSection === "profile") setFormData((prev) => ({ ...prev, [name]: value }));
    else if (currentSection === "makeAppointment") setAppointmentData((prev) => ({ ...prev, [name]: value }));
    else if (currentSection === "changePassword") setPasswordData((prev) => ({ ...prev, [name]: value }));
  };

  const validatePasswordForm = () => {
    let newErrors = {};
    if (!passwordData.currentPassword) newErrors.currentPassword = "Current password is required";
    if (!passwordData.newPassword) newErrors.newPassword = "New password is required";
    if (passwordData.newPassword !== passwordData.confirmPassword) newErrors.confirmPassword = "Passwords do not match";
    setErrors(newErrors);
    return !Object.keys(newErrors).length;
  };

  const handlePasswordSubmit = () => {
    if (validatePasswordForm()) {
      setSuccessMessage("Password changed successfully! ✅");
      setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
      setTimeout(() => setSuccessMessage(""), 3000);
    }
  };

  const handleAppointmentSubmit = () => {
    if (appointmentData.service && appointmentData.date && appointmentData.time) {
      setSuccessMessage("Appointment booked successfully! ✅");
      setAppointmentData({ service: "", date: "", time: "" });
      setTimeout(() => setSuccessMessage(""), 3000);
    } else alert("Please fill in all the fields.");
  };

  const handleLogout = () => {
    alert("Logged out successfully!");
    navigate("/");
  };

  useEffect(() => {
    if (currentSection !== "changePassword") {
      setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
      setErrors({});
    }
  }, [currentSection]);

  return (
    <div className="flex h-screen bg-gray-100">
      <aside className="w-72 bg-blue-800 text-white p-6 flex flex-col">
        <div className="flex flex-col items-center mb-8">
          <img src="https://via.placeholder.com/150" alt="User" className="w-24 h-24 rounded-full mb-3 cursor-pointer border-2 border-white hover:opacity-80 transition" />
          <h2 className="text-lg font-bold">Amanda Perera <><br /></><></>Premium Customer</h2>
        </div>
        <nav className="flex-1">
          <ul className="space-y-4">
            <li className="flex items-center gap-3 p-3 cursor-pointer hover:bg-blue-600 rounded transition" onClick={() => setCurrentSection("profile")}>
              <FaUser /> <span className="font-semibold">Personal Information</span>
            </li>
            <li className="flex items-center gap-3 p-3 cursor-pointer hover:bg-blue-600 rounded transition" onClick={() => setCurrentSection("bookingHistory")}>
              <FaHistory /> <span className="font-semibold">Booking History</span>
            </li>
            <li className="flex items-center gap-3 p-3 cursor-pointer hover:bg-blue-600 rounded transition" onClick={() => setCurrentSection("makeAppointment")}>
              <FaCalendarCheck /> <span className="font-semibold">Make Appointment</span>
            </li>
            <li className="flex items-center gap-3 p-3 cursor-pointer hover:bg-blue-600 rounded transition" onClick={() => setCurrentSection("changePassword")}>
              <FaLock /> <span className="font-semibold">Change Password</span>
            </li>
            <li className="flex items-center gap-3 p-3 cursor-pointer hover:bg-blue-600 rounded transition" onClick={handleLogout}>
              <FaSignOutAlt /> <span className="font-semibold">Logout</span>
            </li>
          </ul>
        </nav>
      </aside>

      <main className="flex-1 p-10">
        {successMessage && (
          <div className="mb-4 p-3 bg-green-100 border border-green-500 text-green-700 rounded-lg">
            {successMessage}
          </div>
        )}

        {currentSection === "profile" && (
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">Premium Customer Personal Info</h1>
            <form className="grid grid-cols-2 gap-6">
              {["firstName", "lastName", "username", "email", "phoneNumber", "address"].map((field) => (
                <div key={field}>
                  <label className="block font-semibold text-gray-800">{field.replace(/([A-Z])/g, " $1").trim()}</label>
                  <input
                    type="text"
                    name={field}
                    value={formData[field]}
                    onChange={handleChange}
                    className="w-full p-3 border rounded-lg focus:ring-2 transition text-black"
                  />
                </div>
              ))}
            </form>
            <div className="flex justify-end mt-6 space-x-4">
              <button className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition" onClick={handleSave}>
                Save
              </button>
              <button className="bg-gray-300 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-400 transition" onClick={() => setCurrentSection("profile")}>
                Cancel
              </button>
            </div>
          </div>
        )}

        {currentSection === "makeAppointment" && (
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">Make Appointment</h1>
            <form>
              <div>
                <label className="block font-semibold text-gray-800">Service</label>
                <input
                  type="text"
                  name="service"
                  value={appointmentData.service}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-lg focus:ring-2 transition text-black"
                />
              </div>
              <div>
                <label className="block font-semibold text-gray-800">Date</label>
                <input
                  type="date"
                  name="date"
                  value={appointmentData.date}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-lg focus:ring-2 transition text-black"
                />
              </div>
              <div>
                <label className="block font-semibold text-gray-800">Time</label>
                <input
                  type="time"
                  name="time"
                  value={appointmentData.time}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-lg focus:ring-2 transition text-black"
                />
              </div>
              <div className="flex justify-end mt-6 space-x-4">
                <button type="button" className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition" onClick={handleAppointmentSubmit}>
                  Book Appointment
                </button>
                <button type="button" className="bg-gray-300 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-400 transition" onClick={() => setCurrentSection("profile")}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {currentSection === "bookingHistory" && (
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">Booking History</h1>
            <ul className="space-y-4">
              {bookingHistory.map((booking) => (
                <li key={booking.id} className="p-4 border rounded-lg">
                  <h3 className="text-lg font-semibold">{booking.service}</h3>
                  <p>{booking.date}</p>
                  <p className="text-sm text-gray-500">{booking.status}</p>
                </li>
              ))}
            </ul>
          </div>
        )}

        {currentSection === "changePassword" && (
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">Change Password</h1>
            <form>
              <div>
                <label className="block font-semibold text-gray-800">Temporary Password</label>
                <input
                  type="password"
                  name="currentPassword"
                  value={passwordData.currentPassword}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-lg focus:ring-2 transition text-black"
                />
                {errors.currentPassword && <p className="text-red-500 text-sm">{errors.currentPassword}</p>}
              </div>
              <div>
                <label className="block font-semibold text-gray-800">New Password</label>
                <input
                  type="password"
                  name="newPassword"
                  value={passwordData.newPassword}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-lg focus:ring-2 transition text-black"
                />
                {errors.newPassword && <p className="text-red-500 text-sm">{errors.newPassword}</p>}
              </div>
              <div>
                <label className="block font-semibold text-gray-800">Confirm New Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={passwordData.confirmPassword}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-lg focus:ring-2 transition text-black"
                />
                {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
              </div>
              <div className="flex justify-end mt-6 space-x-4">
                <button type="button" className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition" onClick={handlePasswordSubmit}>
                  Change Password
                </button>
                <button type="button" className="bg-gray-300 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-400 transition" onClick={() => setCurrentSection("profile")}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}
      </main>
    </div>
  );
};

export default PremiumCustomerProfile;
