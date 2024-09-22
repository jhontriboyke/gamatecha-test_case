const path = require("path");
const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Gamatecha Test Case - Build Cafetaria REST API",
      version: "1.0.0",
      description:
        "This API provides endpoints to manage the Cafetaria system, allowing users to perform operations such as creating, retrieving, updating, and deleting menu items and user accounts. It is built on Express and adheres to RESTful principles.",
    },
    servers: [
      {
        url: "http://localhost:8001/api/v1",
      },
    ],
  },
  apis: [
    path.join(__dirname, "../../routes/*.js"),
    path.join(__dirname, "../../routes/v1/*.js"),
  ],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
