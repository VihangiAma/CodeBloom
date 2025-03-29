import express from "express";

import{
    createService,
    getAllServices,
    updateService,
    deleteService
}

from "../Controllers/ServiceController.js";
const serviceRouter = express.Router();


serviceRouter.post("/", createService);
serviceRouter.get("/", getAllServices);
serviceRouter.put("/:id", updateService);
serviceRouter.delete("/:id", deleteService);


export default serviceRouter;
