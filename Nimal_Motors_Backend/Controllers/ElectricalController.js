// import ElectricalSection from "../Models/ElectricalSection.js";

// // Create a new electrical service entry
// export const createElectricalService = async (req, res) => {
//   try {
//     const newService = new ElectricalSection(req.body);
//     const savedService = await newService.save();
//     res.status(201).json(savedService);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };

// // Get all electrical service entries
// export const getAllElectricalServices = async (req, res) => {
//   try {
//     const services = await ElectricalSection.find();
//     res.status(200).json(services);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Get one electrical service by ID
// export const getElectricalServiceById = async (req, res) => {
//   try {
//     const service = await ElectricalSection.findById(req.params.id);
//     if (!service) return res.status(404).json({ message: "Service not found" });
//     res.status(200).json(service);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Update an electrical service
// export const updateElectricalService = async (req, res) => {
//   try {
//     const updatedService = await ElectricalSection.findByIdAndUpdate(
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

// // Delete an electrical service
// export const deleteElectricalService = async (req, res) => {
//   try {
//     const deletedService = await ElectricalSection.findByIdAndDelete(req.params.id);
//     if (!deletedService) return res.status(404).json({ message: "Service not found" });
//     res.status(200).json({ message: "Service deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };
import ElectricalSection from "../Models/ElectricalSection.js";

// Create a new service entry
export const createService = async (req, res) => {
  try {
    const newService = new ElectricalSection(req.body);
    const savedService = await newService.save();
    res.status(201).json(savedService);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all service entries
export const getAllServices = async (req, res) => {
  try {
    const services = await ElectricalSection.find();
    res.status(200).json(services);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single service by serviceID (e.g., ES001)
export const getServiceById = async (req, res) => {
  try {
    const service = await ElectricalSection.findOne({ serviceID: req.params.serviceID });
    if (!service) return res.status(404).json({ message: "Service not found" });
    res.status(200).json(service);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a service by serviceID
export const updateService = async (req, res) => {
  try {
    const updatedService = await ElectricalSection.findOneAndUpdate(
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

// Delete a service by serviceID
export const deleteService = async (req, res) => {
  try {
    const deletedService = await ElectricalSection.findOneAndDelete({ serviceID: req.params.serviceID });
    if (!deletedService) return res.status(404).json({ message: "Service not found" });
    res.status(200).json({ message: "Service deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
