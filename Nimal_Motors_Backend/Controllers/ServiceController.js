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
    const { month } = req.query;  // Get 'month' from query parameters
    let services;
    
    if (month) {
      const start = new Date(month + "-01"); // Get the start of the month
      const end = new Date(month + "-31");   // Get the end of the month
      services = await ServiceSection.find({
        serviceDate: { $gte: start, $lt: end }  // Find services in that month
      });
    } else {
      services = await ServiceSection.find();  // Get all services if no month filter
    }

    res.status(200).json(services);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Get Service by ID or Custom serviceID
export async function getServiceById(req, res) {
  try {
    const { id } = req.params;
    let service;

    if (mongoose.Types.ObjectId.isValid(id)) {
      // If it's a valid ObjectId, search by _id
      service = await ServiceSection.findById(id);
    } else {
      // If it's not an ObjectId, search by serviceID field
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

// Update Service Status
export async function updateService(req, res) {
  try {
    const { serviceID } = req.params; // Change 'id' to 'serviceID'

    // Find and update the service using serviceID
    const updatedService = await ServiceSection.findOneAndUpdate(
      { serviceID: serviceID },  // Find by serviceID instead of _id
      req.body, 
      { new: true } // Return the updated document
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
    const { serviceID } = req.params; // Change 'id' to 'serviceID'

    // Find and delete the service using serviceID
    const deletedService = await ServiceSection.findOneAndDelete({ serviceID: serviceID });

    if (!deletedService) {
      return res.status(404).json({ error: "Service not found" });
    }

    res.status(200).json({ message: "Service Deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
