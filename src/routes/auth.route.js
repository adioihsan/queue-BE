// System modules
const AuthRouter = require("express").Router();
// App modules
const AuthController = require("../controller/auth.controller");

AuthRouter.route("/register").post(
  AuthController.validationRegister,
  AuthController.registerOwner
);

AuthRouter.route("/login").post(AuthController.loginOwner);

module.exports = AuthRouter;
