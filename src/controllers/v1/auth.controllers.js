const { AUTH_SERVICES } = require("../../services/index.js").V1_SERVICES;

module.exports = {
  login: async (req, res, next) => {
    try {
      const { username, password } = req.body;

      const token = await AUTH_SERVICES.login(username, password);

      res.success(200, "login success", token);
    } catch (error) {
      next(error);
    }
  },
};
