import express from "express";
import { postUser, getAllUsers, getUserById, deleteUserbyId, putUserById, LogInUser, isAdminValid, isCustomerValid } from "../Controllers/UserController.js";
import { authenticateToken } from '../MiddleWare/authMiddleware.js';

const UserRouter = express.Router();

// Public routes - No authentication required
UserRouter.post("/", postUser);  // User Registration (POST)
UserRouter.post("/login", LogInUser);  // User Login (POST)

// Protected routes (requires authentication token)
UserRouter.use(authenticateToken);  // Middleware that applies only to the below routes

UserRouter.get("/", getAllUsers);
UserRouter.get("/:userId", getUserById);
UserRouter.delete("/:userId", deleteUserbyId);
UserRouter.put("/:userId", putUserById);

// Admin-only route
UserRouter.get("/admin", (req, res) => {
    if (!isAdminValid(req)) {
        return res.status(403).json({ message: "Admin access required" });
    }
    res.json({ message: "Welcome Admin!" });
});

// Customer-only route
UserRouter.get("/customer", (req, res) => {
    if (!isCustomerValid(req)) {
        return res.status(403).json({ message: "Customer access required" });
    }
    res.json({ message: "Welcome Customer!" });
});

export default UserRouter;
