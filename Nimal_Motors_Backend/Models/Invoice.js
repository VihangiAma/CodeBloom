import mongoose from "mongoose";

const accountantInvoiceSchema = new mongoose.Schema({
  serviceInvoiceId: { type: mongoose.Schema.Types.ObjectId, ref: "ServiceInvoice", required: true },
  invoiceNo: { type: String, required: true, unique: true },
  advance: { type: Number, required: true },
  balance: { type: Number, required: true },
  remarks: { type: String },
  invoiceDate: { type: Date, default: Date.now },
});

export default mongoose.model("Invoice", accountantInvoiceSchema, "AccountantInvoices");
