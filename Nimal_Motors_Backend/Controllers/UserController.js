import Users from '../Models/userModel.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export async function postUser(req, res) {
    try {
        const user = req.body;
        const password = req.body.password;
        const saltRounds = 10;
        const passwordHash = bcrypt.hashSync(password, saltRounds);

        user.password = passwordHash;

        const newUser = new Users(user);
        await newUser.save()
            .then(() => {
                res.status(201).json({
                    message: "User created successfully",
                    user: newUser
                });
            })
            .catch((error) => {
                res.status(500).json({
                    message: "User creation failed",
                    error: error.message || "Internal Server Error"
                });
            });
    } catch (error) {
        res.status(500).json({
            message: "User creation failed",
            error: error.message || "Internal Server Error"
        });
    }
}

export async function getAllUsers(req, res) {
    try {
        const users = await Users.find();
        if (!users || users.length === 0) {
            return res.status(404).json({
                message: "No users found"
            });
        }
        res.status(200).json({
            message: "Users fetched successfully",
            users
        });
    } catch (error) {
        res.status(500).json({
            message: "Error fetching users",
            error: error.message || 'Internal Server Error'
        });
    }
}

export async function getUserById(req, res) {
    try {
        const { userId } = req.params;
        const user = await Users.findOne({ userId });
        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }
        res.status(200).json({
            message: "User fetched successfully",
            user
        });
    } catch (error) {
        res.status(500).json({
            message: "Error fetching user",
            error: error.message || 'Internal Server Error'
        });
    }
}

export async function deleteUserById(req, res) {  // Changed from deleteUserbyId to deleteUserById
    try {
        const { userId } = req.params;
        const user = await Users.findOneAndDelete({ userId });
        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }
        res.status(200).json({
            message: "User deleted successfully",
            user
        });
    } catch (error) {
        res.status(500).json({
            message: "Error deleting user",
            error: error.message || 'Internal Server Error'
        });
    }
}

export async function putUserById(req, res) {
    try {
        const { userId } = req.params;
        const updates = req.body;
        const updatedUser = await Users.findOneAndUpdate({ userId }, updates, { new: true });
        if (!updatedUser) {
            return res.status(404).json({
                message: "User not found"
            });
        }
        res.status(200).json({
            message: "User updated successfully",
            user: updatedUser
        });
    } catch (error) {
        res.status(500).json({
            message: "Error updating user",
            error: error.message || 'Internal Server Error'
        });
    }
}

export async function LogInUser(req, res) {
    const { email, password } = req.body;

    try {
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        const user = await Users.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const isPasswordValid = bcrypt.compareSync(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign(
            {
                id: user.userId,
                email: user.email,
                type: user.type
            },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.status(200).json({
            message: "Login successful",
            token,
            user: {
                id: user.userId,
                email: user.email,
                fullName: user.fullName,
                type: user.type
            }
        });

    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({
            message: "Login failed",
            error: error.message
        });
    }
}

export function isAdminValid(req) {
    return req.user && req.user.type === "admin";
}

export function isCustomerValid(req) {
    return req.user && req.user.type === "customer";
}