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


// import RepairPackage from "../Models/RepairPackage.js";

// // GET all packages
// export const getAllPackages = async (req, res) => {
//   try {
//     const packages = await RepairPackage.find();
//     res.json(packages);
//   } catch (err) {
//     res.status(500).json({ error: "Server error fetching packages" });
//   }
// };

// // CREATE a new package
// export const createPackage = async (req, res) => {
//   const { packageName } = req.body;
//   try {
//     const newPackage = new RepairPackage({ packageName, repairs: [] });
//     await newPackage.save();
//     res.status(201).json(newPackage);
//   } catch (err) {
//     res.status(400).json({ error: "Could not create package", details: err });
//   }
// };

// // UPDATE repairs (used to add/edit repairs list)
// export const updatePackageRepairs = async (req, res) => {
//   const { id } = req.params;
//   const { repairs } = req.body;

//   try {
//     const existing = await RepairPackage.findById(id);
//     if (!existing) return res.status(404).json({ error: "Package not found" });

//     // Allow prices only for Full Service
//     const updatedRepairs = repairs.map((r) => ({
//       label: r.label || r,
//       price: existing.packageName === "Full Service" ? (r.price || 0) : 0,
//     }));

//     existing.repairs = updatedRepairs;
//     await existing.save();
//     res.json(existing);
//   } catch (err) {
//     res.status(500).json({ error: "Failed to update repairs", details: err });
//   }
// };

// // DELETE package
// export const deletePackage = async (req, res) => {
//   try {
//     await RepairPackage.findByIdAndDelete(req.params.id);
//     res.json({ message: "Package deleted" });
//   } catch (err) {
//     res.status(500).json({ error: "Failed to delete package" });
//   }
// };
