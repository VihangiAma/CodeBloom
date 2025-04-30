import bodyParser from "body-parser";
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";


import connectDB from "./Models/db.js";

//Import Routes

// Import Routes
import userRoutes from "./Routers/userRoutes.js";
import StockRoter from "./Routers/Stock.js";
import SalesRouter from "./Routers/SalesReport.js";
import UserReportRouter from "./Routers/UserReportRouter.js";
import InventoryReportRouters  from "./Routers/InventoryReportRoutes.js";
import repairRouter from "./Routers/RepairRouter.js";
//import appointmentRouter from "./Routers/AppointmentRoutes.js";
import stockRoutes from "./Routers/stockRoutes.js";
import supplierRoutes from "./Routers/supplierRoutes.js";
import MechanicalRouter from "./Routers/MechanicalRouter.js";
import ElectricalRouter from "./Routers/ElectricalRouter.js";
import BodyShopRouter from "./Routers/BodyShopRouter.js";
import appointmentRouter from "./Routers/AppointmentRoutes.js";

//import userRoutes from "./Routers/userRoutes.js";  

dotenv.config();
connectDB(); // Connect to MongoDB




const app = express();
const PORT = process.env.PORT || 5001;

app.use(express.json()); // Middleware to parse JSON body
app.use(cors()); // Enable CORS



// ✅ Connect to MongoDB
connectDB();

// ✅ Routes
app.use("/api/user", userRoutes);
app.use("/api/StockReport", StockRoter);
app.use("/api/SalesReports", SalesRouter);
app.use("/api/UserReport",UserReportRouter);
app.use("/api/InventoryReports",InventoryReportRouters )
app.use("/api/repair", repairRouter);
app.use("/api/appointments", appointmentRouter);
app.use("/api/stock", stockRoutes);
app.use("/api/supplier", supplierRoutes);
app.use("/api/mechanical", MechanicalRouter);
app.use("/api/electrical", ElectricalRouter);
app.use("/api/bodyshop", BodyShopRouter);
app.use("/api/appointments" ,appointmentRouter);


// CORS configuration

const corsOptions = {
  origin: 'http://localhost:5173', 
  credentials: true,               
};

app.use(cors(corsOptions));


// Middleware
app.use(bodyParser.json());

// Database Connection
mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log("Database connected successfully"))
    .catch(err => console.error("Database connection failed:", err));

// Routes
app.use("/api/user", userRoutes);  

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: "Something went wrong!" });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});