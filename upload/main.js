import express from "express";
import {
    createBooking,
    getAllBookings,
    updateBooking,
    deleteBooking 
} from "../Controllers/WashingController.js";
const washingRouter = express.Router();


washingRouter.post("/", createBooking);
washingRouter.get("/", getAllBookings);
washingRouter.put("/:id", updateBooking);
washingRouter.delete("/:id", deleteBooking);


export default washingRouter;
