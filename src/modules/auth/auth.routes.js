import { Router } from "express";
import {
  logoutUser,
  refreshAccessToken,
  resetPassword,
  signin,
  signup,
} from "./auth.controller.js";
import { signinValidationSchema } from "../../utils/validation/auth/signinValidationSchema.js";
import { signupValidationSchema } from "../../utils/validation/auth/signupValidationSchema.js";
import { validation } from "../../middlewares/validation.middleware.js";
import authorize from "../../middlewares/auth.middleware.js";

const authRouter = Router();

authRouter.post("/sign-up", validation(signupValidationSchema), signup);
authRouter.post("/sign-in", validation(signinValidationSchema), signin);
authRouter.post("/sign-out", logoutUser);
authRouter.post("/refresh-token", refreshAccessToken);
authRouter.post("/reset-password", authorize, resetPassword);

export default authRouter;
