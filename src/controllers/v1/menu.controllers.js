const { Role } = require("@prisma/client");
const { UnauthorizedError } = require("../../errors/customError.js");
const { MENU_SERVICES, CAFE_SERVICES } =
  require("../../services/index.js").V1_SERVICES;

module.exports = {
  createMenu: async (req, res, next) => {
    const { role, sub } = req.user;
    const { name, price, isRecommendation, cafeId } = req.body;

    try {
      // Check if manager work at the cafe
      if (role === Role.Manager) {
        const isManagerValid = await CAFE_SERVICES.isWorkHere(sub, cafeId);
        if (!isManagerValid) {
          throw new UnauthorizedError("Manager not valid");
        }
      }

      const menu = await MENU_SERVICES.createMenu(
        name,
        price,
        isRecommendation,
        cafeId
      );

      res.success(201, "menu created", menu);
    } catch (error) {
      next(error);
    }
  },

  getAllMenu: async (req, res, next) => {
    try {
      const cafeId = req.params.cafeId;

      const menus = await MENU_SERVICES.getAllMenuFromCafe(cafeId);

      res.success(200, "all menu found", menus);
    } catch (error) {
      next(error);
    }
  },

  getMenuById: async (req, res, next) => {
    try {
      const menuId = req.params.menuId;

      const menu = await MENU_SERVICES.getMenuById(menuId);

      res.success(200, "menu found", menu);
    } catch (error) {
      next(error);
    }
  },

  updateMenu: async (req, res, next) => {
    try {
      const menuId = req.params.menuId;
      const { name, price, isRecommendation } = req.body;

      const updatedMenu = await MENU_SERVICES.updateMenu(menuId, {
        name,
        price,
        isRecommendation,
      });

      res.success(200, "menu updated", updatedMenu);
    } catch (error) {
      next(error);
    }
  },

  deleteMenu: async (req, res, next) => {
    try {
      const menuId = req.params.menuId;

      const deletedMenu = await MENU_SERVICES.deleteMenu(menuId);

      res.success(200, "menu deleted", deletedMenu);
    } catch (error) {
      next(error);
    }
  },
};
