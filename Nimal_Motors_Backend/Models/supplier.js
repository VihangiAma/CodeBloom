import mongoose from "mongoose";

const supplierSchema = new mongoose.Schema({
    supplierId: { type: String, required: true, unique: true },
    companyName: { type: String, required: true,unique: true },
    contactPerson: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    address: { type: String, required: true }
}, { timestamps: true });

const Supplier = mongoose.model("Supplier", supplierSchema);
export default Supplier;
