import express from 'express'
import{CreateSalesReport,getSalesReport,deleteSalesReport, updateSalesReport}from '../Controllers/SalesReport.js'

const SalesRoter = express.Router();

SalesRoter.post("/",CreateSalesReport);
SalesRoter.get("/",getSalesReport);
SalesRoter.delete("/:id",deleteSalesReport);
SalesRoter.put("/:id",updateSalesReport);

export default SalesRoter;