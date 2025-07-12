import express from "express";
import { getAllPremiumBookings } from "../Controllers/premiumCombinedHistoryController.js";
import { authenticatePremium } from "./history.js";

const router = express.Router();

router.get("/premium/all", authenticatePremium, getAllPremiumBookings);

export default router;
