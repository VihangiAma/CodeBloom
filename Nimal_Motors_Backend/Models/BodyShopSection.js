import mongoose from "mongoose";
import AutoIncrementFactory from "mongoose-sequence";

const AutoIncrement = AutoIncrementFactory(mongoose);

// Define schema
const bodyShopSchema = new mongoose.Schema({
  serviceID: {
    type: String,
    unique: true,
    required: true
  }, // Formatted like BS001, BS002
  customerName: { type: String, required: true },
  contact: {
    phone: { type: String, required: true, unique: true },
    email: { type: String }
  },
  vehicleNumber: { type: String, required: true },
  vehicleType: { type: String, required: true }, // New field added
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

// Apply auto-increment to a temp numeric field before formatting
bodyShopSchema.plugin(AutoIncrement, {
  inc_field: "serviceID",
  id: "bodyshop_seq",
  start_seq: 1
});

// Format serviceID before saving (e.g., BS001)
bodyShopSchema.pre("save", function (next) {
  if (this.isNew && typeof this.serviceID === "number") {
    this.serviceID = `BS${String(this.serviceID).padStart(3, "0")}`;
  }
  next();
});

export default mongoose.model("BodyShopSection", bodyShopSchema, "BodyShopSection");
