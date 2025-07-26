const errorMiddleware = (err, req, res, next) => {
  try {
    let error = { ...err };
    error.message = err.message;

    // Mongoose bad ObjectId
    if (err.name === "ValidationError") {
      const message = "Resource not found";
      error = new Error(message);
      error.statusCode = 404;
    }

    // Mongoose duplicate key
    if (err.code === 11000) {
      const message = "Duplicate field value entered";
      error = new Error(message);
      error.statusCode = 400;
    }

    // Mongoose validation error
    if (err.name === "ValidationError") {
      const message = Object.values(err.errors).map((val) => val.message);
      error = new Error(message.join(", "));
      error.statusCode = 400;
    }

    // JWT token expired
    if (err.name === "TokenExpiredError") {
      const message = "Your token has expired";
      error = new Error(message);
      error.statusCode = 401;
    }

    // JWT invalid token
    if (err.name === "JsonWebTokenError") {
      const message = "Invalid token";
      error = new Error(message);
      error.statusCode = 401;
    }

    res
      .status(error.statusCode || 500)
      .json({
        message: error.message || "Server Error",
        success: false,
        stack: error.stack || undefined,
        errors: error.errors || undefined,
      });
  } catch (error) {
    next(error);
  }
};
export default errorMiddleware;
