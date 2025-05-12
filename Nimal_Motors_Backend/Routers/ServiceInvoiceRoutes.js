import express from 'express';
import {
  createInvoice,
  getAllInvoices,
  getInvoiceById,
  updateInvoiceApproval,
  deleteInvoice
} from '../Controllers/ServiceInvoiceController.js';

const router = express.Router();

// Routes
router.post('/api/invoice', createInvoice);
router.get('/', getAllInvoices);
router.get('/:id', getInvoiceById);
router.put('/:id/approve', updateInvoiceApproval);
router.delete('/:id', deleteInvoice);

export default router;
