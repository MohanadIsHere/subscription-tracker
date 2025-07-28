import { Router } from "express";
import authorize from "../../middlewares/auth.middleware.js";
import {
  getUser,
  getUsers,
  resetPassword,
} from "./user.controller.js";

const userRouter = Router();
userRouter.get("/:id", authorize, getUser);
userRouter.get("/", getUsers);
userRouter.put("/reset-password", authorize, resetPassword);
export default userRouter;