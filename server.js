const express = require("express");
const app = express();
const morgan = require("morgan");

require("dotenv").config();

app.use(express.json());
app.use(morgan("dev"));

const API_ROUTES = require("./src/routes/index.js");
app.use("/api", API_ROUTES);

const PORT = process.env.PORT || 8001;
app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
});
