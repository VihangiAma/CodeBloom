import mongoose from "mongoose";
import AutoIncrementFactory from "mongoose-sequence";

const AutoIncrement = AutoIncrementFactory(mongoose);

// Define the schema for Electrical Section
const electricalSchema = new mongoose.Schema({
  serviceID: { 
    type: String, 
    unique: true, 
    required: true 
  }, // serviceID will now be a string (e.g., ES001, ES002)
  customerName: { type: String, required: true },
  contact: {
    phone: { type: String, required: true, unique: true },
    email: { type: String }
  },
  vehicleNumber: { type: String, required: true, unique: true },
  vehicleType: { type: String, required: true }, // Added vehicleType field
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

// Apply the auto-increment plugin to generate a sequential number
electricalSchema.plugin(AutoIncrement, { 
  inc_field: "serviceID", 
  id: "electrical_seq", 
  start_seq: 1, 
  unique: true 
});

// Pre-save hook to format serviceID with "ES" prefix
electricalSchema.pre("save", function(next) {
  if (this.isNew) {
    // Add "ES" prefix and pad serviceID to 3 digits
    this.serviceID = `ES${String(this.serviceID).padStart(3, "0")}`;
  }
  next();
});

export default mongoose.model("ElectricalSection", electricalSchema, "ElectricalSection");
