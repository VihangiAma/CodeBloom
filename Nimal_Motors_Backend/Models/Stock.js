import mongoose from "mongoose";

//stockSchema.index({ itemName: 1, companyName: 1 }, { unique: true });

const stockSchema = new mongoose.Schema({
    

    category: {
        type: String,
        required: true,
    },
    stockQuantity: {
        type: Number,
        required: true,
    },
    companyName: {
        type: String,
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
    },
    threshold: { type: Number, default: 10 },
    

    barcode: {
        type: String,
        unique: true,  // ✅ Barcode must be unique ideally
        sparse: true,  // ✅ Allows some items without barcode
      },
});

const Stock = mongoose.model("Stock", stockSchema);
stockSchema.index({ itemName: 1, companyName: 1 }, { unique: true });


export default Stock;
