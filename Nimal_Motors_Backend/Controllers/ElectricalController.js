import ElectricalSection from "../Models/ElectricalSection.js";

// Create a new electrical service appointment
export const createElectricalEntry = async (req, res) => {
  try {
    const newEntry = new ElectricalSection(req.body);
    const savedEntry = await newEntry.save();
    res.status(201).json(savedEntry);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all electrical service entries
export const getAllElectricalEntries = async (req, res) => {
  try {
    const entries = await ElectricalSection.find().sort({ serviceDate: -1 });
    res.status(200).json(entries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single electrical entry by serviceID
export const getElectricalEntryById = async (req, res) => {
  try {
    const entry = await ElectricalSection.findOne({ serviceID: req.params.id });
    if (!entry) return res.status(404).json({ message: "Entry not found" });
    res.status(200).json(entry);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update an electrical entry by serviceID
export const updateElectricalEntry = async (req, res) => {
  try {
    const updatedEntry = await ElectricalSection.findOneAndUpdate(
      { serviceID: req.params.id },
      req.body,
      { new: true }
    );
    if (!updatedEntry) return res.status(404).json({ message: "Entry not found" });
    res.status(200).json(updatedEntry);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete an electrical entry by serviceID
export const deleteElectricalEntry = async (req, res) => {
  try {
    const deletedEntry = await ElectricalSection.findOneAndDelete({ serviceID: req.params.id });
    if (!deletedEntry) return res.status(404).json({ message: "Entry not found" });
    res.status(200).json({ message: "Entry deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
