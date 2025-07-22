import { Router } from "express";
import authorize from "../middlewares/auth.middleware.js";
import { getUser, getUsers } from "../controllers/user.controller.js";

const userRouter = Router();
userRouter.get("/:id", authorize, getUser);
userRouter.get("/", getUsers);
export default userRouter;
