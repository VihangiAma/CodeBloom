import mongoose from "mongoose";
import AutoIncrementFactory from "mongoose-sequence";

const AutoIncrement = AutoIncrementFactory(mongoose);

const electricalSchema = new mongoose.Schema({
  serviceID: { type: Number, unique: true }, // will be auto-incremented
  customerName: { type: String, required: true },
  contact: {
    phone: { type: String, required: true, unique: true },
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
  }
});

// Apply the auto-increment plugin
electricalSchema.plugin(AutoIncrement, { inc_field: "serviceID", id: "electrical_seq" });


export default mongoose.model("ElectricalSection", electricalSchema, "ElectricalSection");
