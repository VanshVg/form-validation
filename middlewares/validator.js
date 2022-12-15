const { body, validationResult } = require("express-validator");

module.exports = [
  body("name")
    .isLength({
      min: 2,
    })
    .withMessage("This field can't be empty"),
  body("username")
    .isLength({
      min: 5,
      max: 11,
    })
    .withMessage("Username must be of length 5-11"),
  body("email").isEmail().normalizeEmail().withMessage("Check your email"),
  body("password")
    .isLength({
      min: 5,
      max: 15,
    })
    .withMessage("Password must be of length 5-15"),
];
