import express from 'express';
import {
  createInvoice,
  getAllInvoices,
  getInvoiceById,
  updateInvoiceApproval,
  deleteInvoice,
 // getApprovedInvoices
} from '../Controllers/ServiceInvoiceController.js';

const router = express.Router();

// Routes
router.post('/', createInvoice);
router.get('/', getAllInvoices);
router.get('/:id', getInvoiceById);
router.put('/:id/approve', updateInvoiceApproval);
router.delete('/:id', deleteInvoice);
// New Route for accountant to fetch only approved invoices
//router.get("/approved", getApprovedInvoices);


export default router;
