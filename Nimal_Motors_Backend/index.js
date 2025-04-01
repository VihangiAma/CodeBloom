import bodyParser from "body-parser"
import express from "express"
import { mongoose } from "mongoose";
import dotenv from 'dotenv'
import userRRouter from "./Routers/userreport.js";
import StockRoter from "./Routers/Stock.js";
import SalesRouter from "./Routers/SalesReport.js";

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
app.use("/api/Report",userRRouter);
app.use("/api/StockReter",StockRoter);
app.use("/api/SalesReports",SalesRouter)



app.listen(5000,(req,res)=>{
    console.log("sever is running port 5000")
})

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

