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

// Update appointment (for status update)
export async function updateAppointment(req, res) {
  try {
    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({ error: "Appointment not found." });
    }

    if (req.body.status) {
      appointment.status = req.body.status;
    }

    await appointment.save();
    res.json(appointment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

// Delete appointment
export async function deleteAppointment(req, res) {
  try {
    await Appointment.findByIdAndDelete(req.params.id);
    res.json({ message: 'Appointment deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
