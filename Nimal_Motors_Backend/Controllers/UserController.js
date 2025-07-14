import Users from '../Models/userModel.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import nodemailer from "nodemailer";



export async function postUser(req, res) {
    try {
      const { fullName, email, phoneNumber, username, password, type } = req.body;
  
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
                type: user.type,
                mustChangePassword: user.mustChangePassword // Include flag in token
            },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.status(200).json({
            message: user.mustChangePassword 
                ? "Login successful. Please change your temporary password." 
                : "Login successful",
            token,
            user: {
                userId: user.userId,
                email: user.email,
                fullName: user.fullName,
                type: user.type,
                mustChangePassword: user.mustChangePassword // Include flag in response
            }
        });

    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({
            message: "Login failed",
            error: error.message
        });
    }
};

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


export const getBasicUserProfile = async (req, res) => {
  try {
    // Extract the email from the decoded JWT (stored in req.user)
    const { email } = req.user;

    if (!email) {
      return res.status(400).json({ success: false, message: "Email missing in token" });
    }

    // Query the user from the database based on the email
    const user = await Users.findOne({ email: email.toLowerCase() });

    // Check if user exists
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Respond with only the necessary fields (fullName, email, phoneNumber)
    return res.json({
      success: true,
      user: {
        fullName: user.fullName,
        email: user.email,
        phoneNumber: user.phoneNumber,
      }
    });
  } catch (error) {
    return res.status(500).json({ message: "Server Error", error: error.message });
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




// Updated changePassword to reset mustChangePassword flag
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
        user.mustChangePassword = false; // Reset the flag
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




export const forgotPasswordHandler = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await Users.findOne({ email: email.toLowerCase() });

    if (!user) {
      return res.status(404).json({ message: "Email not found" });
    }

        const resetLink = `http://localhost:5173/reset-password?userId=${user.userId}`;


    // ✅ Create test transport or use real credentials (e.g., Gmail)
    const transporter = nodemailer.createTransport({
      service: "gmail", // or "hotmail", "outlook", etc.
      auth: {
        user: "sithuprabodha7@gmail.com",      
        pass: "spsv dfkw bctb cohw",    
      },
    });

    // ✅ Compose message
    const mailOptions = {
      from: '"Nimal Motors" <sithuprabodha@gmail.com>', // sender
      to:user.email, // receiver
      subject: "Password Reset - Nimal Motors",
      text: `Hello ${user.fullName},

We received a request to reset your password.

Please click the link below or copy it into your browser to reset your password:
http://localhost:5173/reset-password?userId=${user.userId}

If you didn’t request this, please ignore this email.

Thanks,
Nimal Motors Team`,

    };

    // ✅ Send email
    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "Reset instructions sent to email." });
  } catch (error) {
    console.error("Email error:", error);
    res.status(500).json({ message: "Failed to send email" });
  }
};


// Controller Function to Handle Password Reset (no token required)
export const resetPasswordHandler = async (req, res) => {
  const { userId, newPassword } = req.body;

  try {
    // Validate input
    if (!userId || !newPassword) {
      return res.status(400).json({ message: "Missing userId or newPassword." });
    }

    // Find the user by userId
    const user = await Users.findOne({ userId });

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    user.mustChangePassword = false; // Reset the temporary flag if used

    await user.save();

    res.status(200).json({ message: "Password reset successful." });
  } catch (error) {
    console.error("Error in resetPasswordHandler:", error);
    res.status(500).json({
      message: "Server error while resetting password.",
      error: error.message,
    });
  }
};


const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'sithuprabodha7@gmail.com',      
    pass: 'spsv dfkw bctb cohw',         
  },
});


function generateRandomPassword(length = 10) {
  const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$!";
  let password = "";
  for (let i = 0; i < length; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return password;
}

export const addingUserByAdmin = async (req, res) => {
  try {
    const { fullName, email, phoneNumber, username, type } = req.body;

    // ✅ Validation
    if (!fullName || !email || !username || !type || !phoneNumber) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // ✅ Check for duplicate email or username
    const existingUser = await Users.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(409).json({ message: "Email or username already exists." });
    }

    // ✅ Generate & hash temp password
    const tempPassword = generateRandomPassword(10);
    const hashedPassword = await bcrypt.hash(tempPassword, 10);

    const newUser = new Users({
      fullName,
      email: email.toLowerCase(),
      username,
      phoneNumber,
      type,
      password: hashedPassword,
      mustChangePassword: true, // flag for forced password change
    });

    await newUser.save();

    // ✅ Email setup
    const mailOptions = {
      from: '"Nimal Motors" <sithuprabodha7@gmail.com>',
      to: email,
      subject: 'Welcome to Nimal Motors - Your Temporary Password',
      html: `
        <p>Hello ${fullName},</p>
        <p>You have been registered to the Nimal Motors Garage Management System.</p>
        <p><strong>Username:</strong> ${email}</p>
        <p><strong>Temporary Password:</strong> ${tempPassword}</p>
        <p>Please <a href="http://localhost:5173/login">log in</a> and change your password </p>
        <br/>
        <p>Thank you,<br/>Nimal Motors Admin Team</p>
      `
    };

    await transporter.sendMail(mailOptions);

    // ✅ Send success response WITHOUT temp password in JSON
    res.status(201).json({
      message: "User added and temporary password sent via email.",
      // tempPassword removed here intentionally for security
    });

  } catch (error) {
    console.error("Error adding user by admin:", error);
    res.status(500).json({ message: "Failed to add user." });
  }
};



export function isAdminValid(req) {
    return req.user && req.user.type === "admin";
}

export function isCustomerValid(req) {
    return req.user && req.user.type === "customer";
}

