import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  fullName: String,
  email: String,
  phoneNumber: String,
  vehicleDetails: String,
  type: String, // 'accountant', 'admin', 'supervisor', etc.
});

export default mongoose.model("User", userSchema);
