import PremiumElectricalBooking from "../Models/PremiumElectricalBooking.js";
import PremiumMechanicalBooking from "../Models/PremiumMechanicalBooking.js";
import PremiumBodyshopBooking from "../Models/PremiumBodyshopBooking.js";

export const getAllPremiumBookings = async (req, res) => {
  try {
    const customerId = req.user.userId;

    const [electrical, mechanical, bodyshop] = await Promise.all([
      PremiumElectricalBooking.find({ customerId }),
      PremiumMechanicalBooking.find({ customerId }),
      PremiumBodyshopBooking.find({ customerId }),
    ]);

    const formatted = [
      ...electrical.map(item => ({ ...item.toObject(), department: "Electrical" })),
      ...mechanical.map(item => ({ ...item.toObject(), department: "Mechanical" })),
      ...bodyshop.map(item => ({ ...item.toObject(), department: "Bodyshop" })),
    ];

    res.status(200).json(formatted);
  } catch (error) {
    console.error("Error fetching combined premium bookings:", error);
    res.status(500).json({ message: "Failed to fetch combined bookings" });
  }
};
