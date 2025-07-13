
import express from "express";
import { verifyToken } from "../MiddleWare/auth.js";
import ElectricalSection from "../Models/ElectricalSection.js";
import BodyShopSection from "../Models/BodyShopSection.js"
import MechanicalSection from "../Models/MechanicalSection.js";
import Appointment from "../Models/Appointment.js";



const router = express.Router();

router.get("/premiumcompleted", verifyToken, async (req, res) => {
  const { email } = req.user; // get email from token

  try {
    const mechanical = await MechanicalSection.find({ "contact.email": email, status: "Completed" });
    const electrical = await ElectricalSection.find({ "contact.email": email, status: "Completed" });
    const bodyshop = await BodyShopSection.find({ "contact.email": email, status: "Completed" });
    const appointments = await Appointment.find({ "contact.email": email, status: "Completed" });

    res.json({ mechanical, electrical, bodyshop, appointments });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch completed services" });
  }
});
export default router;