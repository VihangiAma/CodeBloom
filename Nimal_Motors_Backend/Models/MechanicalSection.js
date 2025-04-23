import mongoose from "mongoose";

const mechanicalSchema = new mongoose.Schema({
  serviceID: { type: String, required: true, unique: true }, 
  customerName: { type: String, required: true },
  contact: {
    phone: { type: String, required: true }, // New: phone number (required)
    email: { type: String }                   // New: optional email
  },
  vehicleID: { type: String, required: true },
  serviceDate: { type: Date, required: true }, // This is appointment date
  serviceTime: { type: String, required: true }, // This is appointment time slot
  description: { 
    type: String, 
    required: true,
    maxlength: 100  // Limit description to 100 characters
  },
  status: { 
    type: String, 
    enum: ["Pending", "In Progress", "Completed"], 
    default: "Pending" 
  }
});

export default mongoose.model("MechanicalSection", mechanicalSchema, "MechanicalSection");



