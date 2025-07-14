
import Stock from '../Models/Stock.js';
import ServiceInvoice from "../Models/ServiceInvoiceModel.js";

// Create a new invoice
export const createInvoice = async (req, res) => {
  try {
    console.log('📦 Incoming payload:', req.body);   // <‑‑ add
    const invoiceData = {
      ...req.body,
      status: 'pending',
      isApproved: false,
    };
     // ✅ Deduct stock for non-custom items
    for (const item of invoiceData.items || []) {
      const stockItem = await Stock.findOne({ itemName: item.itemName });

      if (stockItem) {
        if (stockItem.stockQuantity < item.qty) {
          return res.status(400).json({
            message: `Insufficient stock for ${item.itemName}`,
          });
        }

        stockItem.stockQuantity -= item.qty;
        await stockItem.save(); // ✅ Save updated stock
      }
    }

    const invoice = new ServiceInvoice(invoiceData);
    await invoice.save();
    res.status(201).json(invoice);
  } catch (err) {
    console.error('❌ Error saving invoice:', err);  // already prints stack
    res.status(400).json({ message: err.message }); // this bubble up to the browser
  }
};

// Get all invoices
export const getAllInvoices = async (req, res) => {
  try {
    const { isApproved } = req.query; // e.g. /api/invoice?isApproved=false
    const filter = {};

    if (isApproved !== undefined) {
      filter.isApproved = isApproved === "true";
    }

    const invoices = await ServiceInvoice.find(filter).populate("submittedBy");
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

//Update invoice by ID
export const updateInvoice = async (req, res) => {
  try {
    const update = {...req.body };
    if (update.status === "rejected" ) {
      update.status = "resubmitted";
      update.isApproved = false;
    }
    const updated = await ServiceInvoice.findByIdAndUpdate(
      req.params.id,
      update,

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

// PATCH /api/invoice/:id/approve
export const approveInvoice = async (req, res) => {
  try {
    const invoice = await ServiceInvoice.findByIdAndUpdate(
      req.params.id,
      {
        isApproved: true,
        status: "approved",
      },
      { new: true }
    );
    if (!invoice) return res.status(404).json({ message: "Not found" });
    res.status(200).json(invoice);
  } catch (error) {
    res.status(500).json({ message: "Approval failed", error });
  }
};

// PATCH /api/invoice/:id/reject
export const rejectInvoice = async (req, res) => {
  try {
    const invoice = await ServiceInvoice.findByIdAndUpdate(
      req.params.id,
      {
        isApproved: false,
        status: "rejected",
        adminRemarks: req.body.adminRemarks || "", // optional message
      },
      { new: true }
    );
    if (!invoice) return res.status(404).json({ message: "Not found" });
    res.status(200).json(invoice);
  } catch (error) {
    res.status(500).json({ message: "Rejection failed", error });
  };

};



export const bulkDeleteInvoices = async (req, res) => {
  try {
    const { ids } = req.body;

    if (!Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ message: "No invoice IDs provided." });
    }

    const result = await ServiceInvoice.deleteMany({ _id: { $in: ids } });

    res.status(200).json({
      message: `Deleted ${result.deletedCount} invoice(s)`,
    });
  } catch (error) {
    console.error("Bulk delete error:", error);
    res.status(500).json({ message: "Bulk delete failed", error });
  }
};



// Update status after accountant finalizes the invoice
export const finalizeServiceInvoice = async (req, res) => {
  try {
    const invoiceId = req.params.id;

    const updatedInvoice = await ServiceInvoice.findByIdAndUpdate(
      invoiceId,
      {
        status: "Finalized",   // ✅ Status set to Finalized
        isApproved: false      // ✅ Remove from approved list
      },
      { new: true }
    );

    if (!updatedInvoice) {
      return res.status(404).json({ message: "Invoice not found" });
    }

    res.status(200).json({
      message: "Invoice finalized successfully",
      invoice: updatedInvoice,
    });
  } catch (error) {
    console.error("Error finalizing invoice:", error);
    res.status(500).json({ message: "Failed to finalize invoice", error });
  }
};
