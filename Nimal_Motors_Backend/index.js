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
import appointmentRouter from "./Routers/AppointmentRoutes.js";
import stockRoutes from "./Routers/stockRoutes.js";
import supplierRoutes from "./Routers/supplierRoutes.js";
import MechanicalRouter from "./Routers/MechanicalRouter.js";
import ElectricalRouter from "./Routers/ElectricalRouter.js";
import BodyShopRouter from "./Routers/BodyShopRouter.js";
import expenseRoutes from "./Routers/ExpenseRoutes.js";
import invoiceRoutes from "./Routers/ServiceInvoiceRoutes.js";
import historyRoutes from "./Routers/history.js";
import PremiumCompletedHistoryRoutes from "./Routers/PremiumCompletedHistory.js";



import premiumBodyshopBookingRoutes from "./Routers/PremiumBodyshopRoute.js";
import premiumMechanicalBookingRoutes from "./Routers/PremiumMechanicalRoute.js";
import premiumElectricalcalBookingRoute from "./Routers/PremiumElectricRoute.js"

import premiumCombinedRoutes from "./Routers/premiumCombinedRoute.js";


import BodyshopAppointmentRoutes from "./Routers/BodyshopAppointmentRoute.js";
import mechanicalRoutes from "./Routers/MechanicalAppointmentRoute.js";

//import invoiceRoute from "./Routers/InvoiceRoutes.js";
import FeedbackRouter from"./Routers/FeedbackRouter.js";
import router from "./Routers/PackageRoutes.js";

import repairRoutes from "./Routers/repairPackageRoutes.js";
import summaryRoutes from "./Routers/summary.js"; // Import summary routes
import accountantInvoiceRoutes from "./Routers/InvoiceRoutes.js";


import serviceInvoiceRoutes from "./Routers/ServiceInvoiceRoutes.js"; // Import service invoice routes




//import invoiceRoute from "./Routers/InvoiceRoutes.js";




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
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"], 
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
app.use("/api/NewSalesReports", SalesRouter);
app.use("/api/UserReport",UserReportRouter);
app.use("/api/InventoryReports",InventoryReportRouters )
app.use("/api/appointments", appointmentRouter);
app.use("/api/stock", stockRoutes);
app.use("/api/supplier", supplierRoutes);
app.use("/api/mechanical", MechanicalRouter);
app.use("/api/electrical", ElectricalRouter);
app.use("/api/bodyshop", BodyShopRouter);
app.use("/api/expenses", expenseRoutes);
app.use("/api/service-invoices", serviceInvoiceRoutes); 
app.use("/api/history", historyRoutes);
app.use("/api/history", PremiumCompletedHistoryRoutes);

//bookingroutesP

app.use("/api/bodyshopbooking", premiumBodyshopBookingRoutes);
app.use("/api/mechanicalbooking", premiumMechanicalBookingRoutes);
app.use("/api/electricalcalbooking", premiumElectricalcalBookingRoute);
app.use("/api", BodyshopAppointmentRoutes);
app.use("/api/mechanical", mechanicalRoutes);
app.use("/api/combinedbookings", premiumCombinedRoutes);



app.use('/api/users', userRoutes);
app.use("/api/invoice", invoiceRoutes);


app.use("/api/repair-packages", repairRoutes);
app.use("/api", summaryRoutes); // Add summary routes
//app.use("/api/invoices", accountantInvoiceRoutes);
app.use("/api/accountant-invoices", accountantInvoiceRoutes);


app.use("/api/Feedback",FeedbackRouter);
app.use("/api/Package", router);

app.use("/api/repair-packages", repairRoutes);
app.use("/api", summaryRoutes); // Add summary r




// ✅ Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

// ✅ Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

