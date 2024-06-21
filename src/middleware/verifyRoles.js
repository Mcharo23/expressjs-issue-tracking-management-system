const verifyRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.role) return res.status(401).json({ detail: "Unknown role" });

    const rolesArray = [...allowedRoles];

    const result = rolesArray.includes(req.role);

    if (!result)
      return res
        .status(403)
        .json({ detail: "You have no permission to perform this task" });

    next();
  };
};

module.exports = verifyRoles;
