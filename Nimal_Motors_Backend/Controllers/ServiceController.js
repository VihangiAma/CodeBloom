

import ServiceSection from "../Models/ServiceSection.js";

// Create Service
export function createService(req, res) {
  try {
    const newService = new ServiceSection(req.body);
    newService.save();
    res.status(201).json({ message: "Service Created", data: newService });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Get All Services
export function getAllServices(req, res) {
  try {
    const services = ServiceSection.find();
    res.status(200).json(services);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Update Service Status
export function updateService(req, res) {
  try {
    const { id } = req.params;
    const updatedService = ServiceSection.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json({ message: "Service Updated", data: updatedService });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Delete Service
export function deleteService(req, res) {
  try {
    const { id } = req.params;
    ServiceSection.findByIdAndDelete(id);
    res.status(200).json({ message: "Service Deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

