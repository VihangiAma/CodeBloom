

import bodyParser from "body-parser"
import express from "express"
import { mongoose } from "mongoose";
import dotenv from 'dotenv'
import UserRouter from "./Routers/UseRouter.js";


// Adjust the path

//import UseRouter from "../Routers/UseRouter.js";



dotenv.config()
const app = express()
app.use(bodyParser.json())


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


app.use("/api/user",UserRouter)
//create a api request eka hadanne methanin(get/ post/delete)
/*app.use("/api/",)*/

/*app.get("/",(req,res)=>{
 console.log("Hello world")
 res.json({
    message :"hi"
 })
})*/
/*app.post("/",(req,res)=>{
    const name =req.body.name
    const message ="hi " + " "+ name
    console.log("this is post request")
    res.json({
        message:message
    })
})*/

app.listen(5000,(req,res)=>{
    console.log("sever is running port 5000")
})
