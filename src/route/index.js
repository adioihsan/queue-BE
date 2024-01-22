// System Modules
const ApiRouter = require("express").Router();
//App Modules

ApiRouter.use("/auth", require("./auth.route"));
ApiRouter.use("/queue", require("./queue.route"));
ApiRouter.use("/profile", require("./profile.route"));

module.exports = ApiRouter;
