const bcrypt = require("bcrypt");
const { body, validationResult } = require("express-validator");

const model = require("../model/model");

let saltRounds = 10;

const signup = async (req, resp) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(`Validation Error \n`, { Errors: errors.array() });
    return resp.status(400).send({
      success: false,
      errors: errors.array(),
    });
  }
  let user = await model.findOne({ username: req.body.username });
  if (user) {
    resp.status(400).send({
      message: "You can't use this username",
    });
  } else {
    bcrypt.hash(req.body.password, saltRounds, async function (err, hash) {
      let data = new model({
        name: req.body.name,
        username: req.body.username,
        email: req.body.email,
        password: hash,
      });
      let result = await data.save();
      resp.status(200).send({ result });
      console.log({ result });
    });
  }
};

const login = async (req, resp) => {
  let user = await model.findOne({ email: req.body.email });
  if (user) {
    bcrypt.compare(
      req.body.password,
      user.password,
      async function (err, result) {
        if (result === true) {
          resp.status(200).send({
            message: "Login Successful",
          });
          console.log("Login Successful");
        } else {
          resp.status(404).send({
            message: "Password doesn't match",
          });
          console.log("Password doesn't match");
        }
      }
    );
  } else {
    resp.status(404).send({
      message: "User of this email doesn't exist",
    });
    console.log("User of this email doesn't exist");
  }
};
module.exports = { signup, login };
