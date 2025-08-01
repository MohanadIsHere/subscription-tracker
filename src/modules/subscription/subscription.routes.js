import { Router } from "express";
import { createSubscription } from "./subscription.controller.js";
import authorize from "../../middlewares/auth.middleware.js";
import { validation } from "../../middlewares/validation.middleware.js";
import { addSubscriptionValidationSchema } from "../../utils/validation/subscriptions/subscriptionValidationSchema.js";
const subscriptionRouter = Router();

subscriptionRouter.post(
  "/",
  authorize,
  validation(addSubscriptionValidationSchema),
  createSubscription
);
export default subscriptionRouter;
