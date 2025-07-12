import Invoice from "../Models/Invoice.js";

// Create new finalized invoice
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

    const newInvoice = new Invoice({
      serviceInvoiceId,
      invoiceNo,
      advance,
      balance,
    });

    await newInvoice.save();
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
