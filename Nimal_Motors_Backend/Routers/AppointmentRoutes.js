import express from "express";

import{
    createAppointment,
    getAppointments,
    updateAppointment,
    deleteAppointment
} from "../Controllers/AppointmentController.js";

const appointmentRouter = express.Router();


appointmentRouter.post("/", createAppointment);
appointmentRouter.get("/", getAppointments);
appointmentRouter.put("/:id", updateAppointment);
appointmentRouter.delete("/:id", deleteAppointment);

export default appointmentRouter;