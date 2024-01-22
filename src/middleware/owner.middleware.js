const tokenService = require("../service/token.service");

function ownerMiddleware(req, res, next) {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (token == null)
      return res
        .status(401)
        .json({ succes: false, message: "Login Required", data: {} });

    const isVerified = tokenService.verifyAccessToken(token);
    if (!isVerified)
      return res
        .status(401)
        .json({ succes: false, message: "Invalid Token", data: {} });

    req.user = tokenService.decodeToken(token);
    if (req.user.role !== "OWNER")
      return res.status(401).json({
        succes: false,
        message: "Access to this feature denied",
        data: {},
      });
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server Error",
      data: {},
    });
  }
}

module.exports = ownerMiddleware;
