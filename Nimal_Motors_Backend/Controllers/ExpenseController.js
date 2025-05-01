import Expense from "../Models/Expense.js";

// Create new expense
export const addExpense = async (req, res) => {
    try {
      const { category, amount, date, supplier, description } = req.body;
  
      // Basic validation
      if (!category || !amount || !date) {
        return res.status(400).json({ message: "Category, amount, and date are required." });
      }
  
      if (category === "Spare Parts" && (!supplier || supplier.trim() === "")) {
        return res.status(400).json({ message: "Supplier is required for Spare Parts expenses." });
      }
  
      if (isNaN(amount) || Number(amount) <= 0) {
        return res.status(400).json({ message: "Amount must be a valid positive number." });
      }
  
      const newExpense = new Expense({
        category,
        amount,
        date,
        supplier: category === "Spare Parts" ? supplier : "", // Optional if not Spare Parts
        description,
      });
  
      const savedExpense = await newExpense.save();
      res.status(201).json(savedExpense);
    } catch (error) {
      console.error("Error adding expense:", error);
      res.status(500).json({ message: "Server error while adding expense." });
    }
  };

// Get all expenses
export const getAllExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find().sort({ date: -1 });
    res.json(expenses);
  } catch (error) {
    console.error("Error fetching expenses:", error);
    res.status(500).json({ message: "Failed to fetch expenses" });
  }
};
// Get recent expenses (e.g., latest 5)
export const getRecentExpenses = async (req, res) => {
    try {
      const recentExpenses = await Expense.find().sort({ date: -1 }).limit(5);
      res.status(200).json(recentExpenses);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch recent expenses" });
    }
  };
  