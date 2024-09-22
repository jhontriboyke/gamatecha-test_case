const { check, validationResult } = require("express-validator");
const { ValidationError } = require("../../errors/customError");

const validateNewCafe = [
  check("name").notEmpty().withMessage("Name required"),
  check("address").notEmpty().withMessage("Address is required"),
  check("phoneNumber")
    .notEmpty()
    .withMessage("Phone number is required")
    .matches(/^\+62/)
    .withMessage("Phone number must start with +62"),
  check("managerId")
    .notEmpty()
    .isUUID()
    .withMessage("User ID with manager role required"),
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
  validateNewCafe,
};
