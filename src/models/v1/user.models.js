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
    try {
      return await db.user.findUnique({
        where: {
          id,
        },
      });
    } catch (error) {
      throw error;
    }
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
    try {
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
    } catch (error) {
      throw error;
    }
  },

  getManagerById: async (id) => {
    try {
      return await db.user.findUnique({
        where: {
          role: Role.Manager,
          id: id,
        },
      });
    } catch (error) {
      throw error;
    }
  },

  updateUser: async (id, userObj) => {
    try {
      return await db.user.update({
        where: {
          id,
        },
        data: { ...userObj },
      });
    } catch (error) {
      throw error;
    }
  },

  deleteUser: async (id) => {
    try {
      return await db.user.delete({
        where: {
          id,
        },
      });
    } catch (error) {
      throw error;
    }
  },
};
