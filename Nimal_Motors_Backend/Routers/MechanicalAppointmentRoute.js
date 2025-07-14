import express from "express";
import authenticateToken from "../middleware/authenticate.js";

import { getAllMechanicalAppointments,updateMechanicalStatus,deleteMechanicalAppointment } from "../Controllers/MechanicalAppointmentController.js";

const router = express.Router();

router.get("/appointments/all", authenticateToken, getAllMechanicalAppointments);
router.put("/appointments/:serviceID/status", authenticateToken, updateMechanicalStatus);
router.delete("/appointments/:serviceID", authenticateToken, deleteMechanicalAppointment);

export default router;