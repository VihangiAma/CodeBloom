import express from "express";
import { addExpense, getAllExpenses,getRecentExpenses,getMonthlyExpenseSummary,getCategoryExpenseSummary,getSupplierExpenseSummary,updateExpense,deleteExpense } from "../Controllers/ExpenseController.js";

const router = express.Router();

router.post("/add", addExpense);
router.get("/", getAllExpenses);
router.get("/recent", getRecentExpenses);
router.get("/summary/monthly", getMonthlyExpenseSummary);
router.get("/summary/category", getCategoryExpenseSummary);
router.get("/summary/supplier", getSupplierExpenseSummary);
router.put("/update/:id", updateExpense);

// DELETE - Delete an expense
router.delete("/delete/:id", deleteExpense);

export default router;
