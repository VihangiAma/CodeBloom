import revenueReport from "../Models/Revenue.js";
export async function CreateRevenueReport(req, res) {

    try {
        console.log("Received request data:", req.body); // Log request data
    
        const reportData = req.body;
        const newReport = new revenueReport(reportData);
    
        await newReport.save();
    
        res.status(201).json({
          message: "Revenue Report created successfully",
          report: newReport,
        });
      } catch (error) {
        console.error("❌ Error creating revenue report:", error); // Log error details
    
        // Handle duplicate key error (since SectionId is unique)
        if (error.code === 11000) {
          return res.status(400).json({
            message: "Report creation failed - SectionId must be unique",
            error: error.message,
          });
        }
    
        res.status(500).json({
          message: "Revenue Report creation failed",
          error: error.message,
        });
      }
}

export async function getRevenueReport(req, res) {
  try {
    const reports = await revenueReport.find();
    res.status(200).json(reports);
  } catch (error) {
    res.status(500).json({
      message: "Failed to retrieve reports",
      error: error.message,
    });
  }
}