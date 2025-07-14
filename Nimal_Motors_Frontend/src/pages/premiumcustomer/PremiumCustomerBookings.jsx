import React, { useEffect, useState } from "react";
import axios from "axios";

export default function PremiumCustomerBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    axios
      .get("http://localhost:5001/api/history/mypremiumbookings", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setBookings(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading bookings:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading your bookings...</p>;
  if (bookings.length === 0) return <p>No bookings found.</p>;

  return (
    <div className="bg-white p-4 rounded-lg shadow mt-6">
      <h2 className="text-xl font-semibold mb-4">My Service Bookings</h2>
      <table className="w-full border text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2">Type</th>
            <th className="border p-2">Vehicle</th>
            <th className="border p-2">Date</th>
            <th className="border p-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((b, i) => (
            <tr key={i} className="hover:bg-gray-50">
              <td className="border p-2">{b.type}</td>
              <td className="border p-2">
                {b.vehicleType || "N/A"} - {b.vehicleNumber || "N/A"}
              </td>
              <td className="border p-2">
                {(b.serviceDate || b.date || "").split("T")[0]}
              </td>
              <td className="border p-2 font-medium text-blue-600">
                {b.status || "Booked"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
