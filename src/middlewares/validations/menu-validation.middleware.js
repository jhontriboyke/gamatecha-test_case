const { check, validationResult } = require("express-validator");
const { ValidationError } = require("../../errors/customError");

const validateNewMenu = [
  check("name").notEmpty().withMessage("Name required"),
  check("price")
    .isFloat({ min: 5000 })
    .withMessage("Price required and must be at least 5000"),
  check("isRecommendation")
    .optional()
    .isBoolean()
    .withMessage("isRecommendation must be a boolean")
    .default(false),
  (req, res, next) => {
    const results = validationResult(req);

    if (results.isEmpty()) {
      return next();
    }

    const errorsArr = results.array().map((result) => {
      return { property: result.path, message: result.msg };
    });

    throw new ValidationError("Validation error", errorsArr);
  },
];

module.exports = {
  validateNewMenu,
};
