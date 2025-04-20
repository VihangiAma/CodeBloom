// import { useState } from "react";
// import {
//   FaUserEdit,
//   FaCalendarAlt,
//   FaHistory,
//   FaKey,
//   FaUserCircle,
//   FaSignOutAlt,
//   FaFacebook,
//   FaTwitter,
//   FaInstagram,
// } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";

// export default function PremiumCustomerProfile() {
//   const navigate = useNavigate();
//   const [isEditing, setIsEditing] = useState(false);
//   const [isChangingPassword, setIsChangingPassword] = useState(false);
//   const [isBooking, setIsBooking] = useState(true); // default shows booking form

//   const [profile, setProfile] = useState({
//     fullName: "Nadeesha Perera",
//     mobile: "0771234567",
//     email: "nadeesha.perera@gmail.com",
//     username: "nadeesha.perera",
//     location: "Kaduwela, Sri Lanka",
//   });

//   const [passwords, setPasswords] = useState({
//     current: "",
//     newPassword: "",
//     confirmNew: "",
//   });

//   const [booking, setBooking] = useState({
//     vehicleType: "",
//     vehicleModel: "",
//     registrationNumber: "",
//     serviceType: "",
//     preferredDate: "",
//     preferredTime: "",
//     notes: "",
//   });

//   const handleProfileChange = (e) => {
//     const { name, value } = e.target;
//     setProfile((prev) => ({ ...prev, [name]: value }));
//   };

//   const handlePasswordChange = (e) => {
//     const { name, value } = e.target;
//     setPasswords((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleBookingChange = (e) => {
//     const { name, value } = e.target;
//     setBooking((prev) => ({ ...prev, [name]: value }));
//   };

//   const saveProfile = () => {
//     // TODO: API call
//     setIsEditing(false);
//   };

//   const changePassword = () => {
//     if (passwords.newPassword !== passwords.confirmNew) {
//       alert("Passwords do not match.");
//       return;
//     }
//     // TODO: Password update API
//     setPasswords({ current: "", newPassword: "", confirmNew: "" });
//     setIsChangingPassword(false);
//   };

//   const handleBookingSubmit = (e) => {
//     e.preventDefault();
//     console.log("Booking Submitted:", booking);
//     alert("Appointment Booked Successfully!");
//     // TODO: Submit to backend
//     setBooking({
//       vehicleType: "",
//       vehicleModel: "",
//       registrationNumber: "",
//       serviceType: "",
//       preferredDate: "",
//       preferredTime: "",
//       notes: "",
//     });
//   };

//   const handleSignOut = () => {
//     navigate("/login");
//   };

//   return (
//     <div className="flex h-screen bg-gray-900 text-white font-sans">
//       {/* Sidebar */}
//       <aside className="w-64 bg-gray-800 shadow-lg p-6 flex flex-col justify-between">
//         <div>
//           <h1 className="text-2xl font-extrabold text-gray-300 mb-6">🚗 NIMAL MOTORS</h1>
//           <nav className="space-y-2">
//             {[
//               { name: "Edit Profile", icon: FaUserEdit },
//               { name: "Book Appointment", icon: FaCalendarAlt },
//               { name: "Booking History", icon: FaHistory },
//               { name: "Change Password", icon: FaKey },
//             ].map(({ name, icon: Icon }, idx) => (
//               <button
//                 key={idx}
//                 onClick={() => {
//                   setIsEditing(name === "Edit Profile");
//                   setIsChangingPassword(name === "Change Password");
//                   setIsBooking(name === "Book Appointment");
//                 }}
//                 className="flex items-center gap-3 px-3 py-2 w-full text-left rounded-md text-gray-300 hover:bg-gray-700 hover:text-white transition duration-150"
//               >
//                 <Icon className="text-lg" />
//                 <span>{name}</span>
//               </button>
//             ))}
//           </nav>
//         </div>

//         <div className="pt-6 border-t border-gray-600">
//           <nav className="space-y-2">
//             <a
//               href="#"
//               className="flex items-center gap-3 px-3 py-2 rounded-md text-blue-400 hover:bg-gray-700 transition duration-150 font-semibold"
//             >
//               <FaUserCircle className="text-lg" />
//               Profile
//             </a>
//             <button
//               onClick={handleSignOut}
//               className="flex items-center gap-3 px-3 py-2 rounded-md text-red-400 hover:bg-gray-700 transition duration-150 w-full text-left"
//             >
//               <FaSignOutAlt className="text-lg" />
//               Sign Out
//             </button>
//           </nav>
//         </div>
//       </aside>

//       {/* Main Content */}
//       <main className="flex-1 p-6 overflow-auto">
//         {/* Header */}
//         <div
//           className="rounded-xl h-48 bg-cover bg-center relative"
//           style={{ backgroundImage: `url("/bgimage.jpg")` }}
//         >
//           <div className="absolute bottom-[-30px] left-8 flex items-center space-x-4">
//             <img
//               src="/accprofile.jpg"
//               alt="profile"
//               className="w-20 h-20 rounded-full border-4 border-white shadow-lg"
//             />
//             <div className="text-white drop-shadow-lg">
//               <h2 className="text-2xl font-bold">{profile.fullName}</h2>
//               <p className="text-sm">Premium Customer - Nimal Motors</p>
//             </div>
//           </div>
//         </div>

//         {/* Content */}
//         <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-6">
//           {/* Profile Section */}
//           <div className="bg-gray-700 rounded-xl shadow-md p-6 text-gray-200">
//             <h3 className="text-lg font-semibold mb-4">Profile Information</h3>
//             {isEditing ? (
//               <div className="space-y-3 text-sm">
//                 {["fullName", "mobile", "email", "username", "location"].map((field) => (
//                   <div key={field} className="flex flex-col">
//                     <label className="font-medium capitalize">{field}:</label>
//                     <input
//                       name={field}
//                       value={profile[field]}
//                       onChange={handleProfileChange}
//                       className="bg-gray-800 border border-gray-500 p-2 rounded text-white"
//                     />
//                   </div>
//                 ))}
//                 <div className="space-x-2 mt-2">
//                   <button onClick={saveProfile} className="text-green-400 text-sm hover:underline">
//                     Save
//                   </button>
//                   <button onClick={() => setIsEditing(false)} className="text-red-400 text-sm hover:underline">
//                     Cancel
//                   </button>
//                 </div>
//               </div>
//             ) : (
//               <div className="text-sm space-y-2">
//                 <p><strong>Full Name:</strong> {profile.fullName}</p>
//                 <p><strong>Mobile:</strong> {profile.mobile}</p>
//                 <p><strong>Email:</strong> {profile.email}</p>
//                 <p><strong>Username:</strong> {profile.username}</p>
//                 <p><strong>Location:</strong> {profile.location}</p>
//                 <div className="flex items-center space-x-3 mt-2">
//                   <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
//                     <FaFacebook className="text-blue-600" />
//                   </a>
//                   <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
//                     <FaTwitter className="text-sky-500" />
//                   </a>
//                   <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
//                     <FaInstagram className="text-pink-500" />
//                   </a>
//                 </div>
//               </div>
//             )}
//           </div>

//           {/* Booking or Password Section */}
//           <div className="bg-gray-700 rounded-xl shadow-md p-6 text-gray-200">
//             {isChangingPassword ? (
//               <>
//                 <h3 className="text-lg font-semibold mb-4">Change Password</h3>
//                 <div className="space-y-3 text-sm">
//                   <input
//                     name="current"
//                     value={passwords.current}
//                     onChange={handlePasswordChange}
//                     type="password"
//                     placeholder="Current Password"
//                     className="w-full bg-gray-800 border border-gray-500 p-2 rounded text-white"
//                   />
//                   <input
//                     name="newPassword"
//                     value={passwords.newPassword}
//                     onChange={handlePasswordChange}
//                     type="password"
//                     placeholder="New Password"
//                     className="w-full bg-gray-800 border border-gray-500 p-2 rounded text-white"
//                   />
//                   <input
//                     name="confirmNew"
//                     value={passwords.confirmNew}
//                     onChange={handlePasswordChange}
//                     type="password"
//                     placeholder="Confirm New Password"
//                     className="w-full bg-gray-800 border border-gray-500 p-2 rounded text-white"
//                   />
//                   <div className="space-x-2">
//                     <button onClick={changePassword} className="text-green-400 hover:underline text-sm">
//                       Save
//                     </button>
//                     <button onClick={() => setIsChangingPassword(false)} className="text-red-400 hover:underline text-sm">
//                       Cancel
//                     </button>
//                   </div>
//                 </div>
//               </>
//             ) : (
//               <>
//                 <h3 className="text-lg font-semibold mb-4">Book Vehicle Service</h3>
//                 <form onSubmit={handleBookingSubmit} className="text-sm space-y-3">
//                   <input
//                     name="vehicleType"
//                     value={booking.vehicleType}
//                     onChange={handleBookingChange}
//                     type="text"
//                     placeholder="Vehicle Type (e.g., Car, Van)"
//                     className="w-full bg-gray-800 border border-gray-500 p-2 rounded text-white"
//                     required
//                   />
//                   <input
//                     name="vehicleModel"
//                     value={booking.vehicleModel}
//                     onChange={handleBookingChange}
//                     type="text"
//                     placeholder="Vehicle Model"
//                     className="w-full bg-gray-800 border border-gray-500 p-2 rounded text-white"
//                     required
//                   />
//                   <input
//                     name="registrationNumber"
//                     value={booking.registrationNumber}
//                     onChange={handleBookingChange}
//                     type="text"
//                     placeholder="Registration Number"
//                     className="w-full bg-gray-800 border border-gray-500 p-2 rounded text-white"
//                     required
//                   />
//                   <select
//                     name="serviceType"
//                     value={booking.serviceType}
//                     onChange={handleBookingChange}
//                     className="w-full bg-gray-800 border border-gray-500 p-2 rounded text-white"
//                     required
//                   >
//                     <option value="">Select Service Type</option>
//                     <option value="General Service">General Service</option>
//                     <option value="Oil Change">Oil Change</option>
//                     <option value="Engine Tune-up">Engine Tune-up</option>
//                     <option value="Full Inspection">Full Inspection</option>
//                   </select>
//                   <input
//                     name="preferredDate"
//                     value={booking.preferredDate}
//                     onChange={handleBookingChange}
//                     type="date"
//                     className="w-full bg-gray-800 border border-gray-500 p-2 rounded text-white"
//                     required
//                   />
//                   <input
//                     name="preferredTime"
//                     value={booking.preferredTime}
//                     onChange={handleBookingChange}
//                     type="time"
//                     className="w-full bg-gray-800 border border-gray-500 p-2 rounded text-white"
//                     required
//                   />
//                   <textarea
//                     name="notes"
//                     value={booking.notes}
//                     onChange={handleBookingChange}
//                     placeholder="Additional Notes (Optional)"
//                     className="w-full bg-gray-800 border border-gray-500 p-2 rounded text-white"
//                   ></textarea>
//                   <button
//                     type="submit"
//                     className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700 transition"
//                   >
//                     Submit Booking
//                   </button>
//                 </form>
//               </>
//             )}
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }


import { useState } from "react";
import {
  FaUserEdit,
  FaCalendarAlt,
  FaHistory,
  FaKey,
  FaUserCircle,
  FaSignOutAlt,
  FaFacebook,
  FaTwitter,
  FaInstagram,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function PremiumCustomerProfile() {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [isBooking, setIsBooking] = useState(true);
  const [showHistory, setShowHistory] = useState(false);

  const [profile, setProfile] = useState({
    fullName: "Nadeesha Perera",
    mobile: "0771234567",
    email: "nadeesha.perera@gmail.com",
    username: "nadeesha.perera",
    location: "Kaduwela, Sri Lanka",
  });

  const [passwords, setPasswords] = useState({
    current: "",
    newPassword: "",
    confirmNew: "",
  });

  const [booking, setBooking] = useState({
    vehicleType: "",
    vehicleModel: "",
    registrationNumber: "",
    serviceType: "",
    preferredDate: "",
    preferredTime: "",
    notes: "",
  });

  const [bookingHistory, setBookingHistory] = useState([]);

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswords((prev) => ({ ...prev, [name]: value }));
  };

  const handleBookingChange = (e) => {
    const { name, value } = e.target;
    setBooking((prev) => ({ ...prev, [name]: value }));
  };

  const saveProfile = () => {
    setIsEditing(false);
  };

  const changePassword = () => {
    if (passwords.newPassword !== passwords.confirmNew) {
      alert("Passwords do not match.");
      return;
    }
    setPasswords({ current: "", newPassword: "", confirmNew: "" });
    setIsChangingPassword(false);
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    alert("Appointment Booked Successfully!");
    setBookingHistory((prev) => [...prev, booking]);
    setBooking({
      vehicleType: "",
      vehicleModel: "",
      registrationNumber: "",
      serviceType: "",
      preferredDate: "",
      preferredTime: "",
      notes: "",
    });
  };

  const handleSignOut = () => {
    navigate("/login");
  };

  const handleNavClick = (section) => {
    setIsEditing(section === "Edit Profile");
    setIsChangingPassword(section === "Change Password");
    setIsBooking(section === "Book Appointment");
    setShowHistory(section === "Booking History");
  };

  return (
    <div className="flex h-screen bg-gray-900 text-white font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 shadow-lg p-6 flex flex-col justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-300 mb-6">
            🚗 NIMAL MOTORS
          </h1>
          <nav className="space-y-2">
            {[
              "Edit Profile",
              "Book Appointment",
              "Booking History",
              "Change Password",
            ].map((name, idx) => {
              const icons = {
                "Edit Profile": FaUserEdit,
                "Book Appointment": FaCalendarAlt,
                "Booking History": FaHistory,
                "Change Password": FaKey,
              };
              const Icon = icons[name];
              return (
                <button
                  key={idx}
                  onClick={() => handleNavClick(name)}
                  className="flex items-center gap-3 px-3 py-2 w-full text-left rounded-md text-gray-300 hover:bg-gray-700 hover:text-white transition duration-150"
                >
                  <Icon className="text-lg" />
                  <span>{name}</span>
                </button>
              );
            })}
          </nav>
        </div>
        <div className="pt-6 border-t border-gray-600">
          <nav className="space-y-2">
            <a
              href="#"
              className="flex items-center gap-3 px-3 py-2 rounded-md text-blue-400 hover:bg-gray-700 transition duration-150 font-semibold"
            >
              <FaUserCircle className="text-lg" />
              Profile
            </a>
            <button
              onClick={handleSignOut}
              className="flex items-center gap-3 px-3 py-2 rounded-md text-red-400 hover:bg-gray-700 transition duration-150 w-full text-left"
            >
              <FaSignOutAlt className="text-lg" />
              Sign Out
            </button>
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-auto">
        {/* Header */}
        <div
          className="rounded-xl h-48 bg-cover bg-center relative"
          style={{ backgroundImage: `url("/bgimage.jpg")` }}
        >
          <div className="absolute bottom-[-30px] left-8 flex items-center space-x-4">
            <img
              src="/accprofile.jpg"
              alt="profile"
              className="w-20 h-20 rounded-full border-4 border-white shadow-lg"
            />
            <div className="text-white drop-shadow-lg">
              <h2 className="text-2xl font-bold">{profile.fullName}</h2>
              <p className="text-sm">Premium Customer - Nimal Motors</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Profile Section */}
          <div className="bg-gray-700 rounded-xl shadow-md p-6 text-gray-200">
            <h3 className="text-lg font-semibold mb-4">Profile Information</h3>
            {isEditing ? (
              <div className="space-y-3 text-sm">
                {["fullName", "mobile", "email", "username", "location"].map((field) => (
                  <div key={field} className="flex flex-col">
                    <label className="font-medium capitalize">{field}:</label>
                    <input
                      name={field}
                      value={profile[field]}
                      onChange={handleProfileChange}
                      className="bg-gray-800 border border-gray-500 p-2 rounded text-white"
                    />
                  </div>
                ))}
                <div className="space-x-2 mt-2">
                  <button onClick={saveProfile} className="text-green-400 text-sm hover:underline">
                    Save
                  </button>
                  <button onClick={() => setIsEditing(false)} className="text-red-400 text-sm hover:underline">
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-sm space-y-2">
                <p><strong>Full Name:</strong> {profile.fullName}</p>
                <p><strong>Mobile:</strong> {profile.mobile}</p>
                <p><strong>Email:</strong> {profile.email}</p>
                <p><strong>Username:</strong> {profile.username}</p>
                <p><strong>Location:</strong> {profile.location}</p>
                <div className="flex items-center space-x-3 mt-2">
                  <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                    <FaFacebook className="text-blue-600" />
                  </a>
                  <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                    <FaTwitter className="text-sky-500" />
                  </a>
                  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                    <FaInstagram className="text-pink-500" />
                  </a>
                </div>
              </div>
            )}
          </div>

          {/* Right Section */}
          <div className="bg-gray-700 rounded-xl shadow-md p-6 text-gray-200">
            {isChangingPassword ? (
              <>
                <h3 className="text-lg font-semibold mb-4">Change Password</h3>
                <div className="space-y-3 text-sm">
                  <input
                    name="current"
                    value={passwords.current}
                    onChange={handlePasswordChange}
                    type="password"
                    placeholder="Current Password"
                    className="w-full bg-gray-800 border border-gray-500 p-2 rounded text-white"
                  />
                  <input
                    name="newPassword"
                    value={passwords.newPassword}
                    onChange={handlePasswordChange}
                    type="password"
                    placeholder="New Password"
                    className="w-full bg-gray-800 border border-gray-500 p-2 rounded text-white"
                  />
                  <input
                    name="confirmNew"
                    value={passwords.confirmNew}
                    onChange={handlePasswordChange}
                    type="password"
                    placeholder="Confirm New Password"
                    className="w-full bg-gray-800 border border-gray-500 p-2 rounded text-white"
                  />
                  <div className="space-x-2">
                    <button onClick={changePassword} className="text-green-400 hover:underline text-sm">
                      Save
                    </button>
                    <button onClick={() => setIsChangingPassword(false)} className="text-red-400 hover:underline text-sm">
                      Cancel
                    </button>
                  </div>
                </div>
              </>
            ) : showHistory ? (
              <>
                <h3 className="text-lg font-semibold mb-4">Booking History</h3>
                {bookingHistory.length === 0 ? (
                  <p className="text-sm text-gray-300">No booking history available.</p>
                ) : (
                  <ul className="space-y-3 text-sm">
                    {bookingHistory.map((b, idx) => (
                      <li key={idx} className="border-b border-gray-600 pb-2">
                        <p><strong>Date:</strong> {b.preferredDate} at {b.preferredTime}</p>
                        <p><strong>Vehicle:</strong> {b.vehicleType} - {b.vehicleModel}</p>
                        <p><strong>Reg No:</strong> {b.registrationNumber}</p>
                        <p><strong>Service:</strong> {b.serviceType}</p>
                        {b.notes && <p><strong>Notes:</strong> {b.notes}</p>}
                      </li>
                    ))}
                  </ul>
                )}
              </>
            ) : (
              <>
                <h3 className="text-lg font-semibold mb-4">Book Vehicle Service</h3>
                <form onSubmit={handleBookingSubmit} className="text-sm space-y-3">
                  <input name="vehicleType" value={booking.vehicleType} onChange={handleBookingChange} type="text" placeholder="Vehicle Type (e.g., Car, Van)" className="w-full bg-gray-800 border border-gray-500 p-2 rounded text-white" required />
                  <input name="vehicleModel" value={booking.vehicleModel} onChange={handleBookingChange} type="text" placeholder="Vehicle Model" className="w-full bg-gray-800 border border-gray-500 p-2 rounded text-white" required />
                  <input name="registrationNumber" value={booking.registrationNumber} onChange={handleBookingChange} type="text" placeholder="Registration Number" className="w-full bg-gray-800 border border-gray-500 p-2 rounded text-white" required />
                  <select name="serviceType" value={booking.serviceType} onChange={handleBookingChange} className="w-full bg-gray-800 border border-gray-500 p-2 rounded text-white" required>
                    <option value="">Select Service Type</option>
                    <option value="General Service">General Service</option>
                    <option value="Oil Change">Oil Change</option>
                    <option value="Engine Tune-up">Engine Tune-up</option>
                    <option value="Full Inspection">Full Inspection</option>
                  </select>
                  <input name="preferredDate" value={booking.preferredDate} onChange={handleBookingChange} type="date" className="w-full bg-gray-800 border border-gray-500 p-2 rounded text-white" required />
                  <input name="preferredTime" value={booking.preferredTime} onChange={handleBookingChange} type="time" className="w-full bg-gray-800 border border-gray-500 p-2 rounded text-white" required />
                  <textarea name="notes" value={booking.notes} onChange={handleBookingChange} placeholder="Additional Notes (Optional)" className="w-full bg-gray-800 border border-gray-500 p-2 rounded text-white"></textarea>
                  <button type="submit" className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700 transition">Submit Booking</button>
                </form>
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
