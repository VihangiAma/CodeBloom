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

import mongoose from "mongoose";

// Get Service by ID or Custom serviceId
export async function getServiceById(req, res) {
  try {
    const { id } = req.params;
    let service;

    if (mongoose.Types.ObjectId.isValid(id)) {
      // If it's a valid ObjectId, search by _id
      service = await ServiceSection.findById(id);
    } else {
      // If it's not an ObjectId, search by serviceId field
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
// export async function updateService(req, res) {
//   try {
//     const { id } = req.params;
//     const updatedService = await ServiceSection.findByIdAndUpdate(id, req.body, { new: true });

//     if (!updatedService) {
//       return res.status(404).json({ error: "Service not found" });
//     }

//     res.status(200).json({ message: "Service Updated", data: updatedService });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// }

export async function updateService(req, res) {
  try {
    const { serviceId } = req.params; // Change 'id' to 'serviceId'

    // Find and update the service using serviceId
    const updatedService = await ServiceSection.findOneAndUpdate(
      { serviceId: serviceId },  // Find by serviceId instead of _id
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
    const { serviceId } = req.params; // Change 'id' to 'serviceId'

    // Find and delete the service using serviceId
    const deletedService = await ServiceSection.findOneAndDelete({ serviceId: serviceId });

    if (!deletedService) {
      return res.status(404).json({ error: "Service not found" });
    }

    res.status(200).json({ message: "Service Deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

