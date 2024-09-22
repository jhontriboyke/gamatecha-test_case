const router = require("express").Router();
const { AUTH_CONTROLLERS } =
  require("../../controllers/index.js").V1_CONTROLLERS;

router.post("/login", AUTH_CONTROLLERS.login);

module.exports = router;
