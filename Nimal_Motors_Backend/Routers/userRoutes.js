import express from "express";
import { protect } from '../MiddleWare/authMiddleware.js';

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


const UserRouter = express.Router();

// ✅ Public routes (no token required)
UserRouter.post("/register", postUser);    // User Registration
UserRouter.post("/login", LogInUser);      // User Login

// 🔐 Protected routes (token required)
UserRouter.use(protect);

UserRouter.get("/", getAllUsers);          // Get all users
UserRouter.get("/:userId", getUserById);   // Get user by ID
UserRouter.delete("/:userId", deleteUserById); // Delete user
UserRouter.put("/:userId", putUserById);   // Update user

// 🔐 Admin-only route
UserRouter.get("/admin", (req, res) => {
    if (!isAdminValid(req)) {
        return res.status(403).json({ message: "Admin access required" });
    }
    res.json({ message: "Welcome Admin!" });
});

// 🔐 Customer-only route
UserRouter.get("/customer", (req, res) => {
    if (!isCustomerValid(req)) {
        return res.status(403).json({ message: "Customer access required" });
    }
    res.json({ message: "Welcome Customer!" });
});

export default UserRouter;


// const express = require('express');
// const { registerUser, loginUser, getUserProfile, updateUserProfile, getAllUsers } = require('../Controllers/userController');
// const { protect, authorize } = require('../middleware/authMiddleware');

// const router = express.Router();
// router.get('/', (req, res) => {
//     res.send('User routes working!');
//   });

// // User registration
// router.post('/register', registerUser);

// // User login
// router.post('/login', loginUser);

// // Get user profile (protected route)
// router.get('/profile', protect, getUserProfile);

// // Update user profile (protected route)
// router.put('/profile', protect, updateUserProfile);

// // Get all users (admin-only route)
// router.get('/', protect, authorize('admin'), getAllUsers);

// module.exports = router;
