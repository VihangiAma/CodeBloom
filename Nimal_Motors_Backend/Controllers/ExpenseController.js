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


  // Get total expenses grouped by month (last 6 months)
export const getMonthlyExpenseSummary = async (req, res) => {
  try {
    const result = await Expense.aggregate([
      {
        $match: {
          date: {
            $gte: new Date(new Date().setMonth(new Date().getMonth() - 5)),
          },
        },
      },
      {
        $group: {
          _id: { $month: "$date" },
          total: { $sum: "$amount" },
        },
      },
      {
        $sort: { "_id": 1 },
      },
    ]);

    res.json(result);
  } catch (err) {
    console.error("Error fetching monthly expense summary", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
//get total expenses grouped by category
export const getCategoryExpenseSummary = async (req, res) => {
  try {
    const summary = await Expense.aggregate([
      {
        $group: {
          _id: "$category",
          total: { $sum: "$amount" },
        },
      },
      {
        $sort: { total: -1 }
      }
    ]);
    res.json(summary);
  } catch (err) {
    console.error("Error fetching category summary", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//get total expenses grouped by supplier
export const getSupplierExpenseSummary = async (req, res) => {
  try {
    const summary = await Expense.aggregate([
      {
        $group: {
          _id: "$supplier",
          total: { $sum: "$amount" },
        },
      },
      {
        $sort: { total: -1 },
      },
      {
        $limit: 5
      }
    ]);
    res.json(summary);
  } catch (err) {
    console.error("Error fetching supplier summary", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
export const updateExpense = async (req, res) => {
  try {
    const updated = await Expense.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Expense not found" });
    }

    res.status(200).json(updated);
  } catch (error) {
    console.error("Update error:", error);
    res.status(500).json({ message: "Server error while updating expense" });
  }
};

// @desc    Delete an expense
// @route   DELETE /api/expenses/delete/:id
// @access  Public (Add auth middleware if needed)
export const deleteExpense = async (req, res) => {
  try {
    const deleted = await Expense.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Expense not found" });
    }

    res.status(200).json({ message: "Expense deleted successfully" });
  } catch (error) {
    console.error("Delete error:", error);
    res.status(500).json({ message: "Server error while deleting expense" });
  }
};


  