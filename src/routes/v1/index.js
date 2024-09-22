const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("../../config/docs/swagger.js");

const router = require("express").Router();

const AUTH_ROUTES = require("./auth.routes");
const USER_ROUTES = require("./user.routes");
const CAFE_ROUTES = require("./cafe.routes");
const MENU_ROUTES = require("./menu.routes");

router.use("/auth", AUTH_ROUTES);
router.use("/user", USER_ROUTES);
router.use("/cafe", CAFE_ROUTES);
router.use("/menu", MENU_ROUTES);

router.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

module.exports = router;
