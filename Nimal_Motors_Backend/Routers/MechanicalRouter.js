import express from "express";
import {
  createMechanicalEntry,
  getAllMechanicalEntries,
  getMechanicalEntryById,
  updateMechanicalEntry,
  deleteMechanicalEntry
} from "../Controllers/MechanicalController.js";

const router = express.Router();

// POST - create a new mechanical entry
router.post("/", createMechanicalEntry);

// GET - all entries
router.get("/", getAllMechanicalEntries);

// GET - one entry by serviceID
router.get("/:id", getMechanicalEntryById);

// PUT - update entry by serviceID
router.put("/:id", updateMechanicalEntry);

// DELETE - remove entry by serviceID
router.delete("/:id", deleteMechanicalEntry);

export default router;
