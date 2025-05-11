const mongoose = require("mongoose");

const InvoiceSchema = new mongoose.Schema({
  invoiceNo: { type: String, required: true, unique: true },
  customerName: { type: String, required: true },
  vehicleNo: { type: String, required: true },
  presentMeter: { type: String },
  invoiceDate: { type: Date, default: Date.now },

  // Repair items in table format
  items: [
    {
      section: String, // Remove & Fixing, Painting, Parts, etc
      description: String,
      qty: Number,
      amount: Number,
    },
  ],

  totalAmount: { type: Number, required: true },
  advance: { type: Number, default: 0 },
  balance: { type: Number, required: true },

  relatedRepairId: { type: mongoose.Schema.Types.ObjectId, ref: "Repair" },
});

module.exports = mongoose.model("Invoice", InvoiceSchema);