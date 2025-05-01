import express from  "express";
import {getInventoryReport}from "../Controllers/InventoryReportController.js"

const InventoryReportRouters = express.Router();


InventoryReportRouters .get("/",getInventoryReport);


export default InventoryReportRouters ;