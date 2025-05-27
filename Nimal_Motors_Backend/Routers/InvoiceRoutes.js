import express from "express";
import {
  createInvoice,
  getAllInvoices,
  getInvoiceById,
  deleteInvoice,
} from "../Controllers/InvoiceController.js";

const router = express.Router();

router.post("/add", createInvoice);
router.get("/", getAllInvoices);
router.get("/:id", getInvoiceById);
router.delete("/:id", deleteInvoice);

export default router;
