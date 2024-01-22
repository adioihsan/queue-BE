// System modules
const QueueRouter = require("express").Router();
const queueController = require("../controller/queue.controller");
const ownerMiddleware = require("../middleware/owner.middleware");

QueueRouter.route("/create").post(
  ownerMiddleware,
  queueController.validateCreate,
  queueController.create
);

QueueRouter.route("/show/:queueName").get(
  ownerMiddleware,
  queueController.show
);

module.exports = QueueRouter;
