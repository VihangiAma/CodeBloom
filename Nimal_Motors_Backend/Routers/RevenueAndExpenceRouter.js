import express from  "express";
import {CreateRevenueAndExpenseReport,getRevenueAndExpenseReport} from "../Controllers/RevenueandExpenceController.js";

const RevenueandexpencesRouter = express.Router();

RevenueandexpencesRouter.post("/",CreateRevenueAndExpenseReport);
RevenueandexpencesRouter.get("/",getRevenueAndExpenseReport);

export default RevenueandexpencesRouter;