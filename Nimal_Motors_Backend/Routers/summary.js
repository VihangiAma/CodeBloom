import express from "express";
import Stock from "../Models/Stock.js"; // Adjust path if needed
import Invoice from "../Models/ServiceInvoiceModel.js";
import Purchase from "../Models/Expense.js"; // If you have one

const router = express.Router();

// Dashboard Summary Route
router.get("/dashboard/summary", async (req, res) => {
  try {
    // 1. Total stock value
    const stockSummary = await Stock.aggregate([
      {
        $group: {
          _id: null,
          total: { $sum: { $multiply: ["$stockQuantity", "$pricePerUnit"] } },
        },
      },
    ]);

    // 2. Purchase records count (optional if you have Purchase model)
    const purchaseCount = await Purchase.countDocuments();

    // 3. Total invoices count
    const invoiceCount = await Invoice.countDocuments({ isApproved: true });

    // 4. Total outstanding balance
    const outstandingSummary = await Invoice.aggregate([
      {
        $group: {
          _id: null,
          total: { $sum: "$balance" },
        },
      },
    ]);

    res.json({
      stockValue: stockSummary[0]?.total || 0,
      purchases: purchaseCount,
      invoices: invoiceCount,
      outstanding: outstandingSummary[0]?.total || 0,
    });
  } catch (error) {
    console.error("Error generating dashboard summary:", error);
    res.status(500).json({ message: "Failed to load dashboard summary" });
  }
});

export default router;
