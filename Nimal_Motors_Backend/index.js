import bodyParser from "body-parser"
import express from "express"
import { mongoose } from "mongoose";
import dotenv from 'dotenv'
import userRRouter from "./Routers/userreport.js";
import StockRoter from "./Routers/Stock.js";

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



app.listen(5000,(req,res)=>{
    console.log("sever is running port 5000")
})