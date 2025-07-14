

import mongoose from "mongoose";

const individualRepairSchema = new mongoose.Schema(
  {
    label: { type: String, required: true },
    price: { type: Number, required: true },
  },
  { _id: false }
);

const repairSchema = new mongoose.Schema({
  package: { type: String },
  repairs: [individualRepairSchema],
  price: { type: Number },
});

const itemSchema = new mongoose.Schema({
  itemName: { type: String },
  qty: { type: Number },
  price: { type: Number },
});

const serviceInvoiceSchema = new mongoose.Schema({
  serviceID: { type: String, required: true, unique: true },
  customerName: { type: String, required: true },
  vehicleNumber: { type: String, required: true },
  presentMeter: { type: Number, required: true },
  serviceDate: { type: Date, required: true },
  description: { type: String },

  repairs: [repairSchema],  // <-- updated
  items: [itemSchema],

  totalCost: { type: Number, required: true },
  isApproved: { type: Boolean, default: false },
  status: {
    type: String,
    enum: ["pending", "approved", "rejected", "resubmitted", "finalized"],
    default: "pending",
  },
  submittedBy: { type: String },
  adminRemarks: { type: String },

  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model(
  "ServiceInvoice",
  serviceInvoiceSchema,
  "ServiceInvoice"
);
