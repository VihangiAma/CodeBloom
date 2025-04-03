import ServiceSection from "../Models/ServiceSection.js";

// Create Service
export async function createService(req, res) {
  try {
    const newService = new ServiceSection(req.body);
    await newService.save();
    res.status(201).json({ message: "Service Created", data: newService });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Get All Services
export async function getAllServices(req, res) {
  try {
    const services = await ServiceSection.find();
    res.status(200).json(services);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Update Service Status
export async function updateService(req, res) {
  try {
    const { id } = req.params;
    const updatedService = await ServiceSection.findByIdAndUpdate(id, req.body, { new: true });

    if (!updatedService) {
      return res.status(404).json({ error: "Service not found" });
    }

    res.status(200).json({ message: "Service Updated", data: updatedService });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Delete Service
export async function deleteService(req, res) {
  try {
    const { id } = req.params;
    const deletedService = await ServiceSection.findByIdAndDelete(id);

    if (!deletedService) {
      return res.status(404).json({ error: "Service not found" });
    }

    res.status(200).json({ message: "Service Deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
