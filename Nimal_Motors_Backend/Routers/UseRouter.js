
import express from "express";
import { postUser, getAllUsers, getUserById, deleteUserbyId, putUserById, LogInUser,isAdminValid,isCustomerValid } from "../Controllers/UserController.js";


import { authenticateToken } from "../MiddleWare/authMiddleware.js";  // ✅ Fix import








const UserRouter = express.Router();

// Protected routes (requires authentication)
UserRouter.use(authenticateToken);
UserRouter.get("/", getAllUsers);
UserRouter.get("/:userId", getUserById);
UserRouter.delete("/:userId", deleteUserbyId);
UserRouter.put("/:userId", putUserById);  // Changed from DELETE to PUT

// Public routes
UserRouter.post("/login", LogInUser);
UserRouter.post("/", postUser);




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