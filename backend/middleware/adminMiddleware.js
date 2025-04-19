const adminMiddleware = (req, res, next) => {
  if (!req.user) {
    return res
      .status(401)
      .json({ message: "Unauthorized. Token missing or invalid." });
  }

  if (!req.user.isAdmin) {
    return res.status(403).json({ message: "Access denied. Admins only." });
  }

  next();
};

module.exports = adminMiddleware;
