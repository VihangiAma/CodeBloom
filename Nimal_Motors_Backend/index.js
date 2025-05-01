import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";

// Import Routes
import userRoutes from "./Routers/userRoutes.js";
import StockRoter from "./Routers/Stock.js";
import SalesRouter from "./Routers/SalesReport.js";
import UserReportRouter from "./Routers/UserReportRouter.js";
import InventoryReportRouters  from "./Routers/InventoryReportRoutes.js";
import RevenueandexpencesRouter from "./Routers/RevenueAndExpenceRouter.js";
import RevenueRouter from "./Routers/RevenueRoutes.js"
import repairRouter from "./Routers/RepairRouter.js";
import appointmentRouter from "./Routers/AppointmentRoutes.js";
import stockRoutes from "./Routers/stockRoutes.js";
import supplierRoutes from "./Routers/supplierRoutes.js";
import MechanicalRouter from "./Routers/MechanicalRouter.js";
import ElectricalRouter from "./Routers/ElectricalRouter.js";
import BodyShopRouter from "./Routers/BodyShopRouter.js";

// Connect to DB
import connectDB from "./Models/db.js";

// Initialize dotenv
dotenv.config();

// Create app
const app = express();
const PORT = process.env.PORT || 5001;

// ✅ Correct CORS settings
const corsOptions = {
  origin: "http://localhost:5173", // Allow frontend
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"], // <-- Important: allow Authorization header
};

// ✅ Middlewares (order matters)
app.use(cors(corsOptions));     // Apply CORS first
app.use(bodyParser.json());     // Then parse body
app.use(express.json());        // Also parse JSON body (redundant with bodyParser but okay)

// ✅ Connect to MongoDB
connectDB();

// ✅ Routes
app.use("/api/user", userRoutes);
app.use("/api/StockReport", StockRoter);
app.use("/api/SalesReports", SalesRouter);
app.use("/api/UserReport",UserReportRouter);
app.use("/api/InventoryReports",InventoryReportRouters )
app.use("/api/revenueReportAndExpencenew",RevenueandexpencesRouter)
app.use("/api/revenueReportsNew",RevenueRouter)
app.use("/api/repair", repairRouter);
app.use("/api/appointments", appointmentRouter);
app.use("/api/stock", stockRoutes);
app.use("/api/supplier", supplierRoutes);
app.use("/api/mechanical", MechanicalRouter);
app.use("/api/electrical", ElectricalRouter);
app.use("/api/bodyshop", BodyShopRouter);

// ✅ Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

// ✅ Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
