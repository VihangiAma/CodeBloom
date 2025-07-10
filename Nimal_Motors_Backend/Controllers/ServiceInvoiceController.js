

import ServiceInvoice from "../Models/ServiceInvoiceModel.js";

// Create a new invoice
export const createInvoice = async (req, res) => {
  try {
    const invoice = new ServiceInvoice(req.body);
    await invoice.save();
    res.status(201).json(invoice);
  } catch (error) {
    console.error("Create Invoice Error:", error);
    res.status(400).json({ message: "Failed to create invoice", error });
  }
};

// Get all invoices
export const getAllInvoices = async (req, res) => {
  try {
    const invoices = await ServiceInvoice.find().populate("submittedBy");
    res.status(200).json(invoices);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch invoices", error });
  }
};

// Get single invoice by ID
export const getInvoiceById = async (req, res) => {
  try {
    const invoice = await ServiceInvoice.findById(req.params.id).populate("submittedBy");
    if (!invoice) return res.status(404).json({ message: "Invoice not found" });
    res.status(200).json(invoice);
  } catch (error) {
    res.status(500).json({ message: "Error fetching invoice", error });
  }
};

// Update invoice by ID
export const updateInvoice = async (req, res) => {
  try {
    const updated = await ServiceInvoice.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updated) return res.status(404).json({ message: "Invoice not found" });
    res.status(200).json(updated);
  } catch (error) {
    console.error("Update Invoice Error:", error);
    res.status(400).json({ message: "Failed to update invoice", error });
  }
};

// Delete invoice by ID
export const deleteInvoice = async (req, res) => {
  try {
    const deleted = await ServiceInvoice.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Invoice not found" });
    res.status(200).json({ message: "Invoice deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting invoice", error });
  }
};

