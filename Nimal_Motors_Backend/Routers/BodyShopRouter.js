import express from "express";
import {
  createService,
  getAllServices,
  getServiceById,
  updateService,
  deleteService
} from "../Controllers/BodyShopController.js";

const router = express.Router();

// Base path: /api/bodyshop
router.post("/", createService);
router.get("/", getAllServices);
router.get("/:id", getServiceById);
router.put("/:id", updateService);
router.delete("/:id", deleteService);

export default router;
