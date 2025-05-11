import Users from '../Models/userModel.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export async function postUser(req, res) {
    try {
      const { fullName, email, phoneNumber, username, password, type } = req.body;
  
      // Check for missing fields
      if (!fullName || !email || !username || !password || !type) {
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
               userId: user.userId,
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
               userId: user.userId,
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
        console.log("Decoded JWT user:", req.user); // 👈 This will show what's in the token

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

export const getAdminProfile = async (req, res) => {
    try {
        console.log("Decoded JWT user:", req.user); // 👈 This will show what's in the token

        const { email } = req.user;

        if (!email) {
            return res.status(400).json({ success: false, message: "Email missing in token" });
        }

        // Fetch user by email
        const user = await Users.findOne({ email: email.toLowerCase() });

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // Check if the user is an admin
        if (user.type !== 'admin') {
            return res.status(403).json({ success: false, message: "Access denied. User is not an admin" });
        }

        // If the user is an admin, return the admin profile
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


export const getAccountantProfile = async (req, res) => {
    try {
        console.log("Decoded JWT user:", req.user);
        const { email } = req.user;

        if (!email) {
            return res.status(400).json({ success: false, message: "Email missing in token" });
        }

        // Fetch user by email
        const user = await Users.findOne({ email: email.toLowerCase() });

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // Check if the user is an admin
        if (user.type !== 'accountant') {
            return res.status(403).json({ success: false, message: "Access denied. User is not an admin" });
        }

        // If the user is an admin, return the admin profile
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

  export const getBodyshopSupProfile = async (req, res) => {
    try {
        console.log("Decoded JWT user:", req.user); // 👈 This will show what's in the token

        const { email } = req.user;

        if (!email) {
            return res.status(400).json({ success: false, message: "Email missing in token" });
        }

        // Fetch user by email
        const user = await Users.findOne({ email: email.toLowerCase() });

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // Check if the user is an admin
        if (user.type !== 'bodyshopsupervisor') {
            return res.status(403).json({ success: false, message: "Access denied. User is not an bodyshopsupervisor" });
        }

        // If the user is an admin, return the admin profile
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



export const getMechanicalSupProfile = async (req, res) => {
    try {
        console.log("Decoded JWT user:", req.user); // 👈 This will show what's in the token

        const { email } = req.user;

        if (!email) {
            return res.status(400).json({ success: false, message: "Email missing in token" });
        }

        // Fetch user by email
        const user = await Users.findOne({ email: email.toLowerCase() });

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // Check if the user is an admin
        if (user.type !== 'mechanicalsupervisor') {
            return res.status(403).json({ success: false, message: "Access denied. User is not an admin" });
        }

        // If the user is an admin, return the admin profile
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



export const getElectricalSupProfile = async (req, res) => {
    try {
        console.log("Decoded JWT user:", req.user); // 👈 This will show what's in the token

        const { email } = req.user;

        if (!email) {
            return res.status(400).json({ success: false, message: "Email missing in token" });
        }

        // Fetch user by email
        const user = await Users.findOne({ email: email.toLowerCase() });

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // Check if the user is an admin
        if (user.type !== 'electricalsupervisor') {
            return res.status(403).json({ success: false, message: "Access denied. User is not an admin" });
        }

        // If the user is an admin, return the admin profile
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


export const getServiceSupProfile = async (req, res) => {
    try {
        console.log("Decoded JWT user:", req.user); // 👈 This will show what's in the token

        const { email } = req.user;

        if (!email) {
            return res.status(400).json({ success: false, message: "Email missing in token" });
        }

        // Fetch user by email
        const user = await Users.findOne({ email: email.toLowerCase() });

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // Check if the user is an admin
        if (user.type !== 'servicesupervisor') {
            return res.status(403).json({ success: false, message: "Access denied. User is not an admin" });
        }

        // If the user is an admin, return the admin profile
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




export const addUserByAdmin = async (req, res) => {
    try {
      const { fullName, email, phoneNumber, username, type } = req.body;
  
      if (!fullName || !email || !phoneNumber || !username || !type) {
        return res.status(400).json({ message: "Required fields are missing." });
      }
  
      const existingUser = await Users.findOne({
        $or: [{ email }, { username }]
      });
  
      if (existingUser) {
        return res
          .status(409)
          .json({ message: "Email or username already exists." });
      }
  
      // ✨ Generate strong temporary password
      const generateStrongTempPassword = (length = 10) => {
        const lower = 'abcdefghijklmnopqrstuvwxyz';
        const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const numbers = '0123456789';
        const symbols = '!@#$%^&*()_+{}[]<>?';
        const allChars = lower + upper + numbers + symbols;
  
        let password = '';
        password += lower.charAt(Math.floor(Math.random() * lower.length));
        password += upper.charAt(Math.floor(Math.random() * upper.length));
        password += numbers.charAt(Math.floor(Math.random() * numbers.length));
        password += symbols.charAt(Math.floor(Math.random() * symbols.length));
  
        for (let i = 4; i < length; i++) {
          password += allChars.charAt(Math.floor(Math.random() * allChars.length));
        }
  
        return password.split('').sort(() => 0.5 - Math.random()).join('');
      };
  
      const tempPassword = generateStrongTempPassword(); // 🔥
      const hashedPassword = await bcrypt.hash(tempPassword, 10);
  
      const newUser = new Users({
        fullName,
        email: email.toLowerCase(),
        phoneNumber,
        username,
        type,
        password: hashedPassword
      });
  
      await newUser.save();
  
      res.status(201).json({
        message: "User created successfully with a temporary password.",
        tempPassword, // 👀 Show once
        user: {
          userId: newUser.userId,
          fullName: newUser.fullName,
          email: newUser.email,
          phoneNumber: newUser.phoneNumber,
          username: newUser.username,
          type: newUser.type
        }
      });
    } catch (error) {
      console.error("Error in addUserByAdmin:", error);
      res.status(500).json({ message: "Internal server error.", error: error.message });
    }
  };
  


export const changePassword = async (req, res) => {
    const { userId, oldPassword, newPassword } = req.body;

    try {
        // Find the user by userId
        const user = await Users.findOne({ userId });

        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        // Check if the old password matches
        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Old password is incorrect." });
        }

        // Hash the new password and update the user's password
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        await user.save();

        // Respond with success message
        res.status(200).json({ message: "Password updated successfully." });
    } catch (err) {
        // Handle any errors that occur
        res.status(500).json({ message: "Server error.", error: err.message });
    }
};

export async function updateOwnProfile(req, res) {
    try {
        const { fullName, email, phoneNumber, username } = req.body;

        // ✅ Use correct field name: userId
        const user = await Users.findOne({ userId: req.user.userId });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const updates = {};
        if (fullName) updates.fullName = fullName;
        if (email) updates.email = email;
        if (phoneNumber) updates.phoneNumber = phoneNumber;
        if (username) updates.username = username;

        // ✅ Use correct field name again here
        const updatedUser = await Users.findOneAndUpdate(
            { userId: req.user.userId },
            updates,
            { new: true, runValidators: true }
        );

        res.status(200).json({
            message: "Profile updated successfully",
            user: updatedUser
        });

    } catch (error) {
        console.error("Error updating profile:", error);
        res.status(500).json({
            message: "Error updating profile",
            error: error.message || 'Internal Server Error'
        });
    }
}



export function isAdminValid(req) {
    return req.user && req.user.type === "admin";
}

export function isCustomerValid(req) {
    return req.user && req.user.type === "customer";
}