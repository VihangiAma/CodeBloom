import express from "express";
import {
  createElectricalService,
  getAllElectricalServices,
  getElectricalServiceById,
  updateElectricalService,
  deleteElectricalService,
} from "../Controllers/ElectricalController.js";

const router = express.Router();

router.post("/", createElectricalService);
router.get("/", getAllElectricalServices);
router.get("/:id", getElectricalServiceById);
router.put("/:id", updateElectricalService);
router.delete("/:id", deleteElectricalService);

export default router;
