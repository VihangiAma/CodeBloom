import express from "express";
// ✅ Corrected import
import {
  createPremiumElectricalBooking,
  updatePremiumElectricalBooking,
  deletePremiumElectricalBooking,
  getCompletedPremiumElectricalBookings,
} from "../Controllers/premiumElectricalController.js";

import { authenticatePremium } from "./history.js";

const router = express.Router();

// POST a new electrical service booking
router.post("/premium", authenticatePremium, createPremiumElectricalBooking);

// PUT to update a booking
router.put("/premium/:serviceID", authenticatePremium, updatePremiumElectricalBooking);

// DELETE a booking
router.delete("/premium/:serviceID", authenticatePremium, deletePremiumElectricalBooking);

// GET completed bookings
router.get("/premium/completed", authenticatePremium, getCompletedPremiumElectricalBookings);

export default router;
