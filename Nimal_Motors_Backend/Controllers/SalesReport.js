import SalesReport from "../Models/SalesReport.js";

// @desc    Create a new sales report
// @route   POST /api/sales-reports
export const createSalesReport = async (req, res) => {
  try {
    const { date, Section, Description, Amount } = req.body;

    const report = new SalesReport({
      date,
      Section,
      Description,
      Amount,
    });

    const savedReport = await report.save();
    res.status(201).json(savedReport);
  } catch (error) {
    res.status(400).json({ message: "Error creating report", error });
  }
};
// @desc    Get all sales reports
// @route   GET /api/sales-reports
export const getAllSalesReports = async (req, res) => {
  try {
    const reports = await SalesReport.find().sort({ date: -1 });
    res.status(200).json(reports);
  } catch (error) {
    res.status(500).json({ message: "Error fetching reports", error });
  }
};

export async function deleteSalesReport(req, res) {
  try {
    const { id } = req.params; // User ID from the URL parameters
    const report = await SalesReport.findOneAndDelete({ itemId: id });

    if (!report) {
      return res.status(404).json({
        message: "Report not found",
      });
    }

    res.status(200).json({
      message: " Stock Report deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete Stock  report",
      error: error.message,
    });
  }
}
export async function updateSalesReport(req, res) {
  try {
    const { id } = req.params; // User ID from the URL parameters
    const updatedData = req.body; // Data to update

    const updatedReport = await SalesReport.findOneAndUpdate(
      { itemId: id }, // Search for the report with this User ID
      updatedData, // New data to update
      { new: true } // Return the updated document
    );

    if (!updatedReport) {
      return res.status(404).json({
        message: "Report not found",
      });
    }
    res.status(200).json({
      message: "Report updated successfully",
      report: updatedReport,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update report",
      error: error.message,
    });
  }
}
