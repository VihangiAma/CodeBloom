import React, { useEffect, useState } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import "jspdf-autotable";

export default function CombinedBookingsTable() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get("http://localhost:5001/api/combinedbookings/premium", {
        headers: { Authorization: `Bearer ${token}` },
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

  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text("Premium Customer Service History", 14, 14);
    doc.autoTable({
      startY: 20,
      head: [["Service ID", "Customer Name", "Vehicle Type", "Vehicle No", "Date", "Status"]],
      body: bookings.map((b) => [
        b.serviceID,
        b.customerName,
        b.vehicleType,
        b.vehicleNumber,
        new Date(b.serviceDate).toLocaleDateString(),
        b.status,
      ]),
    });
    doc.save("Service_History.pdf");
  };

  if (loading) return <p style={styles.message}>Loading...</p>;
  if (error) return <p style={styles.message}>Error: {error}</p>;

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.title}>Service History</h2>
        <button style={styles.downloadButton} onClick={exportPDF}>
          📄 Download PDF
        </button>
      </div>

      <div style={styles.tableWrapper}>
        <table style={styles.table}>
          <thead>
            <tr style={styles.headerRow}>
              <th style={styles.th}>Service ID</th>
              <th style={styles.th}>Customer Name</th>
              <th style={styles.th}>Vehicle Type</th>
              <th style={styles.th}>Vehicle Number</th>
              <th style={styles.th}>Service Date</th>
              <th style={styles.th}>Status</th>
            </tr>
          </thead>
          <tbody>
            {bookings.length === 0 ? (
              <tr>
                <td colSpan="6" style={styles.noData}>No bookings found</td>
              </tr>
            ) : (
              bookings.map((b, index) => (
                <tr key={index} style={styles.row}>
                  <td style={styles.td}>{b.serviceID}</td>
                  <td style={styles.td}>{b.customerName}</td>
                  <td style={styles.td}>{b.vehicleType}</td>
                  <td style={styles.td}>{b.vehicleNumber}</td>
                  <td style={styles.td}>{new Date(b.serviceDate).toLocaleDateString()}</td>
                  <td style={{ ...styles.td, color: b.status === "Completed" ? "green" : "orange" }}>
                    {b.status}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: "24px",
    backgroundColor: "#FFFFFF",
    borderRadius: "12px",
    fontFamily: "Roboto, sans-serif",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "16px",
  },
  title: {
    fontSize: "24px",
    fontWeight: "700",
    color: "#B00020",
  },
  downloadButton: {
    backgroundColor: "#336699",
    color: "#FAFAFA",
    padding: "10px 18px",
    borderRadius: "6px",
    border: "none",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "600",
  },
  tableWrapper: {
    overflowX: "auto",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    fontSize: "14px",
    backgroundColor: "#FAFAFA",
  },
  headerRow: {
    backgroundColor: "#212121",
    color: "#FFFFFF",
  },
  th: {
    padding: "12px",
    textAlign: "left",
  },
  td: {
    padding: "12px",
    borderBottom: "1px solid #DDD",
  },
  row: {
    backgroundColor: "#FFFFFF",
    transition: "background-color 0.2s ease",
  },
  noData: {
    padding: "16px",
    textAlign: "center",
    color: "#999",
  },
  message: {
    fontSize: "16px",
    textAlign: "center",
    padding: "20px",
  },
};
