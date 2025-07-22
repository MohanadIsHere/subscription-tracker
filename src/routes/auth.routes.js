import { Router } from "express";
import { signin, signup } from "../controllers/auth.controller.js";
const authRouter = Router();

authRouter.post("/sign-up", signup)
authRouter.post("/sign-in", signin)
authRouter.post("/sign-out", (req, res) => {
  res.send("Sign out");
})

export default authRouter