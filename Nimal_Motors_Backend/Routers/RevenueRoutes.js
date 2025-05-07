import express from  "express";
import {CreateRevenueReport,getRevenueReport} from "../Controllers/RevenueController.js"

const RevenueRouter = express.Router();

RevenueRouter.post("/",CreateRevenueReport);
RevenueRouter.get("/",getRevenueReport);

export default RevenueRouter;