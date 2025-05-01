import MechanicalSection from "../Models/MechanicalSection.js";

// Create a new appointment
export const createMechanicalEntry = async (req, res) => {
  try {
    const newEntry = new MechanicalSection(req.body);
    const savedEntry = await newEntry.save();
    res.status(201).json(savedEntry);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all appointments
export const getAllMechanicalEntries = async (req, res) => {
  try {
    const entries = await MechanicalSection.find().sort({ serviceDate: -1 });
    res.status(200).json(entries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single appointment by serviceID
export const getMechanicalEntryById = async (req, res) => {
  try {
    const entry = await MechanicalSection.findOne({ serviceID: req.params.id });
    if (!entry) return res.status(404).json({ message: "Entry not found" });
    res.status(200).json(entry);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update an appointment
export const updateMechanicalEntry = async (req, res) => {
  try {
    const updatedEntry = await MechanicalSection.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedEntry) return res.status(404).json({ message: "Entry not found" });
    res.status(200).json(updatedEntry);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete an appointment
export const deleteMechanicalEntry = async (req, res) => {
  try {
    const deletedEntry = await MechanicalSection.findByIdAndDelete(req.params.id);
    if (!deletedEntry) return res.status(404).json({ message: "Entry not found" });
    res.status(200).json({ message: "Entry deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

