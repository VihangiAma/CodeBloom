import express from "express";
import {
  createService,
  getAllServices,
  getServiceById,
  updateService,
  deleteService
} from "../Controllers/MechanicalController.js";

const MechanicalRouter = express.Router();

MechanicalRouter.post("/", createService);      // Create new service
MechanicalRouter.get("/", getAllServices);      // Get all services
MechanicalRouter.get("/:id", getServiceById);    // Get service by ID
MechanicalRouter.put("/:id", updateService);     // Update service
MechanicalRouter.delete("/:id", deleteService);  // Delete service

export default MechanicalRouter;
