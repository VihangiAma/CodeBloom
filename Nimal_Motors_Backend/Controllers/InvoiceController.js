import Invoice from "../Models/Invoice.js";

import ServiceInvoice from "../Models/ServiceInvoiceModel.js"; // ✅ Import supervisor model

export const createAccountantInvoice = async (req, res) => {
  try {
    const { serviceInvoiceId, invoiceNo, advance, balance } = req.body;

    if (!serviceInvoiceId || !invoiceNo || advance === undefined || balance === undefined) {
      return res.status(400).json({ message: "All required fields must be provided." });
    }

    // Check for duplicate invoice number
    const exists = await Invoice.findOne({ invoiceNo });
    if (exists) {
      return res.status(409).json({ message: "Invoice number already exists." });
    }

    // Save accountant-side invoice
    const newInvoice = new Invoice({
      serviceInvoiceId,
      invoiceNo,
      advance,
      balance,
      finalizedAt: new Date(),
    });

    await newInvoice.save();

    // ✅ Update related supervisor-side invoice status
    await ServiceInvoice.findByIdAndUpdate(serviceInvoiceId, {
      status: "finalized",
    });

    res.status(201).json(newInvoice);
  } catch (error) {
    console.error("Error creating accountant invoice:", error);
    res.status(500).json({ message: "Server error", error });
  }
};


// Get all accountant invoices
export const getAllAccountantInvoices = async (req, res) => {
  try {
    const invoices = await Invoice.find().populate("serviceInvoiceId");
    res.status(200).json(invoices);
  } catch (error) {
    console.error("Error fetching invoices:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

// Get single invoice by ID
export const getAccountantInvoiceById = async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.id).populate("serviceInvoiceId");
    if (!invoice) {
      return res.status(404).json({ message: "Invoice not found" });
    }
    res.status(200).json(invoice);
  } catch (error) {
    console.error("Error fetching invoice by ID:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

// Delete an invoice by ID
export const deleteAccountantInvoice = async (req, res) => {
  try {
    const deleted = await Invoice.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Invoice not found." });
    }
    res.status(200).json({ message: "Invoice deleted successfully." });
  } catch (err) {
    console.error("Delete error:", err.message);
    res.status(500).json({ message: "Failed to delete invoice", error: err.message });
  }
};
