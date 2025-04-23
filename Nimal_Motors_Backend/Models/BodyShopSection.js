import mongoose from "mongoose";

const bodyShopSchema = new mongoose.Schema({
  serviceID: { type: String, required: true, unique: true },
  customerName: { type: String, required: true },
  contact: {
    phone: { type: String, required: true }, // New: phone number (required)
    email: { type: String }                   // New: optional email
  },
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

export default mongoose.model("BodyShopSection", bodyShopSchema, "BodyShopSection");
