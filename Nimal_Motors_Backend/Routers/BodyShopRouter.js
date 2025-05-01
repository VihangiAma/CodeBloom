import express from "express";
import {
  createBodyShopEntry,
  getAllBodyShopEntries,
  getBodyShopEntryById,
  updateBodyShopEntry,
  deleteBodyShopEntry
} from "../Controllers/BodyShopController.js";

const router = express.Router();

// POST - Create new body shop entry
router.post("/", createBodyShopEntry);

// GET - All body shop entries
router.get("/", getAllBodyShopEntries);

// GET - Single entry by serviceID
router.get("/:id", getBodyShopEntryById);

// PUT - Update entry
router.put("/:id", updateBodyShopEntry);

// DELETE - Delete entry
router.delete("/:id", deleteBodyShopEntry);

export default router;
