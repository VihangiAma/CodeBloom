import AccountantInvoice from "../Models/Invoice.js";

export const createAccountantInvoice = async (req, res) => {
  try {
    const invoice = new AccountantInvoice(req.body);
    await invoice.save();
    res.status(201).json(invoice);
  } catch (error) {
    console.error("Failed to create accountant invoice:", error);
    res.status(500).json({ message: "Error creating invoice", error });
  }
};

export const getAllAccountantInvoices = async (req, res) => {
  try {
    const invoices = await AccountantInvoice.find().populate("serviceInvoiceId");
    res.status(200).json(invoices);
  } catch (error) {
    res.status(500).json({ message: "Error fetching invoices", error });
  }
};
