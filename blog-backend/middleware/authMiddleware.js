const jwt = require("jsonwebtoken");

function authMiddleware(req, res, next) {
  const token = req.header("Authorization");
  if (!token) return res.status(401).json({ error: "Access denied" });

  try {
    const decoded = jwt.verify(token, "your_jwt_secret");
    req.user = decoded; // attach user info to req
    next();
  } catch {
    res.status(400).json({ error: "Invalid token" });
  }
}

module.exports = authMiddleware;
