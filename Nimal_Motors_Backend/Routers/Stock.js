import express from 'express'
import{CreateSalesReport,getSalesReport,deleteSalesReport, updateSalesReport}from '../Controllers/StockReport.js'

const StockRoter = express.Router();

StockRoter.post("/",CreateSalesReport);
StockRoter.get("/",getSalesReport);
StockRoter.delete("/:id",deleteSalesReport);
StockRoter.put("/:id",updateSalesReport);

export default StockRoter;