import mongoose from "mongoose";
import AutoIncrementFactory from "mongoose-sequence";

const AutoIncrement = AutoIncrementFactory(mongoose);

const mechanicalSchema = new mongoose.Schema({
  serviceID: { type: Number, unique: true }, // auto-incremented
  displayID: { type: String, unique: true }, // e.g., "MS001"
  customerName: { type: String, required: true },
  contact: {
    phone: { type: String, required: true, unique: true },
    email: { type: String }
  },
  vehicleType: { type: String, required: true }, // NEW FIELD
  vehicleNumber: { type: String, required: true },
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
  },
  advancePaid: { type: Number, default: 0 },
});

// Auto-increment serviceID
mechanicalSchema.plugin(AutoIncrement, {
  inc_field: "serviceID",
  id: "mechanical_seq"
});

export default mongoose.model("MechanicalSection", mechanicalSchema, "MechanicalSection");
