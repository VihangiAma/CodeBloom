import ElectricalSection from "../Models/ElectricalSection.js";

// Create a new electrical service appointment
export const createElectricalService = async (req, res) => {
  try {
    const newService = new ElectricalSection(req.body);
    await newService.save();
    res.status(201).json(newService);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all electrical service appointments
export const getAllElectricalServices = async (req, res) => {
  try {
    const services = await ElectricalSection.find();
    res.json(services);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single electrical service by ID
export const getElectricalServiceById = async (req, res) => {
  try {
    const service = await ElectricalSection.findById(req.params.id);
    if (!service) return res.status(404).json({ message: "Service not found" });
    res.json(service);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update an electrical service by ID
export const updateElectricalService = async (req, res) => {
  try {
    const updatedService = await ElectricalSection.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedService) return res.status(404).json({ message: "Service not found" });
    res.json(updatedService);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete an electrical service by ID
export const deleteElectricalService = async (req, res) => {
  try {
    const deletedService = await ElectricalSection.findByIdAndDelete(req.params.id);
    if (!deletedService) return res.status(404).json({ message: "Service not found" });
    res.json({ message: "Service deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
