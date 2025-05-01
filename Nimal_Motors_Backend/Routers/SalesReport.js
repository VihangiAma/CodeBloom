import express from  "express";
import {CreateSalesReport,getSalesReport,deleteSalesReport,updateSalesReport} from '../Controllers/SalesReport.js'

const SalesRouter = express.Router();

SalesRouter.post("/",CreateSalesReport);
SalesRouter.get("/",getSalesReport);
SalesRouter.delete("/:id",deleteSalesReport);
SalesRouter.put("/:id",updateSalesReport);

export default SalesRouter;

