import MechanicalAppointment from "../Models/MechanicalAppointment.js";

export const getAllMechanicalAppointments = async (req, res) => {
  try {
    const data = await MechanicalAppointment.find().sort({ serviceDate: 1 });
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const updateMechanicalStatus = async (req, res) => {
  try {
    const { serviceID } = req.params;
    const { status } = req.body;
    const appointment = await MechanicalAppointment.findOne({ serviceID });
    if (!appointment) return res.status(404).json({ message: "Not found" });
    appointment.status = status;
    await appointment.save();
    res.json({ message: "Status updated", appointment });
  } catch (err) {
    res.status(500).json({ message: "Error updating status" });
  }
};

export const deleteMechanicalAppointment = async (req, res) => {
  try {
    const { serviceID } = req.params;
    const deleted = await MechanicalAppointment.findOneAndDelete({ serviceID });
    if (!deleted) return res.status(404).json({ message: "Not found" });
    res.json({ message: "Appointment deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting" });
  }
};

