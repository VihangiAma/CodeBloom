import React, { useState, useEffect } from "react";
import axios from "axios";
import Appointment from "../../../../../Nimal_Motors_Backend/Models/Appointment";

const App = () => {
  const [appointments, setAppointments] = useState([]);
  const [appointment, setAppointment] = useState({
    customerName: "",
    address: "",
    phone: "",
    vehicleDetails: "",
    date: "",
    time: "",
  });
  const [editing, setEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  // Fetch appointments
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/appointments")
      .then((res) => {
        setAppointments(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  // Handle form input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setAppointment({
      ...appointment,
      [name]: value,
    });
  };

  // Create or update appointment
  const handleSubmit = (e) => {
    e.preventDefault();

    if (editing) {
      // Update appointment
      axios
        .put(`http://localhost:5000/api/appointments/${editId}`, appointment)
        .then((res) => {
          const updatedAppointments = appointments.map((app) =>
            app._id === editId ? res.data : app
          );
          setAppointments(updatedAppointments);
          setEditing(false);
          setAppointment({
            customerName: "",
            address: "",
            phone: "",
            vehicleDetails: "",
            date: "",
            time: "",
          });
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      // Create appointment
      axios
        .post("http://localhost:5000/api/appointments", appointment)
        .then((res) => {
          setAppointments([...appointments, res.data]);
          setAppointment({
            customerName: "",
            address: "",
            phone: "",
            vehicleDetails: "",
            date: "",
            time: "",
          });
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  // Handle edit appointment
  const handleEdit = (id) => {
    const appointmentToEdit = appointments.find((app) => app._id === id);
    setAppointment(appointmentToEdit);
    setEditing(true);
    setEditId(id);
  };

  // Handle delete appointment
  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:5000/api/appointments/${id}`)
      .then(() => {
        const updatedAppointments = appointments.filter(
          (app) => app._id !== id
        );
        setAppointments(updatedAppointments);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div>
      <h1>Appointments</h1>

      {/* Appointment Form */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="customerName"
          placeholder="Customer Name"
          value={appointment.customerName}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={appointment.address}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={appointment.phone}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="vehicleDetails"
          placeholder="Vehicle Details"
          value={appointment.vehicleDetails}
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="date"
          value={appointment.date}
          onChange={handleChange}
          required
        />
        <input
          type="time"
          name="time"
          value={appointment.time}
          onChange={handleChange}
          required
        />
        <button type="submit">{editing ? "Update" : "Create"} Appointment</button>
      </form>

      {/* Appointment List */}
      <h2>Appointment List</h2>
      <ul>
        {appointments.map((app) => (
          <li key={app._id}>
            <h3>{app.customerName}</h3>
            <p>Address: {app.address}</p>
            <p>Phone: {app.phone}</p>
            <p>Vehicle: {app.vehicleDetails}</p>
            <p>Date: {new Date(app.date).toLocaleDateString()}</p>
            <p>Time: {app.time}</p>
            <button onClick={() => handleEdit(app._id)}>Edit</button>
            <button onClick={() => handleDelete(app._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Appointment;
