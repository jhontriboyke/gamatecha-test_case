const { CAFE_SERVICES, USER_SERVICES, MENU_SERVICES } =
  require("../../services/index.js").V1_SERVICES;

module.exports = {
  createCafe: async (req, res) => {
    try {
      const { name, address, phoneNumber, managerId } = req.body;

      const manager = await USER_SERVICES.getManagerById(managerId);

      if (!manager) {
        throw new Error("Manager not found");
      }

      const cafe = await CAFE_SERVICES.createCafe(
        name,
        address,
        phoneNumber,
        managerId
      );

      res.status(201).json({
        message: "cafe created",
        statusCode: 201,
        data: cafe,
      });
    } catch (error) {
      res.status(500).json({
        message: "Something went wrong",
        statusCode: 500,
        error: error.message,
      });
    }
  },

  getAllCafe: async (req, res) => {
    try {
      const cafes = await CAFE_SERVICES.getAllCafe();

      res.status(200).json({
        message: "all cafe found",
        statusCode: 200,
        data: cafes,
      });
    } catch (error) {
      res.status(500).json({
        message: "Something went wrong",
        statusCode: 500,
        error: error.message,
      });
    }
  },

  getCafe: async (req, res) => {
    try {
      const cafeId = req.params.cafeId;

      const cafe = await CAFE_SERVICES.getCafe(cafeId);
      res.status(200).json({
        message: "cafe found",
        statusCode: 200,
        data: cafe,
      });
    } catch (error) {
      res.status(500).json({
        message: "Something went wrong",
        statusCode: 500,
        error: error.message,
      });
    }
  },

  getAllMenuFromCafe: async (req, res) => {
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

  getMenuFromCafe: async (req, res) => {
    try {
      const cafeId = req.params.cafeId;
      const menuId = req.params.menuId;

      const menu = await MENU_SERVICES.getMenuByIdFromCafe(cafeId, menuId);

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

  updateCafe: async (req, res) => {
    try {
      const { name, address, phoneNumber, managerId } = req.body;
      const cafeId = req.params.cafeId;

      const updatedCafe = await CAFE_SERVICES.updateCafe(cafeId, {
        name,
        address,
        phoneNumber,
        managerId,
      });

      res.status(200).json({
        message: "update cafe success",
        statusCode: 200,
        data: updatedCafe,
      });
    } catch (error) {
      res.status(500).json({
        message: "Something went wrong",
        statusCode: 500,
        error: error.message,
      });
    }
  },

  deleteCafe: async (req, res) => {
    try {
      const cafeId = req.params.cafeId;

      const deletedCafe = await CAFE_SERVICES.deleteCafe(cafeId);
      res.status(200).json({
        message: "delete cafe success",
        statusCode: 200,
        data: deletedCafe,
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
