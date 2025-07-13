import jwt from "jsonwebtoken";

// Middleware to verify JWT and attach user info to request
export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Check if token exists and starts with "Bearer"
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Access denied. Token missing." });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // secret must match the one used in login
    req.user = decoded; // Attach user info to request (e.g., email, id, type)
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token." });
  }
};

// Optional: Middleware to allow only premium users
export const isPremiumUser = (req, res, next) => {
  if (req.user && req.user.type === "premiumCustomer") {
    return next();
  }
  return res.status(403).json({ message: "Access denied. Not a premium user." });
};

// Optional: Middleware to allow only admin
export const isAdmin = (req, res, next) => {
  if (req.user && req.user.type === "admin") {
    return next();
  }
  return res.status(403).json({ message: "Access denied. Not an admin." });
};
