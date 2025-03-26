import mongoose from "mongoose"; 

const stockSchema = new mongoose.Schema({
  partName: { type: String, required: true }, // Name of the spare part
  category: { type: String, required: true }, // Category (e.g., Engine, Electrical, Body)
  quantity: { type: Number, required: true, min: 0 }, // Current stock level
  reorderLevel: { type: Number, required: true, min: 0 }, // Minimum quantity before alert
  supplier: { type: String, required: true }, // Supplier information
  price: { type: Number, required: true, min: 0 }, // Price per unit
  lastUpdated: { type: Date, default: Date.now }, // Timestamp for tracking updates
});

export default mongoose.model("Stock", stockSchema);
