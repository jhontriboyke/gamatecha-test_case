const { CAFE_SERVICES, USER_SERVICES, MENU_SERVICES } =
  require("../../services/index.js").V1_SERVICES;

module.exports = {
  createCafe: async (req, res, next) => {
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

      res.success(201, "cafe created", cafe);
    } catch (error) {
      next(error);
    }
  },

  getAllCafe: async (req, res, next) => {
    try {
      const cafes = await CAFE_SERVICES.getAllCafe();

      res.success(200, "all cafe found", cafes);
    } catch (error) {
      next(error);
    }
  },

  getCafe: async (req, res, next) => {
    try {
      const cafeId = req.params.cafeId;

      const cafe = await CAFE_SERVICES.getCafe(cafeId);

      res.success(200, "cafe found", cafe);
    } catch (error) {
      next(error);
    }
  },

  getAllMenuFromCafe: async (req, res, next) => {
    try {
      const cafeId = req.params.cafeId;

      const menus = await MENU_SERVICES.getAllMenuFromCafe(cafeId);

      res.success(200, "all menu found", menus);
    } catch (error) {
      next(error);
    }
  },

  getMenuFromCafe: async (req, res, next) => {
    try {
      const cafeId = req.params.cafeId;
      const menuId = req.params.menuId;

      const menu = await MENU_SERVICES.getMenuByIdFromCafe(cafeId, menuId);

      res.success(200, "menu found", menu);
    } catch (error) {
      next(error);
    }
  },

  updateCafe: async (req, res, next) => {
    try {
      const { name, address, phoneNumber, managerId } = req.body;
      const cafeId = req.params.cafeId;

      const updatedCafe = await CAFE_SERVICES.updateCafe(cafeId, {
        name,
        address,
        phoneNumber,
        managerId,
      });

      res.success(200, "cafe updated", updatedCafe);
    } catch (error) {
      next(error);
    }
  },

  deleteCafe: async (req, res, next) => {
    try {
      const cafeId = req.params.cafeId;

      const deletedCafe = await CAFE_SERVICES.deleteCafe(cafeId);

      res.success(200, "cafe deleted", deletedCafe);
    } catch (error) {
      next(error);
    }
  },
};
