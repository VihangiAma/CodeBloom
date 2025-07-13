import React, { useEffect, useState } from "react";
import axios from "axios";

function MechanicalAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get("http://localhost:5001/api/mechanical/appointments/all", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setAppointments(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const updateStatus = (id, status) => {
    axios
      .put(
        `http://localhost:5001/api/mechanical/appointments/${id}/status`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then(() => {
        setAppointments((prev) =>
          prev.map((a) => (a.serviceID === id ? { ...a, status } : a))
        );
      });
  };

  const deleteAppointment = (id) => {
    axios
      .delete(`http://localhost:5001/api/mechanical/appointments/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        setAppointments((prev) => prev.filter((a) => a.serviceID !== id));
      });
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div style={{ padding: 20 }}>
      <h2>Mechanical Appointments</h2>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>Service ID</th>
            <th>Customer</th>
            <th>Vehicle</th>
            <th>Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((app) => (
            <tr key={app.serviceID}>
              <td>{app.serviceID}</td>
              <td>{app.customerName}</td>
              <td>{app.vehicleNumber}</td>
              <td>{new Date(app.serviceDate).toLocaleDateString()}</td>
              <td>{app.status}</td>
              <td>
                {["Pending", "In Progress", "Completed"].map(
                  (s) =>
                    s !== app.status && (
                      <button
                        key={s}
                        onClick={() => updateStatus(app.serviceID, s)}
                        style={{ marginRight: 5 }}
                      >
                        Mark {s}
                      </button>
                    )
                )}
                <button onClick={() => deleteAppointment(app.serviceID)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default MechanicalAppointments;
