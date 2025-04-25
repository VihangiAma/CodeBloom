import Users from '../Models/userModel.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export async function postUser(req, res) {
    try {
      const { userId, fullName, email, phoneNumber, username, password, type } = req.body;
  
      // Check for missing fields
      if (!userId || !fullName || !email || !username || !password || !type) {
        return res.status(400).json({ message: "Missing required fields" });
      }
  
      // Check if email or username already exists
      const existingUser = await Users.findOne({ $or: [{ email }, { username }] });
      if (existingUser) {
        return res.status(409).json({ message: "Email or username already in use" });
      }
  
      const saltRounds = 10;
      const passwordHash = bcrypt.hashSync(password, saltRounds);
  
      const newUser = new Users({
        userId,
        fullName,
        email,
        phoneNumber,
        username,
        password: passwordHash,
        type
      });
  
      await newUser.save();
  
      res.status(201).json({
        message: "User created successfully",
        user: newUser
      });
  
    } catch (error) {
      console.error("Registration error:", error);
      res.status(500).json({
        message: "User creation failed",
        error: error.message || "Internal Server Error"
      });
    }
  }
  
  export async function getAllUsers(req, res) {
    try {
        // Fetch only required fields
        const users = await Users.find({}, 'userId fullName email phoneNumber username type password');

        if (!users || users.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No users found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Users fetched successfully",
            count: users.length,
            data: users
        });
    } catch (error) {
        console.error("Error in getAllUsers:", error);
        res.status(500).json({
            success: false,
            message: "Error fetching users",
            error: error.message || 'Internal Server Error'
        });
    }
}
// controllers/userController.js

export async function getUserById(req, res) {
    try {
        const { userId } = req.params;

        // Find user by userId and return only selected fields
        const user = await Users.findOne(
            { userId },
            'userId fullName email phoneNumber username type'
        );

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "User fetched successfully",
            data: user
        });
    } catch (error) {
        console.error("Error in getUserById:", error);
        res.status(500).json({
            success: false,
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

        // Destructure and pick allowed fields in specific order
        const { fullName, email, phoneNumber, username } = req.body;

        const updates = {};
        if (fullName !== undefined) updates.fullName = fullName;
        if (email !== undefined) updates.email = email;
        if (phoneNumber !== undefined) updates.phoneNumber = phoneNumber;
        if (username !== undefined) updates.username = username;

        const updatedUser = await Users.findOneAndUpdate(
            { userId },
            updates,
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
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

export async function updatePassword(req, res) {
    const { userId } = req.params;
    const { current, newPassword } = req.body;

    try {
        const user = await Users.findOne({ userId });
        if (!user) return res.status(404).json({ message: "User not found" });

        const isMatch = bcrypt.compareSync(current, user.password);
        if (!isMatch) return res.status(401).json({ message: "Current password is incorrect" });

        const hashedPassword = bcrypt.hashSync(newPassword, 10);
        user.password = hashedPassword;
        await user.save();

        res.status(200).json({ message: "Password updated successfully" });
    } catch (err) {
        res.status(500).json({ message: "Error updating password", error: err.message });
    }
}

export const getUserProfile = async (req, res) => {
    try {
        const { email } = req.user;

        if (!email) {
            return res.status(400).json({ success: false, message: "Email missing in token" });
        }

        const user = await Users.findOne({ email: email.toLowerCase() });

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        res.json({
            success: true,
            user: {
                userId: user.userId,
                fullName: user.fullName,
                email: user.email,
                username: user.username,
                phoneNumber: user.phoneNumber,
                type: user.type
            }
        });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

  
  


export function isAdminValid(req) {
    return req.user && req.user.type === "admin";
}

export function isCustomerValid(req) {
    return req.user && req.user.type === "customer";
}