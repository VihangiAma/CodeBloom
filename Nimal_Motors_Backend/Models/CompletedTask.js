import mongoose from "mongoose";

const completedTaskSchema = new mongoose.Schema({
  userId: { type: String, required: true }, // Links to the premium customer
  serviceType: { type: String, required: true, enum: ["mechanical", "electrical", "bodyshop", "appointment"] }, // Type of service
  customerName: { type: String, required: true },
  vehicleType: { type: String, required: true },
  vehicleNumber: { type: String, required: true },
  serviceDate: { type: Date, required: true },
  presentMeter: { type: Number, required: true, min: 0 },
  status: { type: String, enum: ["Completed"], default: "Completed" }, // Only completed tasks
  contact: {
    phone: { type: String, required: true },
    email: { type: String },
  },
  completedAt: { type: Date, default: Date.now }, // Timestamp of completion
});

export default mongoose.model("CompletedTask", completedTaskSchema, "completedtasks");