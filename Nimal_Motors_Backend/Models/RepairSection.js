
import mongoose from "mongoose";

const repairSchema = new mongoose.Schema({
  repairID: { type: String, required: true, unique: true }, 
  customerID: { type: mongoose.Schema.Types.ObjectId, ref: "Customer", required: true },
  vehicleID: { type: mongoose.Schema.Types.ObjectId, ref: "Vehicle", required: true },
  repairType: { 
    type: String, 
    enum: ["Mechanical", "Electrical", "Bodyshop"], 
    required: true 
  }, 
  repairDetails: { type: String, required: true }, 
  startDate: { type: Date, required: true },
  endDate: { type: Date },
  status: { type: String, enum: ["Pending", "In Progress", "Completed"], default: "Pending" },
  totalCost: { type: Number, required: true }
});

export default mongoose.model("RepairSection", repairSchema); 



