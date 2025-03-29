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