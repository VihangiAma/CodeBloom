import mongoose from "mongoose";

const bodyshopAppointmentSchema = new mongoose.Schema({
  serviceID: { type: String, required: true, unique: true },
  customerId: { type: String, ref: "User", required: true },
  customerName: { type: String, required: true },
  vehicleNumber: { type: String, required: true },
  serviceDate: { type: Date, required: true },
  phone: { type: String },
  status: {
    type: String,
    enum: ["Pending", "In Progress", "Completed"],
    default: "Pending",
  },
  section: {
  type: String,
  required: true,
  lowercase: true,  
  enum: ["bodyshop"], 
},
});

// ✅ Use a distinct model name and check before compiling
const BodyshopAppointment =
  mongoose.models.BodyshopAppointment ||
  mongoose.model("BodyshopAppointment", bodyshopAppointmentSchema);

export default BodyshopAppointment;
