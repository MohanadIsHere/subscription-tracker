import connectToDatabase from "./database/connection.db.js";
import arcjetMiddleware from "./middlewares/arcjet.middleware.js";
import errorMiddleware from "./middlewares/error.middleware.js";
import authRouter from "./routes/auth.routes.js";
import subscriptionRouter from "./routes/subscription.routes.js";
import userRouter from "./routes/user.routes.js";

const bootstrap = async (express, app) => {
  // Middlewares
  app.use(express.json());
  app.use(arcjetMiddleware);

  // Connect to database
  await connectToDatabase();

  // Routes & Endpoints
  app.use("/api/v1/auth", authRouter)
  app.use("/api/v1/users", userRouter) 
  app.use("/api/v1/subscriptions", subscriptionRouter) 
  
  app.get("/", (req, res) => {
    res.send("Welcome to Subscription Tracker API");
  });

  // Not found middleware
  app.use((req, res, next) => {
    res.status(404).json({
      message: "Route not found",
    });
  });

  // Error handler middleware
  app.use(errorMiddleware);
};
export default bootstrap;
