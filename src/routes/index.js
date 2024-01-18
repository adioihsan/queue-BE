// System Modules
const ApiRouter = require("express").Router();
//App Modules

ApiRouter.use("/auth", require("./auth.route"));

module.exports = ApiRouter;
