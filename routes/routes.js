const express = require("express");

const controller = require("../controllers/controller");
const validate = require("../middlewares/validator");

const router = express.Router();

router.post("/signup", validate, controller.signup);
router.post("/login", controller.login);

module.exports = router;
