import Supplier from "../Models/supplier.js"; 

// Fetch all suppliers
export const getSuppliers = async (req, res) => {
    try {
        const suppliers = await Supplier.find();
        res.status(200).json(suppliers);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Fetch a supplier by ID
export const getSupplierById = async (req, res) => {
    const { id } = req.params;
    try {
        const supplier = await Supplier.findById(id);

        if (!supplier) {
            return res.status(404).json({ message: "Supplier not found." });
        }

        res.status(200).json(supplier);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Add a new supplier
export const addSupplier = async (req, res) => {
    const { supplierId, companyName, contactPerson, phoneNumber, email, address } = req.body;

    if (!supplierId || !companyName || !contactPerson || !phoneNumber || !email || !address) {
        return res.status(400).json({ message: "All fields are required." });
    }

    try {
        const newSupplier = new Supplier({
            supplierId,
            companyName,
            contactPerson,
            phoneNumber,
            email,
            address
        });

        await newSupplier.save();
        res.status(201).json({ message: "Supplier added successfully.", newSupplier });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a supplier by ID
export const updateSupplier = async (req, res) => {
    const { id } = req.params;
    const { companyName, contactPerson, phoneNumber, email, address } = req.body;

    try {
        const updatedSupplier = await Supplier.findByIdAndUpdate(
            id,
            { companyName, contactPerson, phoneNumber, email, address },
            { new: true }
        );

        if (!updatedSupplier) {
            return res.status(404).json({ message: "Supplier not found." });
        }

        res.status(200).json({ message: "Supplier updated successfully.", updatedSupplier });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a supplier by ID
export const deleteSupplier = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedSupplier = await Supplier.findByIdAndDelete(id);

        if (!deletedSupplier) {
            return res.status(404).json({ message: "Supplier not found." });
        }

        res.status(200).json({ message: "Supplier deleted successfully." });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
