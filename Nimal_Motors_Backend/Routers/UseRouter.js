import express from "express";
import { postUser, getAllUsers, getUserById, deleteUserbyId, putUserById, LogInUser } from "../Controllers/UserController.js";

const UserRouter = express.Router();
UserRouter.post("/", postUser);
UserRouter.get("/", getAllUsers);
UserRouter.get("/:userId", getUserById);
UserRouter.delete("/:userId", deleteUserbyId);
UserRouter.put("/:userId", putUserById);  // Changed from DELETE to PUT
UserRouter.post("/login", LogInUser);

export default UserRouter;