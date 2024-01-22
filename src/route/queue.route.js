// System modules
const QueueRouter = require("express").Router();
const queueController = require("../controller/queue.controller");
const ownerMiddleware = require("../middleware/owner.middleware");

QueueRouter.route("/create").post(
  ownerMiddleware,
  queueController.validateCreate,
  queueController.create
);

module.exports = QueueRouter;
