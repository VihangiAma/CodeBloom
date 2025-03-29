import mongoose from "mongoose";
import SalesReport from '../Models/SalesReport.js';

//post function
export async function CreateSalesReport(req,res) {

    try {
        const Sreport = req.body;
        const newReport = new SalesReport(Sreport);

        await newReport.save();

        res.status(201).json({
            message: " Sales Report created successfully",
            Sreport: newReport

        });
        
    } catch (error) {
        res.status(500).json({
            message: "Report creation failed",
            error: error.message
           
        });
    }
    
}

// get function
 export async function getSalesReport(req,res) {
    try {
        const reports = await SalesReport.find(); // Retrieves all user reports
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
       const report = await SalesReport.findOneAndDelete({ itemId: id });
 
       if (!report) {
           return res.status(404).json({
               message: "Report not found"
           });
       }
 
       res.status(200).json({
           message: " Sales Report deleted successfully"
       });
   } catch (error) {
       res.status(500).json({
           message: "Failed to delete Sales  report",
           error: error.message
       });
   }
 }