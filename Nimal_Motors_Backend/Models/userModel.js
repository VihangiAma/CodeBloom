import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        unique: true
    },
    fullName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true,
        enum: ["premiumCustomer", "admin", "bosyshopsupervisor","electricalsupervisor","mechanicalsupervisor","servicesupervisor","accountant"] // optional: limit to roles
    }
}, { timestamps: true }); // adds createdAt and updatedAt

const User = mongoose.model("User", userSchema);
export default User;
