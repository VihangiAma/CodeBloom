import MechanicalSection from "../Models/MechanicalSection.js";

// Create a new mechanical service
export const createMechanicalService = async (req, res) => {
  try {
    const newService = new MechanicalSection(req.body);
    await newService.save();
    res.status(201).json(newService);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all mechanical services
export const getAllMechanicalServices = async (req, res) => {
  try {
    const services = await MechanicalSection.find();
    res.json(services);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single mechanical service by ID
export const getMechanicalServiceById = async (req, res) => {
  try {
    const service = await MechanicalSection.findById(req.params.id);
    if (!service) return res.status(404).json({ message: "Service not found" });
    res.json(service);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a mechanical service by ID
export const updateMechanicalService = async (req, res) => {
  try {
    const updatedService = await MechanicalSection.findByIdAndUpdate(
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

// Delete a mechanical service by ID
export const deleteMechanicalService = async (req, res) => {
  try {
    const deletedService = await MechanicalSection.findByIdAndDelete(req.params.id);
    if (!deletedService) return res.status(404).json({ message: "Service not found" });
    res.json({ message: "Service deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
