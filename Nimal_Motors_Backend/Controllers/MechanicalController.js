import MechanicalSection from "../Models/MechanicalSection.js";

// Create a new service entry
export const createService = async (req, res) => {
  try {
    const newService = new MechanicalSection(req.body);
    const savedService = await newService.save();

    // Generate displayID like "MS001"
    savedService.displayID = `MS${String(savedService.serviceID).padStart(3, "0")}`;
    await savedService.save();

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

// Get a single service by MongoDB _id
export const getServiceById = async (req, res) => {
  try {
    const service = await MechanicalSection.findById(req.params.id);
    if (!service) return res.status(404).json({ message: "Service not found" });
    res.status(200).json(service);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a service entry
export const updateService = async (req, res) => {
  try {
    const updatedService = await MechanicalSection.findOneAndUpdate(
      { serviceID: Number(req.params.id) }, // Ensure you're using serviceID, not _id
      { $set: req.body },
      { new: true }
    );
    if (!updatedService) {
      return res.status(404).json({ message: "Service not found" });
    }
    res.status(200).json(updatedService);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// // Delete a service entry
// export const deleteService = async (req, res) => {
//   try {
//     const deletedService = await MechanicalSection.findOneAndDelete({
//        serviceID: Number(req.params.id) 
//     });
//     if (!deletedService) {
//       return res.status(404).json({ message: "Service not found" });
//     }
//     res.status(200).json({ message: "Service deleted" });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };


// Delete a service entry (supports both _id and serviceID)
export const deleteService = async (req, res) => {
  try {
    const param = req.params.id;

    // First try to delete by MongoDB _id
    let deletedService = null;
    if (/^[0-9a-fA-F]{24}$/.test(param)) {
      // It's likely a MongoDB ObjectId
      deletedService = await MechanicalSection.findByIdAndDelete(param);
    }

    // If not found by _id, try deleting by serviceID
    if (!deletedService && !isNaN(param)) {
      deletedService = await MechanicalSection.findOneAndDelete({
        serviceID: Number(param),
      });
    }

    if (!deletedService) {
      return res.status(404).json({ message: "Service not found" });
    }

    res.status(200).json({ message: "Service deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

