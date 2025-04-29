import express from 'express'
 import {postUserReport,getUserReports} from '../Controllers/UserReportController.js'

 const UserReportRouter= express.Router();

 UserReportRouter.post("/",postUserReport )
 UserReportRouter.get("/",getUserReports)

 


export default UserReportRouter;
 