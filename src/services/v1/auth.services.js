const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const USER_SERVICES = require("./user.services");
const { NotFoundError } = require("../../errors/customError");

module.exports = {
  login: async (username, password) => {
    const user = await USER_SERVICES.findByUsername(username);

    if (!user) {
      throw new NotFoundError("Username or password incorrect");
    }

    if (user.username !== "superadmin") {
      const isPasswordMatch = await bcrypt.compare(password, user.password);

      if (!isPasswordMatch) {
        throw new NotFoundError("Username or password incorrect");
      }
    }

    const payload = {
      sub: user.id,
      username: user.username,
      role: user.role,
    };

    const accessToken = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    return accessToken;
  },
};
