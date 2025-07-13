// models/PremiumElectricalBooking.js
import mongoose from "mongoose";

const premiumElectricalBookingSchema = new mongoose.Schema({
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  customerName: String,
  vehicleType: String,
  vehicleNumber: String,
  serviceDate: Date,
  issueDescription: String,
  status: {
    type: String,
    enum: ["Pending", "In Progress", "Completed"],
    default: "Pending",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("PremiumElectricalBooking", premiumElectricalBookingSchema);
