const db = require("../../config/database/index");

module.exports = {
  createMenu: async (name, price, isRecommendation, cafeId) => {
    try {
      return await db.menu.create({
        data: {
          name,
          price,
          isRecommendation,
          cafeId,
        },
      });
    } catch (error) {
      throw error;
    }
  },

  getAllMenuFromCafe: async (cafeId) => {
    try {
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
    } catch (error) {
      throw error;
    }
  },

  getMenuByIdFromCafe: async (cafeId, menuId) => {
    try {
      return await db.menu.findUnique({
        where: {
          id: menuId,
          cafeId: cafeId,
        },
      });
    } catch (error) {
      throw error;
    }
  },

  getMenuById: async (menuId) => {
    try {
      return await db.menu.findUnique({
        where: {
          id: menuId,
        },
      });
    } catch (error) {
      throw error;
    }
  },

  updateMenu: async (menuId, menuObj) => {
    try {
      return await db.menu.update({
        where: {
          id: menuId,
        },
        data: { ...menuObj },
      });
    } catch (error) {
      throw error;
    }
  },

  deleteMenu: async (menuId) => {
    try {
      return await db.menu.delete({
        where: {
          id: menuId,
        },
      });
    } catch (error) {
      throw error;
    }
  },

  getMenuByName: async (name, cafeId) => {
    try {
      return await db.menu.findFirst({
        where: {
          name,
          cafeId,
        },
      });
    } catch (error) {
      throw error;
    }
  },
};
