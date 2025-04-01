import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose"; 
import connectDB from "./Models/db.js";
import stockRoutes from "./Routers/stockRoutes.js";
import supplierRoutes from "./Routers/supplierRoutes.js";


//Import Routes
import serviceRouter from "./Routers/ServiceRouter.js";
import repairRouter from "./Routers/RepairRouter.js";
import appointmentRouter from "./Routers/AppointmentRoutes.js";

dotenv.config()
const app = express()

//app.use(express.json());

app.use(cors());

//const app = express();
const PORT = process.env.PORT || 5000;

const connectionString =process.env.MONGO_URL


//Database Connection
mongoose.connect(connectionString).then(
    ()=>{
        console.log("Database is conect")
    }
).catch(
    ()=>{
        console.log("database is connection failde")
    }
)

/*mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Database is connected");
}).catch(() => {
    console.log("Database connection failed");
});*/


app.use("/api/service" , serviceRouter);
app.use("/api/repair" , repairRouter);
app.use("/api/appointments" ,appointmentRouter);


//create a api request eka hadanne methanin(get/ post/delete)
/*app.use("/api/",)*/


// Stock Routes
app.use("/api/stock", stockRoutes);
//supplier routes
app.use("/api/supplier",supplierRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
