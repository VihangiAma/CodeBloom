import mongoose from "mongoose";
import StockReport from '../Models/StockReport.js';

//post function
export async function CreateSalesReport(req,res) {

    try {
        const Sreport = req.body;
        const newReport = new StockReport(Sreport);

        await newReport.save();

        res.status(201).json({
            message: " Stock Report created successfully",
            Sreport: newReport

        });
        
    } catch (error) {
        res.status(500).json({
            message: "Report creation failed",
            error: error.message
           
        });
    }
    
}

// get All users function
 export async function getSalesReport(req,res) {
    try {
        const reports = await StockReport.find(); // Retrieves all user reports
        res.status(200).json(reports);
    } catch (error) {
        res.status(500).json({
            message: "Failed to retrieve reports",
            error: error.message
        });
    }
 }

 // delete Sales Report
 export async function deleteSalesReport(req, res) {
   try {
       const { id } = req.params; // User ID from the URL parameters
       const report = await StockReport.findOneAndDelete({ itemId: id });
 
       if (!report) {
           return res.status(404).json({
               message: "Report not found"
           });
       }
 
       res.status(200).json({
           message: " Stock Report deleted successfully"
       });
   } catch (error) {
       res.status(500).json({
           message: "Failed to delete Stock  report",
           error: error.message
       });
   }
 }

 //Delete function
 export async function updateSalesReport(req, res) {
   try {
       const { id } = req.params; // User ID from the URL parameters
       const updatedData = req.body; // Data to update
 
       const updatedReport = await StockReport.findOneAndUpdate(
           { itemId: id }, // Search for the report with this User ID
           updatedData, // New data to update
           { new: true } // Return the updated document
       );
 
       if (!updatedReport) {
           return res.status(404).json({
               message: "Report not found"
           });
       }
       res.status(200).json({
         message: "Report updated successfully",
         report: updatedReport
     });
 } catch (error) {
     res.status(500).json({
         message: "Failed to update report",
         error: error.message
     });
 }
 }
 