import express from 'express';
import {
  createInvoice,
  getAllInvoices,
  getInvoiceById,
  getApprovedInvoices,
  updateInvoiceApproval,
  deleteInvoice,
  // updateInvoice
} from '../Controllers/ServiceInvoiceController.js';

const router = express.Router();

//  Create a new invoice
router.post('/', createInvoice);

// Get only approved invoices (Must be BEFORE '/:id')
router.get('/approved', getApprovedInvoices);

//  Get all invoices
router.get('/', getAllInvoices);

// Get invoice by ID
router.get('/:id', getInvoiceById);

//  Approve or update approval status
router.put('/:id/approve', updateInvoiceApproval);

//  Delete invoice
router.delete('/:id', deleteInvoice);

// // Update full invoice data
// router.put('/:id', updateInvoice);

export default router;
