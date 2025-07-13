import Supplier from "../models/supplier.js";

// GET all suppliers
export const getSuppliers = async (req, res) => {
  try {
    const suppliers = await Supplier.find();
    res.json(suppliers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST: register a new supplier
export const addSupplier = async (req, res) => {
  const { supplierId, companyName, contactPerson, phoneNumber, email, address } = req.body;

  if (!supplierId || !companyName || !contactPerson || !phoneNumber || !email || !address) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    const existing = await Supplier.findOne({ $or: [{ companyName }, { supplierId }, { email }] });
    if (existing) {
      return res.status(409).json({ message: "Supplier already exists." });
    }

    const newSupplier = new Supplier({ supplierId, companyName, contactPerson, phoneNumber, email, address });
    await newSupplier.save();
    res.status(201).json(newSupplier);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
// Update supplier contact details
export const updateSupplierContact = async (req, res) => {
  const { supplierId } = req.params;
  const { contactPerson, phoneNumber, email, address } = req.body;

  try {
    const updatedSupplier = await Supplier.findOneAndUpdate(
      { supplierId },
      { contactPerson, phoneNumber, email, address },
      { new: true, runValidators: true }
    );

    if (!updatedSupplier) {
      return res.status(404).json({ message: "Supplier not found" });
    }

    res.status(200).json(updatedSupplier);
  } catch (error) {
    console.error("Error updating supplier:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// DELETE supplier by supplierId
export const deleteSupplier = async (req, res) => {
  const { supplierId } = req.params;

  try {
    const deleted = await Supplier.findOneAndDelete({ supplierId });

    if (!deleted) {
      return res.status(404).json({ message: "Supplier not found" });
    }

    res.status(200).json({ message: "Supplier deleted successfully" });
  } catch (error) {
    console.error("Delete supplier error:", error);
    res.status(500).json({ message: "Failed to delete supplier", error });
  }
};
