import express from 'express'
 import {postUserReport,getUserReports,deleteUserReport,updateUserReport} from '../Controllers/UserReport.js'

 const userRouter= express.Router();

 userRouter.post("/",postUserReport )
 userRouter.get("/",getUserReports)
 userRouter.delete("/:id",deleteUserReport)
 userRouter.put("/:id",updateUserReport)


export default userRouter;
 