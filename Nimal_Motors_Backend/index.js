
import bodyParser from "body-parser"
import express from "express"
import { mongoose } from "mongoose";
import dotenv from 'dotenv'

import UserRouter from "./Routers/UseRouter.js";
import jwt from 'jsonwebtoken';
import userRRouter from "./Routers/userreport.js";
import StockRoter from "./Routers/Stock.js";
import SalesRouter from "./Routers/SalesReport.js";

dotenv.config()

//const app = express()
app.use(bodyParser.json())


//Database coonection String
//const connectionString =process.env.MONGO_URL

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



//create a api request eka hadanne methanin(get/ post/delete)
app.use("/api/Report",userRRouter);
app.use("/api/StockReter",StockRoter);
app.use("/api/SalesReports",SalesRouter)



// const connectionString =process.env.MONGO_URL
// //Database Connection
// mongoose.connect(connectionString).then(
//     ()=>{
//         console.log("Database is conect")
//     }
// ).catch(
//     ()=>{
//         console.log("database is connection failde")
//     }
// )


// app.use("/api/user",UserRouter)
// //create a api request eka hadanne methanin(get/ post/delete)
// /*app.use("/api/",)*/

// /*app.get("/",(req,res)=>{
//  console.log("Hello world")
//  res.json({
//     message :"hi"
//  })
// })*/
// /*app.post("/",(req,res)=>{
//     const name =req.body.name
//     const message ="hi " + " "+ name
//     console.log("this is post request")
//     res.json({
//         message:message
//     })
// })*/

// /*app.use((req,res,next)=>{
//     const token = req.header("Authorization")?.replace
    
//     ("Bearer", "")
//   if(token != null){
//   jwt.verify(token, "secret", (err, decoded) => {
//     if (decoded != null){
//     req.user= decoded
//     console.log(decoded)
//     next()
// }
//     }
//     }
//   })*/

// //MIDDLEWEAR

// app.use((req, res, next) => {
//     const token = req.header("Authorization")?.replace("Bearer ", ""); // Corrected replace syntax

//     if (token) {
//         jwt.verify(token, "secret", (err, decoded) => {
//             if (err) {
//                 return res.status(401).json({ message: "Invalid or expired token" }); // Handle token error
//             }
            
//             if (decoded) {
//                 req.user = decoded; // Attach decoded user info to request
//                 console.log(decoded); // Log decoded user information (optional)
//                 next(); // Proceed to the next middleware
//             }
//         });
//     } else {
//         return res.status(403).json({ message: "Authorization token required" }); // Token is missing
//     }
// });
    



// app.listen(5000,(req,res)=>{
//     console.log("sever is running port 5000")
// })





import bodyParser from "body-parser";
import express from "express";
import { mongoose } from "mongoose";
import dotenv from "dotenv";
import UserRouter from "./Routers/UserRouter.js"; // Fixed typo in the import
import jwt from "jsonwebtoken";
import cors from "cors";

dotenv.config();

const app = express();

// CORS configuration to allow the frontend (React) to make requests
app.use(
  cors({
    origin: "http://localhost:5173", // Frontend URL
    methods: "GET, POST, PUT, DELETE",
    credentials: true, // Allow cookies to be sent with requests
  })
);

// Middleware to parse incoming JSON request bodies
app.use(bodyParser.json());

// Database connection
const connectionString = process.env.MONGO_URL;
mongoose
  .connect(connectionString)
  .then(() => {
    console.log("Database connected successfully.");
  })
  .catch((error) => {
    console.error("Database connection failed:", error);
  });

// Use UserRouter for API routes related to user
app.use("/api/user", UserRouter);

// Middleware for token verification
app.use((req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", ""); // Remove "Bearer " from token

  if (token) {
    jwt.verify(token, "secret", (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: "Invalid or expired token" }); // Token verification failed
      }

      // Attach the decoded user data to the request object
      req.user = decoded;
      console.log("Decoded user:", decoded); // Optional: Log decoded user information for debugging
      next(); // Proceed to the next middleware or route handler
    });
  } else {
    return res.status(403).json({ message: "Authorization token required" }); // Missing token
  }
});

// Start the server
app.listen(5000, () => {
  console.log("Server is running on port 5000.");
});

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


