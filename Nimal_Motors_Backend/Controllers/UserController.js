// 

// Controllers/UserController.js (ES Module version)

import userModel from '../Models/userModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Register a new user
export const postUser = async (req, res) => {
    const { name, email, password, phone, vehicleDetails } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
        name,
        email,
        password: hashedPassword,
        phone,
        vehicleDetails,
        role: 'premium'
    });

    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
};

// User login
export const LogInUser = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
        return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
};

// Get all users
export const getAllUsers = async (req, res) => {
    const users = await User.find();
    res.json(users);
};

// Get user by ID
export const getUserById = async (req, res) => {
    const user = await User.findById(req.params.userId);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
};

// Delete user by ID
export const deleteUserById = async (req, res) => {
    await User.findByIdAndDelete(req.params.userId);
    res.json({ message: "User deleted successfully" });
};

// Update user by ID
export const putUserById = async (req, res) => {
    const updated = await User.findByIdAndUpdate(req.params.userId, req.body, { new: true });
    res.json(updated);
};

// Helpers for roles
export const isAdminValid = (req) => req.user?.role === 'admin';
export const isCustomerValid = (req) => req.user?.role === 'premium';
