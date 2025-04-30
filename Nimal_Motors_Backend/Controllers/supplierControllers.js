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
