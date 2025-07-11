import express from "express";
import {
  createAccountantInvoice,
  getAllAccountantInvoices,
} from "../Controllers/InvoiceController.js";

const router = express.Router();

router.post("/", createAccountantInvoice);
router.get("/", getAllAccountantInvoices);

export default router;
