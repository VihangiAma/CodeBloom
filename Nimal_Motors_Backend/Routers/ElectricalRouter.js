import express from "express";
import {
  createElectricalEntry,
  getAllElectricalEntries,
  getElectricalEntryById,
  updateElectricalEntry,
  deleteElectricalEntry
} from "../Controllers/ElectricalController.js";

const router = express.Router();

// POST - Create new electrical entry
router.post("/", createElectricalEntry);

// GET - All electrical entries
router.get("/", getAllElectricalEntries);

// GET - Single electrical entry by serviceID
router.get("/:id", getElectricalEntryById);

// PUT - Update electrical entry
router.put("/:id", updateElectricalEntry);

// DELETE - Delete electrical entry
router.delete("/:id", deleteElectricalEntry);

export default router;
