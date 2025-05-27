import mongoose from "mongoose";

const serviceInvoiceSchema = new mongoose.Schema({
  serviceID: { type: String, required: true, unique: true },
  customerName: { type: String, required: true },
  vehicleNumber: { type: String, required: true },
  vehicleType: { type: String, required: true },
  description: { type: String },
  section: {type: String},
  services: {
    fullService: {
      selected: { type: Boolean, default: false },
      cost: { type: Number, default: 0 }
    },
    bodyWash: {
      selected: { type: Boolean, default: false },
      cost: { type: Number, default: 0 }
    },
    oilChange: { 
      selected: { type: Boolean, default: false },
      cost: { type: Number, default: 0 }
    },
    underbodyWash: { 
      selected: { type: Boolean, default: false },
      cost: { type: Number, default: 0 }
    },
    interiorVacuum: { 
      selected: { type: Boolean, default: false },
      cost: { type: Number, default: 0 }
    },
  },
  items: [
    {
      description: String,
      qty: Number,
      cost: Number,
    }
  ],
  repairCost: { type: Number, default: 0 },
  totalCost: { type: Number, required: true },
  submittedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  isApproved: { type: Boolean, default: false },
  adminRemarks: {type : String},
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('ServiceInvoice', serviceInvoiceSchema, 'ServiceInvoice');
