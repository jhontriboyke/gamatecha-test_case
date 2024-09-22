const db = require("../../config/database/index");
const { Role } = require("@prisma/client");

module.exports = {
  createUser: async (username, fullName, password, role) => {
    try {
      return await db.user.create({
        data: {
          username,
          fullName,
          password,
          role: role === Role.Manager ? Role.Manager : Role.Owner,
        },
      });
    } catch (error) {
      throw error;
    }
  },

  findById: async (id) => {
    return await db.user.findUnique({
      where: {
        id,
      },
    });
  },

  findByUsername: async (username) => {
    try {
      return await db.user.findUnique({
        where: {
          username,
        },
      });
    } catch (error) {
      throw error;
    }
  },

  getAllManager: async () => {
    return await db.user.findMany({
      where: {
        role: Role.Manager,
      },
      select: {
        id: true,
        username: true,
        fullName: true,
        role: true,
        cafes: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  },

  getManagerById: async (id) => {
    return await db.user.findUnique({
      where: {
        role: Role.Manager,
        id: id,
      },
    });
  },

  updateUser: async (id, userObj) => {
    return await db.user.update({
      where: {
        id,
      },
      data: { ...userObj },
    });
  },

  deleteUser: async (id) => {
    return await db.user.delete({
      where: {
        id,
      },
    });
  },
};
