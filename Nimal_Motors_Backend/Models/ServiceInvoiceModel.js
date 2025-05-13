// const mongoose = require('mongoose');

// const serviceInvoiceSchema = new mongoose.Schema({
//   serviceID: { type: String, required: true, unique: true },
//   customerName: { type: String, required: true },
//   vehicleNumber: { type: String, required: true },
//   vehicleType: { type: String, required: true },
//   contactPhone: { type: String, required: true },
//   description: { type: String },
//   services: {
//     fullService: { selected: Boolean, cost: Number },
//     bodyWash: { selected: Boolean, cost: Number },
//     oilChange: { selected: Boolean, cost: Number },
//     underbodyWash: { selected: Boolean, cost: Number },
//     interiorVacuum: { selected: Boolean, cost: Number },
//   },
//   totalCost: { type: Number, required: true },
// });

// const ServiceInvoice = mongoose.model('ServiceInvoice', serviceInvoiceSchema);

// module.exports = ServiceInvoice;

import mongoose from "mongoose";

const serviceInvoiceSchema = new mongoose.Schema({
  serviceID: { type: String, required: true, unique: true },
  customerName: { type: String, required: true },
  vehicleNumber: { type: String, required: true },
  vehicleType: { type: String, required: true },
  contactPhone: { type: String, required: true },
  description: { type: String },
  services: {
    fullService: { selected: Boolean, cost: Number },
    bodyWash: { selected: Boolean, cost: Number },
    oilChange: { selected: Boolean, cost: Number },
    underbodyWash: { selected: Boolean, cost: Number },
    interiorVacuum: { selected: Boolean, cost: Number },
  },
  totalCost: { type: Number, required: true },
});

export default mongoose.model('ServiceInvoice', serviceInvoiceSchema, 'ServiceInvoice');