import { ACCESS_TOKEN_SECRET } from "../config/env.js";
import User from "../database/models/user.model.js";
import { verifyToken } from "../utils/token/token.js";

const authorize = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      const error = new Error("Unauthorized");
      error.statusCode = 401;
      throw error;
    }

    const token = authHeader.split(" ")[1];

    const decoded = verifyToken({ token, secret: ACCESS_TOKEN_SECRET });

    const user = await User.findById(decoded.userId);
    if (!user) {
      const error = new Error("Unauthorized");
      error.statusCode = 401;
      throw error;
    }

    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
};

export default authorize;
