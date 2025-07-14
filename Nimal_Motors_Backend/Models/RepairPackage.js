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

// import mongoose from "mongoose";

// const repairSchema = new mongoose.Schema({
//   label: { type: String, required: true, trim: true },
//   price: { type: Number, default: 0 }, // price is optional
// });

// const repairPackageSchema = new mongoose.Schema({
//   packageName: {
//     type: String,
//     required: true,
//     unique: true,
//     trim: true,
//   },
//   repairs: [repairSchema],
//   createdAt: {
//     type: Date,
//     default: Date.now,
//   },
// });

// export default mongoose.model("RepairPackage", repairPackageSchema);
