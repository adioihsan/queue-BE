const prisma = require("../../prisma/prisma");
const bcrypt = require("bcrypt");
const tokenServices = require("../services/token.service");

const { body, validationResult } = require("express-validator");

async function hashPassword(plainText) {
  const saltRounds = 10;
  const hash = await bcrypt.hash(plainText, saltRounds);
  return hash;
}

async function comparePassword(plainText, hashedPassword) {
  const compareResult = await bcrypt.compare(plainText, hashedPassword);
  return compareResult;
}

const AuthController = {
  // register
  registerOwner: async (req, res) => {
    try {
      // form validation
      const validationFormResult = validationResult(req);
      if (!validationFormResult.isEmpty())
        return res.status(400).json({
          success: "false",
          message: "invalid input",
          error: validationFormResult.array(),
        });
      // end form validation

      // check user
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
      // end check user

      const password = await hashPassword(req.body.password);
      await prisma.user.create({
        data: {
          username: req.body.email,
          email: req.body.email,
          password: password,
        },
      });
      return res.status(200).json({
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
        message: "Internal server Error",
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
  //endregister

  loginOwner: async (req, res) => {
    try {
      const validationFormResult = validationResult(req);
      // form validation
      if (!validationFormResult.isEmpty())
        return res.status(400).json({
          success: "false",
          message: "invalid input",
          error: validationFormResult.array(),
        });
      // end form validation

      // check user
      const isUserExisit = await prisma.user.findUnique({
        where: { email: req.body.email },
      });
      if (!isUserExisit)
        return res.status(400).json({
          success: false,
          message: "User not registered",
          data: {},
        });
      // end checkuser

      // check password
      const isPassValid = await comparePassword(
        req.body.password,
        isUserExisit.password
      );
      if (!isPassValid)
        return res.status(400).json({
          success: false,
          message: "Wrong password",
        });
      // end check password

      // generate token
      const accessToken = tokenServices.generateAccessToken(
        isUserExisit.username,
        isUserExisit.role
      );

      return res.status(200).json({
        success: true,
        message: "Login success",
        data: {
          token: accessToken,
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
  validationLogin: [
    body("email").isEmail(),
    body("password").isLength({ min: 6, max: 50 }),
  ],
};

module.exports = AuthController;
