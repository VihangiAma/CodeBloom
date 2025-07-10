// import mongoose from "mongoose";

// const serviceInvoiceSchema = new mongoose.Schema({
//   serviceID: { type: String, required: true, unique: true },
//   customerName: { type: String, required: true },
//   vehicleNumber: { type: String, required: true },
//   vehicleType: { type: String, required: true },
//   description: { type: String },
//   section: {type: String},
//   services: {
//     fullService: {
//       selected: { type: Boolean, default: false },
//       cost: { type: Number, default: 0 }
//     },
//     bodyWash: {
//       selected: { type: Boolean, default: false },
//       cost: { type: Number, default: 0 }
//     },
//     oilChange: { 
//       selected: { type: Boolean, default: false },
//       cost: { type: Number, default: 0 }
//     },
//     underbodyWash: { 
//       selected: { type: Boolean, default: false },
//       cost: { type: Number, default: 0 }
//     },
//     interiorVacuum: { 
//       selected: { type: Boolean, default: false },
//       cost: { type: Number, default: 0 }
//     },
//   },
//   items: [
//     {
//       description: String,
//       qty: Number,
//       cost: Number,
//     }
//   ],
//   repairCost: { type: Number, default: 0 },
//   totalCost: { type: Number, required: true },
//   submittedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
//   isApproved: { type: Boolean, default: false },
//   adminRemarks: {type : String},
//   createdAt: { type: Date, default: Date.now },
// });

// export default mongoose.model('ServiceInvoice', serviceInvoiceSchema, 'ServiceInvoice');


import mongoose from "mongoose";

const repairSchema = new mongoose.Schema({
  package: { type: String, required: true }, 
  repairs:{ type: String, required: true} , // e.g., "Full Service Package"
  price: { type: Number, required: true }
});

const itemSchema = new mongoose.Schema({
  itemName: { type: String, required: true },
  qty: { type: Number, required: true },
  price: { type: Number, required: true }
});

const serviceInvoiceSchema = new mongoose.Schema({
  serviceID: { type: String, required: true, unique: true },
  customerName: { type: String, required: true },
  vehicleNumber: { type: String, required: true },
  presentMeter: { type: Number, required: true },
  serviceDate: { type: Date, required: true },
  description: { type: String },

  repairs: [repairSchema],         // List of packages and their prices
  items: [itemSchema],             // List of parts/items used

  totalCost: { type: Number, required: true },
  isApproved: { type: Boolean, default: false },
  submittedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  adminRemarks: { type: String },

  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("ServiceInvoice", serviceInvoiceSchema, "ServiceInvoice");

