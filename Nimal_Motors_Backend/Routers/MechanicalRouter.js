// import express from "express";
// import {
//   createService,
//   getAllServices,
//   getServiceById,
//   updateService,
//   deleteService
// } from "../Controllers/MechanicalController.js";

// const router = express.Router();

// // Base path: /api/mechanical
// router.post("/", createService);
// router.get("/", getAllServices);
// router.get("/:id", getServiceById);
// router.put("/:id", updateService);
// router.delete("/:id", deleteService);

// export default router;
import express from "express";
import {
  createService,
  getAllServices,
  getServiceById,
  updateService,
  deleteService
} from "../Controllers/MechanicalController.js";

const router = express.Router();

// Base path: /api/mechanical

// Route to create a new service entry
router.post("/", createService);

// Route to get all service entries
router.get("/", getAllServices);

// Route to get a single service by serviceID (instead of _id)
router.get("/:serviceID", getServiceById);

// Route to update a service entry by serviceID
router.put("/:serviceID", updateService);

// Route to delete a service entry by serviceID
router.delete("/:serviceID", deleteService);

export default router;
