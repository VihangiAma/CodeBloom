import BodyShopSection from "../Models/BodyShopSection.js";

// Create a new body shop service
export const createBodyShopService = async (req, res) => {
  try {
    const newService = new BodyShopSection(req.body);
    const savedService = await newService.save();
    res.status(201).json(savedService);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all body shop services
export const getAllBodyShopServices = async (req, res) => {
  try {
    const services = await BodyShopSection.find();
    res.status(200).json(services);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single service by ID
export const getBodyShopServiceById = async (req, res) => {
  try {
    const service = await BodyShopSection.findById(req.params.id);
    if (!service) return res.status(404).json({ message: "Service not found" });
    res.status(200).json(service);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a service by ID
export const updateBodyShopService = async (req, res) => {
  try {
    const updatedService = await BodyShopSection.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedService) return res.status(404).json({ message: "Service not found" });
    res.status(200).json(updatedService);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a service by ID
export const deleteBodyShopService = async (req, res) => {
  try {
    const deletedService = await BodyShopSection.findByIdAndDelete(req.params.id);
    if (!deletedService) return res.status(404).json({ message: "Service not found" });
    res.status(200).json({ message: "Service deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
