const db = require("../../config/database/index");

module.exports = {
  getCafeByName: async (name) => {
    try {
      return await db.cafe.findFirst({
        where: {
          name,
        },
      });
    } catch (error) {
      throw error;
    }
  },

  createCafe: async (name, address, phoneNumber, managerId) => {
    try {
      return await db.cafe.create({
        data: {
          name,
          address,
          phoneNumber,
          userId: managerId,
        },
      });
    } catch (error) {
      throw error;
    }
  },

  isWorkHere: async (managerId, cafeId) => {
    try {
      return await db.cafe.findFirst({
        where: {
          id: cafeId,
          userId: managerId,
        },
      });
    } catch (error) {
      throw error;
    }
  },

  getCafe: async (cafeId) => {
    try {
      return await db.cafe.findUnique({
        where: {
          id: cafeId,
        },
        select: {
          name: true,
          address: true,
          phoneNumber: true,
        },
      });
    } catch (error) {
      throw error;
    }
  },

  getAllCafe: async () => {
    try {
      return await db.cafe.findMany({
        select: {
          id: true,
          name: true,
          address: true,
          phoneNumber: true,
        },
      });
    } catch (error) {
      throw error;
    }
  },

  updateCafe: async (cafeId, cafeObj) => {
    try {
      return await db.cafe.update({
        where: {
          id: cafeId,
        },
        data: { ...cafeObj },
      });
    } catch (error) {
      throw error;
    }
  },

  deleteCafe: async (cafeId) => {
    try {
      return await db.cafe.delete({
        where: {
          id: cafeId,
        },
      });
    } catch (error) {
      throw error;
    }
  },
};
