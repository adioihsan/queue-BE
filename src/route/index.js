// System Modules
const ApiRouter = require("express").Router();
//App Modules

ApiRouter.use("/auth", require("./auth.route"));
ApiRouter.use("/queue", require("./queue.route"));

module.exports = ApiRouter;
