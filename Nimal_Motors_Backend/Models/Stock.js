import mongoose from "mongoose";

const stockSchema = new mongoose.Schema({
    category: {
        type: String,
        required: true,
    },
    stockQuantity: {
        type: Number,
        required: true,
    },
    supplierId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Supplier", // Reference to the Supplier entity
        required: true,
    },
    itemId: {
        type: String,
        required: true,
        unique: true, // Ensuring uniqueness for each stock item
    },
    pricePerUnit: {
        type: Number,
        required: true,
    },
    itemName: {
        type: String,
        required: true,
    },
    lastUpdated: {
        type: Date,
        default: Date.now,
    }
});

const Stock = mongoose.model("Stock", stockSchema);

export default Stock;
