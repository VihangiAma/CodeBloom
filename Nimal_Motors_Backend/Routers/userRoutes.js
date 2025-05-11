
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
  getUserProfile,
  getAdminProfile,
  getAccountantProfile,
  getBodyshopSupProfile,
  getElectricalSupProfile,
  getMechanicalSupProfile,
  getServiceSupProfile,
  addUserByAdmin,
  changePassword,
  updateOwnProfile,

} from "../Controllers/UserController.js";
import { authenticateToken } from "../MiddleWare/authMiddleware.js";

const userRoutes = express.Router();

userRoutes.put('/me', authenticateToken, updateOwnProfile);


// ✅ PUBLIC ROUTES
//userRoutes.post("/register", postUser);
userRoutes.post("/login", LogInUser);
userRoutes.post("/admin/add-user", addUserByAdmin);


// 🔐 PROTECTED ROUTES
userRoutes.use(authenticateToken);
userRoutes.get("/profile", getUserProfile);
userRoutes.get("/admin/profile", getAdminProfile);
userRoutes.get("/accountant/profile", getAccountantProfile);
userRoutes.get("/bodyshop/profile", getBodyshopSupProfile);
userRoutes.get("/electrical/profile", getElectricalSupProfile);
userRoutes.get("/service/profile", getServiceSupProfile);
userRoutes.get("/mechanical/profile", getMechanicalSupProfile);

userRoutes.post("/change-password", changePassword);


userRoutes.get("/", getAllUsers);
userRoutes.get("/:userId", getUserById);
userRoutes.delete("/:userId", deleteUserById);
userRoutes.put("/:userId", putUserById);
// userRoutes.put("/profile", updateOwnProfile);



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

