import bodyParser from "body-parser"
import express from "express"
import { mongoose } from "mongoose";

const app = express()
app.use(bodyParser.json())


//Database coonection String
const connectionString =process.env.MONGO_URL
//Database Connection
/*mongoose.connect(connectionString).then(
    ()=>{
        console.log("Connected to the databased")
    }
)*/

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