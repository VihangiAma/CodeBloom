import BodyShopSection from "../Models/BodyShopSection.js";

// Create a new body shop service appointment
export const createBodyShopService = async (req, res) => {
  try {
    const newService = new BodyShopSection(req.body);
    await newService.save();
    res.status(201).json(newService);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all body shop service appointments
export const getAllBodyShopServices = async (req, res) => {
  try {
    const services = await BodyShopSection.find();
    res.json(services);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single body shop service by ID
export const getBodyShopServiceById = async (req, res) => {
  try {
    const service = await BodyShopSection.findById(req.params.id);
    if (!service) return res.status(404).json({ message: "Service not found" });
    res.json(service);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a body shop service by ID
export const updateBodyShopService = async (req, res) => {
  try {
    const updatedService = await BodyShopSection.findByIdAndUpdate(
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

// Delete a body shop service by ID
export const deleteBodyShopService = async (req, res) => {
  try {
    const deletedService = await BodyShopSection.findByIdAndDelete(req.params.id);
    if (!deletedService) return res.status(404).json({ message: "Service not found" });
    res.json({ message: "Service deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
