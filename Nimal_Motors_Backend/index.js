
import bodyParser from "body-parser"
import express from "express"
import { mongoose } from "mongoose";
import dotenv from 'dotenv'
import UserRouter from "./Routers/UseRouter.js";
import jwt from 'jsonwebtoken';



// Adjust the path




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

/*app.use((req,res,next)=>{
    const token = req.header("Authorization")?.replace
    
    ("Bearer", "")
  if(token != null){
  jwt.verify(token, "secret", (err, decoded) => {
    if (decoded != null){
    req.user= decoded
    console.log(decoded)
    next()
}
    }
    }
  })*/

//MIDDLEWEAR

app.use((req, res, next) => {
    const token = req.header("Authorization")?.replace("Bearer ", ""); // Corrected replace syntax

    if (token) {
        jwt.verify(token, "secret", (err, decoded) => {
            if (err) {
                return res.status(401).json({ message: "Invalid or expired token" }); // Handle token error
            }
            
            if (decoded) {
                req.user = decoded; // Attach decoded user info to request
                console.log(decoded); // Log decoded user information (optional)
                next(); // Proceed to the next middleware
            }
        });
    } else {
        return res.status(403).json({ message: "Authorization token required" }); // Token is missing
    }
});
    


app.listen(5000,(req,res)=>{
    console.log("sever is running port 5000")
})