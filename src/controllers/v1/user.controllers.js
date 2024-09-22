const { USER_SERVICES } = require("../../services").V1_SERVICES;

module.exports = {
  createUser: (role) => {
    return async (req, res, next) => {
      try {
        const { username, fullName, password } = req.body;

        const user = await USER_SERVICES.createUser(
          username,
          fullName,
          password,
          role
        );

        res.success(201, "user created", user);
      } catch (error) {
        next(error);
      }
    };
  },

  updateUser: async (req, res, next) => {
    const userId = req.params.userId;
    const { username, fullName, password } = req.body;

    try {
      const updatedUser = await USER_SERVICES.updateUser(
        userId,
        username,
        fullName,
        password
      );

      res.success(200, "user updated", updatedUser);
    } catch (error) {
      next(error);
    }
  },

  deleteUser: async (req, res, next) => {
    const userId = req.params.userId;

    try {
      const deletedUser = await USER_SERVICES.deleteUser(userId);

      res.success(200, "user deleted", deletedUser);
    } catch (error) {
      next(error);
    }
  },

  getAllManager: async (req, res, next) => {
    try {
      const managers = await USER_SERVICES.getAllManager();

      res.success(200, "all managers found", managers);
    } catch (error) {
      next(error);
    }
  },

  getManagerById: async (req, res, next) => {
    try {
      const { id } = req.params;

      const manager = await USER_SERVICES.getManagerById(id);

      res.success(200, "manager found", manager);
    } catch (error) {
      next(error);
    }
  },
};
