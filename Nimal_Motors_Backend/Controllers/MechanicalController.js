// import MechanicalSection from "../Models/MechanicalSection.js";

// // Create a new service entry
// export const createService = async (req, res) => {
//   try {
//     const newService = new MechanicalSection(req.body);
//     const savedService = await newService.save();
//     res.status(201).json(savedService);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };

// // Get all service entries
// export const getAllServices = async (req, res) => {
//   try {
//     const services = await MechanicalSection.find();
//     res.status(200).json(services);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Get a single service by ID
// export const getServiceById = async (req, res) => {
//   try {
//     const service = await MechanicalSection.findById(req.params.id);
//     if (!service) return res.status(404).json({ message: "Service not found" });
//     res.status(200).json(service);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Update a service entry
// export const updateService = async (req, res) => {
//   try {
//     const updatedService = await MechanicalSection.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       { new: true }
//     );
//     if (!updatedService) return res.status(404).json({ message: "Service not found" });
//     res.status(200).json(updatedService);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };

// // Delete a service entry
// export const deleteService = async (req, res) => {
//   try {
//     const deletedService = await MechanicalSection.findByIdAndDelete(req.params.id);
//     if (!deletedService) return res.status(404).json({ message: "Service not found" });
//     res.status(200).json({ message: "Service deleted" });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

import MechanicalSection from "../Models/MechanicalSection.js";

// Create a new service entry
export const createService = async (req, res) => {
  try {
    // Check for uniqueness of serviceID, which is now a string starting with "MS"
    const existingService = await MechanicalSection.findOne({ serviceID: req.body.serviceID });
    if (existingService) {
      return res.status(400).json({ message: "ServiceID already exists. Please provide a unique ID." });
    }

    // Create a new service entry with the request body data
    const newService = new MechanicalSection(req.body);
    
    // Save the new service entry
    const savedService = await newService.save();
    res.status(201).json(savedService);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all service entries
export const getAllServices = async (req, res) => {
  try {
    const services = await MechanicalSection.find();
    res.status(200).json(services);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single service by ID (using serviceID for uniqueness)
export const getServiceById = async (req, res) => {
  try {
    const service = await MechanicalSection.findOne({ serviceID: req.params.serviceID });
    if (!service) return res.status(404).json({ message: "Service not found" });
    res.status(200).json(service);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a service entry
export const updateService = async (req, res) => {
  try {
    // Find the service by serviceID
    const updatedService = await MechanicalSection.findOneAndUpdate(
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

// Delete a service entry
export const deleteService = async (req, res) => {
  try {
    // Delete the service by serviceID
    const deletedService = await MechanicalSection.findOneAndDelete({ serviceID: req.params.serviceID });
    if (!deletedService) return res.status(404).json({ message: "Service not found" });
    res.status(200).json({ message: "Service deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

