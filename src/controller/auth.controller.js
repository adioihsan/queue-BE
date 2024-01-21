const prisma = require("../../prisma/prisma");
const bcrypt = require("bcrypt");
const { body, validationResult } = require("express-validator");

async function hashPassword(plainText) {
  const saltRounds = 10;
  const hash = await bcrypt.hash(plainText, saltRounds);
  return hash;
}

const AuthController = {
  registerOwner: async (req, res) => {
    console.log(req.body);
    try {
      const validationFormResult = validationResult(req);
      if (!validationFormResult.isEmpty())
        return res.status(400).json({
          success: "false",
          message: "invalid input",
          error: validationFormResult.array(),
        });

      const isUserExisit = await prisma.user.findFirst({
        where: {
          OR: [{ username: req.body.username }, { email: req.body.email }],
        },
      });
      if (isUserExisit !== null)
        return res.status(409).json({
          success: false,
          message: "Username or Email Already Registered",
        });

      const password = await hashPassword(req.body.password);
      await prisma.user.create({
        data: {
          username: req.body.email,
          email: req.body.email,
          password: password,
        },
      });
      return res.status(2000).json({
        success: true,
        message: "Registration success",
        data: {
          user: {
            email: req.body.email,
            username: req.body.username,
          },
        },
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        message: "Server Error",
        data: {},
      });
    }
  },
  validationRegister: [
    body("email").isEmail(),
    // body("password").isStrongPassword({ minLength: 8, minNumbers: 1 }),
    body("password").isLength({ min: 6, max: 50 }),
    body("username").isLength({ min: 6, max: 50 }),
  ],
};

module.exports = AuthController;
