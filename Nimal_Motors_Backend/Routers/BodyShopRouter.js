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
router.get("/:serviceID", getServiceById);
router.put("/:serviceID", updateService);
router.delete("/:serviceID", deleteService);

export default router;
