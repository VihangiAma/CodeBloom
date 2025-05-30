import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
  },
  Details:{

  },
  amount: {
    type: Number,
    required: true,
    min: 1,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  supplier: {
    type: String,
    required: false // ✅ Only conditionally required in controller logic
  
  },
  description: {
    type: String,
    default: "",
  },
});

const Expense = mongoose.model("Expense", expenseSchema);
export default Expense;
