import mongoose from "mongoose";

const premiumElectricalBookingSchema = new mongoose.Schema({
  customerId: {
  type: String, 
  required: true
},
  customerName: { type: String, required: true },
  vehicleType: { type: String, required: true },
  vehicleNumber: { type: String, required: true },
  serviceDate: { type: Date, required: true },
  presentMeter: { type: Number, required: true },
  status: {
    type: String,
    enum: ["Pending", "In Progress", "Completed"],
    default: "Pending",
  },
  serviceID: { type: String, unique: true },
  contact: {
    phone: { type: String, required: true },
    email: { type: String },
  },
}, { timestamps: true });

export default mongoose.model("PremiumElectricalBooking", premiumElectricalBookingSchema);