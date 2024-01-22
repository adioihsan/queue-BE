// System modules
const AuthRouter = require("express").Router();
// App modules
const authController = require("../controller/auth.controller");

AuthRouter.route("/register").post(
  authController.validationRegister,
  authController.registerOwner
);

AuthRouter.route("/login").post(authController.loginOwner);

module.exports = AuthRouter;
