import express from "express";
import { createPremiumBodyshopBooking,updatePremiumBodyshopBooking } from "../Controllers/PremiumBodyshopController.js";
import {authenticatePremium} from "./history.js"

const router = express.Router();

router.post("/premium", authenticatePremium, createPremiumBodyshopBooking);
router.put("/premium/:serviceID", authenticatePremium, updatePremiumBodyshopBooking);

export default router;