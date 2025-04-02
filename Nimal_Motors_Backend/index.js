import bodyParser from "body-parser"
import express from "express"
import { mongoose } from "mongoose";
import dotenv from 'dotenv'
import userRouter from "./Routers/userreport.js";
import StockRoter from "./Routers/Stock.js";
import SalesRouter from "./Routers/SalesReport.js";
import serviceRouter from "./Routers/ServiceRouter.js";
import repairRouter from "./Routers/RepairRouter.js";
import appointmentRouter from "./Routers/AppointmentRoutes.js" 
import stockRoutes from "./Routers/stockRoutes.js";
import supplierRoutes from "./Routers/supplierRoutes.js"

dotenv.config()

const app = express()
app.use(bodyParser.json())


//Database coonection String
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



//create a api request eka hadanne methanin(get/ post/delete)
app.use("/api/Report",userRouter);
app.use("/api/StockReport",StockRoter);
app.use("/api/SalesReports",SalesRouter)



app.listen(5000,(req,res)=>{
    console.log("sever is running port 5000")
})




app.use("/api/service" , serviceRouter);
app.use("/api/repair" , repairRouter);
app.use("/api/appointments" ,appointmentRouter);





// Stock Routes
app.use("/api/stock", stockRoutes);
//supplier routes
app.use("/api/supplier",supplierRoutes);



