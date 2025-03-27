import express from "express";
import { postUser,getAllUsers ,getUserById,deleteUserbyId,putUserById,LoginUser} from "../Controllers/UserController.js";
//,deleteUser,putUser
const UserRouter = express.Router();
UserRouter.post("/", postUser);
UserRouter.get("/",getAllUsers);
UserRouter.get("/:userId",getUserById);
UserRouter.delete("/:userId", deleteUserbyId);
UserRouter.delete("/:userId", putUserById);

UserRouter.post("/login", LoginUser);




//UserRouter.delete("/", deleteUser);
//UserRouter.put("/",putUser);


export default UserRouter;