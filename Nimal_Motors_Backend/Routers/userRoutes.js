import express from "express";
import {
    postUser,
    getAllUsers,
    getUserById,
    deleteUserById,
    putUserById,
    LogInUser,
    isAdminValid,
    isCustomerValid
} from "../Controllers/userController.js";
import { authenticateToken } from "../MiddleWare/authMiddleware.js";

// Create the router instance
const userRoutes = express.Router();

// ✅ Public Routes (No Authentication Required)
userRoutes.post("/", postUser);           // Register new user
userRoutes.post("/login", LogInUser);     // User login

// ✅ Protected Routes (Require token)
userRoutes.use(authenticateToken);

userRoutes.get("/", getAllUsers);                     // Get all users
userRoutes.get("/:userId", getUserById);              // Get single user by ID
userRoutes.delete("/:userId", deleteUserById);        // Delete user
userRoutes.put("/:userId", putUserById);              // Update user

// ✅ Role-Based Routes
userRoutes.get("/admin/check", (req, res) => {
    if (!isAdminValid(req)) {
        return res.status(403).json({ message: "Admin access required" });
    }
    res.json({ message: "Welcome Admin!" });
});

userRoutes.get("/customer/check", (req, res) => {
    if (!isCustomerValid(req)) {
        return res.status(403).json({ message: "Customer access required" });
    }
    res.json({ message: "Welcome Customer!" });
});

export default userRoutes;
