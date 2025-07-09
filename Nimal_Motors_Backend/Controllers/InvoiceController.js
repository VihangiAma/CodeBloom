import Invoice from "../Models/Invoice.js";
import ServiceInvoiceModel from "../Models/ServiceInvoiceModel.js"; // ✅ include this

export const createInvoice = async (req, res) => {
  try {
    const {
      invoiceNo,
      relatedServiceInvoiceId,
      presentMeter,
      advance,
    } = req.body;

    // ✅ Validate required fields
    if (!invoiceNo || !relatedServiceInvoiceId) {
      return res.status(400).json({ message: "Invoice number and service invoice ID are required." });
    }

    // ✅ Fetch data from ServiceInvoice
    const serviceInvoice = await ServiceInvoiceModel.findById(relatedServiceInvoiceId);
    if (!serviceInvoice || !serviceInvoice.isApproved) {
      return res.status(404).json({ message: "Approved Service Invoice not found." });
    }

    const totalAmount = serviceInvoice.totalCost;
    const balance = totalAmount - (advance || 0);

    // ✅ Map supervisor's items to accountant format
    const invoiceItems = serviceInvoice.items.map((item) => ({
      section: serviceInvoice.section,
      description: item.description,
      qty: item.qty,
      amount: item.cost * item.qty,
    }));

    const newInvoice = new Invoice({
      invoiceNo,
      customerName: serviceInvoice.customerName,
      vehicleNo: serviceInvoice.vehicleNumber,
      presentMeter,
      items: invoiceItems,
      totalAmount,
      advance: advance || 0,
      balance,
      relatedServiceInvoiceId,
    });

    await newInvoice.save();

    res.status(201).json({ message: "Invoice created successfully", invoice: newInvoice });
  } catch (error) {
    console.error("Error creating invoice:", error);
    res.status(500).json({ message: "Server error creating invoice" });
  }
};
