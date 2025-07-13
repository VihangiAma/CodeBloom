import express from "express";
import {
  getUserProfile,
  getPremiumBodyshopAppointments,
  getAllBodyshopAppointments,
  updateBodyshopAppointmentStatus,
  deleteBodyshopAppointment,
  createBodyshopBooking,
} from "../Controllers/BodyshopAppointmentController.js";
import authenticateToken, { verifyBodyshopSupervisor } from "../MiddleWare/authenticate.js";

const router = express.Router();

router.get("/auth/userprofile", authenticateToken, getUserProfile);
router.post(
  "/bodyshopbooking/premium",
  authenticateToken,
  createBodyshopBooking
);

router.get("/bodyshop/appointments/premium", authenticateToken, getPremiumBodyshopAppointments);

router.get("/bodyshop/appointments/all", authenticateToken, verifyBodyshopSupervisor, getAllBodyshopAppointments);

router.put(
  "/bodyshop/appointments/:serviceID/status",
  authenticateToken,
  verifyBodyshopSupervisor,
  updateBodyshopAppointmentStatus
);

router.delete(
  "/bodyshop/appointments/:serviceID",
  authenticateToken,
  verifyBodyshopSupervisor,
  deleteBodyshopAppointment
);

export default router;