const jwt = require("jsonwebtoken");
const { jwtDecode } = require("jwt-decode");

const tokenService = {
  generateAccessToken: (id, email, role) =>
    jwt.sign({ id, email, role }, process.env.JWT_PRIVATE_TOKEN, {
      expiresIn: process.env.JWT_EXPIRES,
    }),
  verifyAccessToken: (token) =>
    jwt.verify(token, process.env.JWT_PRIVATE_TOKEN),

  decodeToken: (token) => jwtDecode(token),
};
module.exports = tokenService;
