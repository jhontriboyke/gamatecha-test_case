const { DuplicationError, NotFoundError } = require("../../errors/customError");

const { MENU_MODELS } = require("../../models/index").V1_MODELS;

class MENU_SERVICES {
  async createMenu(name, price, isRecommendation, cafeId) {
    try {
      const isMenuExist = await this.getMenuByName(name, cafeId);

      if (isMenuExist) {
        throw new DuplicationError("Menu already exist");
      }

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
      const menus = await MENU_MODELS.getAllMenuFromCafe(cafeId);

      if (menus.length === 0) {
        throw new NotFoundError("Menu not found");
      }

      return menus;
    } catch (error) {
      throw error;
    }
  }

  async getMenuByIdFromCafe(cafeId, menuId) {
    try {
      const menu = await MENU_MODELS.getMenuByIdFromCafe(cafeId, menuId);

      if (!menu) {
        throw new NotFoundError("Menu not found");
      }

      return menu;
    } catch (error) {
      throw error;
    }
  }

  async getMenuById(menuId) {
    try {
      const menu = await MENU_MODELS.getMenuById(menuId);

      if (!menu) {
        throw new NotFoundError("Menu not found");
      }

      return menu;
    } catch (error) {
      throw error;
    }
  }

  async getMenuByName(name) {
    try {
      const menu = await MENU_MODELS.getMenuByName(name);

      if (!menu) {
        throw new NotFoundError("Menu not found");
      }

      return menu;
    } catch (error) {
      throw error;
    }
  }

  async updateMenu(menuId, menuObj) {
    try {
      await this.getMenuById(menuId);

      return await MENU_MODELS.updateMenu(menuId, menuObj);
    } catch (error) {
      throw error;
    }
  }

  async deleteMenu(menuId) {
    try {
      await this.getMenuById(menuId);

      return await MENU_MODELS.deleteMenu(menuId);
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new MENU_SERVICES();
