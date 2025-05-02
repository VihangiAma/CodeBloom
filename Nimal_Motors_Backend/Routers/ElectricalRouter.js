import express from "express";
import {
  createService,
  getAllServices,
  getServiceById,
  updateService,
  deleteService
} from "../Controllers/ElectricalController.js";

const router = express.Router();

// Base path: /api/electrical

// Create new service
router.post("/", createService);

// Get all services
router.get("/", getAllServices);

// Get, update, delete service by serviceID (e.g., ES001)
router.get("/:serviceID", getServiceById);
router.put("/:serviceID", updateService);
router.delete("/:serviceID", deleteService);

export default router;
