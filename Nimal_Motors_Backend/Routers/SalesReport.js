import express from  "express";
import {createSalesReport,getAllSalesReports,deleteSalesReport,updateSalesReport} from '../Controllers/SalesReport.js'

const SalesRouter = express.Router();

SalesRouter.post("/",createSalesReport);
SalesRouter.get("/",getAllSalesReports);
SalesRouter.delete("/:id",deleteSalesReport);
SalesRouter.put("/:id",updateSalesReport);

export default SalesRouter;

