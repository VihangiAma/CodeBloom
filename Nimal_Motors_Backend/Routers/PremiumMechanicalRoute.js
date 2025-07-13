import express from "express";
import {
  createPremiumMechanicalBooking,
  updatePremiumMechanicalBooking,
} from "../Controllers/PremiumMechanicalController.js";
// import { authenticatePremium } from "./history.js";

const router = express.Router();

// router.post("/premium", authenticatePremium, createPremiumMechanicalBooking);
// router.put("/premium/:serviceID", authenticatePremium, updatePremiumMechanicalBooking);

export default router;
