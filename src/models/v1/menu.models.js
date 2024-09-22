const db = require("../../config/database/index");

module.exports = {
  createMenu: async (name, price, isRecommendation, cafeId) => {
    return await db.menu.create({
      data: {
        name,
        price,
        isRecommendation,
        cafeId,
      },
    });
  },

  getAllMenuFromCafe: async (cafeId) => {
    return await db.menu.findMany({
      where: {
        cafeId,
      },
      select: {
        id: true,
        name: true,
        price: true,
        isRecommendation: true,
      },
    });
  },

  getMenuByIdFromCafe: async (cafeId, menuId) => {
    return await db.menu.findUnique({
      where: {
        id: menuId,
        cafeId: cafeId,
      },
    });
  },

  getMenuById: async (menuId) => {
    return await db.menu.findUnique({
      where: {
        id: menuId,
      },
    });
  },

  updateMenu: async (menuId, menuObj) => {
    return await db.menu.update({
      where: {
        id: menuId,
      },
      data: { ...menuObj },
    });
  },

  deleteMenu: async (menuId) => {
    return await db.menu.delete({
      where: {
        id: menuId,
      },
    });
  },
};
