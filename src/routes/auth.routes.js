import { Router } from "express";
import { signin, signup } from "../controllers/auth.controller.js";
import { validation } from "../middlewares/validation.middleware.js";
import { signupValidationSchema } from "../utils/validation/auth/signupValidationSchema.js";
import { signinValidationSchema } from "../utils/validation/auth/signinValidationSchema.js";
const authRouter = Router();

authRouter.post("/sign-up", validation(signupValidationSchema),signup)
authRouter.post("/sign-in", validation(signinValidationSchema),signin)
authRouter.post("/sign-out", (req, res) => {
  res.send("Sign out");
})

export default authRouter