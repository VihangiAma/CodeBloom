import express from "express";
import {
  createService,
  getAllServices,
  getServiceById,
  updateService,
  deleteService,
  updateAdvance, // Assuming updateAdvance is defined in the controller
  getMechanicalByServiceID
} from "../Controllers/MechanicalController.js";

const router = express.Router();

// Base path: /api/mechanical
router.post("/", createService);
router.get("/", getAllServices);
router.get("/:id", getServiceById);
router.put("/:id", updateService);
router.delete("/:id", deleteService);
router.put("/:id/advance", updateAdvance); // Assuming updateAdvance is defined in the controller
router.get("/by-service-id/:serviceID", getMechanicalByServiceID);


export default router;
