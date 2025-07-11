import mongoose from 'mongoose';

const FeedbackSchema = mongoose.Schema({
    Name : {
        type: String,
        required: true,
    },
    Email: {
        type: String,
        required: true,
    },
    description:{
        type: String
        
    }
});
const Feedback = mongoose.model('Feedback', FeedbackSchema);
export default Feedback;