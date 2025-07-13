
import express from "express";
import { verifyToken } from "../MiddleWare/auth.js";
import Appointment from "../Models/Appointment.js";
import ElectricalSection from "../Models/ElectricalSection.js";
import BodyShopSection from "../Models/BodyShopSection.js"
import MechanicalSection from "../Models/MechanicalSection.js";



const router = express.Router();

router.get("/mypremiumbookings", verifyToken, async (req, res) => {
  try {
    const email = req.user.email;

    const mechanical = await MechanicalSection.find({ "contact.email": email });
    const electrical = await ElectricalSection.find({ "contact.email": email });
    const bodyshop = await BodyShopSection.find({ "contact.email": email });
    const appointments = await Appointment.find({ "contact.email": email });

    const allBookings = [
      ...mechanical.map((doc) => ({ type: "MechanicalSection", ...doc._doc })),
      ...electrical.map((doc) => ({ type: "ElectricalSection", ...doc._doc })),
      ...bodyshop.map((doc) => ({ type: "BodyshopSection", ...doc._doc })),
      ...appointments.map((doc) => ({ type: "AppointmentSection", ...doc._doc })),
    ];

    res.status(200).json(allBookings);
  } catch (err) {
    console.error("Fetch failed", err);
    res.status(500).json({ message: "Failed to fetch premium booking data." });
  }
});

export default router;
