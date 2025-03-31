import express from "express";

import {
    createAppointment,
    getAppointments,
    updateAppointment,
    deleteAppointment
} from "../Controllers/AppointmentController";

const repairRouter = express.Router();


repairRouter.post("/", createAppointment);
repairRouter.get("/", getAppointments);
repairRouter.put("/:id", updateAppointment);
repairRouter.delete("/:id", deleteAppointment);

export default router;