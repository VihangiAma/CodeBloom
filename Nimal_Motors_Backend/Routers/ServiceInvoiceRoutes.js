
import express from "express";
import {
  createInvoice,
  getAllInvoices,
  getInvoiceById,
  updateInvoice,
  deleteInvoice,
  approveInvoice,
  rejectInvoice,
 // getAllApprovedInvoices
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

// Admin approval actions
router.patch("/:id/approve", approveInvoice);  
router.patch("/:id/reject", rejectInvoice);  

//router.get("/approved", getAllApprovedInvoices);

//router.get("/approved", getAllApprovedInvoices); 

export default router;
