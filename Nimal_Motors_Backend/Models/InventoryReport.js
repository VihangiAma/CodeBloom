import mongoose from "mongoose";
const InventoryReportSchema = mongoose.Schema({
    itemId: {
        type: String,
        required: true,
        unique: true, // Ensuring uniqueness for each stock item
    },
    itemName: {
        type: String,
        required: true,
    },
    companyName: {
        type: String,
        ref: "Supplier", // Reference to the Supplier entity
        required: true,
    },
    stockQuantity: {
        type: Number,
        required: true,
    },
    pricePerUnit: {
        type: Number,
        required: true,
    },
    lastUpdated: {
        type: Date,
        default: Date.now,
    }
});
const InventoryReport = mongoose.model("InventoryReports", InventoryReportSchema);
export default InventoryReport ;