import Appointment from "../Models/BodyshopAppointment.js";
import Users from "../Models/userModel.js";

// Get user profile info (based on req.user set by middleware)
export const getUserProfile = async (req, res) => {
  try {
    const user = await Users.findOne({ userId: req.user.userId }).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
// Create bodyshop appointment (used by premium customers)
export const createBodyshopBooking = async (req, res) => {
  try {
    req.body.section = "bodyshop"; // ✅ enforce
    const booking = new Appointment(req.body);
    await booking.save();
    res.status(201).json(booking);
  } catch (err) {
    console.error("Error in createBodyshopBooking:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all bodyshop appointments for supervisors
export const getAllBodyshopAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({ section: "bodyshop" }).sort({ serviceDate: 1 });
    console.log("Fetched all bodyshop appointments:", appointments); // Debug
    res.json(appointments);
  } catch (err) {
    console.error("Error in getAllBodyshopAppointments:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get premium customer's bodyshop appointments
export const getPremiumBodyshopAppointments = async (req, res) => {
  try {
    console.log("User ID from token:", req.user.userId); // Debug
    const appointments = await Appointment.find({
      customerId: req.user.userId,
      section: "bodyshop",
    }).sort({ serviceDate: 1 });
    console.log("Fetched premium appointments:", appointments); // Debug
    res.json(appointments);
  } catch (err) {
    console.error("Error in getPremiumBodyshopAppointments:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Update appointment status (only bodyshopsupervisor)
export const updateBodyshopAppointmentStatus = async (req, res) => {
  try {
    const { serviceID } = req.params;
    const { status } = req.body;

    const appointment = await Appointment.findOne({ serviceID, section: "bodyshop" });
    if (!appointment) return res.status(404).json({ message: "Appointment not found" });

    appointment.status = status;
    await appointment.save();

    res.json({ message: "Status updated", appointment });
  } catch (err) {
    console.error("Error in updateBodyshopAppointmentStatus:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete appointment (only bodyshopsupervisor)
export const deleteBodyshopAppointment = async (req, res) => {
  try {
    const { serviceID } = req.params;

    const deleted = await Appointment.findOneAndDelete({ serviceID, section: "bodyshop" });
    if (!deleted) return res.status(404).json({ message: "Appointment not found" });

    res.json({ message: "Appointment deleted" });
  } catch (err) {
    console.error("Error in deleteBodyshopAppointment:", err);
    res.status(500).json({ message: "Server error" });
  }
};