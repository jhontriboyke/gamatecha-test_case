const path = require("path");
const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "REST API Documentation",
      version: "1.0.0",
      description: "API documentation for your Express application",
    },
    servers: [
      {
        url: "http://localhost:8001", // URL base server Anda
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
