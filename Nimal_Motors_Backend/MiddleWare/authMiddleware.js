import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: "No token provided" });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ message: "Invalid or expired token" });
        }
        req.user = user;
        next();
    });
}

// middleware/auth.js

// export function authenticateAdmin(req, res, next) {
//     const authHeader = req.headers['authorization'];
//     const token = authHeader && authHeader.split(' ')[1];
  
//     if (!token) {
//       return res.status(401).json({ message: "Access Denied: No token provided" });
//     }
  
//     jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
//       if (err) {
//         return res.status(403).json({ message: "Invalid or expired token" });
//       }
  
//       if (user.role !== 'admin') {
//         return res.status(403).json({ message: "Forbidden: Insufficient permissions" });
//       }
  
//       req.user = user;
//       next();
//     });
//   }
  