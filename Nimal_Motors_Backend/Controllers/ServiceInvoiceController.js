import ServiceInvoice from '../Models/ServiceInvoiceModel.js';

// Create a new invoice
export const createInvoice = async (req, res) => {
  try {
    const {
      serviceID,
      customerName,
      vehicleNumber,
      vehicleType,
      description,
      section,
      services,
      items,
      repairCost,
      submittedBy,
      adminRemarks
    } = req.body;

    // Calculate total cost from repairCost + services + items
    let totalCost = parseFloat(repairCost) ;

    if (services) {
      for (const key in services) {
        if (services[key].selected) {
          totalCost += parseFloat(services[key].cost) || 0;
        }
      }
    }

    if (items) {
      for (const item of items) {
        const cost = parseFloat(item.cost) || 0;
        const qty = parseInt(item.qty) || 0;
        totalCost += qty * cost;
      }
    }

    const invoice = new ServiceInvoice({
      serviceID,
      customerName,
      vehicleNumber,
      vehicleType,
      description: description || "",
      section: section || "",
      services: services || {},             // Default empty object
      items: Array.isArray(items) ? items : [],
      repairCost,               // Assuming service cost is part of total cost
      totalCost,
      submittedBy,
      adminRemarks
    });

    await invoice.save();

    res.status(201).json({ message: "Invoice created successfully", invoice });
  } catch (error) {
    console.error("Error creating invoice:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

// Get all invoices
export const getAllInvoices = async (req, res) => {
  try {
    const invoices = await ServiceInvoice.find().populate('submittedBy', 'name email');
    res.status(200).json(invoices);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch invoices', error: error.message });
  }
};

// Get a single invoice
export const getInvoiceById = async (req, res) => {
  try {
    const invoice = await ServiceInvoice.findById(req.params.id).populate('submittedBy', 'name email');
    if (!invoice) return res.status(404).json({ message: 'Invoice not found' });
    res.status(200).json(invoice);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch invoice', error: error.message });
  }
};

// Update approval status
export const updateInvoiceApproval = async (req, res) => {
  try {
    const { isApproved, adminRemarks } = req.body;
    const invoice = await ServiceInvoice.findByIdAndUpdate(
      req.params.id,
      { isApproved, adminRemarks },
      { new: true }
    );
    if (!invoice) return res.status(404).json({ message: 'Invoice not found' });
    res.status(200).json(invoice);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update approval status', error: error.message });
  }
};

// Delete invoice
export const deleteInvoice = async (req, res) => {
  try {
    const deleted = await ServiceInvoice.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Invoice not found' });
    res.status(200).json({ message: 'Invoice deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete invoice', error: error.message });
  }
};


