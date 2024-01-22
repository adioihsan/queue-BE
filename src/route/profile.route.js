const ProfileRouter = require("express").Router();
const profileController = require("../controller/profile.controller");
const ownerMiddleware = require("../middleware/owner.middleware");

ProfileRouter.route("/update").post(
  ownerMiddleware,
  profileController.validateUpdate,
  profileController.update
);
module.exports = ProfileRouter;
