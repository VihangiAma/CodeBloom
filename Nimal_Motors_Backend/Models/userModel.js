import { useEffect, useState } from "react";

export default function AccountantProfile() {
  const [accountant, setAccountant] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({
    fullName: "",
    phoneNumber: "",
    email: "",
    vehicleDetails: "",
  });

  // Fetch accountant data from API
  useEffect(() => {
    fetch("http://localhost:5000/api/users/accountant/B001") // Replace B001 with logged-in userId dynamically
      .then((res) => res.json())
      .then((data) => {
        setAccountant(data);
        setForm({
          fullName: data.fullName,
          phoneNumber: data.phoneNumber,
          email: data.email,
          vehicleDetails: data.vehicleDetails,
        });
      });
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    fetch(`http://localhost:5000/api/users/accountant/B001`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    })
      .then((res) => res.json())
      .then((updated) => {
        setAccountant(updated);
        setIsEditing(false);
      });
  };

  if (!accountant) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-xl overflow-hidden p-6">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          <img
            src="/profile.jpg"
            alt="profile"
            className="w-32 h-32 rounded-full object-cover"
          />
          <div className="flex-1">
            <h2 className="text-2xl font-semibold">
              {form.fullName || accountant.fullName}
            </h2>
            <p className="text-sm text-gray-600">Accountant</p>
            <p className="mt-2 text-gray-700">
              Vehicle: {form.vehicleDetails || accountant.vehicleDetails}
            </p>
            {isEditing ? (
              <button
                onClick={handleSave}
                className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Save
              </button>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Edit Profile
              </button>
            )}
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold mb-1">Full Name</label>
            {isEditing ? (
              <input
                type="text"
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
            ) : (
              <p>{accountant.fullName}</p>
            )}
          </div>

          <div>
            <label className="block font-semibold mb-1">Email</label>
            {isEditing ? (
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
            ) : (
              <p>{accountant.email}</p>
            )}
          </div>

          <div>
            <label className="block font-semibold mb-1">Phone Number</label>
            {isEditing ? (
              <input
                type="text"
                name="phoneNumber"
                value={form.phoneNumber}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
            ) : (
              <p>{accountant.phoneNumber}</p>
            )}
          </div>

          <div>
            <label className="block font-semibold mb-1">Vehicle Details</label>
            {isEditing ? (
              <input
                type="text"
                name="vehicleDetails"
                value={form.vehicleDetails}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
            ) : (
              <p>{accountant.vehicleDetails}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}