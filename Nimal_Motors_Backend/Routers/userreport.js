import express from 'express'
 import {postUserReport,getUserReports,deleteUserReport,updateUserReport} from '../Controllers/UserReport.js'

 const userRRouter= express.Router();

 userRRouter.post("/",postUserReport )
userRRouter.get("/",getUserReports)
userRRouter.delete("/:id",deleteUserReport)
userRRouter.put("/:id",updateUserReport)


export default userRRouter;
 