import express from "express";
import {
  createService,
  getAllServices,
  getServiceById,
  updateService,
  deleteService
} from "../Controllers/ServiceController.js";

const serviceRouter = express.Router();

serviceRouter.post("/", createService);      // Create new service
serviceRouter.get("/", getAllServices);      // Get all services
serviceRouter.get("/:id", getServiceById);    // Get service by ID
serviceRouter.put("/:id", updateService);     // Update service
serviceRouter.delete("/:id", deleteService);  // Delete service

export default serviceRouter;
