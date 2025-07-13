import PremiumElectricalBooking from "../Models/PremiumElectricalBooking.js";

let sequence = 1000; // Consider mongoose-sequence or UUID in production

export const createPremiumElectricalBooking = async (req, res) => {
  try {
    if (req.user.type !== "premiumCustomer") {
      return res.status(403).json({ message: "Access Denied: Not Premium Customer" });
    }

    const customerId = req.user.userId;
    if (!customerId) {
      return res.status(400).json({ message: "userId missing in token" });
    }

    const booking = new PremiumElectricalBooking({
      ...req.body,
      customerId,
      serviceID: `PEBS-${sequence++}`,
    });

    await booking.save();
    res.status(201).json({ message: "Booking saved", booking });
  } catch (error) {
    console.error("Failed to save booking", error);
    res.status(500).json({ message: "Failed to save booking", error });
  }
};

export const getCompletedPremiumElectricalBookings = async (req, res) => {
  try {
    const customerId = req.user.userId;
    const completedBookings = await PremiumElectricalBooking.find({
      customerId,
      status: "Completed",
    });
    res.json(completedBookings);
  } catch (err) {
    console.error("Error fetching completed bookings", err);
    res.status(500).json({ message: "Error fetching completed bookings" });
  }
};

export const updatePremiumElectricalBooking = async (req, res) => {
  try {
    const { serviceID } = req.params;

    const booking = await PremiumElectricalBooking.findOne({ serviceID });
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    if (booking.customerId.toString() !== req.user.userId) {
      return res.status(403).json({ message: "Unauthorized to update this booking" });
    }

    const updated = await PremiumElectricalBooking.findOneAndUpdate(
      { serviceID },
      req.body,
      { new: true }
    );

    res.status(200).json(updated);
  } catch (error) {
    console.error("Failed to update booking", error);
    res.status(500).json({ message: "Failed to update", error });
  }
};

export const deletePremiumElectricalBooking = async (req, res) => {
  try {
    const { serviceID } = req.params;

    const booking = await PremiumElectricalBooking.findOne({ serviceID });
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    if (booking.customerId.toString() !== req.user.userId) {
      return res.status(403).json({ message: "Unauthorized to delete this booking" });
    }

    await PremiumElectricalBooking.findOneAndDelete({ serviceID });
    res.status(200).json({ message: "Deleted successfully" });
  } catch (error) {
    console.error("Delete failed", error);
    res.status(500).json({ message: "Delete failed", error });
  }
};