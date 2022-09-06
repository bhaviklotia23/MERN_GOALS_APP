const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../modals/userModels");

const protect = () =>
  asyncHandler(async (req, res, next) => {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      try {
        // Get Token from Header
        token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // get user from the token
        req.user = await User.findById(decoded.id).select("-password");
        next();
      } catch {
        console.log(error);
        res.status(401);
        throw new Error("Not Authorized");
      }
    }
    if (!token) {
      res.status(401);
      throw new Error("Not Authorized, No token");
    }
  });

module.exports = { protect };
