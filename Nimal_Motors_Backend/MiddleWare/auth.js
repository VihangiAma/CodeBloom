export const verifyPremiumCustomer = (req, res, next) => {
  if (!req.user || req.user.type !== "premiumCustomer") {
    return res.status(403).json({ message: "Access Denied: Not Premium Customer" });
  }
  next();
};
