import Feedback from "../Models/Feedback.js";
// Post function to create feedback
export async function CreateFeedback(req, res) {
    try {
        const feedbackData = req.body;
        
        // Validate required fields
        if (!feedbackData.Name || !feedbackData.Email) {
            return res.status(400).json({
                message: "Name and Email are required fields"
            });
        }

        const newFeedback = new Feedback(feedbackData);
        await newFeedback.save();

        res.status(201).json({
            message: "Feedback created successfully",
            feedback: newFeedback
        });
    } catch (error) {
        res.status(500).json({
            message: "Feedback creation failed",
            error: error.message
        });
    }
}

// Get all feedbacks
export async function getFeedback(req, res) {
    try {
        const feedbacks = await Feedback.find();
        res.status(200).json({
            message: "Feedbacks retrieved successfully",
            count: feedbacks.length,
            feedbacks
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to retrieve feedbacks",
            error: error.message
        });
    }
}