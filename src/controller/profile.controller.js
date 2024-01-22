const { body, validationResult } = require("express-validator");
const prisma = require("../model/prisma");
const profileController = {
  update: async (req, res) => {
    try {
      if (!validationResult(req).isEmpty())
        return res.status(400).json({
          sucess: false,
          message: "invalid input",
          error: validationResult(req).array(),
        });

      let updateTime = new Date();
      updateTime = updateTime.toISOString();
      const profile = await prisma.profile.upsert({
        where: {
          user_id: req.user.id,
        },
        update: {
          business_name: req.body.businessName,
          address: req.body.address,
          updated_at: updateTime,
        },
        create: {
          user_id: req.user.id,
          business_name: req.body.businessName,
          address: req.body.address,
        },
      });
      return res.status(201).json({
        success: true,
        message: "Profile updates sucessfully",
        data: {
          profile,
        },
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        message: "Internal server Error",
        data: {},
      });
    }
  },
  validateUpdate: [
    body("businessName").isLength({ min: 6, max: 40 }),
    body("address").isLength({ min: 5, max: 100 }),
  ],
};
module.exports = profileController;
