import express from 'express';
import { CreateFeedback, getFeedback } from '../Controllers/FeedbackController.js';
const FeedbackRouter = express.Router();
FeedbackRouter.post("/", CreateFeedback);
FeedbackRouter.get("/", getFeedback);

export default FeedbackRouter;
