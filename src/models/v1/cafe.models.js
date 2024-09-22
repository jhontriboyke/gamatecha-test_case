const db = require("../../config/database/index");

module.exports = {
  createCafe: async (name, address, phoneNumber, managerId) => {
    return await db.cafe.create({
      data: {
        name,
        address,
        phoneNumber,
        userId: managerId,
      },
    });
  },

  isWorkHere: async (managerId, cafeId) => {
    return await db.cafe.findFirst({
      where: {
        id: cafeId,
        userId: managerId,
      },
    });
  },

  getCafe: async (cafeId) => {
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
  },

  getAllCafe: async () => {
    return await db.cafe.findMany({
      select: {
        id: true,
        name: true,
        address: true,
        phoneNumber: true,
      },
    });
  },

  updateCafe: async (cafeId, cafeObj) => {
    return await db.cafe.update({
      where: {
        id: cafeId,
      },
      data: { ...cafeObj },
    });
  },

  deleteCafe: async (cafeId) => {
    return await db.cafe.delete({
      where: {
        id: cafeId,
      },
    });
  },
};
