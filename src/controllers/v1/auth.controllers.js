const { AUTH_SERVICES } = require("../../services/index.js").V1_SERVICES;

module.exports = {
  login: async (req, res) => {
    try {
      const { username, password } = req.body;

      const token = await AUTH_SERVICES.login(username, password);

      res.status(201).json({
        message: "login success",
        statusCode: 200,
        data: {
          token,
        },
      });
    } catch (error) {
      res.status(500).json({
        message: "Something went wrong",
        statusCode: 500,
        error: error.message,
      });
    }
  },
};
