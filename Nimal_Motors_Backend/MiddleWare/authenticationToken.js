import jwt from "jsonwebtoken";

const authenticateToken = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "No token provided" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret_key");
    req.user = {
      userId: decoded.userId, // Match BodyshopRoute.js expectation
      type: decoded.type || "premiumCustomer",
    };
    next();
  } catch (err) {
    console.error("JWT Error:", err);
    res.status(401).json({ message: "Invalid token" });
  }
};

export default authenticateToken;
export const verifyPremiumCustomer = (req, res, next) => {
  if (!req.user || req.user.type !== "premiumCustomer") {
    return res.status(403).json({ message: "Access Denied: Not Premium Customer" });
  }
  next();
};