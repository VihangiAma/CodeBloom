// 

import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    username: { type: String, required: true },

    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    vehicleDetails: { type: String, required: true },
    type: {
        type: String,
        enum: ['admin', 'mechanical', 'bodyshop', 'service', 'electrical', 'accountant', 'premium'],
        required: true
    },
    feedback: [{
        comment: String,
        rating: { type: Number, min: 1, max: 5 }
    }]
}, { timestamps: true });

const userModel = mongoose.model('User', userSchema);
export default userModel;
