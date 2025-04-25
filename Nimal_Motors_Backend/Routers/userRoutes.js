import express from "express";
import {
  postUser,
  getAllUsers,
  getUserById,
  deleteUserById,
  putUserById,
  LogInUser,
  isAdminValid,
  isCustomerValid,
  getUserProfile, // 👈 using this controller function
} from "../Controllers/userController.js";
import { authenticateToken } from "../MiddleWare/authMiddleware.js";

const userRoutes = express.Router();

// ✅ PUBLIC ROUTES
userRoutes.post("/register", postUser);
userRoutes.post("/login", LogInUser);

// 🔐 PROTECTED ROUTES
userRoutes.use(authenticateToken);

userRoutes.get("/", getAllUsers);
userRoutes.get("/:userId", getUserById);
userRoutes.delete("/:userId", deleteUserById);
userRoutes.put("/:userId", putUserById);

// ✅ SINGLE /profile route (Clean one!)
userRoutes.get("/profile", getUserProfile);

// ✅ ROLE CHECKS
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
