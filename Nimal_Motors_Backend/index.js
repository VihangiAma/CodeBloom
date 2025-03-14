import express from "express"

const app = express()

app.get("/",(req,res)=>{
 console.log("Hello world")
})
app.post("/",(req,res)=>{
    console.log("this is post request")
})

app.listen(5000,(req,res)=>{
    console.log("sever is running port 5000")
})