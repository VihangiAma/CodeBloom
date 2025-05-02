import mongoose from "mongoose";
import AutoIncrementFactory from "mongoose-sequence";

const AutoIncrement = AutoIncrementFactory(mongoose);

// Define your schema
const mechanicalSchema = new mongoose.Schema({
  serviceID: { 
    type: String, 
    unique: true, 
    required: true 
  }, // will store serviceID as "MS001", "MS002", etc.
  customerName: { type: String, required: true },
  contact: {
    phone: { type: String, required: true, unique: true },
    email: { type: String }
  },
  vehicleNumber: { type: String, required: true },
  vehicleType: { type: String, required: true }, // Added vehicle type field
  serviceDate: { type: Date, required: true },
  presentMeter: {
    type: Number,
    required: true,
    min: 0
  },
  status: {
    type: String,
    enum: ["Pending", "In Progress", "Completed"],
    default: "Pending"
  }
});

// Apply the auto-increment plugin with a custom function for serviceID
mechanicalSchema.plugin(AutoIncrement, { 
  inc_field: "serviceID", 
  id: "mechanical_seq", 
  start_seq: 1, 
  unique: true 
});

// Pre-save hook to modify the `serviceID` format
mechanicalSchema.pre("save", function(next) {
  if (this.isNew) {
    // Add "MS" prefix and format the serviceID
    this.serviceID = `MS${String(this.serviceID).padStart(3, "0")}`;
  }
  next();
});

export default mongoose.model("MechanicalSection", mechanicalSchema, "MechanicalSection");
