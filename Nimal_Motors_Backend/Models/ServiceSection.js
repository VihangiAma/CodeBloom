import mongoose from "mongoose";


const serviceSchema = new mongoose.Schema({
  serviceID: { type: String, required: true, unique: true },
  customerID: { type: mongoose.Schema.Types.ObjectId, ref: "Customer", required: true },
  vehicleID: { type: mongoose.Schema.Types.ObjectId, ref: "Vehicle", required: true },
  serviceType: { 
    type: String, 
    enum: ["Mechanical", "Electrical", "Bodyshop"], 
    required: true 
  },
  serviceDetails: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date },
  status: { type: String, enum: ["Pending", "In Progress", "Completed"], default: "Pending" },
  totalCost: { type: Number, required: true }
});

export default mongoose.model("ServiceSection", serviceSchema);
