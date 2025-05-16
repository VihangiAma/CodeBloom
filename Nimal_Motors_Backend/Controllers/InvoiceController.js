import Invoice from "../Models/Invoice.js";

// Add a new invoice
export const createInvoice = async (req, res) => {
  try {
    const {
      invoiceNo,
      customerName,
      vehicleNo,
      presentMeter,
      invoiceDate,
      items,
      totalAmount,
      advance,
      balance,
      relatedRepairId,
    } = req.body;

    // Basic validation
    if (!invoiceNo || !customerName || !vehicleNo || !items || !totalAmount || balance == null) {
      return res.status(400).json({ message: "Required fields missing." });
    }

    const newInvoice = new Invoice({
      invoiceNo,
      customerName,
      vehicleNo,
      presentMeter,
      invoiceDate,
      items,
      totalAmount,
      advance,
      balance,
      relatedRepairId,
    });

    await newInvoice.save();
    res.status(201).json({ message: "Invoice created successfully", invoice: newInvoice });
  } catch (error) {
    console.error("Error creating invoice:", error);
    res.status(500).json({ message: "Server error creating invoice" });
  }
};

// Get all invoices
export const getAllInvoices = async (req, res) => {
  try {
    const invoices = await Invoice.find().sort({ invoiceDate: -1 });
    res.json(invoices);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving invoices" });
  }
};

// Get a single invoice by ID
export const getInvoiceById = async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.id).populate("relatedRepairId");
    if (!invoice) {
      return res.status(404).json({ message: "Invoice not found" });
    }
    res.json(invoice);
  } catch (error) {
    res.status(500).json({ message: "Error fetching invoice" });
  }
};

// Delete an invoice
export const deleteInvoice = async (req, res) => {
  try {
    const deleted = await Invoice.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Invoice not found" });
    }
    res.json({ message: "Invoice deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting invoice" });
  }
};
