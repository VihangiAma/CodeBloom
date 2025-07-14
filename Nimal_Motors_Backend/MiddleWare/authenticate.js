import jwt from "jsonwebtoken";

const authenticateToken = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "No token provided" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret_key");
    req.user = {
      userId: decoded.userId,
      type: decoded.type || "bodyshopsupervisor",
    };
    next();
  } catch (err) {
    console.error("JWT Error:", err);
    res.status(401).json({ message: "Invalid token" });
  }
};

export default authenticateToken;

export const verifyBodyshopSupervisor = (req, res, next) => {
  if (!req.user || req.user.type !== "bodyshopsupervisor") {
    return res.status(403).json({ message: "Access Denied: Not Bodyshop Supervisor" });
  }
  next();
};