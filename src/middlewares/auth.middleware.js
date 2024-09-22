const jwt = require("jsonwebtoken");

require("dotenv").config();

const authenticateToken = (req, res, next) => {
  try {
    const header = req.header("Authorization");

    if (!header) {
      throw new Error("Authorization header not found");
    }

    const token = header.split(" ")[1];

    if (!token) {
      throw new Error("Token not found");
    }

    try {
      const JWT_SECRET = process.env.JWT_SECRET;

      const user = jwt.verify(token, JWT_SECRET);

      req.user = user;
      next();
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        throw new Error("Token expired", null);
      }

      if (error.name === "JsonWebTokenError") {
        throw new Error("Invalid token", null);
      }

      throw new Error("Token verification failed");
    }
  } catch (error) {
    return res.status(403).json({
      statusCode: 403,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

module.exports = authenticateToken;
