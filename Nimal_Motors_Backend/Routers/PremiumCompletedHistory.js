
import express from "express";
import { verifyToken } from "../MiddleWare/auth.js";
import ElectricalSection from "../Models/ElectricalSection.js";
import BodyShopSection from "../Models/BodyShopSection.js"
import MechanicalSection from "../Models/MechanicalSection.js";
import Appointment from "../Models/Appointment.js";



const router = express.Router();

// router.get("/premiumcompleted", verifyToken, async (req, res) => {
//   const { fullName } = req.user;

//   try {
//     const mechanical = await MechanicalSection.find({ customerName: fullName, status: "Completed" });
//     const electrical = await ElectricalSection.find({ customerName: fullName, status: "Completed" });
//     const bodyshop = await BodyShopSection.find({ customerName: fullName, status: "Completed" });
//     const appointments = await Appointment.find({ customerName: fullName, status: "Completed" });

//     res.json({ mechanical, electrical, bodyshop, appointments });
//   } catch (err) {
//     res.status(500).json({ error: "Failed to fetch completed services" });
//   }
// });

// 

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