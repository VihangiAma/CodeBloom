
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./Models/db.js";

//Import Routes
import serviceRouter from "./Routers/ServiceRouter.js";
import repairRouter from "./Routers/RepairRouter.js";
import appointmentRouter from "./Routers/AppointmentRoutes.js";

dotenv.config();
connectDB(); // Connect to MongoDB

const app = express();
const PORT = process.env.PORT || 5001;

app.use(express.json()); // Middleware to parse JSON body
app.use(cors()); // Enable CORS

// Test API Route
/*app.get("/", (req, res) => {
    console.log("Hello world");
    res.json({ message: "hi" });
});*/

app.use("/api/service" , serviceRouter);
app.use("/api/repair" , repairRouter);
app.use("/api/appointments" ,appointmentRouter);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});