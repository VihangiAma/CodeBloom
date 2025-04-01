
import RepairSection from "../Models/RepairSection.js";

// Create Repair
export function createRepair(req, res) {
  try {
    const newRepair = new RepairSection(req.body);
    newRepair.save();
    res.status(201).json({ message: "Repair Created", data: newRepair });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Get All Repairs
export function getAllRepairs(req, res) {
  try {
    const repairs = RepairSection.find();
    res.status(200).json(repairs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Update Repair Status
export function updateRepair(req, res) {
  try {
    const { id } = req.params;
    const updatedRepair = RepairSection.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json({ message: "Repair Updated", data: updatedRepair });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Delete Repair
export function deleteRepair(req, res) {
  try {
    const { id } = req.params;
    RepairSection.findByIdAndDelete(id);
    res.status(200).json({ message: "Repair Deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

