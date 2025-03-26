import express from "express";
import { getStockItems, addStockItem, updateStockItem, deleteStockItem } from "../Controllers/stockControllers.mjs";

const router = express.Router();

router.get("/", getStockItems);
router.post("/", addStockItem);
router.put("/:id", updateStockItem);
router.delete("/:id", deleteStockItem);

export default router;
