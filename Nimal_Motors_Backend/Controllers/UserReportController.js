import mongoose from "mongoose"
import UserReport from "../Models/UserReport.js"


export async function postUserReport(req, res) {
    try {
      const report = req.body;
      const newReport = new UserReport(report);
  
      await newReport.save();
  
      res.status(201).json({
        message: "Report created successfully",
        report: newReport
      });
    } catch (error) {
      
      res.status(500).json({
        message: "Report creation failed",
        error: error.message
       
    });
    
   
  }}

  export async function getUserReports(req, res) {
    try {
        const reports = await UserReport.find(); // Retrieves all user reports
        res.status(200).json(reports);
    } catch (error) {
        res.status(500).json({
            message: "Failed to retrieve Sales reports",
            error: error.message
        });
    }
}
export async function deleteUserReport(req, res) {
  try {
      const { id } = req.params; // User ID from the URL parameters
      const report = await UserReport.findOneAndDelete({ Report_id: id });

      if (!report) {
          return res.status(404).json({
              message: "Report not found"
          });
      }

      res.status(200).json({
          message: "Report deleted successfully"
      });
  } catch (error) {
      res.status(500).json({
          message: "Failed to delete report",
          error: error.message
      });
  }
}


 

