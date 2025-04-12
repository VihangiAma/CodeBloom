// 

import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    vehicleDetails: { type: String, required: true },
    role: {
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
