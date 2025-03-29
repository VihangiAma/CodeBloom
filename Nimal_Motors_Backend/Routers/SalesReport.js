import express from 'express'
import{CreateSalesReport}from '../Controllers/SalesReport.js'

const SalesRoter = express.Router();
SalesRoter.post("/",CreateSalesReport);

export default SalesRoter;