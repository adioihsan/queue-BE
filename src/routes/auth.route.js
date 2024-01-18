// System modules
const AuthRouter = require("express").Router();
// App modules
const AuthController = require("../controller/auth.controller");

AuthRouter.route("/register").get(AuthController.RegisterAdmin);

module.exports = AuthRouter;
