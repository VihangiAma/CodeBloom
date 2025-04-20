import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
  customerName: { type: String, required: true },
  address: { type: String, required: true },
  phone: { type: String, required: true },
  vehicleID: { type: String, required: true },
  vehicleType: { type: String, required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true }
}, { timestamps: true });

export default mongoose.model('Appointment', appointmentSchema);

