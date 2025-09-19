function roleMiddleware(role) {
  return (req, res, next) => {
    const userRole = req.headers["x-role"]; // ex: "Admin" sau "User"
    if (userRole === role) {
      next();
    } else {
      res.status(403).json({ error: "Access forbidden" });
    }
  };
}

module.exports = roleMiddleware;