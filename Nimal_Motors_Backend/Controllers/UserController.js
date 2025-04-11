// 

const User = require('./Models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Register a new user
const registerUser = async (req, res) => {
    const { name, email, password, phone, vehicleDetails } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const user = new User({
        name,
        email,
        password: hashedPassword,
        phone,
        vehicleDetails,
        role: 'premium' // Default role for new users
    });

    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
};

// User login
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    // Check for user
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate JWT
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
};

// Change password for premium customers
const changePassword = async (req, res) => {
    const { newPassword } = req.body;
    const user = await User.findById(req.user.id);

    if (user.role !== 'premium') {
        return res.status(403).json({ message: 'Only premium users can change their password' });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    res.json({ message: 'Password changed successfully' });
};

// Get user profile
const getUserProfile = async (req, res) => {
    const user = await User.findById(req.user.id);
    res.json(user);
};

// Update user profile
const updateUserProfile = async (req, res) => {
    const { name, phone, vehicleDetails } = req.body;
    const user = await User.findByIdAndUpdate(req.user.id, { name, phone, vehicleDetails }, { new: true });
    res.json(user);
};

// Get all users (admin-only)
const getAllUsers = async (req, res) => {
    const users = await User.find();
    res.json(users);
};

module.exports = {
    registerUser,
    loginUser,
    getUserProfile,
    updateUserProfile,
    getAllUsers,
    changePassword
};
