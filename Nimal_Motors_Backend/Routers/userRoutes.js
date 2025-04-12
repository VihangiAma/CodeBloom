import express from "express";
//import { authenticateToken } from '../MiddleWare/authMiddleware.js';
import { protect, authorize } from '../MiddleWare/authMiddleware.js';

import {
    postUser,
    getAllUsers,
    getUserById,
    deleteUserById,  // Changed from deleteUserbyId
    putUserById,
    LogInUser,
    isAdminValid,
    isCustomerValid
} from "../Controllers/userController.js";
//import { authenticateToken } from '../MiddleWare/authMiddleware.js';

const UserRouter = express.Router();

// Public routes - No authentication required
UserRouter.post("/", postUser);  // User Registration (POST)
UserRouter.post("/login", LogInUser);  // User Login (POST)

// Protected routes (requires authentication token)
UserRouter.use(protect);

UserRouter.get("/", getAllUsers);
UserRouter.get("/:userId", getUserById);
UserRouter.delete("/:userId", deleteUserById);  // Changed from deleteUserbyId
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
UserRouter.use(protect);


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
