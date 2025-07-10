
import express from "express";
import {
  createInvoice,
  getAllInvoices,
  getInvoiceById,
  updateInvoice,
  deleteInvoice,
} from "../Controllers/ServiceInvoiceController.js";

const router = express.Router();

// Create
router.post("/", createInvoice);

// Read
router.get("/", getAllInvoices);
router.get("/:id", getInvoiceById);

// Update
router.put("/:id", updateInvoice);

// Delete
router.delete("/:id", deleteInvoice);

export default router;
