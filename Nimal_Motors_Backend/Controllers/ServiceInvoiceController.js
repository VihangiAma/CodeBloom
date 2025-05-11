// import Invoice from "../Models/ServiceInvoiceModel.js";
// // Create a new invoice
// export const createInvoice = async (req, res) => {
//   try {
//     const newInvoice = new Invoice(req.body);
//     const savedInvoice = await newInvoice.save();

//     // Generate displayID like "IN001"
//     savedInvoice.displayID = `IN${String(savedInvoice.serviceID).padStart(3, "0")}`;
//     await savedInvoice.save();

//     res.status(201).json(savedInvoice);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };

// // Get all invoices
// export const getAllInvoices = async (req, res) => {
//   try {
//     const invoices = await Invoice.find();
//     res.status(200).json(invoices);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Get a single invoice by MongoDB _id
// export const getInvoiceById = async (req, res) => {
//   try {
//     const invoice = await Invoice.findById(req.params.id);
//     if (!invoice) return res.status(404).json({ message: "Invoice not found" });
//     res.status(200).json(invoice);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Update an invoice (e.g., mark as paid or canceled)
// export const updateInvoice = async (req, res) => {
//   try {
//     const updatedInvoice = await Invoice.findOneAndUpdate(
//       { serviceID: Number(req.params.id) },
//       { $set: req.body },
//       { new: true }
//     );
//     if (!updatedInvoice) {
//       return res.status(404).json({ message: "Invoice not found" });
//     }
//     res.status(200).json(updatedInvoice);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };

// // Delete an invoice
// export const deleteInvoice = async (req, res) => {
//   try {
//     const deletedInvoice = await Invoice.findOneAndDelete({
//       serviceID: Number(req.params.id)
//     });
//     if (!deletedInvoice) {
//       return res.status(404).json({ message: "Invoice not found" });
//     }
//     res.status(200).json({ message: "Invoice deleted" });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };
