import express from 'express';
import { getPackages, createPackage,updatePackage,deletePackage} from '../Controllers/PackageController.js';

const router = express.Router();

// Routes
router.post("/", createPackage);
router.get("/", getPackages);
router.put("/:id", updatePackage);
router.delete("/:id", deletePackage);

export default router;