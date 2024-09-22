const router = require("express").Router();

const V1_ROUTES = require("./v1/index.js");

router.use("/v1", V1_ROUTES);

module.exports = router;
