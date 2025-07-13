import React, { useEffect, useState } from "react";
import axios from "axios";

function CombinedBookingsTable() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get("http://localhost:5001/api/combinedbookings/premium/all", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setBookings(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ fontSize: "20px", marginBottom: "15px" }}>
      </h2>

      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>Service ID</th>
            <th style={thStyle}>Customer ID</th>
            <th style={thStyle}>Customer Name</th>
            <th style={thStyle}>Vehicle Type</th>
            <th style={thStyle}>Vehicle Number</th>
            <th style={thStyle}>Service Date</th>
            <th style={thStyle}>Status</th>
          </tr>
        </thead>
        <tbody>
          {bookings.length === 0 ? (
            <tr>
              <td colSpan="7" style={noDataStyle}>
                No bookings found
              </td>
            </tr>
          ) : (
            bookings.map((booking, index) => (
              <tr
                key={booking.serviceID || index}
                style={index % 2 === 0 ? {} : trHoverStyle}
              >
                <td style={thTdStyle}>{booking.serviceID}</td>
                <td style={thTdStyle}>{booking.customerId}</td>
                <td style={thTdStyle}>{booking.customerName}</td>
                <td style={thTdStyle}>{booking.vehicleType}</td>
                <td style={thTdStyle}>{booking.vehicleNumber}</td>
                <td style={thTdStyle}>
                  {new Date(booking.serviceDate).toLocaleDateString()}
                </td>
                <td style={thTdStyle}>{booking.status}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default CombinedBookingsTable;

// Inline styles
const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
  fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  marginTop: 20,
};

const thTdStyle = {
  border: "1px solid #ddd",
  padding: "8px",
  textAlign: "left",
};

const thStyle = {
  ...thTdStyle,
  backgroundColor: "#4CAF50",
  color: "white",
};

const trHoverStyle = {
  backgroundColor: "#f9f9f9",
};

const noDataStyle = {
  textAlign: "center",
  padding: "20px",
};
