import Appointment from "../Models/Appointment.js";

// Create appointment
export async function createAppointment (req, res) {
  try {
    const appointment = new Appointment(req.body);
    appointment.save();
    res.status(201).json(appointment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

// Get all appointments
export async function getAppointments (req, res) {
  try {
    const appointments = await Appointment.find();
    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Update appointment
export async function updateAppointment (req, res) {
  try {
    const appointment = Appointment.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(appointment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

// Delete appointment
export async function deleteAppointment (req, res){
  try {
    Appointment.findByIdAndDelete(req.params.id);
    res.json({ message: 'Appointment deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}