import Users from '../Models/User.js';
import jwt from 'jsonwebtoken';


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


/*export function LogInUser(req, res) {
    const credentials = req.body;

    Users.findOne({ 
        email: credentials.email, 
        password: credentials.password 
    })
    .then((user) => {
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Create JWT token
        const token = jwt.sign({ userId: user.userId }, "secret", { expiresIn: "1h" });

        // Send success response with user data and token
        res.json({
            message: "User found",
            user: user,
            token: token
        });
    })
    .catch((error) => {
        res.status(500).json({ message: "Login failed", error: error.message || 'Internal Server Error' });
    });
}
*/


export function LogInUser(req, res) {
    const credentials = req.body;

    Users.findOne({ 
        email: credentials.email, 
        password: credentials.password 
    })
    .then((user) => {
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Create payload with user details
        const payload = {
            id: user.userId,  // Matching the schema's 'userId' field
            email: user.email,
            fullname: user.fullName,  // Matching the schema's 'fullName' field
            type: user.type
        };

        // Create JWT token
        const token = jwt.sign(payload, "secret", { expiresIn: "1h" });

        // Send success response with user data and token
        res.json({
            message: "User found",
            user: {
                id: user.userId,
                email: user.email,
                fullname: user.fullName,  // Corrected to match the schema
                type: user.type
            },
            token: token
        });
    })
    .catch((error) => {
        res.status(500).json({ message: "Login failed", error: error.message || 'Internal Server Error' });
    });
}