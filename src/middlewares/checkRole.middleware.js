const checkRole = (allowedRoles) => {
  return (req, res, next) => {
    const userRole = req.user.role;

    if (allowedRoles.includes(userRole)) {
      return next();
    }

    return res.status(403).json({
      statusCode: 403,
      message: "You cannot access this resource",
    });
  };
};

module.exports = checkRole;
