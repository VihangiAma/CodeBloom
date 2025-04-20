import Appointment from "../Models/Appointment.js";

// Create appointment
export async function createAppointment(req, res) {
  try {
    const appointment = new Appointment(req.body);
    await appointment.save();
    res.status(201).json(appointment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

// Get all appointments
export async function getAppointments(req, res) {
  try {
    const appointments = await Appointment.find();
    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Update appointment status (Approve or Reject)
export async function updateAppointment(req, res) {
  try {
    const appointment = await Appointment.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(appointment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

// Delete appointment
export async function deleteAppointment(req, res) {
  try {
    await Appointment.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Appointment deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
