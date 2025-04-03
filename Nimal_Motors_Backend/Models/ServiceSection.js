
import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema({
  serviceID: { type: String, required: true, unique: true }, 
  customerID: { type: String, ref: "Customer", required: true },
  vehicleID: { type: String, ref: "Vehicle", required: true },
  serviceDate: { type: Date, required: true, default: Date.now },
  status: { type: String, enum: ["Pending", "In Progress", "Completed"], default: "Pending" }
});

export default mongoose.model("ServiceSection", serviceSchema); 
