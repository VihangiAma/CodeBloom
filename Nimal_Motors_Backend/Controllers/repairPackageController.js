import RepairPackage from "../Models/RepairPackage.js";

// Create a single package
export const createRepairPackage = async (req, res) => {
  try {
    const { packageName, repairs } = req.body;
    const exists = await RepairPackage.findOne({ packageName });
    if (exists) {
      return res.status(400).json({ message: "Package already exists" });
    }
    const newPackage = new RepairPackage({ packageName, repairs });
    const saved = await newPackage.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ message: "Error creating package", error: err });
  }
};

// Get all
export const getAllRepairPackages = async (_req, res) => {
  try {
    const packages = await RepairPackage.find().sort({ createdAt: -1 });
    res.status(200).json(packages);
  } catch (err) {
    res.status(500).json({ message: "Error fetching packages", error: err });
  }
};

// Delete one
export const deleteRepairPackage = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await RepairPackage.findByIdAndDelete(id);
    if (!deleted)
      return res.status(404).json({ message: "Package not found" });
    res.status(200).json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting package", error: err });
  }
};

// Update package
export const updateRepairPackage = async (req, res) => {
  try {
    const { id } = req.params;
    const { packageName, repairs } = req.body;
    const updated = await RepairPackage.findByIdAndUpdate(
      id,
      { packageName, repairs },
      { new: true }
    );
    if (!updated)
      return res.status(404).json({ message: "Package not found" });
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ message: "Error updating package", error: err });
  }
};
