const jwt = require("jsonwebtoken");
const tokenService = {
  generateAccessToken: (username, role) =>
    jwt.sign({ username, role }, process.env.JWT_PRIVATE_TOKEN, {
      expiresIn: process.env.JWT_EXPIRES,
    }),
  verifyAccessToken: (token) => {
    jwt.verify(token, process.env.JWT_PRIVATE_TOKEN);
  },
};
module.exports = tokenService;
