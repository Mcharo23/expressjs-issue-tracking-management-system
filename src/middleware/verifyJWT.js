const jwt = require("jsonwebtoken");

const verifyJWT = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;

  if (!authHeader?.startsWith("Bearer"))
    return res.status(401).json({ detail: "JWT must start with Bearer" });

  const token = authHeader.split(" ")[1];

  jwt.verify(token, "jwt", (err, decoded) => {
    if (err) return res.status(401).json({ detail: "Expired/invalid token" });
    req.user_id = decoded.user_id;
    req.role = decoded.role;
    next();
  });
};

module.exports = verifyJWT;
