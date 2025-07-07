import ServiceInvoice from '../Models/ServiceInvoiceModel.js';
import Stock from '../Models/Stock.js';

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

    // 1. Calculate total cost
    let totalCost = parseFloat(repairCost) || 0;

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

    // 2. Deduct stock for spare parts
    if (items && Array.isArray(items)) {
      for (const item of items) {
        const { itemId, qty } = item;
        if (!itemId || !qty) continue;

        const stockItem = await Stock.findOne({ itemId });

        if (!stockItem) {
          return res.status(400).json({ message: `Stock item with ID ${itemId} not found.` });
        }

        if (stockItem.stockQuantity < qty) {
          return res.status(400).json({
            message: `Insufficient stock for ${stockItem.itemName}. Available: ${stockItem.stockQuantity}, Requested: ${qty}`
          });
        }

        stockItem.stockQuantity -= qty;
        stockItem.lastUpdated = Date.now();
        await stockItem.save();
      }
    }

    // 3. Save invoice
    const invoice = new ServiceInvoice({
      serviceID,
      customerName,
      vehicleNumber,
      vehicleType,
      description: description || "",
      section: section || "",
      services: services || {},
      items: Array.isArray(items) ? items : [],
      repairCost,
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
// export const getApprovedInvoices = async (req, res) => {
//   try {
//     const invoices = await ServiceInvoice.find({ isApproved: true }).populate('submittedBy', 'name email');
//     res.status(200).json(invoices);
//   } catch (error) {
//     res.status(500).json({ message: 'Failed to fetch approved invoices', error: error.message });
//   }
// };


