const { USER_SERVICES } = require("../../services").V1_SERVICES;

module.exports = {
  createUser: (role) => {
    return async (req, res) => {
      try {
        const { username, fullName, password } = req.body;

        const user = await USER_SERVICES.createUser(
          username,
          fullName,
          password,
          role
        );

        res.status(201).json({
          message: "user created",
          statusCode: 201,
          data: {
            user,
          },
        });
      } catch (error) {
        res.status(500).json({
          message: "Something went wrong",
          statusCode: 500,
          error: error.message,
        });
      }
    };
  },

  updateUser: async (req, res) => {
    const userId = req.params.userId;
    const { username, fullName, password } = req.body;

    try {
      const updatedUser = await USER_SERVICES.updateUser(
        userId,
        username,
        fullName,
        password
      );
      res.status(200).json({
        message: "user updated",
        statusCode: 200,
        data: updatedUser,
      });
    } catch (error) {
      res.status(500).json({
        message: "Something went wrong",
        statusCode: 500,
        error: error.message,
      });
    }
  },

  deleteUser: async (req, res) => {
    const userId = req.params.userId;

    try {
      const deletedUser = await USER_SERVICES.deleteUser(userId);

      res.status(200).json({
        message: "user deleted",
        statusCode: 200,
        data: deletedUser,
      });
    } catch (error) {
      res.status(500).json({
        message: "Something went wrong",
        statusCode: 500,
        error: error.message,
      });
    }
  },

  getAllManager: async (req, res) => {
    try {
      const managers = await USER_SERVICES.getAllManager();

      res.status(200).json({
        message: "get all manager success",
        statusCode: 200,
        data: managers,
      });
    } catch (error) {
      res.status(500).json({
        message: "Something went wrong",
        statusCode: 500,
        error: error.message,
      });
    }
  },

  getManagerById: async (req, res) => {
    try {
      const { id } = req.params;

      const manager = await USER_SERVICES.getManagerById(id);
      res.status(200).json({
        message: "get all manager success",
        statusCode: 200,
        data: manager,
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
