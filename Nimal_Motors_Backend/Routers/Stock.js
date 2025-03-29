import express from 'express'
import{CreateStockReport,getStockReport,deleteStockReport, updateStockReport}from '../Controllers/StockReport.js'

const StockRoter = express.Router();

StockRoter.post("/",CreateStockReport);
StockRoter.get("/",getStockReport);
StockRoter.delete("/:id",deleteStockReport);
StockRoter.put("/:id",updateStockReport);

export default StockRoter;