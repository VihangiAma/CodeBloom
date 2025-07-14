import mongoose from "mongoose";

const repairPackageSchema = new mongoose.Schema({
  packageName: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  repairs: [
    {
      type: String,
      required: true,
      trim: true,
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("RepairPackage", repairPackageSchema);