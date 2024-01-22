const { body, validationResult } = require("express-validator");
const prisma = require("../model/prisma");
const randomstring = require("randomstring");

const checkQueueName = async (name, userId) => {
  const queue = await prisma.queue.findFirst({
    where: { AND: [{ queue_name: name }, { user_id: userId }] },
  });
  return queue == null;
};

const queueController = {
  create: async (req, res) => {
    try {
      if (!validationResult(req).isEmpty())
        return res.status(400).json({
          sucess: false,
          message: "invalid input",
          error: validationResult(req).array(),
        });

      const isNameAvail = await checkQueueName(req.body.queueName);
      if (!isNameAvail)
        return res.status(400).json({
          success: false,
          message: "Queue name already exist",
          data: {},
        });

      const queue = await prisma.queue.create({
        data: {
          queue_name: req.body.queueName,
          user_id: req.user.id,
          is_public: Boolean(req.body.isPublic),
          note: req.body.note,
          verify_code: randomstring.generate(10),
        },
      });

      console.log(queue);

      return res.send(queue);
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        message: "Internal server Error",
        data: {},
      });
    }
  },

  validateCreate: [
    body("queueName").isLength({ min: 6, max: 40 }),
    body("isPublic").isBoolean(),
    body("note").optional().isLength({ max: 60 }),
  ],
};

module.exports = queueController;
