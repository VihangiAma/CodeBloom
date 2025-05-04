// import express from "express";

// import{
//     createAppointment,
//     getAllAppointments,
//     getAppointments,
//     updateAppointment,
//     deleteAppointment
// } from "../Controllers/AppointmentController.js";

// const appointmentRouter = express.Router();


// appointmentRouter.post("/", createAppointment);
// appointmentRouter.get("/", getAppointments);
// appointmentRouter.get("/:id", getAllAppointments);
// appointmentRouter.put("/:id", updateAppointment);
// appointmentRouter.delete("/:id", deleteAppointment);

// export default appointmentRouter;

import express from 'express';
import {
  createAppointment,
  getAllAppointments,
  getAppointmentById,
  updateAppointment,
  deleteAppointment
} from '../Controllers/appointmentController.js';

const router = express.Router();

// Create a new appointment
router.post('/', createAppointment);

// Get all appointments
router.get('/', getAllAppointments);

// Get a single appointment by MongoDB _id
router.get('/:id', getAppointmentById);

// Update an appointment by serviceID (custom numeric ID)
router.put('/:id', updateAppointment);

// Delete an appointment by serviceID
router.delete('/:id', deleteAppointment);

export default router;
