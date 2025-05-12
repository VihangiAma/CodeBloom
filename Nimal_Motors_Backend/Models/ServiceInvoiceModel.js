import mongoose from "mongoose";

const serviceInvoiceSchema = new mongoose.Schema({
  serviceID: { type: String, required: true, unique: true },
  customerName: { type: String, required: true },
  vehicleNo: { type: String, required: true },
  vehicleType: { type: String, required: true },
  description: { type: String },
  section: {String},
  services: {
    fullService: { selected: Boolean, cost: Number },
    bodyWash: { selected: Boolean, cost: Number },
    oilChange: { selected: Boolean, cost: Number },
    underbodyWash: { selected: Boolean, cost: Number },
    interiorVacuum: { selected: Boolean, cost: Number },
  },
  items: [
    {
      description: String,
      qty: Number,
      cost: Number,
    }
  ],
  totalCost: { type: Number, required: true },
  submittedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  isApproved: { type: Boolean, default: false },
  adminRemarks: String,
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('ServiceInvoice', serviceInvoiceSchema, 'ServiceInvoice');
