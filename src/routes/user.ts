import { Router } from "express";
import signup from "../controllers/user/signup.js";
import signin from "../controllers/user/signin.js";
import getUser from "../controllers/user/getUser.js";

const userRouter = Router();
userRouter.get("/v1/auth/me", getUser);
userRouter.post("/v1/auth/signup", signup);
userRouter.post("/v1/auth/signin", signin);

export default userRouter;
