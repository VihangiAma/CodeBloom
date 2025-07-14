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
// import express from "express";
// import {
//   getAllPackages,
//   createPackage,
//   updatePackageRepairs,
//   deletePackage,
// } from "../Controllers/repairPackageController.js";

// const router = express.Router();

// router.get("/", getAllPackages);
// router.post("/", createPackage);
// router.put("/:id", updatePackageRepairs);
// router.delete("/:id", deletePackage);

// export default router;
