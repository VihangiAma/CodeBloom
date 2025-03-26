const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./Models/db");
const middleware = require("./MiddleWare/middleware"); 

dotenv.config();
connectDB(); // Connect to MongoDB

app.use(middleware);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

const stockRoutes = require("./Routers/stockRoutes.mjs");
app.use("/api/stock", stockRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
