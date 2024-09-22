const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const USER_SERVICES = require("./user.services");

module.exports = {
  login: async (username, password) => {
    // Check if user exist
    const user = await USER_SERVICES.findByUsername(username);

    if (!user && !(await bcrypt.compare(password, user.password))) {
      throw new Error("Username or password incorrect");
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
