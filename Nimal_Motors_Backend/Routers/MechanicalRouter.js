import express from "express";
import {
  createMechanicalService,
  getAllMechanicalServices,
  getMechanicalServiceById,
  updateMechanicalService,
  deleteMechanicalService
} from "../Controllers/MechanicalController.js";

const router = express.Router();

router.post("/", createMechanicalService);
router.get("/", getAllMechanicalServices);
router.get("/:id", getMechanicalServiceById);
router.put("/:id", updateMechanicalService);
router.delete("/:id", deleteMechanicalService);

export default router;
