import exppress from 'express';
import { CreateFeedback, getFeedback } from '../Controllers/FeedbackController.js';
const FeedbackRouter = exppress.Router();
FeedbackRouter.post("/", CreateFeedback);
FeedbackRouter.get("/", getFeedback);

export default FeedbackRouter;
