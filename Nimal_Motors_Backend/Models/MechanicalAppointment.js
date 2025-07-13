import mongoose from "mongoose";

const mechanicalAppointmentSchema = new mongoose.Schema({
  serviceID: { type: String, required: true, unique: true },
  customerId: { type: String, ref: "User", required: true },
  customerName: { type: String, required: true },
  vehicleType: { type: String, required: true },
  vehicleNumber: { type: String, required: true },
  serviceDate: { type: Date, required: true },
  phone: { type: String },
  status: {
    type: String,
    enum: ["Pending", "In Progress", "Completed"],
    default: "Pending",
  },
});

const MechanicalAppointment =
  mongoose.models.MechanicalAppointment ||
  mongoose.model("MechanicalAppointment", mechanicalAppointmentSchema, "MechanicalAppointments");

export default MechanicalAppointment;