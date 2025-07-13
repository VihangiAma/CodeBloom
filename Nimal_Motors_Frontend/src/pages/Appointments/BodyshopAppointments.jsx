import React, { useEffect, useState } from "react";
import axios from "axios";

function BodyshopAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [statusFilter, setStatusFilter] = useState("All");
  const [monthFilter, setMonthFilter] = useState("All");
  const [userType, setUserType] = useState(null);

  const token = localStorage.getItem("token");

  // Fetch logged-in user info
  useEffect(() => {
    if (!token) {
      setError("No token found");
      setLoading(false);
      return;
    }

    axios
      .get("http://localhost:5001/api/auth/userprofile", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setUserType(res.data.type);
      })
      .catch(() => {
        setUserType(null);
      });
  }, [token]);

  // Fetch bodyshop appointments based on user type
  useEffect(() => {
    if (!token) return;

    setLoading(true);
    const endpoint =
      userType === "bodyshopsupervisor"
        ? "http://localhost:5001/api/bodyshop/appointments/all"
        : "http://localhost:5001/api/bodyshop/appointments/premium";

    axios
      .get(endpoint, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setAppointments(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [token, userType]);

  // Update status (only bodyshop supervisor)
  const updateStatus = (serviceID, newStatus) => {
    if (userType !== "bodyshopsupervisor") {
      alert("Only Bodyshop Supervisors can update status.");
      return;
    }

    axios
      .put(
        `http://localhost:5001/api/bodyshop/appointments/${serviceID}/status`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then(() => {
        setAppointments((prev) =>
          prev.map((app) =>
            app.serviceID === serviceID ? { ...app, status: newStatus } : app
          )
        );
      })
      .catch((err) => {
        alert("Error updating status: " + err.message);
      });
  };

  // Delete appointment (only bodyshop supervisor)
  const deleteAppointment = (serviceID) => {
    if (userType !== "bodyshopsupervisor") {
      alert("Only Bodyshop Supervisors can delete appointments.");
      return;
    }

    if (!window.confirm("Are you sure you want to delete this appointment?"))
      return;

    axios
      .delete(`http://localhost:5001/api/bodyshop/appointments/${serviceID}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
 
        setAppointments((prev) =>
          prev.filter((app) => app.serviceID !== serviceID)
        );
      })
      .catch((err) => {
        alert("Error deleting appointment: " + err.message);
      });
  };

  // Filter appointments by status and month
  const filteredAppointments = appointments.filter((app) => {
    if (statusFilter !== "All" && app.status !== statusFilter) return false;

    if (monthFilter !== "All") {
      const month = new Date(app.serviceDate).getMonth() + 1;
      if (parseInt(monthFilter) !== month) return false;
    }
    return true;
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const monthOptions = [
    { label: "All Months", value: "All" },
    { label: "January", value: "1" },
    { label: "February", value: "2" },
    { label: "March", value: "3" },
    { label: "April", value: "4" },
    { label: "May", value: "5" },
    { label: "June", value: "6" },
    { label: "July", value: "7" },
    { label: "August", value: "8" },
    { label: "September", value: "9" },
    { label: "October", value: "10" },
    { label: "November", value: "11" },
    { label: "December", value: "12" },
  ];

  const statusOptions = ["All", "Pending", "In Progress", "Completed"];

  return (
    <div style={{ padding: 20, fontFamily: "Arial, sans-serif" }}>
      <h2>
        {userType === "bodyshopsupervisor"
          ? "All Bodyshop Appointments"
          : "Your Bodyshop Appointment Schedule"}
      </h2>

      <div style={{ marginBottom: 15, display: "flex", gap: "1rem" }}>
        <label>
          Status:{" "}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            {statusOptions.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </label>

        <label>
          Month:{" "}
          <select
            value={monthFilter}
            onChange={(e) => setMonthFilter(e.target.value)}
          >
            {monthOptions.map(({ label, value }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          border: "1px solid #ddd",
        }}
      >
        <thead style={{ backgroundColor: "#4CAF50", color: "white" }}>
          <tr>
            <th style={thTdStyle}>Service ID</th>
            <th style={thTdStyle}>Customer Name</th>
            <th style={thTdStyle}>Vehicle Number</th>
            <th style={thTdStyle}>Service Date</th>
            <th style={thTdStyle}>Phone</th>
            <th style={thTdStyle}>Status</th>
            {userType === "bodyshopsupervisor" && (
              <th style={thTdStyle}>Actions</th>
            )}
          </tr>
        </thead>
        <tbody>
          {filteredAppointments.length === 0 ? (
            <tr>
              <td
                colSpan={userType === "bodyshopsupervisor" ? 7 : 6}
                style={{ textAlign: "center", padding: 20 }}
              >
                No appointments found
              </td>
            </tr>
          ) : (
            filteredAppointments.map((app, i) => (
              <tr
                key={app.serviceID}
                style={{
                  backgroundColor: i % 2 === 0 ? "#f9f9f9" : "white",
                }}
              >
                <td style={thTdStyle}>{app.serviceID}</td>
                <td style={thTdStyle}>{app.customerName}</td>
                <td style={thTdStyle}>{app.vehicleNumber}</td>
                <td style={thTdStyle}>
                  {new Date(app.serviceDate).toLocaleDateString()}
                </td>
                <td style={thTdStyle}>{app.phone || "-"}</td>
                <td style={thTdStyle}>{app.status}</td>
                {userType === "bodyshopsupervisor" && (
                  <td style={thTdStyle}>
                    {statusOptions
                      .filter((s) => s !== "All" && s !== app.status)
                      .map((status) => (
                        <button
                          key={status}
                          onClick={() => updateStatus(app.serviceID, status)}
                          style={{
                            marginRight: 6,
                            padding: "5px 8px",
                            backgroundColor:
                              status === "Completed"
                                ? "#4CAF50"
                                : status === "In Progress"
                                ? "#2196F3"
                                : "#f0ad4e",
                            border: "none",
                            borderRadius: 4,
                            color: "white",
                            cursor: "pointer",
                            fontSize: 12,
                          }}
                        >
                          Mark {status}
                        </button>
                      ))}
                    <button
                      onClick={() => deleteAppointment(app.serviceID)}
                      style={{
                        padding: "5px 8px",
                        backgroundColor: "#d9534f",
                        border: "none",
                        borderRadius: 4,
                        color: "white",
                        cursor: "pointer",
                        fontSize: 12,
                      }}
                    >
                      Delete
                    </button>
                  </td>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default BodyshopAppointments;

const thTdStyle = {
  border: "1px solid #ddd",
  padding: 8,
  textAlign: "left",
};