import aj from "../config/arcjet.js";

const arcjetMiddleware = async (req, res, next) => {
  try {
    const decision = await aj.protect(req, { requested: 1 });

    if (decision.isDenied()) {
      if (decision.reason.isRateLimit()) {
        const error = new Error("Rate limit exceeded");
        error.statusCode = 429;
        throw error;
      }

      if (decision.reason.isBot()) {
        const error = new Error("Bot detected");
        error.statusCode = 403;
        throw error;
      }

      const error = new Error("Access denied");
      error.statusCode = 403;
      throw error;
    }

    next();
  } catch (error) {
    console.log(`Arcjet middleware error: ${error}`);
    next(error);
  }
};

export default arcjetMiddleware;
