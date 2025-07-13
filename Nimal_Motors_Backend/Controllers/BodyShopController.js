import BodyShopSection from "../Models/BodyShopSection.js";

export const createService = async (req, res) => {
  try {
    const newService = new BodyShopSection(req.body);
    const savedService = await newService.save();

    // Format displayID like "BS001"
    const formattedDisplayID = `BS${savedService.serviceID.toString().padStart(3, "0")}`;
    savedService.displayID = formattedDisplayID;
    await savedService.save();

    res.status(201).json(savedService);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getAllServices = async (req, res) => {
  try {
    const services = await BodyShopSection.find();
    res.status(200).json(services);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getServiceById = async (req, res) => {
  try {
    const service = await BodyShopSection.findById(req.params.id);
    if (!service) return res.status(404).json({ message: "Service not found" });
    res.status(200).json(service);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a BodyShop service
export const updateService = async (req, res) => {
  try {
    const updatedService = await BodyShopSection.findOneAndUpdate(
      { serviceID: Number(req.params.id) }, // Use serviceID to find the document
      { $set: req.body },
      { new: true }
    );
    if (!updatedService) return res.status(404).json({ message: "Service not found" });
    res.status(200).json(updatedService);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// // Delete a BodyShop service
// export const deleteService = async (req, res) => {
//   try {
//     const deletedService = await BodyShopSection.findOneAndDelete(
//       { serviceID: Number(req.params.id) } // Use serviceID to find the document
//     );
//     if (!deletedService) return res.status(404).json({ message: "Service not found" });
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
      deletedService = await BodyShopSection.findByIdAndDelete(param);
    }

    // If not found by _id, try deleting by serviceID
    if (!deletedService && !isNaN(param)) {
      deletedService = await BodyShopSection.findOneAndDelete({
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

