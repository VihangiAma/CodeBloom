import express from "express";
import {
  createBodyShopService,
  getAllBodyShopServices,
  getBodyShopServiceById,
  updateBodyShopService,
  deleteBodyShopService
} from "../Controllers/BodyShopController.js";

const router = express.Router();

// Base path: /api/bodyshop
router.post("/", createBodyShopService);
router.get("/", getAllBodyShopServices);
router.get("/:id", getBodyShopServiceById);
router.put("/:id", updateBodyShopService);
router.delete("/:id", deleteBodyShopService);

export default router;
