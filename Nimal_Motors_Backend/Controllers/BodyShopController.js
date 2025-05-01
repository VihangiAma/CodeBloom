import BodyShopSection from "../Models/BodyShopSection.js";

// Create a new body shop appointment
export const createBodyShopEntry = async (req, res) => {
  try {
    const newEntry = new BodyShopSection(req.body);
    const savedEntry = await newEntry.save();
    res.status(201).json(savedEntry);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all body shop entries
export const getAllBodyShopEntries = async (req, res) => {
  try {
    const entries = await BodyShopSection.find().sort({ serviceDate: -1 });
    res.status(200).json(entries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single body shop entry by serviceID
export const getBodyShopEntryById = async (req, res) => {
  try {
    const entry = await BodyShopSection.findOne({ serviceID: req.params.id });
    if (!entry) return res.status(404).json({ message: "Entry not found" });
    res.status(200).json(entry);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a body shop entry by serviceID
export const updateBodyShopEntry = async (req, res) => {
  try {
    const updatedEntry = await BodyShopSection.findOneAndUpdate(
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

// Delete a body shop entry by serviceID
export const deleteBodyShopEntry = async (req, res) => {
  try {
    const deletedEntry = await BodyShopSection.findOneAndDelete({ serviceID: req.params.id });
    if (!deletedEntry) return res.status(404).json({ message: "Entry not found" });
    res.status(200).json({ message: "Entry deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
