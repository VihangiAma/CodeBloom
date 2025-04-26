
import express from "express";
import cors from "cors"; // Import CORS
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./Routers/userreport.js";
import StockRoter from "./Routers/Stock.js";
import SalesRouter from "./Routers/SalesReport.js";
import serviceRouter from "./Routers/ServiceRouter.js";
import repairRouter from "./Routers/RepairRouter.js";
import appointmentRouter from "./Routers/AppointmentRoutes.js";
import stockRoutes from "./Routers/stockRoutes.js";
import supplierRoutes from "./Routers/supplierRoutes.js";

dotenv.config();

const app = express();




import connectDB from "./Models/db.js";

//Import Routes
import MechanicalRouter from "./Routers/MechanicalRouter.js";
import ElectricalRouter from "./Routers/ElectricalRouter.js";
import BodyShopRouter from "./Routers/BodyShopRouter.js";
import appointmentRouter from "./Routers/AppointmentRoutes.js";


// ✅ Enable CORS for frontend at http://localhost:5173
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
);

// Middleware
app.use(bodyParser.json());

// Database connection
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Database is connected");
  })
  .catch(() => {
    console.log("Database connection failed");
  });

// Routes
app.use("/api/Report", userRouter);
app.use("/api/StockReport", StockRoter);
app.use("/api/SalesReports", SalesRouter);
app.use("/api/service", serviceRouter);
app.use("/api/repair", repairRouter);
app.use("/api/appointments", appointmentRouter);
app.use("/api/stock", stockRoutes);
app.use("/api/supplier", supplierRoutes);

// Start server
app.listen(5000, () => {
  console.log("Server is running on port 5000");
});

import userRoutes from "./Routers/userRoutes.js";  

dotenv.config();
connectDB(); // Connect to MongoDB




const app = express();
const PORT = process.env.PORT || 5001;

app.use(express.json()); // Middleware to parse JSON body
app.use(cors()); // Enable CORS


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

