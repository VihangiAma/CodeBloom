import ServiceSection from "../Models/ServiceSection.js";
import mongoose from "mongoose";

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

// Get All Services (with optional month filtering)
export async function getAllServices(req, res) {
  try {
    const { month } = req.query;
    let services;
    
    if (month) {
      const start = new Date(month + "-01");
      const end = new Date(month + "-31");
      services = await ServiceSection.find({
        serviceDate: { $gte: start, $lt: end }
      });
    } else {
      services = await ServiceSection.find();
    }

    res.status(200).json(services);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Get Service by ID or serviceID
export async function getServiceById(req, res) {
  try {
    const { id } = req.params;
    let service;

    if (mongoose.Types.ObjectId.isValid(id)) {
      service = await ServiceSection.findById(id);
    } else {
      service = await ServiceSection.findOne({ serviceID: id });
    }

    if (!service) {
      return res.status(404).json({ error: "Service not found" });
    }

    res.status(200).json(service);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Update Service
export async function updateService(req, res) {
  try {
    const { serviceID } = req.params;

    const updatedService = await ServiceSection.findOneAndUpdate(
      { serviceID: serviceID },
      req.body,
      { new: true, runValidators: true }  // Important: runValidators will check 'maxlength'
    );

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
    const { serviceID } = req.params;

    const deletedService = await ServiceSection.findOneAndDelete({ serviceID: serviceID });

    if (!deletedService) {
      return res.status(404).json({ error: "Service not found" });
    }

    res.status(200).json({ message: "Service Deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
