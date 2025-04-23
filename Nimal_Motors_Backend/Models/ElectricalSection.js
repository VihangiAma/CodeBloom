import mongoose from "mongoose";

const electricalSchema = new mongoose.Schema({
  serviceID: { type: String, required: true, unique: true },
  customerName: { type: String, required: true },
  vehicleID: { type: String, required: true },
  serviceDate: { type: Date, required: true },
  serviceTime: { type: String, required: true },
  description: { 
    type: String, 
    required: true,
    maxlength: 100 
  },
  status: { 
    type: String, 
    enum: ["Pending", "In Progress", "Completed"], 
    default: "Pending" 
  }
});

export default mongoose.model("ElectricalSection", electricalSchema, "ElectricalSection");
