import express from "express";
import { addExpense, getAllExpenses,getRecentExpenses } from "../Controllers/ExpenseController.js";

const router = express.Router();

router.post("/", addExpense);
router.get("/", getAllExpenses);
router.get("/recent", getRecentExpenses);


export default router;
