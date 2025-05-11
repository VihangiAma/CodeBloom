import RevenueAndExpense from "../Models/RevenueAndExpence.js";

export async function CreateRevenueAndExpenseReport(req, res) {
    try {
        console.log("Received revenue and expense report data:", req.body);
        
        const reportData = req.body;
        const newReport = new RevenueAndExpense(reportData);  // Using the imported model name
        
        await newReport.save();
        
        res.status(201).json({
            message: "Revenue and Expense Report created successfully",
            report: newReport
        });
    } catch (error) {
        console.error("❌ Error creating revenue and expense report:", error);
        
        // Handle duplicate key error
        if (error.code === 11000) {
            return res.status(400).json({
                message: "Report creation failed - ReportId must be unique",
                error: error.message
            });
        }
        
        res.status(500).json({
            message: "Revenue and Expense Report creation failed",
            error: error.message
        });
    }
}

export async function getRevenueAndExpenseReport(req, res) {
    try {
        const reports = await RevenueAndExpense.find();  // Using the imported model name
        res.status(200).json(reports);
    } catch (error) {
        res.status(500).json({
            message: "Failed to retrieve reports",
            error: error.message,
        });
    }
}