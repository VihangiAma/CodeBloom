import mongoose from "mongoose";

const invoiceSchema = new mongoose.Schema({
  invoiceNo: { type: String, required: true, unique: true },
  customerName: { type: String },  // Optional, can be reused from ServiceInvoice
  vehicleNo: { type: String },
  presentMeter: { type: String },
  invoiceDate: { type: Date, default: Date.now },

  items: [
    {
      section: { type: String },
      description: { type: String },
      qty: { type: Number },
      amount: { type: Number },
    },
  ],

  totalAmount: { type: Number, required: true },
  advance: { type: Number, default: 0 },
  balance: { type: Number, required: true },

  // Link to supervisor's service invoice
  relatedServiceInvoiceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ServiceInvoice",
    required: true,
  }
});

const Invoice = mongoose.model("Invoice", invoiceSchema);
export default Invoice;
