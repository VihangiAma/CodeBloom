import InventoryReport from "../Models/InventoryReport.js"

// Retrieves all user reports
export async function getInventoryReport(req, res) {
  try {
    const reports = await InventoryReport.find();
    res.status(200).json(reports);
  } catch (error) {
    res.status(500).json({
      message: "Failed to retrieve reports",
      error: error.message,
    });
  }
}