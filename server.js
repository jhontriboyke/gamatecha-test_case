const express = require("express");
const app = express();
const morgan = require("morgan");
require("dotenv").config();

const errorHandler = require("./src/middlewares/errorHandler.middleware.js");
const notFoundHandler = require("./src/middlewares/notFoundHandler.middleware.js");
const responseFormat = require("./src/middlewares/responseFormat.middleware.js");

app.use(morgan("dev"));
app.use(express.json());
app.use(responseFormat);

const API_ROUTES = require("./src/routes/index.js");
app.use("/api", API_ROUTES);

app.use(notFoundHandler);
app.use(errorHandler);

const PORT = process.env.PORT || 8001;
app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
});
