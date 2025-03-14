import bodyParser from "body-parser"
import express from "express"

const app = express()
app.use(bodyParser.json())

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