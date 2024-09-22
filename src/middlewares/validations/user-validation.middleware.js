const { check, validationResult } = require("express-validator");
const { ValidationError } = require("../../errors/customError");

const validateNewUser = [
  check("username").notEmpty().withMessage("Username required"),
  check("fullName").notEmpty().withMessage("FullName required"),
  check("password")
    .isLength({ min: 6 })
    .withMessage("Password must be 6 or more characters"),
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

const validateUpdateUser = [
  check("username").optional(),
  check("fullName").optional(),
  check("password")
    .isLength({ min: 6 })
    .withMessage("Password must be 6 or more characters"),
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

module.exports = { validateNewUser, validateUpdateUser };
