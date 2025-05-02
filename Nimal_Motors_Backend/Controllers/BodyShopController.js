import BodyShopSection from "../Models/BodyShopSection.js";

// Create a new Body Shop service entry
export const createService = async (req, res) => {
  try {
    const newService = new BodyShopSection(req.body);
    const savedService = await newService.save();
    res.status(201).json(savedService);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all Body Shop services
export const getAllServices = async (req, res) => {
  try {
    const services = await BodyShopSection.find();
    res.status(200).json(services);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single Body Shop service by serviceID (e.g., BS001)
export const getServiceById = async (req, res) => {
  try {
    const service = await BodyShopSection.findOne({ serviceID: req.params.serviceID });
    if (!service) return res.status(404).json({ message: "Service not found" });
    res.status(200).json(service);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a Body Shop service by serviceID
export const updateService = async (req, res) => {
  try {
    const updatedService = await BodyShopSection.findOneAndUpdate(
      { serviceID: req.params.serviceID },
      req.body,
      { new: true }
    );
    if (!updatedService) return res.status(404).json({ message: "Service not found" });
    res.status(200).json(updatedService);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a Body Shop service by serviceID
export const deleteService = async (req, res) => {
  try {
    const deletedService = await BodyShopSection.findOneAndDelete({ serviceID: req.params.serviceID });
    if (!deletedService) return res.status(404).json({ message: "Service not found" });
    res.status(200).json({ message: "Service deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
