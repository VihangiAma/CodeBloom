import mongoose from "mongoose";
import AutoIncrementFactory from "mongoose-sequence";

const AutoIncrement = AutoIncrementFactory(mongoose);

const electricalSchema = new mongoose.Schema({
  serviceID: { type: Number, unique: true },
  displayID: { type: String, unique: true }, // e.g., "ES001"
  customerName: { type: String, required: true },
  vehicleType: { type: String, required: true },
  contact: {
    phone: { type: String, required: true },
    email: { type: String }
  },
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

electricalSchema.plugin(AutoIncrement, { inc_field: "serviceID", id: "electrical_seq" });

export default mongoose.model("ElectricalSection", electricalSchema, "ElectricalSection");
