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
      services,
      items,
      submittedBy,
      adminRemarks
    } = req.body;

    // Calculate total cost from services and items
    let totalCost = 0;

    if (services) {
      for (const key in services) {
        if (services[key].selected) {
          totalCost += services[key].cost || 0;
        }
      }
    }

    if (items) {
      for (const item of items) {
        totalCost += (item.qty || 0) * (item.cost || 0);
      }
    }

    const newInvoice = new ServiceInvoice({
      serviceID,
      customerName,
      vehicleNumber,
      vehicleType,
      description,
      services,
      items,
      totalCost,
      submittedBy,
      adminRemarks
    });

    await newInvoice.save();
    res.status(201).json(newInvoice);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create invoice', error: error.message });
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
