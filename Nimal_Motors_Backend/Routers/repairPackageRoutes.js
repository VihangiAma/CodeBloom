import express from "express";
import {
  createRepairPackage,
  getAllRepairPackages,
  deleteRepairPackage,
  updateRepairPackage,
} from "../Controllers/repairPackageController.js";

const router = express.Router();

router.get("/", getAllRepairPackages);
router.post("/", createRepairPackage);
router.put("/:id", updateRepairPackage);
router.delete("/:id", deleteRepairPackage);

export default router;
