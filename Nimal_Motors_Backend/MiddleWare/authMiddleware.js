import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export function authenticateToken(req, res, next) {
    const token = req.headers['authorization']?.split(' ')[1]; // Extract Bearer token

    if (!token) {
        return res.status(401).json({ message: "Access denied: No token provided" });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => { // Use correct key
        if (err) {
            return res.status(403).json({ message: "Invalid token" });
        }
        req.user = user; // Attach user data to request
        next();
    });
}
