
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./Models/db.js";

//Import Routes
import MechanicalRouter from "./Routers/MechanicalRouter.js";
import ElectricalRouter from "./Routers/ElectricalRouter.js";
import BodyShopRouter from "./Routers/BodyShopRouter.js";
import appointmentRouter from "./Routers/AppointmentRoutes.js";


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

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});