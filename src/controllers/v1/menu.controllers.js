const { Role } = require("@prisma/client");
const { MENU_SERVICES, CAFE_SERVICES } =
  require("../../services/index.js").V1_SERVICES;

module.exports = {
  createMenu: async (req, res) => {
    const { role, sub } = req.user;
    const { name, price, isRecommendation, cafeId } = req.body;

    try {
      // Check if manager work at the cafe
      if (role === Role.Manager) {
        const isManagerValid = await CAFE_SERVICES.isWorkHere(sub, cafeId);
        if (!isManagerValid) {
          throw new Error("Manager not valid");
        }
      }

      const menu = await MENU_SERVICES.createMenu(
        name,
        price,
        isRecommendation,
        cafeId
      );

      res.status(201).json({
        message: "menu created",
        statusCode: 201,
        data: menu,
      });
    } catch (error) {
      res.status(500).json({
        message: "Something went wrong",
        statusCode: 500,
        error: error.message,
      });
    }
  },

  getAllMenu: async (req, res) => {
    try {
      const cafeId = req.params.cafeId;

      const menus = await MENU_SERVICES.getAllMenuFromCafe(cafeId);

      res.status(200).json({
        message: "menu found",
        statusCode: 200,
        data: menus,
      });
    } catch (error) {
      res.status(500).json({
        message: "Something went wrong",
        statusCode: 500,
        error: error.message,
      });
    }
  },

  getMenuById: async (req, res) => {
    try {
      const menuId = req.params.menuId;

      const menu = await MENU_SERVICES.getMenuById(menuId);

      res.status(200).json({
        message: "menu found",
        statusCode: 200,
        data: menu,
      });
    } catch (error) {
      res.status(500).json({
        message: "Something went wrong",
        statusCode: 500,
        error: error.message,
      });
    }
  },

  updateMenu: async (req, res) => {
    try {
      const menuId = req.params.menuId;
      const { name, price, isRecommendation } = req.body;

      const updatedMenu = await MENU_SERVICES.updateMenu(menuId, {
        name,
        price,
        isRecommendation,
      });

      res.status(200).json({
        message: "update menu success",
        statusCode: 200,
        data: updatedMenu,
      });
    } catch (error) {
      res.status(500).json({
        message: "Something went wrong",
        statusCode: 500,
        error: error.message,
      });
    }
  },

  deleteMenu: async (req, res) => {
    try {
      const menuId = req.params.menuId;

      const deletedMenu = await MENU_SERVICES.deleteMenu(menuId);

      res.status(200).json({
        message: "delete menu success",
        statusCode: 200,
        data: deletedMenu,
      });
    } catch (error) {
      res.status(500).json({
        message: "Something went wrong",
        statusCode: 500,
        error: error.message,
      });
    }
  },
};
