const { MENU_MODELS } = require("../../models/index").V1_MODELS;

class MENU_SERVICES {
  async createMenu(name, price, isRecommendation, cafeId) {
    try {
      return await MENU_MODELS.createMenu(
        name,
        price,
        isRecommendation,
        cafeId
      );
    } catch (error) {
      throw error;
    }
  }

  async getAllMenuFromCafe(cafeId) {
    try {
      return await MENU_MODELS.getAllMenuFromCafe(cafeId);
    } catch (error) {
      throw error;
    }
  }

  async getMenuByIdFromCafe(cafeId, menuId) {
    try {
      return await MENU_MODELS.getMenuByIdFromCafe(cafeId, menuId);
    } catch (error) {
      throw error;
    }
  }

  async getMenuById(menuId) {
    try {
      return await MENU_MODELS.getMenuById(menuId);
    } catch (error) {
      throw error;
    }
  }

  async updateMenu(menuId, menuObj) {
    try {
      return await MENU_MODELS.updateMenu(menuId, menuObj);
    } catch (error) {
      throw error;
    }
  }

  async deleteMenu(menuId) {
    try {
      return await MENU_MODELS.deleteMenu(menuId);
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new MENU_SERVICES();
