
import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema({
  serviceID: { type: String, required: true, unique: true }, 
  customerID: { type: mongoose.Schema.Types.ObjectId, ref: "Customer", required: true },
  vehicleID: { type: mongoose.Schema.Types.ObjectId, ref: "Vehicle", required: true },
  serviceDate: { type: Date, required: true, default: Date.now },
  status: { type: String, enum: ["Pending", "Completed", "Cancelled"], default: "Pending" }
});

export default mongoose.model("ServiceSection", serviceSchema); 
