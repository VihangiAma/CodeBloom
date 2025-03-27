import Users from '../Models/User.js';

export async function postUser(req, res) {
    try { 
        const user = req.body;
        const newUser = new Users(user);

        await newUser.save();
        
        res.status(201).json({
            message: "User created successfully",
            user: newUser
        });

    } catch (error) {
        // Send a 500 status for server errors
        res.status(500).json({
            message: "User creation failed",
            error: error.message || 'Internal Server Error'
        });
    }
}

export async function getAllUsers(req, res) {
    try {
        const users = await Users.find();  // Fetch all users from the database

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
        const { userId } = req.params; // Get the userId from the URL parameters
        const user = await Users.findOne({ userId }); // Find the user by userId

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
// detele by user Id

/*export async function deleteUserbyId(req, res) {
    try {
        const { userId } = req.query;
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
}*/

export async function deleteUserbyId(req, res) {
    try {
        const { userId } = req.params; // Get the userId from the URL parameters
        const user = await Users.findOneAndDelete({ userId }); // Find and delete the user by userId

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
        const { userId } = req.params; // Get the userId from the URL parameters
        const updates = req.body; // Get the data to update from the request body

        // Find the user by userId and update the user
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



export async function LoginUser(req, res) {
    try {
        const { email, password } = req.body;

        // Find the user by email
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Compare hashed passwords
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(403).json({ message: "Incorrect password" });
        }

        // Create JWT payload
        const payload = {
            id: user._id,
            email: user.email,
            type: user.type
        };

        // Generate token
        const token = jwt.sign(payload, process.env.JWT_KEY, { expiresIn: "1h" });

        res.status(200).json({
            message: "Login successful",
            user,
            token
        });

    } catch (error) {
        res.status(500).json({
            message: "Login failed",
            error: error.message || "Internal Server Error"
        });
    }
}


export async function isAdminValid(req) {
    try {
        if (!req.user || req.user.type !== "admin") {
            return false;
        }
        return true;
    } catch (error) {
        console.error("Error in admin validation:", error);
        return false;
    }
}

export async function isCustomerValid(req) {
    try {
        if (!req.user) {
            return false;
        }
        console.log(req.user);
        return req.user.type === "customer";
    } catch (error) {
        console.error("Error in customer validation:", error);
        return false;
    }
}
