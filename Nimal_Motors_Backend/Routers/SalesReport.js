import express from 'express'
import{CreateSalesReport,getSalesReport,deleteSalesReport}from '../Controllers/SalesReport.js'

const SalesRoter = express.Router();

SalesRoter.post("/",CreateSalesReport);
SalesRoter.get("/",getSalesReport);
SalesRoter.delete("/:id",deleteSalesReport);

export default SalesRoter;